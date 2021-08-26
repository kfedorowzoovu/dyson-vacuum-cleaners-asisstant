<template>
  <section
    :id="question.mid"
    :class="[componentStyle.container, componentStateClasses]"
    class="single-question-wrapper"
  >
    <component :is="questionHeadView" :question="question"></component>
    <fieldset v-if="isChoiceQuestion" class="answers-wrapper">
      <legend class="hidden-description">{{ questionDetails }}</legend>
      <component
        :is="choiceAnswerComponent"
        v-for="(answer, index) in question.answers"
        :key="answer.mid"
        ref="answerElement"
        :answer="answer"
        :is-first-answer="isFirstAnswer(index)"
        :is-last-answer="isLastAnswer(index)"
        :image-height="imageHeights[answersPerRow[index]]"
        :answer-text-height="getTextHeight(index, 'answerTextHeight')"
      />
    </fieldset>
    <h4 v-else><i>This question type is not supported yet</i></h4>
  </section>
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
  QuestionType,
} from "@zoovu/runner-browser-api";

import { ChoiceQuestionView, QuestionConfiguration } from "@zoovu/runner-web-design-base/index";
import { QuestionParameter } from "@/components/types";

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

  get questionHintText(): string {
    const parameterQuestionHintText = this.question.parameters[QuestionParameter.HintText];
    const defaultQuestionHintText =
      this.question.questionType === QuestionType.CHECKBOX
        ? this.$t("message-checkbox-hint")
        : this.$t("message-radio-hint");
    return parameterQuestionHintText ?? defaultQuestionHintText;
  }

  get questionDetails(): string {
    return `${this.question.questionText}. ${this.questionHintText}.`;
  }

  get choiceAnswerComponent(): VueComponent {
    if (this.question.questionType === QuestionType.CHECKBOX) return this.checkboxAnswerView;
    return this.radioButtonAnswerView;
  }

  get isChoiceQuestion(): boolean {
    return this.question.questionType === QuestionType.CHECKBOX || this.question.questionType === QuestionType.RADIO;
  }

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
