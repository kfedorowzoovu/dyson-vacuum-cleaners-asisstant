<template>
  <div :id="question.mid" :class="[componentStyle.container]">
    <div class="collapse-wrapper" :class="{ expanded: isExpanded, disabled: question.readOnly }">
      <div class="collapse-header" @click="toggleExpanded">
        <p v-dompurify-html="question.questionText">
          <i
            v-if="question.infoText"
            class="info-text-trigger"
            :class="triggerClass()"
            @click.stop="clickOnInfoText"
          ></i>
        </p>

        <IconChevron></IconChevron>
      </div>

      <template v-if="question.questionType === questionType.CHECKBOX || question.questionType === questionType.RADIO">
        <div v-bar class="collapse-expandable-panel">
          <div class="filter-answers-wrapper">
            <component
              :is="getComponentByQuestionType(question.questionType)"
              v-for="answer in choiceAnswersToDisplay"
              :key="answer.mid"
              ref="answerElement"
              :show-disabled-answers="showDisabledAnswers"
              :hide-option-labels="hideOptionLabels"
              class="filter-option"
              :answer="answer"
            >
            </component>
          </div>
          <button
            v-if="shouldShowMoreButton"
            v-dompurify-html="$t(toggleShowAllAnswersText)"
            class="more-less-button"
            @click="toggleShowAllAnswers"
          ></button>
        </div>
      </template>
      <div v-else-if="question.questionType === questionType.NUMERIC" class="collapse-expandable-panel">
        <component :is="sliderQuestion" :question="question" :is-filter-question="true" />
      </div>
      <div v-else-if="question.questionType === questionType.RANGE" class="collapse-expandable-panel">
        <component :is="rangeQuestion" :question="question" :is-filter-question="true" />
      </div>
      <div v-else-if="question.questionType === questionType.DROPDOWN" class="collapse-expandable-panel">
        <component
          :is="filterDropDownQuestion"
          :show-disabled-answers="showDisabledAnswers"
          :hide-option-labels="hideOptionLabels"
          :question="question"
        />
      </div>
    </div>

    <component
      :is="modal"
      v-if="question.infoText && infoTextShown && (isMobile || isTablet)"
      :status="infoTextShown"
      type="infotext"
      class="question-info-text-modal"
      @close-modal="hideInfoText"
    >
      <span slot="header" v-dompurify-html="question.questionText"></span>
      <span slot="body" v-dompurify-html="question.infoText"></span>
    </component>
  </div>
</template>

<script lang="ts">
import { isMobile, isTablet } from "@zoovu/design-system/src/helpers";
import { Component, InjectComponent, Prop, Question, QuestionType, Vue, VueComponent } from "@zoovu/runner-browser-api";
import {
  FilterQuestionView,
  FilterCheckboxAnswerView,
  FilterRadioButtonAnswerView,
} from "@zoovu/runner-web-design-base";
import { sanitize } from "dompurify";
import * as Vuebar from "vuebar";
import TooltipService from "../services/tooltip-service";
import { IconChevron } from "./svgs";
import { whitelistedAttributes } from "../types";

Vue.use(Vuebar);

@Component({
  components: { IconChevron },
  name: "FilterQuestionView",
  mixins: [FilterQuestionView],
})
export default class FilterQuestionViewExtended extends Vue {
  @InjectComponent("Modal")
  modal: VueComponent;

  @InjectComponent("FilterCheckboxAnswerView")
  filterCheckboxAnswer!: VueComponent;

  @InjectComponent("FilterRadioButtonAnswerView")
  filterRadioButtonAnswer!: VueComponent;

  @Prop()
  private question: Question;

  isMobile: boolean = isMobile();

  isTablet: boolean = isTablet();

  questionType = QuestionType;

  infoTextShown = false;

  get containerDivId(): string {
    return `#${this.$root.containerDivId} > div`;
  }

  mounted(): void {
    if (this.question.infoText && !this.isMobile && !this.isTablet) {
      TooltipService.createTooltip(`#${this.question.mid} p > .info-text-trigger`, {
        content: sanitize(this.question.infoText, { ADD_ATTR: whitelistedAttributes }),
        trigger: "mouseenter",
        placement: "top",
        distance: 10,
      });
    }
  }

  clickOnInfoText(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    if (!this.isMobile && !this.isTablet) return;
    this.showInfoText();
  }

  getComponentByQuestionType(questionType: QuestionType): Vue {
    return questionType === QuestionType.CHECKBOX
      ? (this.filterCheckboxAnswer as FilterCheckboxAnswerView)
      : (this.filterRadioButtonAnswer as FilterRadioButtonAnswerView);
  }

  onInfoTextTriggerClick(): void {
    if (!this.isMobile && !this.isTablet) return;
    this.showInfoText();
  }

  showInfoText(): void {
    this.infoTextShown = true;
  }

  hideInfoText(): void {
    this.infoTextShown = false;
  }

  toggleShowAllAnswers(): void {
    this.showAllAnswers = !this.showAllAnswers;
  }

  triggerClass(): string {
    return `question-info-text-trigger question-info-text-trigger-${this.question.id}`;
  }
}
</script>

<style lang="scss">
@import "../styles/vuebar.css";
</style>
