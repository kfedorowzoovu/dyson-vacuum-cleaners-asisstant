<template>
  <button
    type="button"
    :class="[rootElementClass, componentStyle.container]"
    @mousedown.prevent=""
    @mouseup.left.prevent="startOver"
    @keyup.enter="startOver"
    tabindex="0"
  >
    {{ $t("message-start-over") }}
  </button>
</template>

<script lang="ts">
import { Component } from "@zoovu/runner-browser-api";
import { StartOverButtonView as StartOverButtonViewBase } from "@zoovu/runner-web-design-base";

@Component({})
export default class StartOverButtonView extends StartOverButtonViewBase {}
</script>
