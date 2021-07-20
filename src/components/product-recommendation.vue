<template>
  <div :id="recommendation.mid" :class="componentStyle.container" class="product">
    <div class="product-details">
      <div class="product-image">
        <component :is="productClickoutLinkView" :product="recommendation">
          <img :src="recommendation.picture" :alt="recommendation.name" />
        </component>
      </div>
      <component :is="productClickoutLinkView" class="product-name" :product="recommendation">
        {{ recommendation.name }}
      </component>
      <ProductProperties
        v-if="shouldRenderProperties"
        :recommendation="recommendation"
        :attributes-collapsed="attributesCollapsed"
      />
      <div class="price-compare-wrapper">
        <component :is="productRatingView" :product="recommendation" />
        <component :is="productPriceView" :recommendation="recommendation" />
      </div>
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
        v-dompurify-html="$t('message-result-go-to-product')"
        class="product-button go-to-product-button"
        :product="recommendation"
      ></component>
    </div>
  </div>
</template>

<script lang="ts">
import { ProductRecommendationView } from "@zoovu/runner-web-design-base";
import { Component, InjectComponent, VueComponent } from "@zoovu/runner-browser-api";
import ProductProperties from "@/components/product-properties.vue";

@Component({
  components: { ProductProperties },
})
export default class ProductRecommendationViewExtended extends ProductRecommendationView {
  @InjectComponent("ProductPriceView")
  productPriceView: VueComponent;
}
</script>
