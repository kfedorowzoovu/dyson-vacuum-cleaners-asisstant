import { TransitionSpeed, TransitionStyle } from "@zoovu/runner-web-design-base";
import { ComponentsConfiguration } from "../../configuration/components-configuration";

export enum TransitionName {
  FADE = "page-fade",
  SLIDE_LEFT = "answer-slide-left",
  FADE_AND_SLIDE_LEFT = "page-fade-and-answer-slide-left",
}

export function getTransitionName(transitionStyle: TransitionStyle): TransitionName | "" {
  switch (transitionStyle) {
    case TransitionStyle.FADE:
      return TransitionName.FADE;
    case TransitionStyle.SLIDE_LEFT:
      return TransitionName.SLIDE_LEFT;
    case TransitionStyle.FADE_AND_SLIDE_LEFT:
      return TransitionName.FADE_AND_SLIDE_LEFT;
    default:
      return "";
  }
}

enum TransitionDurationValue {
  SLOW = 500,
  MEDIUM = 400,
  FAST = 300,
}

const transitionDurationUnit = "ms";

export function getTransitionDurationValue(transitionSpeed: TransitionSpeed): TransitionDurationValue | 0 {
  switch (transitionSpeed) {
    case TransitionSpeed.SLOW:
      return TransitionDurationValue.SLOW;
    case TransitionSpeed.MEDIUM:
      return TransitionDurationValue.MEDIUM;
    case TransitionSpeed.FAST:
      return TransitionDurationValue.FAST;
    default:
      return 0;
  }
}

export const transitionDuration = (configuration: ComponentsConfiguration): string =>
  getTransitionDurationValue(configuration.animationsAndTransitionsConfiguration.transitionSpeed.selected) +
  transitionDurationUnit;
