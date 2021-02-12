import { ComponentConfigurationClass } from "@zoovu/runner-browser-api";
import {
  StandardTextsConfiguration,
  ValuesConfigurationConstructor,
  ConfigurationValues,
} from "@zoovu/runner-web-design-base";
import CustomizedValuesConfigurationProvider from "./values/customized-values-configuration-provider";
import * as standardTextsConfigurationDiffValues from "../../configuration/standard-texts-configuration-diff.json";

/**
 * @additionalProperties false
 */
@ValuesConfigurationConstructor(
  ConfigurationValues.StandardTexts,
  new CustomizedValuesConfigurationProvider(standardTextsConfigurationDiffValues)
)
@ComponentConfigurationClass("standardTexts")
export default class CustomizedStandardTextsConfiguration extends StandardTextsConfiguration {}
