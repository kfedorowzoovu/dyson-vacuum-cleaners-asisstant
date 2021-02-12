<template>
  <div :class="[{ 'is-selected': recommendation.selected }, componentStyle.container]" class="product-compare-wrapper">
    <label v-if="!recommendation.selected" @click="onSelectClicked()">
      <span class="checkbox-input"></span>
      <span v-dompurify-html="$t('message-compare-selector-compare')"></span>
    </label>
    <label v-if="recommendation.selected" @click="sendCompareEvent()">
      <span class="checkbox-input" @click.stop="onSelectClicked()"></span>
      <span v-dompurify-html="$t('message-compare-selector-start')"></span>
    </label>
  </div>
</template>

<script lang="ts">
import { ProductComparisonSelectorView } from "@zoovu/runner-web-design-base";

export default class ProductComparisonSelectorViewExtended extends ProductComparisonSelectorView {}
</script>
