import { Advisor, SectionType } from "@zoovu/runner-browser-api";
import { AdviceObject, EventObject, ProductObject } from "../tracking-objects";

export class BaseEvent implements EventObject {
  public name: string;

  public step_name: string;

  public step_number: string;

  public is_advisor_start: boolean;

  public is_first_step: boolean;

  public is_configurator: boolean;

  public advice?: AdviceObject;

  public adviceList?: ReadonlyArray<AdviceObject>;

  public answers?: ReadonlyArray<AdviceObject>;

  public product?: ProductObject;

  public productsList?: ReadonlyArray<ProductObject>;

  constructor(advisor: Advisor, eventName: string) {
    this.name = eventName;
    this.step_name = this._getCurrentStepName(advisor);
    this.step_number = this._getCurrentStepNumber(advisor).toString();
    this.is_first_step = advisor.flowStepsNavigation.currentStepIndex === 0;
    this.is_advisor_start = advisor.customSessionState === null || advisor.customSessionState.isAdvisorStart === true;
    this.is_configurator = false;
  }

  private _getCurrentStepName(advisor: Advisor): string {
    const firstQuestionFromStep = advisor.flowStepsNavigation.currentFlowStep.questions[0];
    if (this._isResultsSection(advisor.advisorNavigation.currentSection.type)) {
      return "Results";
    }
    return firstQuestionFromStep && firstQuestionFromStep.purpose ? firstQuestionFromStep.purpose : "n/a";
  }

  private _getCurrentStepNumber(advisor: Advisor): number {
    // step number is not zero based, thats why we need + 1
    if (this._isResultsSection(advisor.advisorNavigation.currentSection.type)) {
      return advisor.flowStepsNavigation.currentStepIndex + 2;
    }
    return advisor.flowStepsNavigation.currentStepIndex + 1;
  }

  private _isResultsSection(currentSectionType: SectionType): boolean {
    return currentSectionType === SectionType.RESULTS_PAGE;
  }
}
