<template>
  <div v-if="question.hasNotValidAnswer" :class="componentStyle.container">
    <p
      v-dompurify-html="$t(question.validationErrorCodes[0])"
      class="question-validation-message"
      aria-hidden="true"
    ></p>
    <span role="alert" aria-live="assertive" class="hidden-description">{{
      $t(question.validationErrorCodes[0])
    }}</span>
  </div>
</template>

<script lang="ts">
import { Component } from "@zoovu/runner-browser-api";
import { QuestionValidationMessageView as QuestionValidationMessageViewBase } from "@zoovu/runner-web-design-base";

@Component
export default class QuestionValidationMessageView extends QuestionValidationMessageViewBase {}
</script>
