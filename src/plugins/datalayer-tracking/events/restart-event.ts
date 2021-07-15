import { Advisor } from "@zoovu/runner-browser-api";
import { BaseEvent } from "./base-event";
import { EventNames } from "../event-names";

export class RestartEvent extends BaseEvent {
  constructor(advisor: Advisor) {
    super(advisor, EventNames.RESTART);
  }
}
