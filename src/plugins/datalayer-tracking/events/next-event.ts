import { Advisor } from "@zoovu/runner-browser-api";
import { BaseEvent } from "./base-event";
import { EventNames } from "../event-names";
import { AdviceObject } from "../tracking-objects";

export class NextEvent extends BaseEvent {
  constructor(advisor: Advisor, answers: ReadonlyArray<AdviceObject>) {
    super(advisor, EventNames.NEXT);

    this.answers = answers;
  }
}
