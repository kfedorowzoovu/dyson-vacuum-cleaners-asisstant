import { ResolvedComponentsConfiguration } from "@zoovu/runner-browser-api";
import globals from "../partials/global-variables";
import stylesConfig from "../styles.config";
import mediaQuery from "../abstract/media-query";

const dropDownInputFontSize = stylesConfig.typography.fontSize();
const bordersColor = stylesConfig.colors.secondary.spectrum100;
const dropDownTextColor = stylesConfig.colors.primaryFontColor;
const dropDownHeadingColor = stylesConfig.colors.primaryFontColor;
const dropDownQuestionHeaderSize = {
  $lg: stylesConfig.typography.fontSize(1.9),
  $xs: stylesConfig.typography.fontSize(1.2),
};

export default {
  container: {
    "& .simplebar-offset": {
      width: "calc(100% + 20px)",
    },
    "& .option": {
      position: "relative",
      left: "-10px",
    },
    "& p": {
      color: dropDownHeadingColor,
      textAlign: "center",
      width: "100%",
      fontSize: dropDownQuestionHeaderSize.$lg,
      margin: [0, 0, "70px"],
      [`@media (${globals.breakpoints.$xs})`]: {
        fontSize: dropDownQuestionHeaderSize.$xs,
        margin: ["15px", 0, "30px"],
        fontWeight: 600,
      },
    },
    "& .select-input-wrapper": {
      margin: ["15px", "auto"],
      border: (configuration: ResolvedComponentsConfiguration): string => `1px solid ${bordersColor(configuration)}`,
      maxWidth: "300px",
      width: "100%",
      padding: ["5px", "10px", "5px", 0],
      display: "none",
    },
    "& select": {
      color: dropDownTextColor,
      width: "100%",
      background: "transparent",
      border: 0,
      fontSize: dropDownInputFontSize,
      height: "29px",
      padding: "5px",
      outline: 0,
    },

    // Custom Dropdown
    "& .custom-select-container.disabled": {
      opacity: 0.5,
    },

    "& .custom-select-wrapper": {
      "& .custom-select-container": {
        position: "relative",
        maxWidth: "550px",
        margin: "0 auto",
        "&.is-open": {
          "& .custom-select-answer": {
            "& .icon": {
              transform: "rotate(180deg) translate(0, 50%)",
            },
          },
          "& .custom-select-panel": {
            maxHeight: "177px",
            borderLeft: "2px solid",
            borderRight: "2px solid",
            borderBottom: "2px solid",
            borderColor: bordersColor,
          },
        },
      },
      "& .custom-select-answer": {
        display: "block",
        position: "relative",
        marginBottom: "100px",
        width: "100%",
        padding: "18px 15px",
        border: "2px solid",
        backgroundColor: globals.colors.white,
        cursor: "pointer",
        fontSize: stylesConfig.typography.fontSize(1.1),
        fontWeight: 600,
        color: stylesConfig.colors.primaryFontColor,
        textAlign: "center",
        borderColor: bordersColor,
        [`@media (${globals.breakpoints.$xs})`]: {
          marginBottom: "50px",
        },
        "& .icon": {
          background: (configuration: ResolvedComponentsConfiguration): string =>
            `${globals.customerSprite2(configuration)} no-repeat 0 -42px`,
          position: "absolute",
          display: "block",
          right: "20px",
          top: "50%",
          width: "26px",
          height: "14px",
          transform: "translate(0, -50%)",
        },
      },
      "& .custom-select-panel": {
        position: "absolute",
        zIndex: "1",
        top: "100%",
        left: 0,
        width: "100%",
        maxHeight: "0",
        transition: "max-height .3s ease-out,overflow-y .1s .5s",
        backgroundColor: globals.colors.white,
        "& .option": {
          cursor: "pointer",
          fontSize: stylesConfig.typography.fontSize(1.1),
          fontWeight: 600,
          color: stylesConfig.colors.primaryFontColor,
          textAlign: "center",
          padding: "18px 15px",
          borderBottom: "2px solid",
          borderColor: bordersColor,
          "&:last-of-type": {
            borderBottom: "none",
          },
          [mediaQuery.hover]: {
            "&:hover": {
              backgroundColor: bordersColor,
            },
          },
        },
      },
      "& .custom-select-panel .option.option-disabled": {
        opacity: 0.5,
      },
    },
    ".multi-answer &": {
      "& .custom-select-answer": {
        fontSize: `${stylesConfig.typography.fontSize} !important`,
        fontWeight: "normal !important",
      },
      "& .custom-select-panel .option": {
        fontWeight: "normal !important",
      },
    },
  },
};
