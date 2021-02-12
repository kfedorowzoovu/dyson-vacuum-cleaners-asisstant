/* eslint-disable import/prefer-default-export */
import { ComponentsConfiguration as BaseComponentsConfiguration } from "@zoovu/runner-web-design-base";
import CustomizedStandardTextsConfiguration from "./customized-standard-texts";

/**
 * @additionalProperties false
 */
export class ComponentsConfiguration extends BaseComponentsConfiguration {
  public standardTexts?: CustomizedStandardTextsConfiguration = new CustomizedStandardTextsConfiguration();
}
