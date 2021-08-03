import { visuallyHiddenElement } from "@/styles/partials/accessibility";
import globals from "../partials/global-variables";
import stylesConfig from "../styles.config";

const pageSelectorButtonBackground = {
  default: stylesConfig.colors.advisorBackgroundVariants,
  selected: stylesConfig.colors.primaryAccentColorVariants.default,
  border: stylesConfig.colors.secondary.spectrum100,
};

export default {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    "& .hidden-description": {
      extend: visuallyHiddenElement,
    },
    "& .page-selector__page-info": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      margin: "4px auto",
      position: "relative",
      maxWidth: globals.layout.maxContainerWidth,
      width: "100%",
      fontSize: stylesConfig.typography.fontSize(1),
      [`@media (${globals.breakpoints.$sm})`]: {
        fontSize: stylesConfig.typography.fontSize(0.875),
        margin: "3px 0",
      },
      "& .navigation-button": {
        display: "flex",
        alignItems: "center",
        textTransform: "capitalize !important",
        color: globals.colors.gray_primary,
        cursor: "pointer",
        padding: "10px",
        minWidth: "unset",
        fontWeight: 400,
        border: "none",
        textDecoration: "underline",
        background: "none",
        fontSize: "inherit",
      },
      "& .page-number": {
        color: globals.colors.gray_tertiary,
        margin: "auto",
        padding: "12px 35px",
        position: "relative",
        "&.results-header": {
          color: globals.colors.gray_primary,
          fontWeight: "bold",
        },
        "& .hidden-description": {
          left: 0,
          top: "5px",
          width: "100px",
        },
        "& span": {
          color: globals.colors.gray_primary,
        },
      },
    },
    "& .page-selector__progress-bar": {
      display: "flex",
      "& .page-selector": {
        position: "relative",
        width: "auto",
        height: 0,
        margin: 0,
        padding: 0,
        textAlign: "center",
        borderBottom: "3px solid",
        borderStyle: "none",
        flexGrow: 1,
        backgroundColor: "transparent",
        [`@media (${globals.breakpoints.$xs})`]: {
          borderBottom: "4px solid",
        },
        [`@media (${globals.breakpoints.$sm})`]: {},
        "&:focus": {},
        "&.page-selector": {
          borderColor: globals.colors.gray_background,
          "& .hidden-description": {
            height: "15px",
            top: "-7px",
            width: "100%",
          },
        },
        "&button": {
          cursor: "pointer",
        },
        "&.visited": {
          borderColor: globals.colors.gray_secondary,
          "& span": {
            fontWeight: 700,
            color: stylesConfig.colors.primaryFontColor,
          },
          "&.is-selected": {
            "& span": {
              color: pageSelectorButtonBackground.selected,
            },
          },
        },
        "& i": {
          display: "none",
        },
        "& span": {
          display: "block",
          color: stylesConfig.colors.secondary.spectrum200,
          fontSize: stylesConfig.typography.fontSize(0.875),
          fontWeight: 400,
        },
      },
    },
  },
};
