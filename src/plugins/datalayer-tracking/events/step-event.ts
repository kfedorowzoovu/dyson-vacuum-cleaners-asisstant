import { Advisor } from "@zoovu/runner-browser-api";
import { BaseEvent } from "./base-event";
import { EventNames } from "../event-names";
import { ProductObject } from "../tracking-objects";

export class StepEvent extends BaseEvent {
  constructor(advisor: Advisor, productsList: ReadonlyArray<ProductObject>) {
    super(advisor, EventNames.STEP);

    if (productsList.length) {
      this.productsList = productsList;
    }
  }
}
