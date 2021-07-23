<template>
  <BaseSvg class="icon" :height="450" :width="450" :name="'icon-tick'" alt="" role="presentation">
    <g>
      <polygon
        id="SVGID_23_"
        points="372.05,79.08 158.74,293.32 77.95,212.27 39.35,251 158.61,370.92 410.65,117.81    "
      />
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
