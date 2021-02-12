<template>
  <div :id="question.mid" :class="[componentStyle.container, componentStateClasses]" class="file-question">
    <p v-dompurify-html="question.questionText" />
    <component :is="questionValidationMessageView" :question="question" />
    <div class="file-question__files">
      <div class="file-question__input-file">
        <label
          v-dompurify-html="loading ? $t('message-loading-status') : $t('message-file-upload-question-select-files')"
          :for="`input-${question.mid}`"
        ></label>
        <input
          v-if="!loading"
          :id="`input-${question.mid}`"
          ref="file"
          class="visually-hidden"
          multiple
          type="file"
          :accept="question.accepts.join(',')"
          @click="onClickFileInput"
          @change="onChangeFileInput"
        />
        <p
          v-if="numberOfFilesIsExceeding"
          v-dompurify-html="
            $t('message-file-upload-question-max-files', {
              fileLimit: question.maxFiles,
            })
          "
          class="file-question__validation-message file-question__exceeding-files-count-message"
        ></p>
        <p
          v-if="someFileSizeIsExceedingLimit"
          v-dompurify-html="
            $t('message-file-upload-question-max-filesize', {
              fileSizeMBLimit: question.fileSize,
            })
          "
          class="file-question__validation-message file-question__exceeding-limit-file-size-message"
        ></p>
        <p
          v-if="someFileIsNotImage"
          v-dompurify-html="
            $t('message-file-upload-question-not-image', {
              fileExtendionsAllowed: `${question.extensions}`.replaceAll(',', ', '),
            })
          "
          class="file-question__validation-message file-question__not-image-message"
        ></p>
      </div>
      <div class="file-question__preview-list">
        <div v-for="{ file, thumbnail } in validFilesOnly" :key="file.name" class="file-question__preview-item">
          <img v-if="thumbnail" :src="thumbnail" :alt="file.name" />
          <div class="file-question__status">
            <div class="file-question__status-description">
              <span>{{ file.name }}</span>
              <span class="file-size">{{ getFormattedFileSize(file.size) }}</span>
            </div>
            <progress max="100" :value="statusBar"></progress>
          </div>
          <button type="button" class="file-question__image-remove" @click="onClickRemove(file.name)">
            <component :is="baseSvg" :height="24" :width="24" :name="'icon-cross'"><icon-cross /></component>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Watch } from "@zoovu/runner-browser-api";
import { FileUploadQuestionView } from "@zoovu/runner-web-design-base";

@Component
export default class FileUploadQuestionViewExtended extends FileUploadQuestionView {
  interval: ReturnType<typeof setInterval> = null;

  statusBar = 0;

  @Watch("statusBar")
  onPropertyChanged(value: number): void {
    if (value === 100) {
      clearInterval(this.interval);
    }
  }

  // returns the bytes formatted in KB, MB, or GB
  getFormattedFileSize = (bytes: number): string => {
    if (bytes === 0) {
      return "0.00 B";
    }
    // get the index (and the max power) into the units abbreviation string " KMGTP" e.g: 0=B 1=KB, 2=MB...
    const e = Math.floor(Math.log(bytes) / Math.log(1024));
    // with e variable, we know what is the max power to divide the file size
    return `${(bytes / 1024 ** e).toFixed(2)} ${" KMGTP".charAt(e)}B`;
  };

  setBarStatus(): void {
    this.interval = setInterval(() => {
      this.statusBar += 1;
    }, 10);
  }

  onChangeFileInput(event: Event): void {
    this.statusBar = 10;
    this.selectedFiles = this.fileUploadImages;
    this.fileUploadImages = Array.from(event.target.files).map((file) => {
      const URL = window.URL || window.webkitURL;
      let thumbnail = "";
      if (URL && URL.createObjectURL) {
        thumbnail = URL.createObjectURL(file);
      }
      return {
        file,
        thumbnail,
      };
    });

    if (event.target.files.length) {
      this.selectedFiles = this.fileUploadImages;
      this.validateFiles();
      this.setQuestionSelection();
    } else {
      this.fileUploadImages = this.selectedFiles;
    }
    this.setBarStatus();
  }
}
</script>
