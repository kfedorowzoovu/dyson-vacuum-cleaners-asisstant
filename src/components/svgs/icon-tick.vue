<template>
  <BaseSvg class="icon" :height="450" :width="450" :name="'icon-tick'">
    <g>
      <defs>
        <polygon
          id="SVGID_23_"
          points="372.05,79.08 158.74,293.32 77.95,212.27 39.35,251 158.61,370.92 410.65,117.81    "
        />
      </defs>
      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#SVGID_23_" style="overflow: visible" />
      <clipPath id="SVGID_2_">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#SVGID_23_" style="overflow: visible" />
      </clipPath>
    </g>
  </BaseSvg>
</template>

<script lang="ts">
import { Component, Vue } from "@zoovu/runner-browser-api";
import BaseSvg from "../base-svg.vue";

@Component({
  components: {
    BaseSvg,
  },
})
export default class IconTick extends Vue {}
</script>
