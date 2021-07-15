<template>
  <div :id="advice.mid" ref="recommendationView" :class="componentStyle.container" class="advice">
    <div v-if="advice.hasAdvice" :id="advice.currentPage.mid" class="advice-recommended">
      <div v-if="!areTopProductsAvailable" :class="filterWrapperClass">
        <component
          :is="adviceFiltersView"
          v-if="canRenderFilters"
          :filters="filters"
          @reset-all-filters="onResetFilters"
        ></component>
      </div>
      <div :class="adviceWrapperClass">
        <div :class="filterWrapperClass">
          <component
            :is="adviceFiltersView"
            v-if="canRenderFilters && areTopProductsAvailable"
            :filters="filters"
            @reset-all-filters="onResetFilters"
          ></component>
          <div
            v-if="topProducts.length && advice.currentPage.pageNumber === 0"
            :id="`${advice.currentPage.mid}-cluster-top-products`"
            class="advice-top-products"
          >
            <h3 v-dompurify-html="$t('message-result-top-product-header')" class="top-product__header"></h3>
            <h4
              v-if="hasSubHeaderTop"
              v-dompurify-html="$t('message-result-top-product-subheader')"
              class="top-product__subheader"
            ></h4>
            <component
              :is="TopProductView"
              v-for="topProductRecommendation in topProducts"
              :key="topProductRecommendation.mid"
              :recommendation="topProductRecommendation"
            />
          </div>
        </div>

        <template v-for="(cluster, index) in currentPageClustersExtended">
          <div
            v-if="cluster.products.length"
            :key="`sort-${cluster.clusterNumber}`"
            :class="clusterWrapperClass(index)"
          >
            <div :id="cluster.mid" class="cluster" :class="cluster.classList">
              <h3 v-dompurify-html="cluster.clusterHeadline" class="cluster-headline"></h3>
              <h4
                v-if="cluster.clusterSubHeadline"
                v-dompurify-html="cluster.clusterSubHeadline"
                class="cluster-sub-headline"
              ></h4>
              <div class="products-wrapper">
                <component
                  :is="productRecommendationView"
                  v-for="recommendation in cluster.products"
                  :key="recommendation.mid"
                  :recommendation="recommendation"
                />
              </div>
            </div>
          </div>
        </template>

        <div
          v-if="topProducts[0]"
          class="caveat"
          v-text="getPropertyValue(topProducts[0], ProductAttributes.CAVEAT)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component,
  ComponentConfig,
  ComponentStyle,
  ComponentStyleDefinition,
  InjectComponent,
  ProductRecommendation,
  Prop,
  Recommendation,
  RecommendationCluster,
  RecommendationSettingsBuilder,
  SectionType,
  Vue,
  VueComponent,
  Watch,
  FlowStep,
} from "@zoovu/runner-browser-api";
import { TopProductConfiguration, AdviceView } from "@zoovu/runner-web-design-base";
import { getPropertyValue } from "@/helpers";
import CustomizedRecommendationConfiguration from "@/configuration/customized-recommendation-configuration";
import { ProductAttributes } from "../configuration/common-configuration";

interface AdditionalClusterData {
  classList: string;
  clusterHeadline: string;
  clusterSubHeadline: string;
}

type RecommendationClusterExtended = RecommendationCluster & AdditionalClusterData;

@Component({
  name: "AdviceView",
  mixins: [AdviceView],
})
export default class AdviceViewExtended extends Vue {
  @ComponentStyle()
  componentStyle: ComponentStyleDefinition;

  @Prop()
  advice: Recommendation;

  @Prop()
  sectionType: SectionType;

  @Prop()
  filters: FlowStep[];

  @InjectComponent("TopProductView")
  TopProductView: VueComponent;

  @InjectComponent("ProductRecommendationView")
  productRecommendationView: VueComponent;

  @InjectComponent("AdviceNavigationView")
  adviceNavigationView: VueComponent;

  @InjectComponent("SortView")
  sortView: VueComponent;

  @InjectComponent("AdviceFiltersView")
  adviceFiltersView: VueComponent;

  @ComponentConfig(CustomizedRecommendationConfiguration)
  configuration: CustomizedRecommendationConfiguration;

  @ComponentConfig(TopProductConfiguration)
  topProductConfiguration: TopProductConfiguration;

  getPropertyValue = getPropertyValue;

  ProductAttributes = ProductAttributes;

  get filterWrapperClass(): Record<string, unknown> {
    return {
      "products-filters-wrapper": this.canRenderFilters,
    };
  }

  get adviceWrapperClass(): Record<string, unknown> {
    return {
      "advice-filters-wrapper": this.canRenderFilters,
    };
  }

  get canRenderFilters(): boolean {
    return (
      this.filters &&
      this.filters.length > 0 &&
      this.advice.hasProducts &&
      this.sectionType === SectionType.RESULTS_PAGE
    );
  }

  get currentRecommendedProductsNumber(): number {
    if (this.sectionType === "QUESTIONNAIRE") {
      return this.configuration.numberOfProductsPerQuestionnairePage;
    }
    if (this.sectionType === "RESULTS_PAGE") {
      return this.configuration.numberOfProductsPerResultsPage;
    }
    return 0;
  }

  get currentTopProductsNumber(): number {
    if (
      this.sectionType === "QUESTIONNAIRE" &&
      this.topProductConfiguration &&
      this.topProductConfiguration.showTopProductsOnQuestionnairePages
    ) {
      return this.topProductConfiguration.numberOfTopProductsPerQuestionnairePage;
    }
    if (
      this.sectionType === "RESULTS_PAGE" &&
      this.topProductConfiguration &&
      this.topProductConfiguration.showTopProductsOnResultsPages
    ) {
      return this.topProductConfiguration.numberOfTopProductsPerResultsPage;
    }
    return 0;
  }

  get topProducts(): ProductRecommendation[] {
    const { currentPage } = this.advice;
    const clusters = (currentPage && currentPage.pageNumber === 0 && currentPage.clusters) || [];
    const fullMatchesCluster = clusters.find((c) => c.clusterNumber === 0);
    const fullMatches = fullMatchesCluster ? fullMatchesCluster.products : [];
    return fullMatches.slice(0, this.currentTopProductsNumber);
  }

  get currentPageClusters(): ReadonlyArray<RecommendationCluster> {
    if (!this.currentTopProductsNumber || this.advice.currentPage.pageNumber !== 0) {
      return this.advice.currentPage.clusters;
    }

    const topProductsNumber: number = this.currentTopProductsNumber;
    let bestProductCount = 0;
    let allProductCount = 0;

    return this.advice.currentPage.clusters.reduce((clusters, currentCluster) => {
      if (!currentCluster.products.length) return clusters;
      if (currentCluster.clusterNumber === 0) bestProductCount += currentCluster.products.length;
      allProductCount += currentCluster.products.length;
      if (topProductsNumber >= allProductCount) {
        const topProducts = this.topProducts.map((product) => product.productId);
        const filteredProducts = currentCluster.products.filter((product) => !topProducts.includes(product.productId));
        clusters.push({ ...currentCluster, products: filteredProducts });
      }
      if (allProductCount > topProductsNumber) {
        const sliceCount = allProductCount - Math.min(topProductsNumber, bestProductCount);
        const newProductsList: ReadonlyArray<ProductRecommendation> = currentCluster.products.filter(
          (product, index, products) => index >= products.length - sliceCount
        );
        clusters.push({ ...currentCluster, products: newProductsList });
      }
      return clusters;
    }, []);
  }

  get currentPageClustersExtended(): ReadonlyArray<RecommendationClusterExtended> {
    return this.currentPageClusters.map((cluster) => ({
      ...cluster,
      ...this.getAdditionalDataForCluster(cluster.clusterNumber),
    }));
  }

  get additionalDataForPerfectMatchesCluster(): AdditionalClusterData {
    return {
      classList: "cluster-perfect-matches",
      clusterHeadline: this.$t("message-result-first-cluster-header") as string,
      clusterSubHeadline: this.$t("message-result-first-cluster-subheader") as string,
    };
  }

  get additionalDataForAlternativesCluster(): AdditionalClusterData {
    return {
      classList: "cluster-alternatives",
      clusterHeadline: this.$t("message-result-first-cluster-header-alternatives") as string,
      clusterSubHeadline: this.$t("message-result-first-cluster-subheader-alternatives") as string,
    };
  }

  get hasSubHeaderTop(): boolean {
    return this.$t("message-result-top-product-subheader") !== "";
  }

  get areTopProductsAvailable(): boolean {
    return this.topProducts.length && this.advice.currentPage.pageNumber === 0;
  }

  @Watch("configuration", { deep: true })
  requestUpdate(): void {
    this.setVisualSettings();
    this.requestAdviceUpdate(true);
  }

  mounted(): void {
    this.setVisualSettings();
    this.requestAdviceUpdate(true);
    this.$root.$refs.recommendationView = this.$refs.recommendationView;
  }

  get indexOfFirstClusterWithProducts(): number {
    return this.currentPageClustersExtended.findIndex(({ products }) => products.length);
  }

  clusterWrapperClass(index: number): Record<string, unknown> {
    return {
      "cluster-wrapper": true,
      "first-cluster-with-products": index === this.indexOfFirstClusterWithProducts,
    };
  }

  getAdditionalDataForCluster(clusterNumber: number): AdditionalClusterData {
    if (clusterNumber === 0) {
      return this.additionalDataForPerfectMatchesCluster;
    }
    return this.additionalDataForAlternativesCluster;
  }

  setVisualSettings(): void {
    const recommendationSettingsBuilder = new RecommendationSettingsBuilder()
      .withNumberOfProductsForSection(SectionType.QUESTIONNAIRE, {
        numberOfProductsPerPage: this.configuration.numberOfProductsPerQuestionnairePage,
        numberOfTopProductsPerPage: this.resolveTopProductsNumber(SectionType.QUESTIONNAIRE),
      })
      .withNumberOfProductsForSection(SectionType.RESULTS_PAGE, {
        numberOfProductsPerPage: this.configuration.numberOfProductsPerResultsPage,
        numberOfTopProductsPerPage: this.resolveTopProductsNumber(SectionType.RESULTS_PAGE),
      });

    if (!this.configuration.showInitialRecommendation) {
      recommendationSettingsBuilder.withInitialRecommendationDisabled();
    }

    this.advice.setRecommendationSettings(recommendationSettingsBuilder.build());
  }

  resolveTopProductsNumber(sectionType: SectionType): number {
    if (this.topProductConfiguration) {
      if (sectionType === SectionType.QUESTIONNAIRE) {
        if (this.topProductConfiguration.showTopProductsOnQuestionnairePages) {
          return this.topProductConfiguration.numberOfTopProductsPerQuestionnairePage;
        }
      }

      if (sectionType === SectionType.RESULTS_PAGE) {
        if (this.topProductConfiguration.showTopProductsOnResultsPages) {
          return this.topProductConfiguration.numberOfTopProductsPerResultsPage;
        }
      }
    }
    return 0;
  }

  requestAdviceUpdate(shouldRunEvenIfPageIsAlreadyLoaded: boolean): void {
    if (shouldRunEvenIfPageIsAlreadyLoaded || !this.advice.currentPage) {
      this.advice.requestUpdate();
    }
  }

  onResetFilters(): void {
    this.$emit("reset-filters");
  }
}
</script>
