<template>
  <component
    :is="transitionComponent"
    :name="transitionName"
    appear
    @beforeEnter="onBeforeEnter"
    @afterEnter="onAfterEnter"
  >
    <div
      v-if="answer && (!answer.disabled || componentConfiguration.showDisabled)"
      :id="answer.mid + '-wrapper'"
      :class="[componentStyle.container, componentStateClasses, answerWrapperClass, animationClass]"
      class="answer"
      tabindex="0"
      :style="answerWrapperStyle"
      :role="inputType"
      :aria-checked="answer.selected"
      @keyup.enter="enterPressed"
      @keyup.space="enterPressed"
      @keyup.left="focusPreviousAnswer"
      @keyup.right="focusNextAnswer"
      @focusin="cleanSelectionMessage"
      @click="handleAnswerClick"
    >
      <label ref="choiceAnswerLabel" :data-info-text="answer.infoText" :for="answer.mid">
        <span
          v-if="areImagesAvailable() && doesSomeAnswerHaveImage"
          ref="imageBoxElement"
          class="answer-image"
          :style="{ height: `${imageHeight}` }"
        >
          <img
            v-if="showImage"
            class="image-element"
            :src="imageUrl(answer)"
            :alt="imageAltText(answer)"
            aria-hidden="true"
          />
        </span>
        <span class="answer-content">
          <component
            :is="infoText"
            v-if="answer.hasInfoText && infoTextShown && !isMobile"
            class="answer-info-text"
            :text="infoTextContent"
          />
          <span class="answer-selection-button"></span>
          <span ref="selectedInfo" role="region" aria-live="assertive" class="hidden-description"></span>
          <span class="hidden-description">{{ hiddenDescription(answer) }}</span>

          <span
            ref="answerTextElement"
            v-dompurify-html="answer.answerText"
            class="answer-text"
            aria-hidden="true"
            :style="{ height: `${answerTextHeight}` }"
          />
          <i
            v-if="answer.hasInfoText"
            v-tooltip="infoTextTooltipConfiguration"
            class="answer-info-text-trigger"
            tabindex="0"
            @click.stop.prevent="onInfoTextTriggerClick"
          ></i>
          <span class="icon-container"><IconTick /></span>
        </span>
      </label>
      <component
        :is="modal"
        v-if="answer.hasInfoText && infoTextShown && isMobile"
        :status="infoTextShown"
        type="infotext"
        class="answer-info-text-modal"
        @close-modal="hideInfoText"
      >
        <span slot="header" v-dompurify-html="answer.answerText"></span>
        <span slot="body" v-dompurify-html="answer.infoText"></span>
      </component>
    </div>
  </component>
</template>

<script lang="ts">
import {
  AnimationsAndTransitionsConfiguration,
  ChoiceAnswerView,
  TransitionStyle,
} from "@zoovu/runner-web-design-base";
import {
  Answer,
  Component,
  InjectComponent,
  Prop,
  VueComponent,
  Vue,
  ComponentConfig,
} from "@zoovu/runner-browser-api";
import { vTooltip } from "@zoovu/design-system/src/plugins";
import { isMobile } from "@zoovu/design-system/src/helpers";
import { sanitize } from "dompurify";
import { AnswerAnimationStyleClass, getAnimationClass } from "@/styles/abstract/animation";
import { getTransitionName } from "@/styles/abstract/transition";
import { TooltipConfiguration, whitelistedAttributes } from "@/types";
import { hideHorizontalOverflow, restoreHorizontalOverflow } from "@/services/overflow-service";
import { AnswerParameter, Nullable } from "@/components/types";
import InvisibleWrapper from "./invisible-wrapper.vue";
import { IconTick } from "./svgs";
import { focusNextAnswer, focusPreviousAnswer } from "./utils";

@Component({
  components: { IconTick },
  directives: {
    tooltip: vTooltip.directives.tooltip,
  },
  name: "ChoiceAnswerView",
  mixins: [ChoiceAnswerView],
})
export default class ChoiceAnswerViewExtended extends Vue {
  @InjectComponent("Modal")
  modal!: VueComponent;

  @ComponentConfig(AnimationsAndTransitionsConfiguration)
  animationsAndTransitionsConfiguration!: AnimationsAndTransitionsConfiguration;

  @Prop()
  answer!: Answer;

  @Prop()
  answerTextHeight!: string;

  @Prop()
  imageHeight!: string;

  infoTextShown = false;

  isMobile = isMobile();

  minAnswersPerRow = 1;

  transitionDelayEnabled = false;

  focusNextAnswer = focusNextAnswer;

  focusPreviousAnswer = focusPreviousAnswer;

  imageAltText = (answer: Answer): string =>
    answer?.parameters[AnswerParameter.AltName] || `${answer.answerText} image`;

  imageUrl = (answer: Answer): string => `${answer.images[0]}`;

  hiddenDescription = (answer: Answer): string => {
    return `${answer.answerText}.`;
  };

  get answerIndex(): number {
    return this.answer.question.answers.indexOf(this.answer);
  }

  get answerWrapperStyle(): Record<string, string> {
    return {
      ...(this.transitionDelayEnabled ? { transitionDelay: `${this.answerIndex * 100}ms` } : {}),
      width: this.answerWrapperWidth,
    };
  }

  get animationClass(): AnswerAnimationStyleClass {
    if (this.animationsAndTransitionsConfiguration.animationsEnabled) {
      return getAnimationClass(this.animationsAndTransitionsConfiguration.animationStyle.selected);
    }
    return AnswerAnimationStyleClass.NO_ANIMATION;
  }

  get numberOfAnswers(): number {
    return this.answer.question.answers.length;
  }

  get answerWrapperWidth(): string {
    const maxAllowedAnswersPerRow = 4;
    const perRow = this.numberOfAnswers < maxAllowedAnswersPerRow ? this.numberOfAnswers : maxAllowedAnswersPerRow;
    const gutter = 14;
    return `calc( ${100 / perRow}% - ${gutter}px )`;
  }

  get containerDivId(): string {
    return `#${this.$root.containerDivId} > div`;
  }

  get infoTextTooltipConfiguration(): TooltipConfiguration {
    return this.isMobile
      ? {}
      : {
          autoHide: false,
          content: sanitize(this.answer.infoText, { ADD_ATTR: whitelistedAttributes }),
          container: this.containerDivId,
          delay: {
            show: 0,
            hide: 2000,
          },
        };
  }

  get selectedTransitionStyle(): TransitionStyle {
    return this.animationsAndTransitionsConfiguration.transitionStyle.selected;
  }

  get transitionComponent(): string | VueComponent {
    if (
      this.animationsAndTransitionsConfiguration.transitionsEnabled &&
      (this.selectedTransitionStyle === TransitionStyle.SLIDE_LEFT ||
        this.selectedTransitionStyle === TransitionStyle.FADE_AND_SLIDE_LEFT)
    ) {
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

  disableTransitionDelay(): void {
    this.transitionDelayEnabled = false;
  }

  enableTransitionDelay(): void {
    this.transitionDelayEnabled = true;
  }

  hideInfoText(): void {
    this.infoTextShown = false;
  }

  onAfterEnter(): void {
    if (this.answerIndex === this.answer.question.answers.length - 1) {
      restoreHorizontalOverflow();
    }

    this.disableTransitionDelay();
  }

  onBeforeEnter(): void {
    if (this.answerIndex === 0) {
      hideHorizontalOverflow();
    }

    this.enableTransitionDelay();
  }

  onInfoTextTriggerClick(): void {
    if (!this.isMobile) return;
    this.showInfoText();
  }

  showInfoText(): void {
    this.infoTextShown = true;
  }

  async handleAnswerClick(): void {
    const selectBehavior =
      this.answer.selected && this.inputType !== "radio"
        ? `${this.$t("message-ada-deselecting-answer")}`
        : `${this.$t("message-ada-selecting-answer")}`;
    const nextButtonElement: Nullable<HTMLElement> = this.$root.$el.querySelector(".navigation-next-button");
    await this.$nextTick();
    this.$refs.selectedInfo.innerText = `${selectBehavior}: ${this.answer.answerText}`;
    this.$emit("answer-select");
    if (nextButtonElement && this.inputType === "radio") {
      nextButtonElement.focus();
    }
  }

  cleanSelectionMessage(): void {
    this.$refs.selectedInfo.innerText = "";
  }
}
</script>
