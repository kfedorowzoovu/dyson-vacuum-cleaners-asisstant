import { ComponentConfigurationClass } from "@zoovu/runner-browser-api";
import {
  ProductRatingConfiguration,
  ValuesConfigurationConstructor,
  ConfigurationValues,
} from "@zoovu/runner-web-design-base";
import CustomizedValuesConfigurationProvider from "./values/customized-values-configuration-provider";
import * as ratingConfigurationDiffValues from "../../configuration/rating-configuration-diff.json";

/**
 * @additionalProperties false
 */
@ValuesConfigurationConstructor(
  ConfigurationValues.ProductRating,
  new CustomizedValuesConfigurationProvider(ratingConfigurationDiffValues)
)
@ComponentConfigurationClass("productRating")
export default class CustomizedRatingConfiguration extends ProductRatingConfiguration {}
