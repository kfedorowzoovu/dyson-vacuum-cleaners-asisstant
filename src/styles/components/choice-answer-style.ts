import { ResolvedComponentsConfiguration } from "@zoovu/runner-browser-api";
import { visuallyHiddenElement } from "@/styles/partials/accessibility";
import { AnswerAnimationStyleClass } from "../abstract/animation";
import mediaQuery from "../abstract/media-query";
import globals from "../partials/global-variables";
import infoTextTrigger from "../partials/info-text-trigger";
import { choiceAnswerTransitions } from "../partials/transition";
import stylesConfig from "../styles.config";

const infoTextBackground = stylesConfig.colors.secondaryAccentColorVariants.transparent;
const answerBackgroundGradient = "linear-gradient(180deg, rgba(0,0,0,0) 50%, #000000 150%)";
const answerContentBackground = globals.colors.green;
const infoTextTriggerFontColor = stylesConfig.colors.secondaryFontColor;

export default {
  container: {
    extend: choiceAnswerTransitions,
    transition: "box-shadow .3s",
    maxWidth: "358px",
    [`@media (${globals.breakpoints.$xs})`]: {
      maxWidth: "100%",
    },
    "&:focus-within": {
      boxShadow: `${globals.colors.gray_primary} 0 0 5px`,
    },
    fallbacks: {
      "&:focus": {
        border: "2px solid red",
      },
    },
    "&.has-image": {
      "& label": {
        minHeight: "190px",
        [`@media all and (-ms-high-contrast: none), (-ms-high-contrast: active)`]: {
          display: "block",
          position: "relative",
        },
        "&:before, &:after": {
          display: "block",
          content: "' '",
          width: "3px",
          height: "100%",
          backgroundColor: stylesConfig.colors.primary.spectrum500,
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          opacity: 0,
          zIndex: 4,
        },
        "&:after": {
          right: 0,
          left: "initial",
          width: "100%",
        },
        [`@media (${globals.breakpoints.$xs})`]: {
          minHeight: "136px",
          height: "136px",
        },
        "& .answer-content": {
          position: "relative",
          bottom: 0,
          background: answerBackgroundGradient,
          width: "100%",
          height: "100%",
          alignItems: "flex-end",
          minHeight: "190px",
          [`@media all and (-ms-high-contrast: none), (-ms-high-contrast: active)`]: {
            background: "transparent",
            position: "absolute,",
          },
          "&:before, &:after": {
            content: "' '",
            display: "none",
            width: "100%",
            height: "12px",
            backgroundColor: stylesConfig.colors.primary.spectrum500,
            position: "absolute",
            left: 0,
            bottom: 0,
            opacity: 0,
          },
          "&:after": {
            top: 0,
            bottom: "initial",
            height: "3px",
          },
          [`@media (${globals.breakpoints.$xs})`]: {
            width: "100%",
            minHeight: "136px",
            height: "136px",
          },
          "& .hidden-description": {
            extend: visuallyHiddenElement,
          },
          "& .icon-container": {
            height: "32px",
            width: "32px",
            background: globals.colors.green,
            position: "absolute",
            top: "10px",
            right: "10px",
            borderRadius: "100%",
            display: "none",
            "& svg": {
              height: "32px",
              width: "32px",
              padding: "3px",
              fill: globals.colors.white,
            },
          },
        },
      },
      "& .fullRow": {
        "& .answer-content": {
          minHeight: "190px",
          height: "auto",
          [`@media (${globals.breakpoints.$xs})`]: {
            minHeight: "190px",
          },
        },
      },
      "& .answer-text": {
        color: globals.colors.white,
        paddingBottom: "8px",
        paddingTop: "26px",
        paddingRight: "30px",
        zIndex: 1,
      },
      "& .answer-info-text-trigger": {
        marginBottom: "30px",
        backgroundColor: "transparent",
        [`@media (${globals.breakpoints.$xs})`]: {
          position: "absolute",
          margin: "30px 20px",
          right: 0,
          bottom: 0,
          zIndex: "10",
        },
      },
    },
    "& label": {
      margin: 0,
      cursor: "pointer",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      height: "100%",
      minHeight: "75px",
      position: "relative",
      [`@media all and (-ms-high-contrast: none), (-ms-high-contrast: active)`]: {
        height: "auto",
      },
      [`@supports (-ms-ime-align:auto)`]: {
        height: "auto",
      },
      [`@media (${globals.breakpoints.$xs})`]: {
        display: "flex",
        flexFlow: "wrap row",
        position: "relative",
      },
    },
    "& .image-element": {
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      right: 0,
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    "& .answer-text": {
      display: "flex",
      paddingLeft: "5px",
      color: globals.colors.white,
      fontSize: stylesConfig.typography.fontSize(1),
      fontWeight: 300,
      alignItems: "flex-end",
      justifyContent: "center",
      paddingBottom: "8px",
      paddingTop: "26px",
      paddingRight: "30px",
      zIndex: 1,
      transition: "padding-bottom .3s",
    },
    "& .answer-info-text": {
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: 2,
      width: "100%",
      padding: "10px",
      background: infoTextBackground,
      lineHeight: "1.5",
      fontSize: stylesConfig.typography.fontSize(1),
      color: infoTextTriggerFontColor,
      pointerEvents: "none",
      textAlign: "center",
    },
    "& .answer-content": {
      position: "relative",
      bottom: 0,
      left: 0,
      width: "100%",
      height: "100%",
      display: "flex",
      flex: "0 2 auto",
      alignItems: "flex-end",
      minHeight: "75px",
      padding: "0 20px",
      zIndex: 5,
      background: answerContentBackground,
      justifyContent: "flex-start",
      "& .answer-info-text-trigger": {
        position: "absolute",
        margin: "30px 20px",
        right: 0,
        bottom: 0,
      },
      [`@media (${globals.breakpoints.$xs})`]: {
        width: "100%",
      },
    },
    "&.is-selected": {
      "& .answer-content": {
        background: globals.colors.green,
        boxShadow: `inset 0px 0px 0px 3px ${globals.colors.green}`,
        "& .answer-text": {
          fontWeight: 400,
        },
        "& .icon-container": {
          display: "block!important",
        },
      },
      "&.has-image": {
        "& .answer-content, & .answer-image": {
          zIndex: 5,
        },
        "& .answer-content:before": {
          opacity: 1,
          backgroundColor: globals.colors.green,
        },
        "& .answer-content:after": {
          opacity: 1,
          backgroundColor: globals.colors.green,
        },
        "& label": {
          "&:before": {
            opacity: 1,
            backgroundColor: globals.colors.green,
          },
          "&:after": {
            opacity: 1,
            backgroundColor: globals.colors.green,
          },
        },
      },
    },
    "& .answer-content input": {
      display: "none",
    },
    ...infoTextTrigger,
    "&.info-test-shown .answer-info-text-trigger": {
      background: (configuration: ResolvedComponentsConfiguration): string =>
        `${globals.customerSprite(configuration)} no-repeat -24px -147px`,
    },
    "&.is-disabled": {
      "& .answer-image": {
        opacity: 0.4,
        cursor: "default",
      },
      "& .answer-content": {
        opacity: 0.4,
        cursor: "default",
      },
      [mediaQuery.hover]: {
        "&:hover": {
          boxShadow: "none!important",
        },
      },
      "&:active, &:focus": {
        boxShadow: "none!important",
      },
      "& label": {
        cursor: "default",
      },
    },
    [`@media all and (-ms-high-contrast: none), (-ms-high-contrast: active)`]: {
      "&.has-image": {
        "& label": {
          minHeight: "190px",
          [`@media (${globals.breakpoints.$xs})`]: {
            minHeight: "215px",
          },
        },
        "& .answer-content": {
          position: "absolute",
          background: answerBackgroundGradient,
        },
      },
      "&.is-selected": {
        "&.has-image": {
          "& .answer-content, & .answer-image": {
            zIndex: 5,
            borderBottomWidth: "12px",
            borderBottomStyle: "solid",
            borderBottomColor: answerContentBackground,
            borderTopWidth: "3px",
            borderTopStyle: "solid",
            borderTopColor: answerContentBackground,
            background: "transparent",
            boxShadow: `inset 0px 0px 0px 3px ${globals.colors.green}`,
            "& .answer-text": {
              paddingBottom: "8px",
              fontWeight: 400,
            },
          },
          "& .answer-content": {
            background: answerBackgroundGradient,
            "& svg": {
              display: "block",
            },
          },
        },
      },
    },
    [`&.${AnswerAnimationStyleClass.DIAGONAL_SHADES}`]: {
      "& .answer-content": {
        transitionProperty: "background-color",
        transitionDuration: "0.1s",
      },
      "&.has-image .answer-content::before": {
        opacity: "1",
        transform: "translate3d(0, 12px, 0)",
        transition: "transform 0.1s",
      },
      "& .answer-image": {
        transform: "scale3d(1.05, 1.05, 1)",
        transitionProperty: "transform",
        transitionDuration: "0.1s",
        backgroundColor: globals.colors.green,
        "& .image-element": {
          transitionProperty: "opacity",
          transitionDuration: "0.1s",
        },
        "&::before": {
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          content: "''",
          transitionProperty: "transform",
          transitionDuration: "0.6s",
          zIndex: 1,
          transform: "scale3d(1.9, 1.4, 1) rotate3d(0, 0, 1, 45deg) translate3d(0, -100%, 0)",
        },
      },
      [mediaQuery.hover]: {
        "&:hover": {
          "& .answer-image": {
            transform: "scale3d(1, 1, 1)",
            "& .image-element": {
              opacity: 0.6,
            },
            "&::before": {
              transform: "scale3d(1.9, 1.4, 1) rotate3d(0, 0, 1, 45deg) translate3d(0, 100%, 0)",
            },
          },
          "&.has-image": {
            "& .answer-content::after": {
              opacity: "0",
            },
          },
          "&.is-selected:not(.has-image) .answer-content": {
            backgroundColor: stylesConfig.colors.primary.spectrum700,
          },
        },
      },
      "&.is-selected": {
        "& .image-element": {
          opacity: 0.6,
        },
        "& .answer-image::before": {
          transform: "scale3d(1.9, 1.4, 1) rotate3d(0, 0, 1, 45deg) translate3d(0, 100%, 0)",
        },
        "&.has-image .answer-content::after": {
          opacity: "0",
        },
        "&.has-image .answer-content::before": {
          transform: "translate3d(0, 0, 0)",
          backgroundColor: stylesConfig.colors.primary.spectrum500,
        },
      },
    },
    [`&.${AnswerAnimationStyleClass.ZOOM_IN}`]: {
      "&.has-image .answer-content::before": {
        opacity: "0",
        transform: "translate3d(0, 12px, 0)",
        transition: "transform 0.1s",
      },
      "& .image-element": {
        transitionProperty: "transform, background-color",
        transitionDuration: "0.1s",
        "&::before": {
          position: "absolute",
          content: "''",
          top: "0",
          right: "0",
          bottom: "0",
          left: "0",
          backgroundColor: "inherit",
        },
      },
      "& .answer-text": {
        transitionProperty: "padding-bottom",
        transitionDuration: "0.1s",
      },
      [mediaQuery.hover]: {
        "&:hover": {
          "& .answer-text": {
            paddingBottom: "36px",
          },
          "&.has-image .answer-content::after": {
            opacity: "0",
          },
          "& .image-element": {
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            transform: "scale(1.2)",
          },
          "&.is-selected": {
            "&.has-image .answer-content::before": {
              transform: "translate3d(0, 0, 0)",
            },
            "& .image-element": {
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              transform: "scale(1.2)",
            },
          },
        },
      },
      "&.is-selected": {
        "&.has-image .answer-content::after": {
          opacity: "0",
        },
        "&.has-image .answer-content::before": {
          transform: "translate3d(0, 0, 0)",
          backgroundColor: stylesConfig.colors.primary.spectrum500,
        },
        "& .image-element": {
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          transform: "scale(1)",
        },
      },
    },
  },
};
