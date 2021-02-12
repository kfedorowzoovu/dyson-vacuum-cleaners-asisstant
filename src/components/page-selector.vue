<template>
  <div :class="[rootElementClass, componentStyle.container]">
    <div class="page-selector__page-info">
      <component
        :is="startOverButtonView"
        v-if="!isFirstStep && isResultPage"
        class="navigation-button"
        :advisor="advisor"
      />
      <button
        v-else
        type="button"
        class="navigation-button"
        :class="previousButtonClassList"
        @click="onClickBack"
        v-dompurify-html="$t('message-questionnaire-back')"
      />

      <span class="page-number">
        <template v-if="currentNavigation.currentStepIndex + 1 !== currentNavigation.numberOfAvailableSteps">
          <b>{{ currentNavigation.currentStepIndex + 1 }}</b> / <b>{{ currentNavigation.numberOfAvailableSteps }}</b>
        </template>
        <template v-else>{{ $t("message-results-mode-button") }}</template>
      </span>
    </div>
    <div class="page-selector__progress-bar" v-if="currentNavigation.numberOfAvailableSteps > 1">
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
        <section>
          <span></span>
        </section>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, SectionType, InjectComponent, VueComponent } from "@zoovu/runner-browser-api";
import { PageSelectorView } from "@zoovu/runner-web-design-base";

@Component({
  name: "PageSelectorView",
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
}
</script>
