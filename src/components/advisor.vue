<template>
  <div :id="advisor.mid" :class="componentStyle.container">
    <component :is="questionnaireView" :advisor="advisor" />
    <component :is="resultsSectionView" :advisor="advisor" />
    <component :is="comparisonView" :comparison-manager="advisor.comparisonManager" />
  </div>
</template>

<script lang="ts">
import {
  Component,
  ComponentConfig,
  ComponentStyle,
  ComponentStyleDefinition,
  InjectComponent,
} from "@zoovu/runner-browser-api";
import {
  AdvisorView as AdvisorViewBase,
  AnimationsAndTransitionsConfiguration,
  ColorsConfiguration,
  CustomCSSConfiguration,
  FontsConfiguration,
  ProductButtonConfiguration,
  StandardTextsConfiguration,
  TopProductConfiguration,
} from "@zoovu/runner-web-design-base";

@Component
export default class AdvisorView extends AdvisorViewBase {
  @ComponentStyle()
  componentStyle!: ComponentStyleDefinition;

  @ComponentConfig(ColorsConfiguration)
  colors!: ColorsConfiguration;

  @ComponentConfig(FontsConfiguration)
  fonts!: FontsConfiguration;

  @ComponentConfig(StandardTextsConfiguration)
  standardTexts!: StandardTextsConfiguration;

  @ComponentConfig(CustomCSSConfiguration)
  customCssConfiguration!: CustomCSSConfiguration;

  @ComponentConfig(TopProductConfiguration)
  topProductConfiguration!: TopProductConfiguration;

  @ComponentConfig(ProductButtonConfiguration)
  productButtonConfiguration!: ProductButtonConfiguration;

  @ComponentConfig(AnimationsAndTransitionsConfiguration)
  animationsAndTransitionsConfiguration!: AnimationsAndTransitionsConfiguration;
}
</script>
