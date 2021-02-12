import { AnimationStyle } from "@zoovu/runner-web-design-base";

export enum AnswerAnimationStyleClass {
  NO_ANIMATION = "",
  ZOOM_IN = "answer--zoom-in",
  DIAGONAL_SHADES = "answer--diagonal-shades",
}

export function getAnimationClass(animationStyle: AnimationStyle): AnswerAnimationStyleClass {
  switch (animationStyle) {
    case AnimationStyle.DEFAULT:
      return AnswerAnimationStyleClass.ZOOM_IN;
    case AnimationStyle.ALTERNATIVE:
      return AnswerAnimationStyleClass.DIAGONAL_SHADES;
    default:
      return AnswerAnimationStyleClass.NO_ANIMATION;
  }
}
