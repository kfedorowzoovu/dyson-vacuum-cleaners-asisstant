import { ResolvedComponentsConfiguration } from "@zoovu/runner-browser-api";
import globals from "../partials/global-variables";
import stylesConfig from "../styles.config";
import mediaQuery from "../abstract/media-query";

const bordersColor = stylesConfig.colors.secondary.spectrum500;
const dropdownTextSize = {
  $lg: stylesConfig.typography.fontSize(1),
  $xs: stylesConfig.typography.fontSize(0.9),
};
const dropDownInputFontSize = stylesConfig.typography.fontSize();
const dropDownTextColor = stylesConfig.colors.primaryFontColor;

export default {
  container: {
    width: "90%",
    margin: "0px auto",
    "& .simplebar-offset": {
      width: "calc(100% + 20px)",
    },
    "& .select-input-wrapper": {
      margin: ["8px", "auto"],
      maxWidth: "450px",
      width: "100%",
      padding: ["5px", "10px", "5px", 0],
      display: "none",
      border: (configuration: ResolvedComponentsConfiguration): string => `1px solid ${bordersColor(configuration)}`,
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
    "& .custom-select-container.disabled": {
      opacity: 0.5,
    },
    "& .custom-select-wrapper": {
      "& .custom-select-container": {
        maxWidth: "450px",
        margin: "0 8 16px",
        position: "relative",
        [`@media (${globals.breakpoints.$xs})`]: {
          marginBottom: "4px",
        },
        [`@media (${globals.breakpoints.$sm})`]: {
          width: "100%",
          margin: "auto",
        },
        "& .vb-visible": {
          borderRight: "2px solid",
          borderColor: bordersColor,
        },
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
        padding: "10px 45px 10px 16px",
        display: "flex",
        alignItems: "center",
        fontSize: dropdownTextSize.$lg,
        color: dropDownTextColor,
        position: "relative",
        marginBottom: "0px",
        border: "2px solid",
        backgroundColor: "transparent",
        cursor: "pointer",
        fontWeight: 600,
        textAlign: "left",
        borderColor: bordersColor,
        minHeight: "25px",
        [`@media (${globals.breakpoints.$xs})`]: {
          marginBottom: "0px",
          fontSize: dropdownTextSize.$xs,
          paddingTop: "12px",
          paddingBottom: "12px",
        },
        "& .selected-answer-text": {
          margin: 0,
        },
        "& .icon": {
          position: "absolute",
          display: "block",
          right: "20px",
          top: "22px",
          width: "20px",
          height: "20px",
          transform: "translate(0, -50%)",
          transition: "transform 0.3s",
        },
      },
      "& .custom-select-panel": {
        transition: "max-height .3s ease-out,overflow-y .1s .5s",
        backgroundColor: "transparent",
        borderLeft: "2px solid",
        borderRight: "2px solid",
        borderBottom: "none",
        maxHeight: "0",
        "& .option": {
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          fontSize: dropdownTextSize.$lg,
          minHeight: "25px",
          fontWeight: 600,
          color: dropDownTextColor,
          textAlign: "left",
          padding: "10px 15px",
          borderBottom: "2px solid",
          borderColor: bordersColor,
          [`@media (${globals.breakpoints.$xs})`]: {
            fontSize: dropdownTextSize.$xs,
            padding: "12px",
          },
          "&:last-of-type": {
            borderBottom: "none",
          },
          [mediaQuery.hover]: {
            "&:hover": {
              backgroundColor: stylesConfig.colors.secondary.spectrum100,
            },
          },
          "& > p": {
            margin: 0,
          },
        },
      },
      "& .custom-select-panel .option.option-disabled": {
        opacity: 0.5,
        cursor: "default",
        [mediaQuery.hover]: {
          "&:hover": {
            backgroundColor: globals.colors.white,
          },
        },
      },
    },
    "& .dropdown-filter-image-element": {
      height: "25px",
      width: "25px",
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    "&.has-image": {
      "& .filter-answer-image": {
        height: "25px",
        width: "25px",
        minWidth: "25px",
        position: "relative",
        marginRight: "8px",
        "& .dropdown-filter-image-element": {
          position: "absolute",
          width: "100%",
          height: "100%",
          left: 0,
          right: 0,
          backgroundSize: "cover",
          backgroundPosition: "center",
        },
      },
    },
    "&.no-labels": {
      "& .custom-select-panel": {
        "& .option": {
          justifyContent: "center",
        },
      },
      "& .custom-select-answer": {
        justifyContent: "center",
        "& .filter-answer-image": {
          "& .dropdown-filter-image-element": {
            marginLeft: "16px",
          },
        },
      },
    },
  },
};
