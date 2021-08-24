<template>
  <div v-if="showRating" class="rating" :class="componentStyle.container" :data-rating="currentRate">
    <span class="rating__stars">
      <template v-for="(rateIcon, index) in ratingRange">
        <IconStar :key="`rating-icon-${index}`" class="rating__star" :rate-icon="rateIcon" />
      </template>
    </span>

    <span v-if="showReviews" class="rating__reviews"> {{ currentReviews }} {{ $t("message-reviews") }} </span>
  </div>
</template>

<script lang="ts">
import { Component } from "@zoovu/runner-browser-api";
import { ProductRatingView as ProductRatingViewBase } from "@zoovu/runner-web-design-base";
import IconStar from "@/components/svgs/icon-star.vue";
import { RateLevel } from "@/components/types";

const RATING_PRECISION = 0.31;
@Component({
  components: { IconStar },
})
export default class ProductRatingViewExtended extends ProductRatingViewBase {
  get ratingRange(): RateLevel[] {
    const rangeFromConfiguration = this.normalizeRangeValues();
    const ratingLength = rangeFromConfiguration.max - rangeFromConfiguration.min;

    return [...Array(ratingLength)].map((element, index) => {
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

  normalizeValue = (ratingValue: number): number => {
    if (ratingValue > Math.ceil(ratingValue) - RATING_PRECISION) {
      return Math.ceil(ratingValue);
    }

    if (ratingValue < Math.floor(ratingValue) + RATING_PRECISION) {
      return Math.floor(ratingValue);
    }

    return ratingValue;
  };
}
</script>
