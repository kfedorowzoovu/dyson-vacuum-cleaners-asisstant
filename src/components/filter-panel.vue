<template>
  <div :id="filter.mid" :class="[componentStyle.container]">
    <p class="filters-title">
      {{ filter.stepHeadline }}
      <i
        v-if="filter.hasStepInfotext"
        class="info-text-trigger"
        :class="triggerClass()"
        @click.stop="clickOnInfoText"
      ></i>
    </p>
    <div>
      <template v-for="question in filter.questions">
        <component
          :is="filterQuestion"
          :key="question.id"
          :question="question"
          :initially-expanded="expandedAll"
          :panel-settings="filterSettings"
        />
      </template>
    </div>
    <button
      v-if="displayExpandAllButton"
      v-dompurify-html="$t(toggleAllButtonText)"
      class="expand-all-button"
      @click="toggleExpandAll"
    ></button>
    <button
      v-if="displayRestartFiltersButton"
      v-dompurify-html="$t('message-filter-restart')"
      class="restart-filters-button"
      @click="onResetFilters"
    ></button>

    <component
      :is="modal"
      v-if="filter.hasStepInfotext && infoTextShown && isMobile"
      :status="infoTextShown"
      type="infotext"
      class="filter-info-text-modal"
      @close-modal="hideInfoText"
    >
      <span slot="header" v-dompurify-html="filter.stepHeadline"></span>
      <span slot="body" v-dompurify-html="filter.stepInfotext"></span>
    </component>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
  VueComponent,
  InjectComponent,
  FlowStep,
  ComponentStyleDefinition,
  ComponentStyle,
  FilterPanelSettings,
} from "@zoovu/runner-browser-api";
import { FiltersSettings } from "@zoovu/runner-web-design-base/src/components/types";
import { isMobile, FilterPanelView } from "@zoovu/runner-web-design-base";
import { sanitize } from "dompurify";
import TooltipService from "../services/tooltip-service";
import { whitelistedAttributes } from "../types";

@Component({
  name: "FilterPanelView",
  mixins: [FilterPanelView],
})
export default class FilterPanelViewExtended extends Vue {
  @InjectComponent("Modal")
  modal: VueComponent;

  @Prop()
  public filter: FlowStep;

  @ComponentStyle()
  componentStyle: ComponentStyleDefinition;

  @InjectComponent("FilterQuestionView")
  filterQuestion: VueComponent;

  expandedAll = Boolean(this.filterSettings.expandAllByDefault);

  infoTextShown = false;

  isMobile: boolean = isMobile();

  get filterSettings(): FilterPanelSettings {
    return this.filter.filterSettings ? this.filter.filterSettings : {};
  }

  get toggleAllButtonText(): string {
    return this.expandedAll ? "message-filter-collapse-all" : "message-filter-expand-all";
  }

  get displayRestartFiltersButton(): boolean {
    return !!this.filterSettings[FiltersSettings.SHOW_RESET_OPTION];
  }

  get displayExpandAllButton(): boolean {
    return !!this.filterSettings[FiltersSettings.SHOW_EXPAND_ALL_BUTTON];
  }

  private onResetFilters(): void {
    this.$emit("reset-filters-click");
  }

  private toggleExpandAll(): void {
    this.expandedAll = !this.expandedAll;
  }

  triggerClass(): string {
    return `filter-info-text-trigger filter-info-text-trigger-${this.filter.id}`;
  }

  showInfoText(): void {
    this.infoTextShown = true;
  }

  hideInfoText(): void {
    this.infoTextShown = false;
  }

  clickOnInfoText(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    if (!this.isMobile) return;
    this.showInfoText();
  }

  mounted(): void {
    if (this.filter.hasStepInfotext && !this.isMobile) {
      TooltipService.createTooltip(`#${this.filter.mid} p > .info-text-trigger`, {
        content: sanitize(this.filter.stepInfotext, { ADD_ATTR: whitelistedAttributes }),
        trigger: "mouseenter",
        placement: "top",
        distance: 10,
      });
    }
  }
}
</script>
