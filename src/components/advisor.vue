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
  AdvisorView as BaseAdvisorView,
  ColorsConfiguration,
  TopProductConfiguration,
  FontsConfiguration,
  CustomCSSConfiguration,
} from "@zoovu/runner-web-design-base";
import CustomizedStandardTextsConfiguration from "../configuration/customized-standard-texts";
import CustomizedRatingConfiguration from "../configuration/customized-rating-configuration";
import CustomizedProductButtonConfiguration from "../configuration/customized-button-configuration";

@Component({})
export default class AdvisorView extends BaseAdvisorView {
  @ComponentStyle()
  componentStyle: ComponentStyleDefinition;

  @ComponentConfig(ColorsConfiguration)
  colors: ColorsConfiguration;

  @ComponentConfig(FontsConfiguration)
  fonts: FontsConfiguration;

  @ComponentConfig(CustomizedStandardTextsConfiguration)
  standardTexts: CustomizedStandardTextsConfiguration;

  @ComponentConfig(CustomizedRatingConfiguration)
  productRating: CustomizedRatingConfiguration;

  @ComponentConfig(CustomizedProductButtonConfiguration)
  productButtonConfiguration: CustomizedProductButtonConfiguration;

  @ComponentConfig(CustomCSSConfiguration)
  customCSSConfiguration: CustomCSSConfiguration;

  @ComponentConfig(TopProductConfiguration)
  topProductConfiguration: TopProductConfiguration;

  mounted(): void {
    /* append klarna widget script for local dev only,
    otherwise use version from client's website
    since klarna version & credentials may change in the future without notice */
    if (window.location.origin.indexOf("localhost")) this.appendKlarnaScript();
  }

  appendKlarnaScript(): void {
    const script = document.createElement("script");
    script.setAttribute("client-id", "e8f4b540-4ca3-5a94-8bd0-5424a217d713");
    script.src = "https://eu-library.klarnaservices.com/lib.js";
    script.async = true;
    document.head.appendChild(script);
  }
}
</script>
<style>
@import url("../styles/partials/custom-fonts.css");
</style>
