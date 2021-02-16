import { ComponentConfigurationClass } from "@zoovu/runner-browser-api";
import {
  ProductButtonConfiguration,
  ValuesConfigurationConstructor,
  ConfigurationValues,
} from "@zoovu/runner-web-design-base";
import CustomizedValuesConfigurationProvider from "./values/customized-values-configuration-provider";
import * as productButtonConfigurationDiffValues from "../../configuration/product-button-configuration-diff.json";

/**
 * @additionalProperties false
 */
@ValuesConfigurationConstructor(
  ConfigurationValues.ProductButtonSettings,
  new CustomizedValuesConfigurationProvider(productButtonConfigurationDiffValues)
)
@ComponentConfigurationClass("productButtonConfiguration")
export default class CustomizedProductButtonConfiguration extends ProductButtonConfiguration {}
