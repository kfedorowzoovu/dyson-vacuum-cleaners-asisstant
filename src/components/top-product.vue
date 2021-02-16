<template>
  <div class="top-product" :class="componentStyle.container">
    <template v-if="shouldRenderProperties">
      <ul class="product-properties">
        <template v-for="(property, index) in properties">
          <transition name="fade" :key="index">
            <li v-if="shouldRenderProperty(property)" :class="resolveClass(property.marking)">
              <i></i>
              {{ property.displayValue }}
            </li>
          </transition>
        </template>
      </ul>
      <button
        type="button"
        v-if="hasNeutralProperty"
        class="product-attributes-toggle"
        :class="{ collapsed: attributesCollapsed }"
        @click="onShowMoreClicked"
        v-dompurify-html="$t(attributesCollapsed ? 'message-compare-show-less' : 'message-compare-show-more')"
      >
        <i></i>
      </button>
    </template>
    <div class="top-product__wrapper">
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
      <div class="product-details">
        <component class="product-name" :is="productClickoutLinkView" :product="recommendation">
          {{ recommendation.name }}
        </component>
        <component class="product__rating" :is="productRatingView" :product="recommendation" />
        <component :is="productPriceView" :recommendation="recommendation" />

        <div class="compare-wrapper">
          <div class="compare-button">
            <component :is="productComparisonSelectorView" :recommendation="recommendation" />
          </div>
        </div>
      </div>
      <div class="product-footer">
        <component
          class="product-button add-to-cart-button"
          :is="productAddToCartLinkView"
          v-if="shouldShowAddToCartButton"
          :product="recommendation"
          v-dompurify-html="$t('message-result-add-to-cart')"
        ></component>
        <component
          class="product-button go-to-product-button"
          :is="productClickoutLinkView"
          :product="recommendation"
          v-if="shouldShowGoToProductButton"
          v-dompurify-html="$t('message-result-go-to-product')"
        ></component>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component,
  ComponentConfig,
  InjectComponent,
  Marking,
  ProductProperty,
  ProductRecommendation,
  Prop,
  VueComponent,
} from "@zoovu/runner-browser-api";
import { ProductButtonConfiguration, TopProductView } from "@zoovu/runner-web-design-base";

@Component({})
export default class TopProductViewExtended extends TopProductView {
  @Prop()
  private recommendation: ProductRecommendation;

  @ComponentConfig(ProductButtonConfiguration)
  private productButtonConfiguration;

  @InjectComponent("ProductRatingView")
  productRatingView: VueComponent;

  @InjectComponent("ProductPriceView")
  productPriceView: VueComponent;

  @InjectComponent("ProductComparisonSelectorView")
  productComparisonSelectorView: VueComponent;

  @InjectComponent("ProductClickoutLinkView")
  productClickoutLinkView: VueComponent;

  @InjectComponent("ProductAddToCartView")
  productAddToCartLinkView: VueComponent;

  private attributesCollapsed: boolean = false;

  public resolveClass(marking: Marking): string {
    switch (marking) {
      case Marking.POSITIVE:
        return "positive-property";
      case Marking.NEGATIVE:
        return "negative-property";
      case Marking.NEUTRAL:
        return "neutral-property";
      default:
        return "";
    }
  }

  public onShowMoreClicked() {
    this.attributesCollapsed = !this.attributesCollapsed;
  }

  get properties() {
    return this.recommendation.properties.filter((property) => property.marking === Marking.POSITIVE);
  }

  get hasNeutralProperty(): boolean {
    return this.properties.some((property: ProductProperty) => property.marking === Marking.NEUTRAL);
  }

  public get shouldRenderProperties(): boolean {
    return this.properties.length > 0;
  }

  public shouldRenderProperty(property: ProductProperty) {
    return this.attributesCollapsed || property.marking !== Marking.NEUTRAL;
  }

  public get shouldShowGoToProductButton(): boolean {
    return this.productButtonConfiguration ? this.productButtonConfiguration.showGoToProductButton : true;
  }

  public get shouldShowAddToCartButton(): boolean {
    return this.productButtonConfiguration ? this.productButtonConfiguration.showAddToCartButton.enabled : false;
  }
}
</script>
