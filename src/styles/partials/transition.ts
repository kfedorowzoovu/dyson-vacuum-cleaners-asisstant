import { transitionDuration, TransitionName } from "../abstract/transition";

const getTransitionDeclarationBlock = (property: "opacity" | "transform") => ({
  transitionDuration,
  transitionProperty: property,
});

export const pageTransitions = {
  "& .questions-wrapper": {
    [[
      `&.${TransitionName.FADE}-enter-active`,
      `&.${TransitionName.FADE}-leave-active`,
      `&.${TransitionName.FADE_AND_SLIDE_LEFT}-enter-active`,
      `&.${TransitionName.FADE_AND_SLIDE_LEFT}-leave-active`,
    ].join(", ")]: getTransitionDeclarationBlock("opacity"),
    [[
      `&.${TransitionName.FADE}-enter`,
      `&.${TransitionName.FADE}-leave-to`,
      `&.${TransitionName.FADE_AND_SLIDE_LEFT}-enter`,
      `&.${TransitionName.FADE_AND_SLIDE_LEFT}-leave-to`,
    ].join(", ")]: {
      opacity: "0",
    },
    [[
      `&.${TransitionName.SLIDE_LEFT}-leave-active:not(.multi-answer) .answer`,
      `&.${TransitionName.FADE_AND_SLIDE_LEFT}-leave-active:not(.multi-answer) .answer`,
    ].join(", ")]: getTransitionDeclarationBlock("transform"),
    [[
      `&.${TransitionName.SLIDE_LEFT}-leave-to:not(.multi-answer) .answer`,
      `&.${TransitionName.FADE_AND_SLIDE_LEFT}-leave-to:not(.multi-answer) .answer`,
    ].join(", ")]: {
      transform: "translateX(-100vw)",
    },
  },
};

export const choiceAnswerTransitions = {
  ".questions-wrapper:not(.multi-answer) &": {
    [[`&.${TransitionName.SLIDE_LEFT}-enter-active`, `&.${TransitionName.FADE_AND_SLIDE_LEFT}-enter-active`].join(
      ", "
    )]: getTransitionDeclarationBlock("transform"),
    [[`&.${TransitionName.SLIDE_LEFT}-enter`, `&.${TransitionName.FADE_AND_SLIDE_LEFT}-enter`].join(", ")]: {
      transform: "translateX(100vw);",
    },
  },
};
