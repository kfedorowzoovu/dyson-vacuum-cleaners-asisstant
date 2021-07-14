<template>
  <BaseSvg class="icon" :height="25" :width="25" :name="'icon-tick-attributes'">

    <g id="DXPE-42527-Errors---Additional-Scenarios">
      <g id="Group" transform="translate(-4.000000, -3.500000)">
        <g id="Icon">
          <polygon
            id="path-1_1_"
            class="st0"
            points="17.1,15.1 17.1,4.1 15.1,4.1 15.1,15.1 4.1,15.1 4.1,17.1 15.1,17.1 15.1,28.1
				17.1,28.1 17.1,17.1 28.1,17.1 28.1,15.1 			"
          />
        </g>
        <defs>
          <filter id="Adobe_OpacityMaskFilter" filter-units="userSpaceOnUse" x="-1" y="-1" width="34" height="34">
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" />
          </filter>
        </defs>
        <mask id="mask-2_1_" mask-units="userSpaceOnUse" x="-1" y="-1" width="34" height="34">
          <g class="st1">
            <polygon
              id="path-1_2_"
              class="st2"
              points="17.1,15.1 17.1,4.1 15.1,4.1 15.1,15.1 4.1,15.1 4.1,17.1 15.1,17.1 15.1,28.1
					17.1,28.1 17.1,17.1 28.1,17.1 28.1,15.1 				"
            />
          </g>
        </mask>
        <g id="Colour" class="st3">
          <g transform="translate(-1.000000, -1.000000)">
            <rect class="st0" width="34" height="34" />
          </g>
        </g>
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
export default class Iconplus extends Vue {}
</script>
<style type="text/css">
.st0 {
  fill: none;
}
.st1 {
  filter: url(#Adobe_OpacityMaskFilter);
}
.st2 {
  fill: #ffffff;
}
.st3 {
  mask: url(#mask-2_1_);
}
</style>
