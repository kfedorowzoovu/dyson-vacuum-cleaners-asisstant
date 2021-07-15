import { Advisor } from "@zoovu/runner-browser-api";
import { EventNames } from "../event-names";
import { BaseEvent } from "./base-event";
import { AdviceObject } from "../tracking-objects";

export class AdviceEvent extends BaseEvent {
  constructor(advisor: Advisor, advice: AdviceObject) {
    super(advisor, EventNames.ADVICE);
    this.advice = advice;
  }
}
