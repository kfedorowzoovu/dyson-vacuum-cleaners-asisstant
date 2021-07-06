import { ComponentConfigurationClass } from "@zoovu/runner-browser-api";
import {
  RecommendationConfiguration,
  ValuesConfigurationConstructor,
  ConfigurationValues,
} from "@zoovu/runner-web-design-base";
import CustomizedValuesConfigurationProvider from "./values/customized-values-configuration-provider";
import * as recommendationConfigurationDiffValues from "../../configuration/recommendation-configuration-diff.json";

/**
 * @additionalProperties false
 */
@ValuesConfigurationConstructor(
  ConfigurationValues.Recommendation,
  new CustomizedValuesConfigurationProvider(recommendationConfigurationDiffValues)
)
@ComponentConfigurationClass("Recommendation")
export default class CustomizedRecommendationConfiguration extends RecommendationConfiguration {}
