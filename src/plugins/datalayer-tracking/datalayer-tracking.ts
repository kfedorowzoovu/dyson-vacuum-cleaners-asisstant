import {
  Advisor,
  AdvisorWebDesignPlugin,
  Answer,
  ChoiceQuestion,
  ProductProperty,
  ProductRecommendation,
  Question,
  QuestionTypeChecker,
  SectionType,
} from "@zoovu/runner-browser-api";
import { ProductAttributes } from "@/configuration/common-configuration";
import { AdviceEvent, BackEvent, NextEvent, RestartEvent, ResultsEvent, StepEvent } from "./events";
import { AdviceObject, BaseObject, ProductObject } from "./tracking-objects";

export class DatalayerTrackingPlugin implements AdvisorWebDesignPlugin {
  private _debug = false;

  private _advisor: Advisor;

  private _productsList: ReadonlyArray<ProductObject> = [];

  private _defaultValue = "n/a";

  private isResultsEventSent = false;

  public async beforeMount(advisor: Advisor): Promise<void> {
    this._advisor = advisor;
    this._init();
  }

  private _init(): void {
    this._advisor.setCustomSessionState({ isAdvisorStart: true });
    this._initializeDigitalData();
    this._trackInitialLoad();
    this._addEventListeners();
  }

  private _initializeDigitalData() {
    const windowObject = window as any;
    const baseTrackingObject: BaseObject = {
      account: this._advisor.accountId,
      advisor_name: this._advisor.advisorName,
      advisor_id: this._advisor.advisorId.toString(),
      advisor_rev: this._advisor.revision.toString(),
      localization: this._advisor.localizationSettings.locale,
      is_configurator: false,
      events: [],
    };

    if (this._debug) console.log("Initialize digital data with base object: ", baseTrackingObject);

    windowObject.dataLayer = windowObject.dataLayer || {};
    windowObject.dataLayer.zoovuData = windowObject.dataLayer.zoovuData || {};
    windowObject.dataLayer.zoovuData.smartAssistant = baseTrackingObject;
  }

  private _trackInitialLoad() {
    if (!this._isResultsSection()) {
      this._sendTrackingEvent(new StepEvent(this._advisor, this._productsList));
    }
  }

  private _addEventListeners() {
    this._advisor.onGlobalEvent("AdvisorModel.startOver:beforeActionSession", () => {
      const windowObject = window as any;

      this._sendTrackingEvent(new RestartEvent(this._advisor));
      if (this._debug) console.log(windowObject.dataLayer.zoovuData.smartAssistant.events);
      windowObject.dataLayer.zoovuData.smartAssistant.events = []; // clear events after restart (requested by customer)
      this._getAllQuestions().forEach((question) =>
        question.setCustomQuestionSessionState({ wasQuestionAlreadyAnswered: false })
      );
    });

    this._advisor.onGlobalEvent("QAFlowEvaluatorDrivenQAFlowEngine.finishRestart:afterActionSession", () => {
      this._sendTrackingEvent(new StepEvent(this._advisor, this._productsList));
    });

    this._advisor.onGlobalEvent("AdvisorNavigationModel.back:before", () => {
      this._sendTrackingEvent(new BackEvent(this._advisor));
    });

    this._advisor.onGlobalEvent("AdvisorNavigationModel.next:before", () => {
      this._sendNextEvent();
    });

    this._advisor.onGlobalEvent("steps-navigation", (event: any) => {
      if (event.eventData.allowed) {
        switch (event.eventData.origin) {
          case "next":
            this._sendTrackingEvent(new StepEvent(this._advisor, this._productsList));
            break;
          case "back":
            this._sendTrackingEvent(new StepEvent(this._advisor, this._productsList));
            break;
          case "go-to-step":
            this._sendTrackingEvent(new StepEvent(this._advisor, this._productsList));
            break;
        }
      }
    });

    this._advisor.onGlobalEvent("AnswerModel.select:afterActionSession", ({ eventData }) => {
      if (eventData && this._advisor.qaFlow.belongsToQuestionnaire(eventData.question)) {
        this._sendTrackingEvent(new AdviceEvent(this._advisor, this._getAdviceObject(eventData)));
        if (eventData.question) {
          eventData.question.setCustomQuestionSessionState({ wasQuestionAlreadyAnswered: true });
        }
      }
    });

    this._advisor.onGlobalEvent("AnswerModel.toggleSelection:afterActionSession", ({ eventData }) => {
      if (eventData && this._advisor.qaFlow.belongsToQuestionnaire(eventData.question)) {
        this._sendTrackingEvent(new AdviceEvent(this._advisor, this._getAdviceObject(eventData)));
        if (eventData.question) {
          eventData.question.setCustomQuestionSessionState({ wasQuestionAlreadyAnswered: true });
        }
      }
    });

    this._advisor.onGlobalEvent("RecommendationModel.setNewRecommendation:afterActionSession", () => {
      const { advice } = this._advisor;

      /* TODO currently hardcoded results event only on results-section:
       * it should be dependent on the components configuration or layout of the advisor
       * (if results are also in questionnaire mode, they want to have results event there as well) */
      if (this._isResultsSection() && advice && advice.hasAdvice && advice.currentPage && !this.isResultsEventSent) {
        const allProductsFromCurrentPage = advice.currentPage.clusters.reduce((accumulator, currentCluster) => {
          return [...accumulator, ...currentCluster.products];
        }, []);
        const allSelectedAnswers = this._getAllChoiceAnswers().filter((answer) => answer.selected);

        this._sendTrackingEvent(
          new ResultsEvent(
            this._advisor,
            this._getProductsListObject(allProductsFromCurrentPage),
            this._getAdviceListObject(allSelectedAnswers)
          )
        );
        this.isResultsEventSent = true;
      }
    });

    this._advisor.onGlobalEvent("AdvisorNavigationModel.goToNextSection:beforeActionSession", () => {
      if (this._isNextSectionResultsSection()) {
        this._sendNextEvent();
      }
    });

    this._advisor.onGlobalEvent("AdvisorNavigationModel.goToPreviousSection:beforeActionSession", () => {
      if (this._advisor.advisorNavigation.currentSection.type === SectionType.RESULTS_PAGE) {
        this._sendTrackingEvent(new BackEvent(this._advisor));
        //  this._sendTrackingEvent(new StepEvent(this._advisor, this._productsList));
      }
    });

    this._advisor.onGlobalEvent("AdvisorNavigationModel.reduceSectionIndex:after", () => {
      if (this._advisor.advisorNavigation.currentSection.type === SectionType.QUESTIONNAIRE) {
        this._sendTrackingEvent(new StepEvent(this._advisor, this._productsList));
      }
    });

    // TODO add compare events according to specification as soon as comparison is implemented
  }

  private _getAdviceListObject(answersToConsider: ReadonlyArray<Answer>): ReadonlyArray<AdviceObject> {
    return answersToConsider.map((answer) => this._getAdviceObject(answer));
  }

  private _getAllQuestions(): ReadonlyArray<Question> {
    return this._advisor.flowStepsNavigation.flowSteps.reduce(
      (accumulatedQuestions, currentFlowStep) => [...accumulatedQuestions, ...(currentFlowStep.questions || [])],
      []
    );
  }

  private _getAllChoiceAnswers(): ReadonlyArray<Answer> {
    return this._getAllQuestions()
      .filter((question) => QuestionTypeChecker.isChoiceQuestion(question))
      .reduce(
        (accumulatedAnswers, currentQuestion: ChoiceQuestion) => [
          ...accumulatedAnswers,
          ...(currentQuestion.answers || []),
        ],
        []
      );
  }

  private _getAdviceObject(answer: Answer): AdviceObject {
    return {
      question_id: answer.question.aid.toString(),
      question_text: answer.question.questionText,
      question_step: this._getStepNumberOfCurrentAnswer(answer).toString(),
      answer_id: answer.aid.toString(),
      answer_text: answer.answerText,
      is_first_time:
        answer.question.customQuestionSessionState === null ||
        answer.question.customQuestionSessionState.wasQuestionAlreadyAnswered !== true,
    };
  }

  private _getStepNumberOfCurrentAnswer(answer: Answer): number {
    const { flowSteps } = this._advisor.flowStepsNavigation;
    for (let i = 0, flowStepsLength = flowSteps.length; i < flowStepsLength; i++) {
      if (flowSteps[i].questions[0].aid === answer.question.aid) return i + 1;
    }
    return -1;
  }

  private _isResultsSection(): boolean {
    return this._advisor.advisorNavigation.currentSection.type === SectionType.RESULTS_PAGE;
  }

  private _isNextSectionResultsSection(): boolean {
    return this._advisor.advisorNavigation.nextSectionType === SectionType.RESULTS_PAGE;
  }

  private _sendNextEvent(): void {
    const currentQuestion = this._advisor.flowStepsNavigation.currentFlowStep.questions[0] as ChoiceQuestion;
    if (currentQuestion && currentQuestion.answers) {
      const selectedAnswers = currentQuestion.answers.filter((answer) => answer.selected);
      this._sendTrackingEvent(new NextEvent(this._advisor, this._getAdviceListObject(selectedAnswers)));
    }
  }

  private _getOneProductObject(product: ProductRecommendation): ProductObject {
    const price =
      product.price && product.price.rawValue && product.price.rawValue.value
        ? product.price.rawValue.value.toString()
        : this._defaultValue;
    const reviewCount = this._findPropertyByName(product.properties, ProductAttributes.RATING_COUNT);
    const reviewAverage = this._findPropertyByName(product.properties, ProductAttributes.RATING_AVERAGE);
    const stockStatus = this._findPropertyByName(product.properties, ProductAttributes.STOCK_STATUS);
    const badgeText = this._findPropertyByName(product.properties, ProductAttributes.BADGE_TEXT);
    const badgeTheme = this._findPropertyByName(product.properties, ProductAttributes.BADGE_THEME);

    return {
      // @ts-ignore
      sku: product.sku,
      name: product.name,
      url: product.offerUrl,
      price,
      currency: this._advisor.localizationSettings.currencyCode || "$",
      review_count: reviewCount.rawValue.value ? reviewCount.rawValue.value.toString() : this._defaultValue,
      review_average: reviewAverage.rawValue.value ? reviewAverage.rawValue.value.toString() : this._defaultValue,
      stock_status: stockStatus.rawValue.value ? stockStatus.rawValue.value.toString() : this._defaultValue,
      badge: {
        text: badgeText.rawValue.value ? badgeText.rawValue.value.toString() : this._defaultValue,
        theme: badgeTheme.rawValue.value ? badgeTheme.rawValue.value.toString() : this._defaultValue,
      },
    };
  }

  private _getProductsListObject(products: ReadonlyArray<ProductRecommendation>): ReadonlyArray<ProductObject> {
    return products.map((product) => {
      return this._getOneProductObject(product);
    });
  }

  private _findPropertyByName(properties: ReadonlyArray<ProductProperty>, name: string): ProductProperty {
    return properties.find((property) => property.name === name);
  }

  private _sendTrackingEvent(event) {
    this.isResultsEventSent = false;
    if (this._debug) console.log(event);

    this._updateEventsList(event);

    const windowObject = window as any;

    if (!windowObject._satellite) {
      if (this._debug) {
        this._advisor.setCustomSessionState({ isAdvisorStart: false });
      }
      return;
    }

    if (windowObject._satellite.initialized) {
      windowObject._satellite.track("saEvent");
      this._advisor.setCustomSessionState({ isAdvisorStart: false });
    }
  }

  private _updateEventsList(event) {
    const windowObject = window as any;
    windowObject.dataLayer.zoovuData.smartAssistant.events.unshift(event);
    if (this._debug) console.log(windowObject.dataLayer.zoovuData.smartAssistant.events);
  }
}
