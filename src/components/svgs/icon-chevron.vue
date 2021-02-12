<template>
  <BaseSvg class="icon" :height="17" :width="17" :y="-4" :name="'icon-chevron'">
    <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <g id="Elements-/-arrow/down/oxygen" fill="#6E34A8" fill-rule="nonzero">
        <polygon
          id="arrow_down"
          transform="translate(8.500000, 5.000000) rotate(-270.000000) translate(-8.500000, -5.000000) "
          points="4.76050369 13 13 5 4.76050369 -3 4 -2.07445524 11.2479939 5 4 12.2048843"
        ></polygon>
      </g>
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
export default class IconChevron extends Vue {}
</script>
