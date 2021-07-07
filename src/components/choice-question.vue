<template>
  <div :id="question.mid" :class="[componentStyle.container, componentStateClasses]" class="single-question-wrapper">
    <component :is="questionHeadView" :question="question"></component>
    <template v-if="question.questionType === QuestionType.CHECKBOX">
      <div class="answers-wrapper answer-checkbox-type">
        <component
          :is="checkboxAnswerView"
          v-for="(answer, index) in question.answers"
          :key="answer.mid"
          ref="answerElement"
          :answer="answer"
          :is-first-answer="isFirstAnswer(index)"
          :is-last-answer="isLastAnswer(index)"
          :image-height="imageHeights[answersPerRow[index]]"
          :answer-text-height="getTextHeight(index, 'answerTextHeight')"
        >
        </component>
      </div>
    </template>
    <template v-else-if="question.questionType === QuestionType.RADIO">
      <div class="answers-wrapper answer-radio-type">
        <component
          :is="radioButtonAnswerView"
          v-for="(answer, index) in question.answers"
          :key="answer.mid"
          ref="answerElement"
          :answer="answer"
          :is-first-answer="isFirstAnswer(index)"
          :is-last-answer="isLastAnswer(index)"
          :image-height="imageHeights[answersPerRow[index]]"
          :answer-text-height="getTextHeight(index, 'answerTextHeight')"
        >
        </component>
      </div>
    </template>
    <template v-else>
      <h4><i>This question type is not supported yet</i></h4>
    </template>
  </div>
</template>

<script lang="ts">
import {
  ChoiceQuestion,
  Component,
  ComponentConfig,
  ComponentStyle,
  ComponentStyleDefinition,
  InjectComponent,
  Vue,
  VueComponent,
  Prop,
} from "@zoovu/runner-browser-api";

import { ChoiceQuestionView, QuestionConfiguration } from "@zoovu/runner-web-design-base/index";

@Component({
  name: "ChoiceQuestionView",
  mixins: [ChoiceQuestionView],
})
export default class ChoiceQuestionViewExtended extends Vue {
  @ComponentConfig(QuestionConfiguration)
  private componentConfiguration: QuestionConfiguration;

  @ComponentStyle()
  componentStyle: ComponentStyleDefinition;

  @InjectComponent("RadioButtonAnswerView")
  radioButtonAnswerView: VueComponent;

  @InjectComponent("CheckboxAnswerView")
  checkboxAnswerView: VueComponent;

  @InjectComponent("QuestionHeadView")
  questionHeadView: VueComponent;

  @Prop()
  question: ChoiceQuestion;

  public maxTextHeights = [];

  public minAnswersPerRow = 1;

  public answersPerRow = [];

  public imageHeights = [];

  mounted(): void {
    this.clearAllHeights();
    this.updateAnswerTextHeight();
    this.updateImageBox();
  }

  updateAnswerTextHeight(): void {
    /* eslint-disable no-param-reassign */
    this.maxTextHeights = (this.$refs.answerElement as Vue[]).reduce(
      (maxTextHeights, { $children: [choiceAnswer] }, index) => {
        if (!(choiceAnswer.$refs.choiceAnswerLabel as HTMLElement)) {
          return maxTextHeights;
        }

        const rectAnswerHeight = (choiceAnswer.$refs.choiceAnswerLabel as HTMLElement).getBoundingClientRect().height;

        const topKey = this.answersPerRow[index];

        if (maxTextHeights[topKey] === undefined) {
          maxTextHeights[topKey] = {
            answerTextHeight: 0,
          };
        }

        if (maxTextHeights[topKey].answerTextHeight < rectAnswerHeight) {
          maxTextHeights[topKey].answerTextHeight = rectAnswerHeight;
        }

        return maxTextHeights;
      },
      []
    );
    /* eslint-enable no-param-reassign */
  }

  updateImageBox(): void {
    /* eslint-disable no-param-reassign */
    this.imageHeights = (this.$refs.answerElement as Vue[]).reduce(
      (imageHeights, { $children: [choiceAnswer] }, index) => {
        if (!choiceAnswer.$refs.imageBoxElement) {
          return imageHeights;
        }

        const topKey = this.answersPerRow[index];

        const answers = this.getAnswersInTheSameRow(index);

        imageHeights[topKey] = this.hasImageInRow(answers[0], answers[1]) ? "100%" : "0px";

        return imageHeights;
      },
      []
    );
    /* eslint-enable no-param-reassign */
  }

  beforeMount(): void {
    window.addEventListener("resize", this.resizeEventListener);
  }

  beforeDestroy(): void {
    window.removeEventListener("resize", this.resizeEventListener);
  }

  resizeEventListener = async (): Promise<void> => {
    this.clearAllHeights();
    await this.$nextTick();
    this.updateAnswerTextHeight();
    this.updateImageBox();
  };
}
</script>
