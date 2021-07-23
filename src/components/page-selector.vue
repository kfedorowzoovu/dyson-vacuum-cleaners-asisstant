<template>
  <div :class="[rootElementClass, componentStyle.container]">
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

      <span class="page-number" :class="{ 'results-header': isResultPage }">
        <template v-if="!isResultPage">
          <span class="hidden-description">{{
              `Step: ${currentNavigation.currentStepIndex + 1} of ${currentNavigation.numberOfAvailableSteps}`
            }}</span>
          <span aria-hidden="true">{{ currentNavigation.currentStepIndex + 1 }}</span> /
          <span aria-hidden="true">{{ currentNavigation.numberOfAvailableSteps }}</span>
        </template>
        <template v-else>{{ $t("message-results-mode-button") }}</template>
      </span>
      <component :is="startOverButtonView" v-if="!isFirstStep" class="navigation-button" :advisor="advisor" />
    </div>

    <div v-if="currentNavigation.numberOfAvailableSteps > 1" class="page-selector__progress-bar">
      <button
        v-for="(n, index) in currentNavigation.numberOfAvailableSteps"
        :key="n"
        :class="{
          'is-selected': currentNavigation.currentStepIndex === index,
          visited: index <= currentNavigation.currentStepIndex,
        }"
        class="page-selector"
        :data-step="currentNavigation.currentStepIndex"
        :data-index="index"
        type="button"
        @click="goTo(index)"
      >
        <span class="hidden-description">{{hiddenDescription(currentNavigation, index)}}</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  SectionType,
  InjectComponent,
  VueComponent,
  QAFlowStepsNavigation
} from "@zoovu/runner-browser-api";
import { PageSelectorView } from "@zoovu/runner-web-design-base";
import { IconChevronLeft } from "@/components/svgs";

@Component({
  name: "PageSelectorView",
  components: {
    IconChevronLeft,
  },
  mixins: [PageSelectorView],
})
export default class PageSelectorViewExtended extends Vue {
  @InjectComponent("StartOverButtonView")
  startOverButtonView: VueComponent;

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

  onClickBack(): void {
    this.navigation.back();
  }

  get isResultPage(): boolean {
    return this.advisor.advisorNavigation.currentSection.type === SectionType.RESULTS_PAGE;
  }

  get isFirstStep(): boolean {
    return this.advisor.flowStepsNavigation.currentStepIndex === 0;
  }

  hiddenDescription = (
    navigation: QAFlowStepsNavigation,
    stepNumber: number
  ): string => {
    const currentStepIndex = stepNumber + 1;
    if (stepNumber < navigation.currentStepIndex) {
      return `Completed: Step ${currentStepIndex}: ${navigation.flowSteps[stepNumber].stepHeadline}`;
    }
    if (stepNumber === navigation.currentStepIndex) {
      return `Current: Step ${currentStepIndex}: ${navigation.flowSteps[stepNumber].stepHeadline}`;
    }
    return `Not Completed: Step ${currentStepIndex}: ${navigation.flowSteps[stepNumber].stepHeadline}`;
  };
}
</script>
