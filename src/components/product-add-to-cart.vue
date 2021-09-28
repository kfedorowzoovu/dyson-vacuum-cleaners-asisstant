<template>
  <!-- use button to not have 'open in new tab' context option -->
  <button
    type="button"
    v-if="showAddToCartButton"
    @mousedown.prevent=""
    @mouseup.left.prevent="addToCart"
    @keyup.enter="addToCart"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Component } from "@zoovu/runner-browser-api";
import { ProductAddToCartView as ProductAddToCartBase } from "@zoovu/runner-web-design-base";

@Component({})
export default class ProductAddToCartView extends ProductAddToCartBase {}
</script>
