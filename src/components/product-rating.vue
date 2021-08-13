<template>
  <div v-if="showRating" class="rating" :class="componentStyle.container" :data-rating="currentRate">
    <span class="rating__stars">
      <template v-for="(rateIcon, index) in ratingRange">
        <span
          :key="`${rateIcon.rated ? (rateIcon.half ? 'full' : 'half') : 'empty'}-star-${index}`"
          class="rating__star"
          :class="{
            'rating__star--full': rateIcon.rated && !rateIcon.half,
            'rating__star--half': rateIcon.rated && rateIcon.half,
            'rating__star--empty': !rateIcon.rated,
          }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            class="icon icon--star"
            :class="{
              [componentStyle.iconStarFilled]: rateIcon.rated && !rateIcon.half,
              [componentStyle.iconStarHalf]: rateIcon.rated && rateIcon.half,
              [componentStyle.iconStarEmpty]: !rateIcon.rated,
            }"
          >
            <polygon
              points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78"
              :fill="rateIcon.rated ? '#FFCC00' : 'none'"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            class="icon icon--star icon--star--stroke"
          >
            <path
              style="
                fill: none;
                stroke: #ffcc00;
                stroke-width: 1;
                stroke-miterlimit: 4;
                stroke-dasharray: none;
                stroke-opacity: 1;
              "
              d="M 9.9003906,1.0996094 7.5136719,8.5800781 H 0 L 5.984375,13.367188 3.3007812,21.779297 9.9003906,16.5 16.5,21.779297 13.816406,13.367188 19.800781,8.5800781 h -7.513672 z"
            />
          </svg>
        </span>
      </template>
    </span>

    <span v-if="showReviews" class="rating__reviews"> {{ currentReviews }} {{ $t("message-reviews") }} </span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, ComponentConfig, Product, ProductRecommendation, Watch } from "@zoovu/runner-browser-api";
import { ProductRatingView, ProductRatingConfiguration } from "@zoovu/runner-web-design-base";

const RATING_PRECISION = 0.31;

@Component({})
export default class ProductRatingViewExtended extends ProductRatingView {
  @Prop()
  public product: Product;

  @ComponentConfig(ProductRatingConfiguration)
  public componentConfiguration;

  public enabled = false;

  protected mounted() {
    if (!this.ratingConfiguration) return;
    this.enabled = this.ratingConfiguration.enabled;
  }

  @Watch("componentConfiguration", { deep: true })
  private requestUpdate() {
    this.$forceUpdate();
  }

  public get ratingConfiguration() {
    if (!this.componentConfiguration) return null;
    return this.componentConfiguration.showProductRating;
  }

  public get showRating(): boolean {
    if (!this.ratingConfiguration || !this.ratingConfiguration.enabled) {
      return false;
    }

    const ratingPropertyName = this.ratingConfiguration.rating.attribute.name;
    return this.hasPropertyValue(ratingPropertyName);
  }

  public get showReviews(): boolean {
    if (!this.ratingConfiguration.reviews || !this.ratingConfiguration.reviews.enabled) {
      return false;
    }

    const reviewsPropertyName = this.ratingConfiguration.reviews.attribute.name;
    return this.hasPropertyValue(reviewsPropertyName);
  }

  public get currentRate(): number {
    const ratingPropertyName = this.ratingConfiguration.rating.attribute.name;
    let ratingValue = this.getPropertyValue(ratingPropertyName) || 0;
    if (typeof ratingValue === "string") {
      ratingValue = parseFloat(ratingValue.replace(",", "."));
    }
    return this.normalizeValue(ratingValue);
  }

  public get currentReviews(): number {
    const reviewsPropertyName = this.ratingConfiguration.reviews.attribute.name;
    const reviewsValue = this.getPropertyValue(reviewsPropertyName) || 0;
    return parseInt(reviewsValue);
  }

  public getPropertyValue(propertyName: string): any {
    if (!this.product.additionalProperties[propertyName]) {
      const foundProperty = (this.product as ProductRecommendation).properties.find(
        (property) => property.rawValue.property === propertyName
      );
      if (!foundProperty) return null;
      return foundProperty.rawValue.value;
    }
    return this.product.additionalProperties[propertyName].value;
  }

  public hasPropertyValue(propertyName: string): boolean {
    const property: any = this.getPropertyValue(propertyName);
    return property !== null;
  }

  public get ratingRange(): { rated: boolean }[] {
    const rangeFromConfiguration = this.normalizeRangeValues();
    const ratingLength = rangeFromConfiguration.max - rangeFromConfiguration.min;

    return Array.apply(null, Array(ratingLength)).map((element, index) => {
      const stepValue = rangeFromConfiguration.min + index;
      if (this.currentRate > stepValue) {
        return {
          rated: true,
          half: this.currentRate < stepValue + 1,
        };
      }
      return {};
    });
  }

  private normalizeRangeValues(): { min: number; max: number } {
    return {
      max: Math.round(this.ratingConfiguration.range.max),
      min: Math.round(this.ratingConfiguration.range.min),
    };
  }

  private normalizeValue(ratingValue: number) {
    if (ratingValue > Math.ceil(ratingValue) - RATING_PRECISION) {
      return Math.ceil(ratingValue);
    }

    if (ratingValue < Math.floor(ratingValue) + RATING_PRECISION) {
      return Math.floor(ratingValue);
    }

    return ratingValue;
  }
}
</script>
