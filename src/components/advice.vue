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
          v-if="areTopProductsAvailable"
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
  InjectComponent,
  ProductRecommendation,
  RecommendationCluster,
} from "@zoovu/runner-browser-api";
import { TopProductConfiguration, AdviceView } from "@zoovu/runner-web-design-base";
import { getPropertyValue } from "@/helpers";
import CustomizedRecommendationConfiguration from "@/configuration/customized-recommendation-configuration";
import { ProductAttributes } from "@/configuration/common-configuration";
import AdviceFiltersView from "@/components/advice-filters.vue";

interface AdditionalClusterData {
  classList: string;
  clusterHeadline: string;
  clusterSubHeadline: string;
}

@Component
export default class AdviceViewExtended extends AdviceView {
  @ComponentConfig(CustomizedRecommendationConfiguration)
  configuration!: CustomizedRecommendationConfiguration;

  @ComponentConfig(TopProductConfiguration)
  topProductConfiguration!: TopProductConfiguration;

  @InjectComponent("AdviceFiltersView")
  adviceFiltersView!: AdviceFiltersView;

  getPropertyValue = getPropertyValue;

  ProductAttributes = ProductAttributes;

  clusterWrapperClass(index: number): Record<string, unknown> {
    return {
      "cluster-wrapper": true,
      "first-cluster-with-products": index === this.indexOfFirstClusterWithProducts,
    };
  }

  get adviceWrapperClass(): Record<string, unknown> {
    return {
      "advice-filters-wrapper": this.canRenderFilters,
    };
  }

  get areTopProductsAvailable(): boolean {
    return Boolean(this.topProducts.length && this.advice.currentPage.pageNumber === 0);
  }

  get topProducts(): ProductRecommendation[] {
    const { currentPage } = this.advice;
    const clusters = (currentPage && currentPage.pageNumber === 0 && currentPage.clusters) || [];
    const fullMatchesCluster = clusters.find((c) => c.clusterNumber === 0);
    const fullMatches = fullMatchesCluster ? this.notEmptyUnique(fullMatchesCluster.products) : [];
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
      const uniqueProducts = this.notEmptyUnique(currentCluster.products);
      if (currentCluster.clusterNumber === 0) bestProductCount += uniqueProducts.length;
      allProductCount += uniqueProducts.length;
      if (topProductsNumber >= allProductCount) {
        const topProducts = this.topProducts && this.topProducts.map((product) => product.mid);
        const filteredProducts = uniqueProducts.filter((product) => !topProducts.includes(product.mid));
        clusters.push({ ...currentCluster, products: filteredProducts });
      }
      if (allProductCount > topProductsNumber) {
        const sliceCount = allProductCount - Math.min(topProductsNumber, bestProductCount);
        const newProductsList: ReadonlyArray<ProductRecommendation> = uniqueProducts.filter(
          (product, index, products) => index >= products.length - sliceCount
        );
        clusters.push({ ...currentCluster, products: newProductsList });
      }
      return clusters;
    }, []);
  }

  notEmptyUnique(products: ReadonlyArray<ProductRecommendation>): ReadonlyArray<ProductRecommendation> {
    const notEmpty = products.filter((product) => !this.isEmpty(product));
    return notEmpty.reduce(
      (allProducts: ReadonlyArray<ProductRecommendation>, currentProduct: ProductRecommendation) =>
        allProducts.some((product) => product.sku === currentProduct.sku)
          ? [...allProducts]
          : [...allProducts, currentProduct],
      []
    );
  }

  isEmpty = (recommendation: ProductRecommendation) => {
    for (const key in recommendation) return false;
    return true;
  };
}
</script>
