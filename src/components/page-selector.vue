<template>
  <nav :class="[rootElementClass, componentStyle.container]">
    <div class="page-selector__page-info">
      <button
        v-if="!isFirstStep"
        type="button"
        class="navigation-button"
        :class="previousButtonClassList"
        @click="onClickBack"
      >
        <IconChevronLeft /> {{ $t("message-questionnaire-back") }}
      </button>

      <h1 class="page-number" :class="{ 'results-header': isResultPage }" tabindex="-1" aria-hidden="true">
        <template v-if="!isResultPage">
          <span class="hidden-description">{{ currentStepInfo }}</span>
          <span aria-hidden="true">{{ currentStep }} / {{ currentNavigation.numberOfAvailableSteps }}</span>
        </template>
        <template v-else>{{ $t("message-results-mode-button") }}</template>
      </h1>
      <component :is="startOverButtonView" v-if="!isFirstStep" class="navigation-button" :advisor="advisor" />
    </div>

    <div v-if="currentNavigation.numberOfAvailableSteps > 1" class="page-selector__progress-bar">
      <progress :max="currentNavigation.numberOfAvailableSteps" :value="currentStep" class="page-selector" />
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, SectionType, InjectComponent, VueComponent } from "@zoovu/runner-browser-api";
import { PageSelectorView as PageSelectorViewBase } from "@zoovu/runner-web-design-base";
import { IconChevronLeft } from "@/components/svgs";

@Component({
  components: {
    IconChevronLeft,
  },
})
export default class PageSelectorView extends PageSelectorViewBase {
  @InjectComponent("StartOverButtonView")
  startOverButtonView!: VueComponent;

  get previousButtonClassList(): ReadonlyArray<Record<string, unknown>> {
    return [
      {
        "is-hidden": !this.navigation.hasPrevious,
      },
    ];
  }

  get advisor() {
    return this.$root.componentViewModel;
  }

  get isResultPage(): boolean {
    return this.advisor.advisorNavigation.currentSection.type === SectionType.RESULTS_PAGE;
  }

  get isFirstStep(): boolean {
    return this.advisor.flowStepsNavigation.currentStepIndex === 0;
  }

  get currentStepInfo(): string {
    const { currentNavigation } = this;
    return this.$t("message-ada-question-number-with-text", {
      currentStep: this.currentStep,
      allSteps: currentNavigation.numberOfAvailableSteps,
      questionText: currentNavigation.flowSteps[currentNavigation.currentStepIndex].questions[0].questionText,
    });
  }

  get currentStep(): number {
    return this.currentNavigation.currentStepIndex + 1;
  }

  onClickBack(): void {
    this.navigation.back();
  }

  stepButtonClassList(index: number): Record<string, boolean> {
    const { currentStepIndex } = this.currentNavigation;
    return {
      "is-selected": currentStepIndex === index,
      visited: index <= currentStepIndex,
    };
  }
}
</script>
