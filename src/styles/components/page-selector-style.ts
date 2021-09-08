import { visuallyHiddenElement } from "@/styles/partials/accessibility";
import globals from "../partials/global-variables";
import stylesConfig from "../styles.config";

const progressBarStyle = {
  backgroundColor: globals.colors.gray_background,
  borderRadius: "2px",
  borderStyle: "none",
  flexBasis: "100%",
  height: "3px",
  margin: 0,
  padding: 0,
  position: "relative",
  textAlign: "center",
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
        color: globals.colors.gray_primary,
        fontSize: stylesConfig.typography.fontSize(1),
        fontWeight: 400,
        margin: "auto",
        padding: "12px 35px",
        position: "relative",
        "&.results-header": {
          color: globals.colors.gray_primary,
          fontWeight: "bold",
        },
        "& .hidden-description": {
          color: globals.colors.gray_primary,
          height: "44px",
          left: 0,
          top: "0px",
          width: "100px",
        },
      },
    },
    "& .page-selector__progress-bar": {
      display: "flex",
      "& .page-selector[value]": {
        appearance: "none",

        extend: progressBarStyle,
        "&::-webkit-progress-bar": {
          extend: progressBarStyle,
        },
        "&::-webkit-progress-value": {
          extend: progressBarStyle,
          backgroundColor: globals.colors.primaryColor,
        },
        "&::-moz-progress-bar": {
          extend: progressBarStyle,
          appearance: "none",
          backgroundColor: globals.colors.primaryColor,
        },
      },
    },
  },
};
