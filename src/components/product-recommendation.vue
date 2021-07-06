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
      <template v-if="shouldRenderProperties">
        <ul class="product-properties">
          <template v-for="property in properties">
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
import { InjectComponent, Marking, ProductProperty, VueComponent } from "@zoovu/runner-browser-api";

export default class ProductRecommendationViewExtended extends ProductRecommendationView {
  @InjectComponent("ProductPriceView")
  productPriceView: VueComponent;

  get properties() {
    return this.recommendation.properties.filter((property) => property.marking === Marking.POSITIVE);
  }

  public get shouldRenderProperties(): boolean {
    return this.properties.length > 0;
  }

  get hasNeutralProperty() {
    return this.properties.some((property: ProductProperty) => property.marking === Marking.NEUTRAL);
  }
}
</script>
