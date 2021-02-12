<template>
  <div class="questionnaire-wrapper" :class="componentStyle.container">
    <component
      :is="advisorSectionView"
      :advisor="advisor"
      :section-type="SectionType.QUESTIONNAIRE"
      :root-element-class="rootElementClass"
      :show-page-selector-between-navigation-buttons="showPageSelectorBetweenNavigationButtons"
      :show-page-selector-above-main-section="showPageSelectorAboveMainSection"
    >
      <template slot="main-content">
        <component
          :is="pageView"
          :flow-step="navigation.currentFlowStep"
          :show-headline="navigation.currentFlowStep.type === 'LEAD'"
          :last-flow-step="lastFlowStep"
        />
      </template>

      <template slot="footer">
        <component :is="adviceView" :advice="advisor.advice" :section-type="SectionType.QUESTIONNAIRE" />
        <component :is="brandingView" />
      </template>
    </component>
  </div>
</template>

<script lang="ts">
import { Component } from "@zoovu/runner-browser-api";
import { QuestionnaireView as QuestionnaireViewBase } from "@zoovu/runner-web-design-base";

@Component
export default class QuestionnaireView extends QuestionnaireViewBase {
}
</script>
