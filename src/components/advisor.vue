<template>
  <div :id="advisor.mid" :class="[componentStyle.container]">
    <component
      :is="questionnaireView"
      :advisor="advisor"
      :show-page-selector-between-navigation-buttons="false"
      :show-page-selector-above-main-section="true"
    />
    <component :is="resultsSectionView" :advisor="advisor" :show-top-product="true" :show-page-selector="true" />
    <component :is="comparisonView" :comparison-manager="advisor.comparisonManager" />
    <component :is="pdfContentView" v-if="isPdfMarkupShown" v-show="false" :advisor="advisor" />
  </div>
</template>

<script lang="ts">
import { ComponentConfig, Component, ComponentStyle, ComponentStyleDefinition } from "@zoovu/runner-browser-api";
import {
  AdvisorView,
  ColorsConfiguration,
  TopProductConfiguration,
  FontsConfiguration,
  CustomCSSConfiguration,
} from "@zoovu/runner-web-design-base";
import CustomizedStandardTextsConfiguration from "../configuration/customized-standard-texts";

@Component({})
export default class AdvisorViewExtended extends AdvisorView {
  @ComponentStyle()
  componentStyle: ComponentStyleDefinition;

  @ComponentConfig(ColorsConfiguration)
  colors: ColorsConfiguration;

  @ComponentConfig(FontsConfiguration)
  fonts: FontsConfiguration;

  @ComponentConfig(CustomizedStandardTextsConfiguration)
  standardTexts: CustomizedStandardTextsConfiguration;

  @ComponentConfig(CustomCSSConfiguration)
  customCSSConfiguration: CustomCSSConfiguration;

  @ComponentConfig(TopProductConfiguration)
  topProductConfiguration: TopProductConfiguration;
}
</script>
