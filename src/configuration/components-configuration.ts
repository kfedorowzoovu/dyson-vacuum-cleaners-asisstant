/* eslint-disable import/prefer-default-export */
import { ComponentsConfiguration as BaseComponentsConfiguration } from "@zoovu/runner-web-design-base";
import CustomizedStandardTextsConfiguration from "./customized-standard-texts";
import CustomizedProductButtonConfiguration from "./customized-button-configuration";
import CustomizedRatingConfiguration from "./customized-rating-configuration";

/**
 * @additionalProperties false
 */
export class ComponentsConfiguration extends BaseComponentsConfiguration {
  public standardTexts?: CustomizedStandardTextsConfiguration = new CustomizedStandardTextsConfiguration();

  public productButtonConfiguration?: CustomizedProductButtonConfiguration = new CustomizedProductButtonConfiguration();

  public productRating?: CustomizedRatingConfiguration = new CustomizedRatingConfiguration();
}
