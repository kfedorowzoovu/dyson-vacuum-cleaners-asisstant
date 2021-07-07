<template>
  <BaseSvg class="icon" :height="28" :width="28" :y="-4" :name="'icon-tick'">
    <g>
      <polygon points="47.293,6.94 14,40.232 2.707,28.94 1.293,30.353 14,43.06 48.707,8.353  "/>
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
