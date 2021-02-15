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

  @ComponentConfig(CustomCSSConfiguration)
  customCSSConfiguration: CustomCSSConfiguration;

  @ComponentConfig(TopProductConfiguration)
  topProductConfiguration: TopProductConfiguration;

  mounted() {
    this.$root.componentsConfiguration.productRating.showProductRating.enabled = true;
    this.$root.componentsConfiguration.productRating.showProductRating.rating = {
      attribute: {
        name: "ratings",
      },
    };

    this.$root.componentsConfiguration.productRating.showProductRating.reviews = {
      enabled: true,
      attribute: {
        name: "reviews",
      },
    };
    this.$root.componentsConfiguration.productButtonConfiguration.showAddToCartButton.enabled = true;
  }
}
</script>
