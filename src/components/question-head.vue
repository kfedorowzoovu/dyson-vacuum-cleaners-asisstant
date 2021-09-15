<template>
  <section :class="[componentStyle.container]">
    <div v-if="showImage" class="question-image">
      <i
        v-if="showImage"
        class="image-element"
        :style="{ backgroundImage: 'url(' + question.images[0] + ')' }"
      ></i>
      <h2 class="question-title" tabindex="0">
        <span v-dompurify-html="question.questionText" />
        <i
          v-if="question.infoText"
          v-tooltip="infoTextTooltipConfiguration"
          class="answer-info-text-trigger"
          v-on="mobileInfoTextTrigger"
        ></i>
      </h2>
    </div>
    <h2 v-else class="question-title" tabindex="0">
      <span v-dompurify-html="question.questionText" />
      <i
        v-if="question.infoText"
        v-tooltip="infoTextTooltipConfiguration"
        class="answer-info-text-trigger"
        v-on="mobileInfoTextTrigger"
      ></i>
    </h2>

    <p
      v-if="shouldShowHint"
      v-dompurify-html="questionHintText"
      class="question-type-hint"
    />

    <component :is="questionValidationMessageView" :question="question">
    </component>

    <component
      :is="modal"
      v-if="isMobile && infoTextShown"
      :status="infoTextShown"
      type="infotext"
      class="answer-info-text-modal"
      @close-modal="hideInfoText"
    >
      <span slot="header" v-dompurify-html="question.questionText"></span>
      <span slot="body" v-dompurify-html="question.infoText"></span>
    </component>
  </section>
</template>

<script lang="ts">
import { isMobile } from "@zoovu/design-system/src/helpers";
import {
  Component,
  InjectComponent,
  Prop,
  Question,
  QuestionType,
  Vue,
  VueComponent,
} from "@zoovu/runner-browser-api";
import { QuestionHeadView } from "@zoovu/runner-web-design-base";
import { sanitize } from "dompurify";
import { vTooltip } from "@zoovu/design-system/src/plugins";
import {
  TooltipConfiguration,
  MobileInfoTextTrigger,
  whitelistedAttributes,
} from "@/types";
import { QuestionParameter } from "@/components/types";

@Component({
  name: "QuestionHeadView",
  mixins: [QuestionHeadView],
  directives: {
    tooltip: vTooltip.directives.tooltip,
  },
})
export default class QuestionHeadViewExtended extends Vue {
  @InjectComponent("Modal")
  modal: VueComponent;

  @Prop()
  question: Question;

  isMobile: boolean = isMobile();

  infoTextShown = false;

  get infoTextTooltipConfiguration(): TooltipConfiguration {
    return this.isMobile
      ? {}
      : {
          autoHide: false,
          content: sanitize(this.question.infoText, {
            ADD_ATTR: whitelistedAttributes,
          }),
          container: this.containerDivId,
          delay: {
            show: 0,
            hide: 2000,
          },
        };
  }

  get mobileInfoTextTrigger(): MobileInfoTextTrigger {
    return this.isMobile ? { click: this.showInfoText } : {};
  }

  get containerDivId(): string {
    return `#${this.$root.containerDivId} > div`;
  }

  get questionHintText(): string {
    const parameterQuestionHintText =
      this.question.parameters[QuestionParameter.HintText];
    const defaultQuestionHintText =
      this.question.questionType === QuestionType.CHECKBOX
        ? this.$t("message-checkbox-hint")
        : this.$t("message-radio-hint");
    return parameterQuestionHintText ?? defaultQuestionHintText;
  }

  mounted(): void {
    Vue.nextTick(() => {
      const progress = this.$root.$el.querySelector(".page-number");
      progress.focus();
    });
  }

  hideInfoText(): void {
    this.infoTextShown = false;
  }

  showInfoText(): void {
    this.infoTextShown = true;
  }
}
</script>
