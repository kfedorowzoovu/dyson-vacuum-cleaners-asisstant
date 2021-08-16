<template>
  <div :id="recommendation.mid" :class="componentStyle.container" class="product">
    <div class="product-details">
      <div class="product-image">
        <component :is="productClickoutLinkView" :product="recommendation">
          <img :src="recommendation.picture" :alt="recommendation.name" />
        </component>
      </div>
      <h4 class="product-name">
        <component :is="productClickoutLinkView" :product="recommendation">
          {{ recommendation.name }}
        </component>
      </h4>
      <ProductProperties v-if="shouldRenderProperties" :recommendation="recommendation" />
    </div>
    <div class="product__cta-group">
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
        <component
          :is="productClickoutLinkView"
          v-if="shouldShowGoToProductButton"
          class="product-button go-to-product-button"
          v-dompurify-html="$t('message-result-go-to-product')"
          :product="recommendation"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ProductRecommendationView } from "@zoovu/runner-web-design-base";
import { Component, InjectComponent, VueComponent } from "@zoovu/runner-browser-api";
import ProductProperties from "@/components/product-properties.vue";
import { getPropertyValue } from "@/helpers";
import { ProductAttributes } from "@/configuration/common-configuration";

@Component({
  components: { ProductProperties },
})
export default class ProductRecommendationViewExtended extends ProductRecommendationView {
  @InjectComponent("ProductPriceView")
  productPriceView: VueComponent;

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
