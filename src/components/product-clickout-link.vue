<template>
  <a
    ref="anchor"
    :target="openLinkInNewTab"
    rel="noopener noreferrer"
    :href="offerUrl"
    @mousedown.prevent=""
    @mouseup.right.prevent="updateOfferUrl"
    @mouseup.left.prevent="onLeftMouseDown"
    @keyup.enter="onLeftMouseDown"
  >
    <slot></slot>
  </a>
</template>

<script lang="ts">
import { Component } from "@zoovu/runner-browser-api";
import { ProductClickoutLinkView as ProductClickoutLinkBase } from "@zoovu/runner-web-design-base";

@Component({})
export default class ProductClickoutLinkView extends ProductClickoutLinkBase {}
</script>
