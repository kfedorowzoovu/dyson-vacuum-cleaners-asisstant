<template>
  <div
    :id="recommendation.mid"
    :class="componentStyle.container"
    class="product"
  >
    <div class="product-details">
      <div class="product-image">
        <component :is="productClickoutLinkView" :product="recommendation">
          <img
            :src="additionalImageUrl || recommendation.picture"
            :alt="recommendation.name"
          />
        </component>
      </div>
      <h3 class="product-name">
        <component :is="productClickoutLinkView" :product="recommendation">
          {{ recommendation.name }}
        </component>
      </h3>
      <ProductProperties
        v-if="shouldRenderProperties"
        :recommendation="recommendation"
      />
    </div>
    <div class="product__cta-group">
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
      <div v-if="shouldShowAffirmComponent" class="checkout__affirm-promotion">
        <p
          class="affirm-as-low-as"
          data-page-type="product"
          :data-amount="currentPrice"
          data-analytics-action-name="text link~learn more"
        ></p>
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
</template>

<script lang="ts">
import { ProductRecommendationView } from "@zoovu/runner-web-design-base";
import {
  Component,
  ComponentConfig,
  InjectComponent,
  VueComponent,
} from "@zoovu/runner-browser-api";
import ProductProperties from "@/components/product-properties.vue";
import { getPropertyValue } from "@/helpers";
import { ProductAttributes } from "@/configuration/common-configuration";
import PaymentOptionsConfiguration from "@/configuration/payment-options-configuration";

@Component({
  components: { ProductProperties },
})
export default class ProductRecommendationViewExtended extends ProductRecommendationView {
  @InjectComponent("ProductPriceView")
  productPriceView: VueComponent;

  @ComponentConfig(PaymentOptionsConfiguration)
  paymentOptionsConfiguration!: PaymentOptionsConfiguration;

  get locale(): string {
    return this.$root.componentViewModel.localizationSettings.locale;
  }

  get currentPrice(): number {
    const reducedPrice = getPropertyValue(
      this.recommendation,
      ProductAttributes.REDUCED_PRICE
    );
    const regularPrice = this.recommendation.price.rawValue.value;
    return (reducedPrice || regularPrice) * 100;
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
