<template>
  <div :id="advisor.mid" :class="[componentStyle.container]">
    <component
      :is="questionnaireView"
      :advisor="advisor"
      :show-page-selector-between-navigation-buttons="false"
      :show-page-selector-above-main-section="true"
    />
    <component :is="resultsSectionView" :advisor="advisor" :show-top-product="true" :show-page-selector="true" />
    <component :is="comparisonView" :comparison-manager="advisor.comparisonManager" />
    <component :is="pdfContentView" v-if="isPdfMarkupShown" v-show="false" :advisor="advisor" />
  </div>
</template>

<script lang="ts">
import { ComponentConfig, Component, ComponentStyle, ComponentStyleDefinition } from "@zoovu/runner-browser-api";
import {
  AdvisorView as BaseAdvisorView,
  ColorsConfiguration,
  TopProductConfiguration,
  FontsConfiguration,
  CustomCSSConfiguration,
} from "@zoovu/runner-web-design-base";
import CustomizedStandardTextsConfiguration from "../configuration/customized-standard-texts";

@Component({})
export default class AdvisorView extends BaseAdvisorView {
  @ComponentStyle()
  componentStyle: ComponentStyleDefinition;

  @ComponentConfig(ColorsConfiguration)
  colors: ColorsConfiguration;

  @ComponentConfig(FontsConfiguration)
  fonts: FontsConfiguration;

  @ComponentConfig(CustomizedStandardTextsConfiguration)
  standardTexts: CustomizedStandardTextsConfiguration;

  @ComponentConfig(CustomCSSConfiguration)
  customCSSConfiguration: CustomCSSConfiguration;

  @ComponentConfig(TopProductConfiguration)
  topProductConfiguration: TopProductConfiguration;
}
</script>
<style lang="scss">
.answers-wrapper .answer .answer-content {
  background: linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 70%, rgba(0, 0, 0, 0.8) 100%);
  padding: 0px;
  justify-content: center;
}

div[Id^='question-']>section>p>span {
  color: #656565;
}

.page-selector-wrapper button.visited {
  border-color: #656565;
}

.subQuestion {
  font-size: 0.8em;
  color: #656565;
}

.product-top-tile {
  background-color: black !important;
  padding: 5px;
}

.product-button.add-to-cart-button {
  text-transform: unset !important;
  background-color: #656565;
  color: black;
}

.answers-wrapper .answer .answer-image {
  max-height: calc(100% - 0px);
}

.top-product .product-image a,
.product .product-image a {
  max-width: 100%;
}

.product-button.go-to-product-button {
  background-color: rgb(121, 185, 40) !important;
  border-color: #79b928;
  color: #fff;
  text-transform: unset;
  border: none;
  cursor: pointer;
  font-family: "Dyson.ttf" !important;
  font-size: 14.4px !important;
}

.product-button.go-to-product-button:hover {
  background-color: #65A01C;
  border-color: #65A01C;
  text-decoration: none;
}

.answers-wrapper .answer .answer-text {
  height: auto !important;
  display: block;
  font-weight: 500 !important;
  padding-left: 20px;
  width: 100%;
}

button.navigation-next-button,
button.navigation-back-button,
button.start-over-button {
  border: 1px solid #ececec;
  color: rgb(132, 132, 132) !important;
  background-color: transparent !important;
}

.compare-wrapper label,
.compare-wrapper .start-compare-button,
.product-compare-wrapper label,
.product-compare-wrapper .start-compare-button {
  background-color: transparent !important;
  color: black !important;
  text-transform: unset !important;
}

div.product {
  background-color: #fbfbfb;
  border: 1px solid #ececec;
}

div.product:before {
  content: "Latest Technology";
  background-color: black;
  color: white;
  position: relative;
  top: -3.5rem;
  padding: 0.25rem 0.75rem;
}

.product-properties .positive-property i {
  left: 2px;
  top: 2px !important;
  background: url(//d3smx8fpgq4j0l.cloudfront.net/zoovu/3d2f2e3c-8eab-4f23-a76f-eb683109d3ba) 0% 0% / 14px no-repeat !important;
}

button.navigation-next-button {
  color: black !important;
}

.top-product .product-button.go-to-product-button {
  font-weight: bold;
  font-size: 20px;
}

.answer {
  box-shadow: 0 1px 3px rgba(0, 0, 0, .25);
}

button.navigation-next-button:after,
.product-button.go-to-product-button:after {
  content: " ";
  background-repeat: no-repeat;
  display: inline-block;
  margin-left: 20px;
  position: absolute;
  width: 30px;
  top: 9px;
  height: 30px;
}

.product-button.go-to-product-button:after {
  top: 25px;
  margin-left: 10px;
}

.top-product .product-button.go-to-product-button:after {
  top: 38px;
}

.recommendation-navigation button.navigation-next-button:after {
  display: none !important;
}

.top-product .product-details .product-price .price {
  color: black !important;
  font-weight: bold !important;
  font-size: x-large;
}

.product-attributes-toggle {
  display: none !important;
}

.top-product .product-details .rating.product__rating {
  order: 4;
}

.top-product .product-price,
.product .price-compare-wrapper {
  padding: 0px 0px 5px;
  margin-top: 10px;
  order: 5 !important;
}

/* page selector */

button.page-selector.visited::after {
  display: none;
}

button.page-selector::after {
  display: none;
}

.page-selector-wrapper {
  width: 100%;
  margin: 0 auto;
  padding-top: 10px;
  padding-bottom: 30px;
}

@media (min-width: 1361px) {
  .top-product .product-footer {
    margin: 0px 0px 0px auto !important;
  }
}

@media (max-width: 1361px) {
  .page-selector-wrapper {
    width: 32%;
  }
}

.page-selector-wrapper button>section {
  visibility: hidden !important;
}

div[id$='-sections-navigation-section-RESULTS_PAGE'] .top-navigation {
  display: block;
}

div[id$='-sections-navigation-section-RESULTS_PAGE'] .start-over-button {
  display: inline-block;
  float: right;
  position: relative;
}

div[id$='-sections-navigation-section-RESULTS_PAGE'] .pages-navigation-wrapper {
  display: inline-block;
}

div[id$='-sections-navigation-section-RESULTS_PAGE'] .page-selector-wrapper {
  padding: 0px !important;
}

.top-product {
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, .25);
}

.advice-top-products>h3,
.sort-wrapper p {
  color: white !important;
}

#question-1227364 .answer,
#question-1227366 .answer,
#question-1227365 .answer {
  width: calc(25% - 14px) !important;
}

#question-1227364 .answers-wrapper,
#question-1227366 .answers-wrapper,
#question-1227365 .answers-wrapper {
  justify-content: center !important;
}

#question-1227364 .answers-wrapper::after,
#question-1227366 .answers-wrapper::after,
#question-1227365 .answers-wrapper::after {
  flex: unset !important;
}

div[id^='advisor-'][id$='-sections-navigation-section-RESULTS_PAGE']:before {
  display: inline-block;
  position: absolute;
  background: url(//d3smx8fpgq4j0l.cloudfront.net/zoovu/9cecb9be-2901-4741-8bc9-93d23b2c8593) 0% 0% / contain no-repeat;
  content: "";
  width: 100%;
  left: 0px;
  height: 100%;
}

@media (max-width: 768px) {
  .page-selector-wrapper {
    width: 100%;
  }
  #question-1227364 .answer,
  #question-1227366 .answer,
  #question-1227365 .answer {
    width: 100% !important;
  }
  .container-1-0-58 {
    margin: 0px auto;
    padding: 0px;
  }
  div[Id^='question-']>section>p {
    width: 80%;
    text-align: center;
    margin: 15px auto 30px auto;
  }
  .container-0-0-43 {
    background-color: #fafafa;
    margin: -3px -8px 9px -8px;
    padding-top: 0.5px;
    padding-bottom: 6px;
  }
  /* QUESTIONS */
  .answers-wrapper {
    flex-flow: column wrap;
    margin-bottom: 11px !important;
    margin: 0px -13px 75px !important;
  }
  .question-type-hint {
    font-size: 15px !important;
  }
  .answers-wrapper .answer {
    margin: 0px 0px 15px !important;
    width: 100% !important;
  }
  span.page-selector-wrapper {
    padding: 0px;
  }
  button.page-selector.visited:nth-child(1) {
    max-width: min-content;
  }
  span.answer-text {
    z-index: 1 !important;
    padding-top: 26px !important;
    padding-right: 0px !important;
    padding-bottom: 26px !important;
    color: rgb(252, 252, 252) !important;
  }
  .container-0-0-43>p {
    margin: 35px 0px 30px;
    font-weight: 500;
    background-color: #fafafa;
    font-size: 25px;
  }
  .pages-navigation-wrapper {
    margin-top: -22% !important;
    padding-top: 6px;
    padding-bottom: 12px;
  }
  .product-button.go-to-product-button {
    border: none !important;
    color: #000 !important;
    font-weight: bold !important;
  }
  button.start-over-button {
    text-transform: capitalize !important;
    border: none !important;
    font-weight: bold !important;
    height: 50px !important;
    margin-bottom: 12px;
    display: inline-block;
    position: absolute !important;
    top: 0;
    right: 0;
    float: right !important;
    width: auto !important;
    color: black !important;
    min-width: 60px !important;
    background: none !important;
    padding-top: 9% !important;
    text-decoration: underline !important;
  }
  button.navigation-next-button {
    text-transform: capitalize !important;
    border: none !important;
    color: #C0C0C0 !important;
    font-weight: bold !important;
    background-color: #fafafa !important;
    width: 100% !important;
    padding: 17px 10px !important;
  }
  button.navigation-back-button {
    width: 15% !important;
    color: rgb(0, 0, 0) !important;
    border: none !important;
    display: inline-block !important;
    float: left !important;
    position: absolute !important;
    top: 0;
    left: 0;
    padding-top: 9% !important;
    font-weight: bold !important;
    text-transform: capitalize !important;
    text-decoration: underline;
    min-width: 60px !important;
    padding: 12px 10px;
  }
  /* RESULTS PAGE */
  div[id^="advisor-"][id$="-sections-navigation-section-RESULTS_PAGE"]::before {
    background: none !important;
  }
  .advice-top-products>h3,
  .sort-wrapper p {
    color: black !important;
  }
  .top-product__header {
    color: black !important;
    margin-top: 0px !important;
    padding-bottom: 25px !important;
  }
  a.product-name {
    margin-top: 40px !important;
    text-align: left;
    font-weight: 100 !important;
    margin-left: 15px;
    padding-left: 0%;
    max-width: fit-content;
  }
  .properties-title {
    display: none;
  }
  .recommendation-navigation button:last-child {
    margin-top: 5% !important;
  }
  /* RESULTS PAGE - Top Product*/
  div[id$="-sections-navigation-section-RESULTS_PAGE"] .start-over-button {
    margin-top: -10px !important;
    left: 0 !important;
    float: left !important;
    padding-top: 14% !important;
    padding-left: 0% !important;
  }
  div[id$="-sections-navigation-section-RESULTS_PAGE"] .navigation-back-button {
    display: none !important;
  }
  .top-product {
    margin-top: -25px;
    border: 1px solid #000 !important;
    background: white;
    padding-bottom: 0px;
  }
  .product-details {
    margin-top: -70px;
  }
  .product-properties {
    margin: 5px 11px 0px !important;
  }
  .sort-wrapper {
    display: block !important;
  }
  .top-product .product-button.go-to-product-button {
    font-size: 19px !important;
    font-weight: bold;
    height: 60px !important;
    margin: inherit !important;
    font-size: 19px !important;
  }
  .product-footer {
    background: #d8d8d8;
    margin-bottom: 0px;
    margin-top: 13px !important;
    order: 5;
    width: 100% !important;
  }
  .top-product .product-details .product-price .price {
    padding-left: 15px;
    float: left;
  }
  .top-product .product-details .rating.product__rating {
    text-align: left;
    padding-left: 15px;
  }
  /* RESULTS PAGE - Alternative Product*/
  div.product::before {
    left: 2%;
  }
  .products-wrapper .product {
    border: 1px solid #d3d3d3;
    background: #fafafa;
    padding: 24px 0px 0px 0px !important;
  }
  .products-wrapper .product-details {
    display: flex;
    flex-flow: column wrap;
    margin-top: -25px !important;
  }
  .cluster-headline {
    padding-bottom: 20px;
  }
  .products-wrapper .product-details .properties-title {
    margin-bottom: 19px;
    align-self: center;
  }
  .products-wrapper .product-details .product-footer {
    background: #d8d8d8;
    margin-bottom: 0px;
    margin-top: 13px !important;
  }
  .products-wrapper .product-details .product-properties {
    padding: 0px 5px !important;
  }
  .products-wrapper .product-details .price-compare-wrapper {
    margin-top: -10px !important;
    margin-bottom: -15px;
  }
  .products-wrapper .product-details .product-footer .product-button.go-to-product-button {
    font-size: 19px !important;
    font-weight: bold;
    height: 60px !important;
  }
  .cluster.cluster-alternatives .products-wrapper .product .product-price {
    position: relative;
    top: 56.8%;
    left: -34.9%;
  }
  .price-compare-wrapper {
    text-align: center;
    order: 4;
  }
  .cluster.cluster-alternatives .products-wrapper .rating {
    position: relative;
    width: 40%;
    top: -18%;
  }
  .cluster.cluster-alternatives .products-wrapper .product .product-price .price {
    font-size: x-large;
  }
  .cluster.cluster-alternatives .products-wrapper .product a.product-name {
    line-height: 1.2;
    text-decoration: none;
    font-size: 28.8px;
    color: rgb(0, 0, 0);
    padding-bottom: 15px;
    font-weight: 100;
    text-align: left;
    order: 2;
    padding-left: 0.5%;
  }
}
</style>
