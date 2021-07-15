import { Advisor } from "@zoovu/runner-browser-api";
import { BaseEvent } from "./base-event";
import { EventNames } from "../event-names";
import { AdviceObject, ProductObject } from "../tracking-objects";

export class ResultsEvent extends BaseEvent {
  constructor(advisor: Advisor, productsList: ReadonlyArray<ProductObject>, adviceList: ReadonlyArray<AdviceObject>) {
    super(advisor, EventNames.RESULTS);

    this.product = productsList[0]; // first product of list is always rendered as top product
    this.productsList = productsList;
    this.answers = adviceList;
  }
}
