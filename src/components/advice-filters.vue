<template>
  <div class="filter-panel-advice">
    <component
      :is="filterPanelView"
      v-for="(filter, index) in filters"
      :key="filter.mid"
      :filter="filter"
      :class="`${filter.type}-${index}`"
      @reset-filters-click="onResetFilters"
    />
  </div>
</template>

<script lang="ts">
import { Component, InjectComponent, Prop, Vue, VueComponent, FlowStep } from "@zoovu/runner-browser-api";

@Component({})
export default class AdviceFiltersView extends Vue {
  @InjectComponent("FilterPanelView")
  filterPanelView: VueComponent;

  @Prop()
  filters!: FlowStep[];

  onResetFilters(): void {
    this.$emit("reset-all-filters");
  }
}
</script>
