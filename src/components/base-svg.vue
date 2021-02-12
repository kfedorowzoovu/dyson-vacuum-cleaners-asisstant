<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="`${width}px`"
    :height="`${width}px`"
    :viewBox="`${x} ${y} ${width} ${height}`"
    :aria-label="name"
    role="presentation"
    :class="`svg-${name}`"
  >
    <slot />
  </svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "@zoovu/runner-browser-api";

@Component({})
export default class BaseSvg extends Vue {
  @Prop()
  name!: string;

  @Prop()
  width!: number;

  @Prop()
  height!: number;

  @Prop({ default: 0 })
  x!: number;

  @Prop({ default: 0 })
  y!: number;
}
</script>
