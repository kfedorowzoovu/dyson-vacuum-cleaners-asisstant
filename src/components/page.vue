<template>
  <div :class="[componentStyle.container, rootElementClass]">
    <p
      v-if="flowStep.hasStepHeadline && showHeadline && (!isFlowStepSubmitted || !lastFlowStep)"
      v-dompurify-html="flowStep.stepHeadline"
      class="page-title"
    />
    <component
      :is="transitionComponent"
      :duration="transitionDuration"
      :name="transitionName"
      appear
      mode="out-in"
      @beforeEnter="setTransitionDuration"
      @afterLeave="unsetTransitionDuration"
    >
      <div
        v-if="!lastFlowStep || !isFlowStepSubmitted"
        :key="flowStep.mid"
        class="questions-wrapper"
        :class="{ 'multi-answer': flowStepIsOfTypeLead, 'page-submit-in-progress': lastFlowStep && submitIsInProgress }"
      >
        <template v-for="(question, index) in flowStep.questions">
          <component
            :is="choiceQuestionView"
            v-if="question.questionType === QuestionType.RADIO || question.questionType === QuestionType.CHECKBOX"
            :key="question.mid"
            :question="question"
            :is-first-question="isFirstQuestion(index)"
            :is-last-question="isLastQuestion(index)"
          >
          </component>
          <component
            :is="dropDownQuestionView"
            v-else-if="question.questionType === QuestionType.DROPDOWN"
            :key="question.mid"
            :question="question"
            :is-first-question="isFirstQuestion(index)"
            :is-last-question="isLastQuestion(index)"
          >
          </component>
          <component
            :is="sliderQuestionView"
            v-else-if="question.questionType === QuestionType.NUMERIC"
            :key="question.mid"
            :question="question"
            :is-first-question="isFirstQuestion(index)"
            :is-last-question="isLastQuestion(index)"
          >
          </component>
          <component
            :is="rangeQuestionView"
            v-else-if="question.questionType === QuestionType.RANGE"
            :key="question.mid"
            :question="question"
            :is-first-question="isFirstQuestion(index)"
            :is-last-question="isLastQuestion(index)"
          >
          </component>
          <component
            :is="textQuestionView"
            v-else-if="question.questionType === QuestionType.TEXT || question.questionType === QuestionType.EMAIL"
            :key="question.mid"
            :question="question"
            :is-first-question="isFirstQuestion(index)"
            :is-last-question="isLastQuestion(index)"
          >
          </component>
          <component
            :is="longTextQuestionView"
            v-else-if="question.questionType === QuestionType.LONG_TEXT"
            :key="question.mid"
            :question="question"
            :is-first-question="isFirstQuestion(index)"
            :is-last-question="isLastQuestion(index)"
          >
          </component>
          <component
            :is="fileUploadQuestionView"
            v-else-if="question.questionType === QuestionType.FILE_UPLOAD"
            :key="question.mid"
            :question="question"
            :is-first-question="isFirstQuestion(index)"
            :is-last-question="isLastQuestion(index)"
          >
          </component>
          <h4 v-else :key="question.mid"><i>This question type is not supported yet</i></h4>
        </template>
      </div>
    </component>
    <div v-if="lastFlowStep && isFlowStepSubmitted" class="page-submit-success-message-wrapper">
      <p v-dompurify-html="$t('message-lead-submitted-headline')" class="page-submit-success-headline" />
      <p v-dompurify-html="$t('message-lead-submitted-subtitle')" class="page-submit-success-subtitle" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, ComponentConfig, QuestionTypeChecker, VueComponent } from "@zoovu/runner-browser-api";
import {
  AnimationsAndTransitionsConfiguration,
  PageView as PageViewBase,
  TransitionStyle,
} from "@zoovu/runner-web-design-base";
import InvisibleWrapper from "./invisible-wrapper.vue";
import { getTransitionDurationValue, getTransitionName } from "../styles/abstract/transition";

interface TransitionDuration {
  enter?: number;
  leave?: number;
}

@Component
export default class PageView extends PageViewBase {
  @ComponentConfig(AnimationsAndTransitionsConfiguration)
  animationsAndTransitionsConfiguration: AnimationsAndTransitionsConfiguration;

  transitionDuration: TransitionDuration | null = null;

  get selectedTransitionStyle(): TransitionStyle {
    return this.animationsAndTransitionsConfiguration.transitionStyle.selected;
  }

  get someQuestionIsChoiceQuestion(): boolean {
    return this.flowStep.questions.some((question) => QuestionTypeChecker.isChoiceQuestion(question));
  }

  get transitionComponent(): string | VueComponent {
    if (this.animationsAndTransitionsConfiguration.transitionsEnabled) {
      return "transition";
    }
    return InvisibleWrapper;
  }

  get transitionName(): string {
    if (this.animationsAndTransitionsConfiguration.transitionsEnabled) {
      return getTransitionName(this.selectedTransitionStyle);
    }
    return "";
  }

  setTransitionDuration(): void {
    if (this.selectedTransitionStyle === TransitionStyle.SLIDE_LEFT && this.someQuestionIsChoiceQuestion) {
      this.transitionDuration = {
        enter: 0,
        leave: getTransitionDurationValue(this.animationsAndTransitionsConfiguration.transitionSpeed.selected),
      };
    }
  }

  unsetTransitionDuration(): void {
    this.transitionDuration = null;
  }
}
</script>
