<template>
  <div class="top-product" :class="componentStyle.container">
    <div class="top-product__wrapper">
      <div class="product-details">
        <h4 class="product-name">
        <component :is="productClickoutLinkView" :product="recommendation">
          {{ recommendation.name }}
        </component>
        </h4>
        <p v-text="getPropertyValue(recommendation, ProductAttributes.PRODUCT_CLAIM)"></p>
        <ProductProperties v-if="shouldRenderProperties" :recommendation="recommendation" />
        <div class="top-product__cta-group">
          <component :is="productRatingView" class="product__rating" :product="recommendation" />
          <component :is="productPriceView" :recommendation="recommendation" />
          <div class="klarna-message">
            <klarna-placement
              data-key="credit-promotion-small"
              :data-locale="locale"
              :data-purchase-amount="currentPrice"
            ></klarna-placement>
          </div>
          <div class="product-footer">
            <component
              :is="productAddToCartLinkView"
              v-if="shouldShowAddToCartButton"
              v-dompurify-html="$t('message-result-add-to-cart')"
              class="product-button add-to-cart-button"
              :product="recommendation"
            ></component>
            <button class="product-button go-to-product-button">
              <component
                :is="productClickoutLinkView"
                v-if="shouldShowGoToProductButton"
                v-dompurify-html="$t('message-result-go-to-product')"
                :product="recommendation"
              />
            </button>
          </div>
        </div>
      </div>
      <div class="image-wrapper">
        <div class="product-image">
          <component :is="productClickoutLinkView" :product="recommendation">
            <img :src="recommendation.picture" :alt="recommendation.name" />
          </component>
          <span class="product-top-tile">
            {{ $t("message-result-top-product-tile-title") }} {{ $t("message-result-top-product-tile-description") }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from "@zoovu/runner-browser-api";
import { TopProductView } from "@zoovu/runner-web-design-base";
import { getPropertyValue } from "@/helpers";
import { ProductAttributes } from "@/configuration/common-configuration";
import ProductProperties from "@/components/product-properties.vue";
import { IconTick } from "./svgs";

@Component({
  components: { IconTick, ProductProperties },
})
export default class TopProductViewExtended extends TopProductView {
  getPropertyValue = getPropertyValue;

  ProductAttributes = ProductAttributes;

  mounted(): void {
    window.KlarnaOnsiteService = window.KlarnaOnsiteService || [];
    window.KlarnaOnsiteService.push({ eventName: "refresh-placements" });
  }

  get locale(): string {
    return this.$root.componentViewModel.localizationSettings.locale;
  }

  get currentPrice(): number {
    const reducedPrice = getPropertyValue(this.recommendation, ProductAttributes.REDUCED_PRICE);
    const regularPrice = this.recommendation.price.rawValue.value;
    return (reducedPrice || regularPrice) * 100;
  }
}
</script>
