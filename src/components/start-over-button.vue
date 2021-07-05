<template>
  <button type="button" :class="[rootElementClass, componentStyle.container]" @click="startOver">
{{ $t("message-start-over") }}
  </button>
</template>

<script lang="ts">
import { Component, Prop, Advisor } from "@zoovu/runner-browser-api";
import { StartOverButtonView } from "@zoovu/runner-web-design-base";
import { IconChevronLeft } from "@/components/svgs";

@Component({
  components: {
    IconChevronLeft,
  },
})
export default class StartOverButtonViewExtended extends StartOverButtonView {
  @Prop()
  private advisor: Advisor;

  startOver() {
    this.advisor.startOver();
  }

  get rootElementClass(): string {
    return "start-over-button";
  }
}
</script>
