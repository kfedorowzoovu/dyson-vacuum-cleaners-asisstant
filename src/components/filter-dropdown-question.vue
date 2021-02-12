<template>
  <div :id="question.mid" :class="[componentStyle.container, componentStateClasses]" class="drop-down-list-input">
    <div class="custom-select-wrapper filter-dropdown-wrapper">
      <div class="custom-select-container" :class="{ 'is-open': dropdownOpened, disabled: question.readOnly }">
        <div class="custom-select-answer" @click="toggleDropdown">
          <div v-if="doesSomeAnswerHaveImage" ref="imageBoxElement" class="filter-answer-image">
            <i
              v-if="selectedAnswer && showImage(selectedAnswer)"
              class="dropdown-filter-image-element"
              :style="{ backgroundImage: `url(${selectedAnswer.images[0]})` }"
            ></i>
          </div>
          <span v-if="!selectedAnswer" class="selected-answer-text placeholder">{{ question.placeholder }}</span>
          <span v-if="selectedAnswer && !hideOptionLabels" class="selected-answer-text">{{
            selectedAnswer.answerText
          }}</span>
          <IconChevron></IconChevron>
        </div>
        <div v-bar>
          <div class="custom-select-panel">
            <template v-for="(answer, index) in question.answers">
              <div
                v-if="shouldBeShown(answer)"
                :key="answer.id"
                class="option"
                :class="{ 'option-disabled': answer.disabled }"
                @click="select(index)"
              >
                <div v-if="doesSomeAnswerHaveImage" ref="imageBoxElement" class="filter-answer-image">
                  <i
                    v-if="showImage(answer)"
                    class="dropdown-filter-image-element"
                    :style="{ backgroundImage: `url(${answer.images[0]})` }"
                  ></i>
                </div>
                <p v-if="!hideOptionLabels" class="filter-dropdown-option-text">{{ answer.answerText }}</p>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, ComponentStyle, ComponentStyleDefinition, Answer, Prop, Vue } from "@zoovu/runner-browser-api";

import { FilterDropDownQuestionView } from "@zoovu/runner-web-design-base";
import * as Vuebar from "vuebar";
import { IconChevron } from "./svgs";

Vue.use(Vuebar);

@Component({
  components: { IconChevron },
  name: "FilterDropDownQuestionView",
  mixins: [FilterDropDownQuestionView],
})
export default class FilterDropDownQuestionViewExtended extends Vue {
  @ComponentStyle()
  componentStyle: ComponentStyleDefinition;

  @Prop()
  private showDisabledAnswers: boolean;

  @Prop()
  private hideOptionLabels: boolean;

  dropdownOpened = true;

  get doesSomeAnswerHaveImage(): boolean {
    return this.question.answers.some((answer) => answer.images && answer.images.length > 0);
  }

  get componentStateClasses(): Record<string, unknown> {
    return {
      "has-image": this.doesSomeAnswerHaveImage,
      "no-labels": this.hideOptionLabels,
    };
  }

  shouldBeShown(answer: Answer): boolean {
    return answer && (!answer.disabled || this.showDisabledAnswers);
  }

  showImage = (answer: Answer): boolean => {
    return answer.images != null && answer.images[0] != null;
  };
}
</script>

<style lang="scss">
@import "../styles/vuebar.css";
</style>
