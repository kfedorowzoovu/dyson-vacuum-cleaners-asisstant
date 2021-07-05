<template>
  <div v-if="isActiveSection" :id="advisor.advisorNavigation.currentSection.mid" :class="classList">
    <section class="top-navigation">
      <component
        :is="pageSelectorView"
        v-if="showPageSelectorAboveMainSection"
        :navigation="advisor.advisorNavigation"
      />
    </section>

    <div class="section-main-content">
      <slot name="main-content" />
    </div>

    <section>
      <component
        :is="pagesNavigationView"
        v-if="showNavigationBelowMainSection && isQuestionnaire"
        :navigation="advisor.advisorNavigation"
        :show-page-selector="showPageSelectorBetweenNavigationButtons"
      />
    </section>

    <section>
      <slot name="footer" />
    </section>
  </div>
</template>

<script lang="ts">
import { Advisor, Component, InjectComponent, Prop, SectionType, VueComponent } from "@zoovu/runner-browser-api";
import { AdvisorSectionView } from "@zoovu/runner-web-design-base";

@Component({})
export default class AdvisorSectionViewExtended extends AdvisorSectionView {
  @InjectComponent("PagesNavigationView")
  pagesNavigationView: VueComponent;

  @InjectComponent("StartOverButtonView")
  startOverButtonView: VueComponent;

  @InjectComponent("PageSelectorView")
  pageSelectorView: VueComponent;

  @InjectComponent("PdfDownloadButtonView")
  pdfDownloadButtonView: VueComponent;

  @Prop()
  advisor: Advisor;

  @Prop()
  sectionType: SectionType;

  @Prop({ default: true })
  showNavigationBelowMainSection: boolean;

  @Prop({ default: true })
  showPageSelectorBetweenNavigationButtons: boolean;

  @Prop({ default: true })
  showPageSelectorAboveMainSection: boolean;

  @Prop()
  rootElementClass: string;

  get isActiveSection(): boolean {
    return this.advisor.advisorNavigation.currentSection.type === this.sectionType;
  }

  get classList(): ReadonlyArray<string | Record<string, unknown>> {
    return [this.rootElementClass, this.componentStyle.container, `section-type--${this.sectionType.toLowerCase()}`];
  }

  get isPdfButtonVisible(): boolean {
    return this.pdfConfiguration && this.pdfConfiguration.enabled && this.isResultPage;
  }

  get isQuestionnaire(): boolean {
    return this.advisor.advisorNavigation.currentSection.type === SectionType.QUESTIONNAIRE;
  }

  get isResultPage(): boolean {
    return this.advisor.advisorNavigation.currentSection.type === SectionType.RESULTS_PAGE;
  }

  get isFirstStep(): boolean {
    return this.advisor.flowStepsNavigation.currentStepIndex === 0;
  }
}
</script>
