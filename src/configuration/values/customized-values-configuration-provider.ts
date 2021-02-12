import { mergeRightAllWithArrays } from "@zoovu/runner-browser-api";
import {
  ConfigurationValues,
  standardTextsConfigurationValues,
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
      default:
        return {};
    }
  }
}
