import {
  CurrencyPropertyDisplayStrategy,
  Marking,
  AdvisorLocalizationSettingsDefinition,
} from "@zoovu/runner-browser-api";

export default function (localeSettings: AdvisorLocalizationSettingsDefinition, value: number): string {
  return new CurrencyPropertyDisplayStrategy(localeSettings).constructForResults(
    {
      property: "n/a",
      propertyTranslation: "n/a",
      propertyType: "DEC",
      value,
    },
    Marking.NOT_APPLICABLE
  ).displayValue;
}
