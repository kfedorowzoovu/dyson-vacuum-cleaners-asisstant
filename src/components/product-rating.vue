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
            width="15"
            height="14"
            viewBox="0 0 15 14"
            class="icon icon--star"
            :class="{
              [componentStyle.iconStarFilled]: rateIcon.rated && !rateIcon.half,
              [componentStyle.iconStarHalf]: rateIcon.rated && rateIcon.half,
              [componentStyle.iconStarEmpty]: !rateIcon.rated,
            }"
          >
            <path
              class="icon__fill icon__fill--full"
              :fill="rateIcon.rated ? '#febf02' : 'none'"
              d="M7.5 11.25l-4.408 2.318.842-4.91L.367 5.183l4.929-.716L7.5 0l2.204 4.466 4.929.716-3.567 3.477.842 4.909z"
            />
            <path
              class="icon__fill icon__fill--half"
              :fill="rateIcon.rated ? '#febf02' : 'none'"
              d="M 7.5,11.25 3.092,13.568 3.934,8.658 0.367,5.183 5.296,4.467 7.5,4e-7 Z"
            />
            <path
              class="icon__stroke"
              fill="none"
              stroke="#bb944f"
              stroke-miterlimit="50"
              d="M7.5 11.25v0l-4.408 2.318v0l.842-4.91v0L.367 5.183v0l4.929-.716v0L7.5 0v0l2.204 4.466v0l4.929.716v0L11.066 8.66v0l.842 4.909v0z"
            />
          </svg>
        </span>
      </template>
    </span>
    <span v-if="showReviews" class="rating__reviews"> ({{ currentReviews }}) </span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, ComponentConfig, Product, ProductRecommendation, Watch } from "@zoovu/runner-browser-api";
import { ProductRatingView, ProductRatingConfiguration } from "@zoovu/runner-web-design-base";

const RATING_PRECISION = 0.25;

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
