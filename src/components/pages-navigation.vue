<template>
  <div :class="[rootElementClass, componentStyle.container]" :key="isResultsSectionNext">
    <!-- info: key is necessary because of some strange approach within sections -->
    <!-- instead of rendering something in HTML it is changed to :key to force re-render of component -->
    <button
      v-if="!shouldRenderSubmitButton"
      :class="nextButtonClassList"
      class="navigation-next-button"
      :style="nextButtonStyle"
      @click="onClickNext"
      type="button"
    >
      {{ isResultsSectionNext ? $t('message-results-mode-button') : $t('message-questionnaire-next') }}
      <span class="hidden-description">{{hiddenDescription()}}</span>
    </button>
    <button
      v-else
      class="navigation-submit-button"
      @click="onClickSubmit"
      type="button"
      v-dompurify-html="$t('message-questionnaire-submit')"
    ></button>
  </div>
</template>

<script lang="ts">
import {
  AdvisorNavigation,
  Component,
  ComponentConfig,
  FileUploadQuestion,
  FlowStep,
  FlowStepSubmitStatus,
  FlowStepType,
  InjectComponent,
  Navigation,
  Prop,
  QAFlowStepsNavigation,
  QuestionType,
  SectionType,
  Vue,
  VueComponent,
} from "@zoovu/runner-browser-api";
import { AnswersConfiguration, PagesNavigationView as PagesNavigationViewBase, PagesNavigationAction } from "@zoovu/runner-web-design-base";
import { scrollToElement } from "./utils";
import { isScrollingDisabledThroughDataAttribute } from "@zoovu/runner-web-design-base/src/plugins/data-attributes-reader/webdesign-context";

@Component
export default class PagesNavigationView extends PagesNavigationViewBase {
  @InjectComponent("PageSelectorView")
  pageSelectorView!: VueComponent;

  @ComponentConfig(AnswersConfiguration)
  answersConfiguration!: AnswersConfiguration;

  @Prop()
  navigation!: AdvisorNavigation;

  @Prop({ default: true })
  showPageSelector!: boolean;

  pagesNavigationAction = PagesNavigationAction;

  currentAction!: PagesNavigationAction | null;

  fileUploadQuestionsCount = 0;

  get rootElementClass(): string {
    return "pages-navigation-wrapper";
  }

  get previousButtonClassList(): ReadonlyArray<Record<string, unknown>> {
    return [
      {
        "is-hidden": !this.navigation.hasPrevious,
      },
    ];
  }

  get previousButtonStyle(): Record<string, unknown> | null {
    return !this.navigation.hasPrevious ? { visibility: "hidden" } : null;
  }

  get currentNavigation(): QAFlowStepsNavigation {
    return this.navigation.currentSection.navigation as QAFlowStepsNavigation
  }

  get nextStepIndex(): number {
    return this.currentNavigation.currentStepIndex + 1;
  }

  get nextButtonIsHidden(): boolean {
    return (
      !this.navigation.hasNext ||
      (this.isResultsSectionNext && (this.submitIsInProgress || this.wouldNotPassValidation))
    );
  }

  get buttonDisabled(): boolean {
    return this.currentFlowStep.questions.some((q) => q.isMandatory && q.isUnanswered);
  }

  get nextButtonClassList(): ReadonlyArray<string | Record<string, unknown>> {
    return [
      this.navigation.isFetching ? "navigation-next-in-progress" : "",
      {
        "is-hidden": this.nextButtonIsHidden,
      },
      {
        "is-disabled": this.buttonDisabled,
      },
    ];
  }

  get nextButtonStyle(): Record<string, unknown> | null {
    return this.nextButtonIsHidden ? { display: "none" } : null;
  }

  get shouldRenderSubmitButton(): boolean {
    if (this.isQaFlowStepsNavigation(this.currentSectionNavigation)) {
      return (
        !this.currentSectionNavigation.hasNext &&
        this.currentFlowStep.type === FlowStepType.LEAD &&
        this.currentFlowStep.submitStatus === FlowStepSubmitStatus.NOT_SUBMITTED &&
        !this.currentFlowStep.questions[0].readOnly &&
        this.currentFlowStep.questions.some((q) => q.isMandatory || !q.isUnanswered)
      );
    }
    return false;
  }

  get submitIsInProgress(): boolean {
    if (this.isQaFlowStepsNavigation(this.currentSectionNavigation)) {
      return this.currentFlowStep.submitStatus === FlowStepSubmitStatus.SUBMIT_IN_PROGRESS;
    } else {
      return false;
    }
  }

  get wouldNotPassValidation(): boolean {
    if (this.isQaFlowStepsNavigation(this.currentSectionNavigation)) {
      return this.currentFlowStep.wouldNotPassValidation;
    } else {
      return false;
    }
  }

  get isQuestionnaire(): boolean {
    return this.navigation.currentSection.type === SectionType.QUESTIONNAIRE;
  }

  get isResultsSectionNext(): boolean {
    return (
      this.isQuestionnaire &&
      !this.currentSectionNavigation.hasNext &&
      this.navigation.nextSectionType === SectionType.RESULTS_PAGE &&
      this.isResultSectionNextForDynamicFlow()
    );
  }

  get currentSectionNavigation(): Navigation {
    return this.navigation.currentSection.navigation;
  }

  get currentFlowStep(): FlowStep {
    return this.currentSectionNavigation.currentFlowStep;
  }

  get answeredFileUploadQuestions(): ReadonlyArray<FileUploadQuestion> {
    return this.currentFlowStep.questions.filter(
      (question) => question.questionType === QuestionType.FILE_UPLOAD && !question.isUnanswered
    );
  }

  onClickBack(): void {
    this.navigation.back();
    this.scrollToTop();
  }

  onClickNext(): void {
    this.currentAction = PagesNavigationAction.NEXT;
    this.onClickAction();
  }

  onClickSubmit(): void {
    this.currentAction = PagesNavigationAction.SUBMIT;
    this.onClickAction();
  }

  onClickAction(): void {
    if (!this.currentAction) {
      return;
    }

    if (!this.leadGenHasFilesToBeUploaded()) {
      this.triggerAction();
    } else {
      this.handleFileUpload();
    }
  }

  onClickRealSubmit(): void {
    if (this.isQaFlowStepsNavigation(this.currentSectionNavigation)) {
      this.currentSectionNavigation.finished();
    }
  }

  onClickRealNext(): void {
    if (this.navigation.isFetching) {
      return;
    }
    this.navigation.next();
    this.scrollToTop();
  }

  mounted() {
    this.$root.$on("files-uploaded", () => {
      this.fileUploadQuestionsCount -= 1;
      if (!this.fileUploadQuestionsCount) {
        this.triggerAction();
      }
    });
  }

  hiddenDescription(): string {
    const currentStepIndex = this.nextStepIndex + 1;

    if (this.isResultsSectionNext) {
      return `Button which leads to Results page`;
    } else {
      return `Button ${this.buttonDisabled ? "Disabled" : ""} which leads to question ${currentStepIndex} ${this.currentNavigation.flowSteps[this.nextStepIndex].stepHeadline}`;
    }
  };

  triggerAction(): void {
    if (this.currentAction === PagesNavigationAction.SUBMIT) {
      this.onClickRealSubmit();
    } else if (this.currentAction === PagesNavigationAction.NEXT) {
      this.onClickRealNext();
    }
  }

  leadGenHasFilesToBeUploaded(): boolean {
    return this.answeredFileUploadQuestions.some(
      (question) => question.selectedFiles.length > 0 && !question.fileUrls.length
    );
  }

  handleFileUpload(): void {
    this.answeredFileUploadQuestions.forEach((question) => {
      this.fileUploadQuestionsCount += 1;
      question.uploadSelectedFiles();
    });
  }

  async scrollToTop(): Promise<void> {
    if (!this.$root.$el || !this.answersConfiguration.scrollToTop || isScrollingDisabledThroughDataAttribute) return;

    await this.$nextTick();

    const leadGen = this.$root.$el.querySelector(".multi-answer");
    const errorMessage = this.$root.$el.querySelector(".question-validation-message");
    scrollToElement(((leadGen && errorMessage) as Element) || (this.$root.$el as Element));
  }

  isQaFlowStepsNavigation(navigation): navigation is QAFlowStepsNavigation {
    return (<QAFlowStepsNavigation>navigation).finished !== undefined;
  }

  isResultSectionNextForDynamicFlow(): boolean {
    if (
      this.isQaFlowStepsNavigation(this.currentSectionNavigation) &&
      this.currentSectionNavigation.flowSteps[this.currentSectionNavigation.currentStepIndex].type ===
        FlowStepType.DYNAMIC_BOX
    ) {
      const currentIndex = this.currentSectionNavigation.currentStepIndex;
      return (
        this.currentSectionNavigation.flowSteps[currentIndex].type === FlowStepType.DYNAMIC_BOX &&
        this.currentFlowStep &&
        this.currentFlowStep.isLastDynamicFlowStep
      );
    }
    return true;
  }
}
</script>
