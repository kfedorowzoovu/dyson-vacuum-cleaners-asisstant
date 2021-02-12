<template>
  <div :class="[rootElementClass, componentStyle.container]">
    <div class="page-selector">
      <span>{{ currentNavigation.currentStepIndex + 1 }} / {{ currentNavigation.numberOfAvailableSteps }}</span>
    </div>
    <div class="progress-bar">
      <div class="progress" :style="{ width: progressWidth }" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  QAFlowStepsNavigation,
  Emit,
  AdvisorNavigation,
  SectionType,
} from "@zoovu/runner-browser-api";
import { PageSelectorView } from "@zoovu/runner-web-design-base";

@Component()
export default class PageSelectorViewExtended extends PageSelectorView {
  @Prop()
  private navigation!: AdvisorNavigation;

  @Prop({ default: false })
  private showHeadline!: boolean;

  public goTo(stepIndex: number) {
    this.navigation.currentSection.type == SectionType.RESULTS_PAGE && this.navigation.back();
    this.currentNavigation.goToStep(stepIndex);
  }

  @Emit("navigation-allowed")
  public onNavigationAllowed() {}

  get rootElementClass(): string {
    return "page-selector-wrapper";
  }

  get shouldShowHeadline(): boolean {
    return this.showHeadline;
  }

  get shouldShowPageNumbers(): boolean {
    return !this.shouldShowHeadline;
  }

  get shouldShowQuestionPurpose(): boolean {
    return this.componentConfiguration.showQuestionPurpose == true && !this.shouldShowHeadline;
  }

  get advisorNavigation() {
    return this.$root.componentViewModel.advisorNavigation;
  }

  get currentStepNumber(): number {
    return this.flowStepsNavigation.currentStepIndex + 1;
  }

  get numberOfSteps(): number {
    return this.flowStepsNavigation.numberOfAvailableSteps;
  }

  get progressWidth(): string {
    if (this.advisorNavigation.currentSection.type === SectionType.QUESTIONNAIRE) {
      return `${(this.currentStepNumber * 100) / this.numberOfSteps}%`;
    }
    return "100%";
  }

  get currentNavigation(): QAFlowStepsNavigation {
    return this.navigation.sections.find((section) => section.type === "QUESTIONNAIRE")
      .navigation as QAFlowStepsNavigation;
  }
}
</script>
