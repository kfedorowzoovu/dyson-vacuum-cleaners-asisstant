/* eslint-disable import/prefer-default-export */
import { ComponentsConfiguration as BaseComponentsConfiguration } from "@zoovu/runner-web-design-base";
// important: following paths must be relative (no @ alias)
import PaymentOptionsConfiguration from "./payment-options-configuration";
import CustomizedStandardTextsConfiguration from "./customized-standard-texts";
import CustomizedProductButtonConfiguration from "./customized-button-configuration";
import CustomizedRatingConfiguration from "./customized-rating-configuration";

/**
 * @additionalProperties false
 */
export class ComponentsConfiguration extends BaseComponentsConfiguration {
  public paymentOptionsConfiguration: PaymentOptionsConfiguration = new PaymentOptionsConfiguration();

  public standardTexts?: CustomizedStandardTextsConfiguration = new CustomizedStandardTextsConfiguration();

  public productButtonConfiguration?: CustomizedProductButtonConfiguration = new CustomizedProductButtonConfiguration();

  public productRating?: CustomizedRatingConfiguration = new CustomizedRatingConfiguration();
}
