import { ComponentConfigurationClass } from "@zoovu/runner-browser-api";
import {
  ValuesConfigurationConstructor,
  ConfigurationValues,
} from "@zoovu/runner-web-design-base";
import CustomizedValuesConfigurationProvider from "./values/customized-values-configuration-provider";
import * as configurableComponentsConfigurationDiffValues from "../../configuration/configurable-components-configuration-diff.json";
import { CustomConfigurationValues } from '../types';

/**
 * @additionalProperties true
 */

@ValuesConfigurationConstructor(
  (CustomConfigurationValues.ConfigurableComponents as unknown) as ConfigurationValues,
  new CustomizedValuesConfigurationProvider(configurableComponentsConfigurationDiffValues)
)
@ComponentConfigurationClass("configurableComponentsConfiguration")
export default class ConfigurableComponentsConfiguration {
  /**
   *  @title Allow Klarna Payment
   */
  public klarna?: boolean;

  /**
   *  @title Allow Affirm Payment
   */
  public affirm?: boolean;
}
