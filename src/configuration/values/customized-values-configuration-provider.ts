import { mergeRightAllWithArrays } from "@zoovu/runner-browser-api";
import {
  ConfigurationValues,
  standardTextsConfigurationValues,
  productRatingConfigurationValues,
  productButtonConfigurationValues,
  recommendationConfigurationValues,
  ValuesConfigurationProvider,
} from "@zoovu/runner-web-design-base";
import { CustomConfigurationValues } from "../../types";

export default class CustomValuesConfigurationProvider extends ValuesConfigurationProvider {
  constructor(private readonly customConfigurationValues: { [key: string]: unknown }) {
    super();
  }

  public provide(configurationValues: ConfigurationValues | CustomConfigurationValues): unknown {
    switch (configurationValues) {
      case CustomConfigurationValues.PaymentOptions:
        return this.customConfigurationValues?.paymentOptionsConfiguration || {};
      case ConfigurationValues.StandardTexts:
        return mergeRightAllWithArrays(standardTextsConfigurationValues, this.customConfigurationValues).standardTexts;
      case ConfigurationValues.ProductRating:
        return mergeRightAllWithArrays(productRatingConfigurationValues, this.customConfigurationValues).productRating;
      case ConfigurationValues.ProductButtonSettings:
        return mergeRightAllWithArrays(productButtonConfigurationValues, this.customConfigurationValues)
          .productButtonConfiguration;
      case ConfigurationValues.Recommendation:
        return mergeRightAllWithArrays(recommendationConfigurationValues, this.customConfigurationValues)
          .recommendationSettings;
      default:
        return {};
    }
  }
}
