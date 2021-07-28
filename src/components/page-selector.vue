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
            $t('message-ada-question-number', {
                    currentStep: currentNavigation.currentStepIndex + 1,
                    allSteps: currentNavigation.numberOfAvailableSteps,
                })
          }}</span>
          <span aria-hidden="true">{{ currentNavigation.currentStepIndex + 1 }}</span> /
          <span aria-hidden="true">{{ currentNavigation.numberOfAvailableSteps }}</span>
        </template>
        <template v-else>{{ $t("message-results-mode-button") }}</template>
      </span>
      <component :is="startOverButtonView" v-if="!isFirstStep" class="navigation-button" :advisor="advisor" />
    </div>

    <div v-if="currentNavigation.numberOfAvailableSteps > 1" class="page-selector__progress-bar">
      <template v-for="(n, index) in currentNavigation.numberOfAvailableSteps">
        <button
          v-if="currentNavigation.currentStepIndex === index && !isResultPage"
          :key="n"
          :class="stepButtonClassList(index)"
          class="page-selector"
        >
          <span class="hidden-description">{{
           $t('message-ada-question-number-with-text', {
                currentStep: index + 1,
                allSteps: currentNavigation.numberOfAvailableSteps,
                questionText: currentNavigation.flowSteps[index].stepHeadline
              })
            }}</span>
        </button>
        <span
          v-else
          :key="n"
          :class="stepButtonClassList(index)"
          class="page-selector"
        >
        </span>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component,
  SectionType,
  InjectComponent,
  VueComponent,
} from "@zoovu/runner-browser-api";
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

  onClickBack(): void {
    this.navigation.back();
  }

  stepButtonClassList(index: number): Record<string, boolean> {
    const { currentStepIndex } = this.currentNavigation;
    return {
      'is-selected': currentStepIndex === index,
      visited: index <= currentStepIndex,
    }
  }
}
</script>
