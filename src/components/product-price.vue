<template>
  <div class="product-price">
    <template v-if="showComplementaryTexts">
      <component
        v-for="complementaryText in complementaryTextsBefore"
        :is="productPriceComplementaryTextView"
        :key="complementaryText.placement"
        class="price-additional-text"
        :class="complementaryText.classList"
        :static-text="complementaryText.staticText"
        :column-text="complementaryText.columnText"
      />
    </template>
    <span v-if="pricing.showWasPrice && pricing.reducedPrice !== 'n/a'" class="price-was">
      {{ $t("message-price-was") }} {{ pricing.originalPrice }}
    </span>
    <span class="price-current">
      {{
        pricing.reducedPrice !== "n/a"
          ? pricing.showWasPrice
            ? pricing.reducedPrice
            : pricing.originalPrice
          : pricing.originalPrice
      }}
    </span>
    <span v-if="pricing.showWasPrice && pricing.reducedPrice !== 'n/a'" class="price-savings">
      {{ $t("message-price-now") }} {{ pricing.savings }}

    </span>
    <template v-if="showComplementaryTexts">
      <component
        :is="productPriceComplementaryTextView"
        v-for="complementaryText in complementaryTextsAfter"
        :key="complementaryText.placement"
        class="price-additional-text"
        :class="complementaryText.classList"
        :static-text="complementaryText.staticText"
        :column-text="complementaryText.columnText"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { AdvisorLocalizationSettingsDefinition, Component } from "@zoovu/runner-browser-api";
import { ProductPriceView } from "@zoovu/runner-web-design-base";
import { formatPrice, getPropertyValue } from "@/helpers";
import { ProductAttributes } from "@/configuration/common-configuration";

@Component({})
export default class ProductPriceViewExtended extends ProductPriceView {
  get localizationSettings(): AdvisorLocalizationSettingsDefinition {
    return this.$root.componentViewModel.localizationSettings;
  }

  get pricing(): Record<string, unknown> {
    return {
      showWasPrice: !getPropertyValue(this.recommendation, ProductAttributes.HIDE_WAS_PRICE),
      originalPrice: this.recommendation.price.displayValue,
      reducedPrice: formatPrice(
        this.localizationSettings,
        getPropertyValue(this.recommendation, ProductAttributes.REDUCED_PRICE)
      ),
      savings: formatPrice(
        this.localizationSettings,
        this.recommendation.price.rawValue.value -
          getPropertyValue(this.recommendation, ProductAttributes.REDUCED_PRICE)
      ),
    };
  }
}
</script>
