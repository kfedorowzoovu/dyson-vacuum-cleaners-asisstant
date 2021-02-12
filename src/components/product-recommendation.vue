<template>
  <div :id="recommendation.mid" :class="componentStyle.container" class="product">
    <div class="product-details">
      <component :is="productClickoutLinkView" class="product-name" :product="recommendation">
        {{ recommendation.name }}
      </component>
      <div class="product-image">
        <component :is="productClickoutLinkView" :product="recommendation">
          <img :src="recommendation.picture" :alt="recommendation.name" />
        </component>
      </div>
      <div class="price-compare-wrapper">
        <component :is="productPriceView" :recommendation="recommendation" />
        <component :is="productComparisonSelectorView" :recommendation="recommendation" />
        <component :is="productRatingView" :product="recommendation" />
      </div>
      <template v-if="shouldRenderProperties">
        <p v-dompurify-html="$t('message-compare-selected-attributes')" class="properties-title"></p>
        <ul class="product-properties">
          <template v-for="property in recommendation.properties">
            <li v-if="shouldRenderProperty(property)" :key="property.name" :class="resolveClass(property.marking)">
              <i></i>{{ property.displayValue }}
            </li>
          </template>
        </ul>
        <button
          v-show="hasNeutralProperty"
          v-dompurify-html="attributesCollapsed ? $t('message-compare-show-less') : $t('message-compare-show-more')"
          class="product-attributes-toggle"
          :class="{ collapsed: attributesCollapsed }"
          type="button"
          @click="onShowMoreClicked"
        >
          <i></i>
        </button>
      </template>
      <div class="product-footer">
        <component
          :is="productClickoutLinkView"
          v-if="shouldShowGoToProductButton"
          v-dompurify-html="$t('message-result-go-to-product')"
          class="product-button go-to-product-button"
          :product="recommendation"
        ></component>
        <component
          :is="productAddToCartLinkView"
          v-if="shouldShowAddToCartButton"
          v-dompurify-html="$t('message-result-add-to-cart')"
          class="product-button add-to-cart-button"
          :product="recommendation"
        ></component>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ProductRecommendationView } from "@zoovu/runner-web-design-base";
import { InjectComponent, VueComponent } from "@zoovu/runner-browser-api";

export default class ProductRecommendationViewExtended extends ProductRecommendationView {
  @InjectComponent("ProductPriceView")
  productPriceView: VueComponent;
}
</script>
