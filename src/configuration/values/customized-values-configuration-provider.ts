import { mergeRightAllWithArrays } from "@zoovu/runner-browser-api";
import {
  ConfigurationValues,
  standardTextsConfigurationValues,
  productRatingConfigurationValues,
  productButtonConfigurationValues,
  ValuesConfigurationProvider,
} from "@zoovu/runner-web-design-base";

export default class CustomValuesConfigurationProvider extends ValuesConfigurationProvider {
  constructor(private readonly customConfigurationValues: { [key: string]: unknown }) {
    super();
  }

  public provide(configurationValues: ConfigurationValues): unknown {
    switch (configurationValues) {
      case ConfigurationValues.StandardTexts:
        return mergeRightAllWithArrays(standardTextsConfigurationValues, this.customConfigurationValues).standardTexts;
      case ConfigurationValues.ProductRating:
        return mergeRightAllWithArrays(productRatingConfigurationValues, this.customConfigurationValues).productRating;
      case ConfigurationValues.ProductButtonSettings:
        return mergeRightAllWithArrays(productButtonConfigurationValues, this.customConfigurationValues)
          .productButtonConfiguration;
      default:
        return {};
    }
  }
}
