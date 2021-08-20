<template>
  <BaseSvg class="icon" :height="20" :width="20" :y="0" :name="'icon-star'">
    <path
      class="stroked"
      d="M9.94286 0L12.2901 7.22391H19.8857L13.7407 11.6885L16.0879 18.9125L9.94286 14.4478L3.79784 18.9125L6.14503 11.6885L0 7.22391H7.59567L9.94286 0Z"
      fill="none"
    />
    <path
      v-if="rateIcon.rated && !rateIcon.half"
      class="filled"
      d="M9.94286 0L12.2901 7.22391H19.8857L13.7407 11.6885L16.0879 18.9125L9.94286 14.4478L3.79784 18.9125L6.14503 11.6885L0 7.22391H7.59567L9.94286 0Z"
    />
    <path
      v-if="rateIcon.rated && rateIcon.half"
      class="filled"
      d="M10 14.4893L9.94286 14.4478L3.79783 18.9125L6.14503 11.6885L0 7.2239H7.59567L9.94286 0L10 0.175837V14.4893Z"
    />
  </BaseSvg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "@zoovu/runner-browser-api";
import { RateLevel } from "@/components/types";
import BaseSvg from "../base-svg.vue";

@Component({
  components: {
    BaseSvg,
  },
})
export default class IconStar extends Vue {
  @Prop()
  rateIcon!: RateLevel;
}
</script>

<style lang="scss" scoped>
.stroked {
  stroke: #ffcc00;
}
.filled {
  fill: #ffcc00;
}
</style>
