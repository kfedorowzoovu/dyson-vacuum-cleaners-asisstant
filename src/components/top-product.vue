<template>
  <div
    class="top-product"
    role="region"
    :class="componentStyle.container"
    :aria-label="`${topTileContent}.`"
  >
    <div class="top-product__wrapper">
      <div class="product-details">
        <h3 class="product-name">
          <span class="product-top-tile zv-ada-tabindex" tabindex="0">
            {{ topTileContent }}
          </span>
          <component :is="productClickoutLinkView" :product="recommendation" class="zv-ada-tabindex" tabindex="0">
            {{ recommendation.name }}
          </component>
        </h3>
        <p
          v-if="shouldRenderProductClaim"
          class="top-product-claim"
          v-text="
            getPropertyValue(recommendation, ProductAttributes.PRODUCT_CLAIM)
          "
        ></p>
        <p
          v-dompurify-html="$t('message-top-product-hint')"
          class="top-product-hint"
        ></p>
        <ProductProperties
          v-if="shouldRenderProperties"
          :recommendation="recommendation"
        />
        <div class="top-product__cta-group">
          <component
            :is="productRatingView"
            class="product__rating"
            :product="recommendation"
          />
          <component :is="productPriceView" :recommendation="recommendation" />
          <div class="klarna-message" v-if="shouldShowKlarnaComponent">
            <klarna-placement
              data-key="credit-promotion-small"
              :data-locale="locale"
              :data-purchase-amount="currentPrice"
            ></klarna-placement>
          </div>
          <div
            v-if="shouldShowAffirmComponent"
            class="checkout__affirm-promotion"
          >
            <p
              class="affirm-as-low-as"
              data-page-type="product"
              :data-amount="currentPrice"
              data-analytics-action-name="text link~learn more"
            ></p>
          </div>
          <div class="promotion-text">
            <p v-text="getPropertyValue(recommendation, ProductAttributes.BUNDLE_PROMOTION)" ></p>
            <p v-text="getPropertyValue(recommendation, ProductAttributes.FREE_GIFT)" ></p>
          </div>
          <div class="product-footer">
            <component
              :is="productAddToCartLinkView"
              v-if="shouldShowAddToCartButton"
              v-dompurify-html="$t('message-result-add-to-cart')"
              class="product-button add-to-cart-button"
              :product="recommendation"
              tabindex="0"
            ></component>
            <button class="product-button go-to-product-button">
              <component
                :is="productClickoutLinkView"
                v-if="shouldShowGoToProductButton"
                v-dompurify-html="$t('message-result-go-to-product')"
                :product="recommendation"
                tabindex="0"
              />
            </button>
          </div>
        </div>
      </div>
      <div class="image-wrapper">
        <div class="product-image">
          <component :is="productClickoutLinkView" :product="recommendation">
            <img
              :src="additionalImageUrl || recommendation.picture"
              :alt="recommendation.name"
            />
          </component>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, ComponentConfig } from "@zoovu/runner-browser-api";
import { TopProductView as TopProductViewBase } from "@zoovu/runner-web-design-base";
import { getPropertyValue } from "@/helpers";
import { ProductAttributes } from "@/configuration/common-configuration";
import ProductProperties from "@/components/product-properties.vue";
import PaymentOptionsConfiguration from "@/configuration/payment-options-configuration";
import { IconTick } from "./svgs";

@Component({
  components: { IconTick, ProductProperties },
})
export default class TopProductView extends TopProductViewBase {
  @ComponentConfig(PaymentOptionsConfiguration)
  paymentOptionsConfiguration!: PaymentOptionsConfiguration;

  getPropertyValue = getPropertyValue;

  ProductAttributes = ProductAttributes;

  get locale(): string {
    return this.$root.componentViewModel.localizationSettings.locale;
  }

  get shouldRenderProductClaim(): boolean {
    return Boolean(
      getPropertyValue(this.recommendation, ProductAttributes.PRODUCT_CLAIM)
    );
  }

  get currentPrice(): number {
    const reducedPrice = getPropertyValue(
      this.recommendation,
      ProductAttributes.REDUCED_PRICE
    );
    const regularPrice = this.recommendation.price.rawValue.value;
    return (reducedPrice || regularPrice) * 100;
  }

  get topTileContent(): string {
    return `${this.$t("message-result-top-product-tile-title")} ${this.$t(
      "message-result-top-product-tile-description"
    )}`;
  }

  get additionalImageUrl(): string {
    return getPropertyValue(
      this.recommendation,
      ProductAttributes.ADDITIONAL_IMAGE_URL
    );
  }

  get shouldShowKlarnaComponent(): boolean {
    return this.paymentOptionsConfiguration?.klarna;
  }

  get shouldShowAffirmComponent(): boolean {
    return this.paymentOptionsConfiguration?.affirm;
  }

  mounted(): void {
    if (this.shouldShowKlarnaComponent) {
      window.KlarnaOnsiteService = window.KlarnaOnsiteService || [];
      window.KlarnaOnsiteService.push({ eventName: "refresh-placements" });
    }
    if (this.shouldShowAffirmComponent) {
      window.affirm = window.affirm || [];
      window.affirm.ui.ready(function () {
        window.affirm.ui.refresh();
      });
    }
  }
}
</script>
