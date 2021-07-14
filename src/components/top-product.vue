<template>
  <div class="top-product" :class="componentStyle.container">
    <div class="top-product__wrapper">
      <div class="product-details">
        <component :is="productClickoutLinkView" class="product-name" :product="recommendation">
          {{ recommendation.name }}
        </component>
        <p v-text="getPropertyValue(recommendation, ProductAttributes.PRODUCT_SUBTITLE_COLUMN)"></p>
        <template v-if="shouldRenderProperties">
          <ul class="product-properties">
            <template v-for="(property, index) in recommendation.properties">
              <transition :key="index" name="fade">
                <li v-if="shouldRenderProperty(property)" :class="resolveClass(property.marking)">
                  <IconTick v-if="property.marking === Marking.POSITIVE"></IconTick><span>{{ property.displayValue }}</span>
                </li>
              </transition>
            </template>
          </ul>
        </template>
        <component :is="productRatingView" class="product__rating" :product="recommendation" />
        <component :is="productPriceView" :recommendation="recommendation" />
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
import {Component, Marking, ProductProperty} from "@zoovu/runner-browser-api";
import { TopProductView } from "@zoovu/runner-web-design-base";
import getPropertyValue from "@/helpers/getPropertyValue";
import { ProductAttributes } from "../configuration/common-configuration";
import { IconTick } from "./svgs";

@Component({
  components: { IconTick },
})
export default class TopProductViewExtended extends TopProductView {
  getPropertyValue = getPropertyValue;

  ProductAttributes = ProductAttributes;

  Marking = Marking;

  public shouldRenderProperty(property: ProductProperty) {
    return this.attributesCollapsed || property.marking !== Marking.NEGATIVE;
  }
}
</script>
