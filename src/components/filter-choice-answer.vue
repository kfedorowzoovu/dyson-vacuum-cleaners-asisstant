<template>
  <div
    v-if="shouldBeShown"
    :id="answer.mid + '-wrapper'"
    :class="[componentStyle.container, componentStateClasses, filterComponentStateClasses]"
    tabindex="0"
    @keyup.enter="enterPressed"
  >
    <label ref="filterChoiceAnswerLabel" :for="answer.mid">
      <div class="answer-content">
        <component
          :is="infoText"
          v-if="answer.hasInfoText && infoTextShown && !isMobile && !isTablet"
          class="info-text"
          :text="infoTextContent"
        />
        <div v-if="doesSomeAnswerHaveImage" ref="imageBoxElement" class="filter-answer-image">
          <i v-if="showImage" class="filter-image-element" :style="{ backgroundImage: `url(${answer.images[0]})` }"></i>
        </div>
        <input
          :id="answer.mid"
          :type="inputType"
          :checked="answer.selected"
          :disabled="disabled"
          @click="$emit('answer-select')"
        />
        <span :class="[inputClasses]"></span>
        <span v-if="!hideOptionLabels" v-dompurify-html="answerTextContent" class="answer-text"></span>
        <i
          v-if="answer.hasInfoText"
          class="info-text-trigger"
          tabindex="0"
          @click.stop.prevent="onInfoTextTriggerClick"
        ></i>
      </div>
    </label>
    <component
      :is="modal"
      v-if="answer.hasInfoText && infoTextShown && (isMobile || isTablet)"
      :status="infoTextShown"
      type="infotext"
      class="info-text-modal"
      @close-modal="hideInfoText"
    >
      <span slot="header">{{ answer.answerText }}</span>
      <span slot="body">{{ answer.infoText }}</span>
    </component>
  </div>
</template>

<script lang="ts">
import { Component, InjectComponent, Answer, VueComponent, Prop } from "@zoovu/runner-browser-api";
import { isMobile, isTablet } from "@zoovu/design-system/src/helpers";
import { FilterChoiceAnswerView } from "@zoovu/runner-web-design-base";
import { sanitize } from "dompurify";
import TooltipService from "../services/tooltip-service";
import { whitelistedAttributes } from "../types";

@Component({})
export default class FilterChoiceAnswerViewExtended extends FilterChoiceAnswerView {
  @InjectComponent("Modal")
  modal: VueComponent;

  @Prop()
  answer: Answer;

  isMobile: boolean = isMobile();

  isTablet: boolean = isTablet();

  infoTextShown = false;

  get shouldBeShown(): boolean {
    return this.answer && (!this.answer.disabled || this.showDisabledAnswers);
  }

  get containerDivId(): string {
    return `#${this.$root.containerDivId} > div`;
  }

  mounted(): void {
    if (this.infoTextContent && !this.isMobile && !this.isTablet && !this.answer.disabled) {
      TooltipService.createTooltip(`#${this.answer.mid}-wrapper .info-text-trigger`, {
        content: sanitize(this.infoTextContent, { ADD_ATTR: whitelistedAttributes }),
        trigger: "mouseenter",
        placement: "top",
        distance: 10,
      });
    }
  }

  hideInfoText(): void {
    this.infoTextShown = false;
  }

  showInfoText(): void {
    this.infoTextShown = true;
  }

  onInfoTextTriggerClick(): void {
    if (!this.isMobile) return;
    this.showInfoText();
  }
}
</script>
