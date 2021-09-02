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
            ? pricing.originalPrice
            : pricing.reducedPrice
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
import {PriceComplementaryTextContent} from "@zoovu/runner-web-design-base/src/components/types";
import {TextPlacements} from "@zoovu/runner-web-design-base/src/configuration/index";
import {formatNumberAsCurrency} from "@zoovu/runner-web-design-base/src/components/utils";

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

  get complementaryTexts(): ReadonlyArray<PriceComplementaryTextContent> {
    if (!this.price || !this.price.settings || !this.price.settings.textPlacements)
      return [];

    const textPlacements: TextPlacements ={"right":{"label":"Display text after price","labelButton":"Link a data column","labelColumn":"Linked data column after price","text":"rgith dupa","column":{"name":""},"isPrice":false,"isReversed":false},"left":{"label":"Display text before price","labelButton":"Link a data column","labelColumn":"Linked data column before price","text":"left dupa","column":{"name":""},"isPrice":false,"isReversed":false},"top":{"label":"Display text above price","labelButton":"Link a data column","labelColumn":"Linked data column above price","text":"top dupa","column":{"name":""},"isPrice":false,"isReversed":false},"bottom":{"label":"Display text under price","labelButton":"Link a data column","labelColumn":"Linked data column under price","text":"bottom dupa","column":{"name":""},"isPrice":false,"isReversed":false}};

    return Object.entries(textPlacements).map(([placement, { column, isPrice, text, isReversed }]) => {
      const columnName = column && column.name;
      const property = columnName && this.getProperty(columnName);
      const columnValue = property && property.value || "";
      const columnText = isPrice && columnValue ? formatNumberAsCurrency(columnValue, this.localizationSettings) : columnValue;
      const isHidden = isPrice && (!columnValue || this.recommendation.price.rawValue.value === columnValue);

      return {
        staticText: text,
        columnText,
        classList: [`price-additional-text--${placement}`, {"is-reversed": isReversed, "price-additional-text--hidden": isHidden}],
        placement,
      }
    }).filter(textContent => textContent.staticText || textContent.columnText);
  };


}
</script>
