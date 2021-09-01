import { ComponentConfigurationClass } from "@zoovu/runner-browser-api";
import {
  ValuesConfigurationConstructor,
  ConfigurationValues,
} from "@zoovu/runner-web-design-base";
import CustomizedValuesConfigurationProvider from "./values/customized-values-configuration-provider";
import * as paymentOptionsConfigurationValues from "../../configuration/payment-options-configuration.json";
import { CustomConfigurationValues } from '../types';

/**
 * @additionalProperties true
 */

@ValuesConfigurationConstructor(
  (CustomConfigurationValues.PaymentOptions as unknown) as ConfigurationValues,
  new CustomizedValuesConfigurationProvider(paymentOptionsConfigurationValues)
)
@ComponentConfigurationClass("paymentOptionsConfiguration")
export default class PaymentOptionsConfiguration {
  /**
   *  @title Allow Klarna Payment
   */
  public klarna?: boolean;

  /**
   *  @title Allow Affirm Payment
   */
  public affirm?: boolean;
}
