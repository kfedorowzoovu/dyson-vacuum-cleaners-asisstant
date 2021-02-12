import stylesConfig from "../styles.config";

const tooltipFontColor = stylesConfig.colors.primaryFontColor;
const tooltipBackgroundColor = stylesConfig.colors.secondary.spectrum100;
export default {
  "& .tooltip": {
    maxWidth: "250px",
    display: "block !important",
    zIndex: 10000,
    "& .tooltip-inner": {
      background: tooltipBackgroundColor,
      color: tooltipFontColor,
      fontSize: stylesConfig.typography.fontSize(0.9),
      padding: ["5px", "10px", "4px"],
      "& img": {
        width: "100%",
      },
    },
    "& .tooltip-arrow": {
      width: 0,
      height: 0,
      borderStyle: "solid",
      position: "absolute",
      margin: "5px",
      borderColor: tooltipBackgroundColor,
      zIndex: 1,
    },
    "&[x-placement^='top']": {
      marginBottom: "5px",
      "& .tooltip-arrow": {
        borderWidth: ["5px", "5px", 0, "5px"],
        borderLeftColor: "transparent !important",
        borderRightColor: "transparent !important",
        borderBottomColor: "transparent !important",
        bottom: "-5px",
        left: "calc(50% - 5px)",
        marginTop: 0,
        marginBottom: 0,
      },
    },
    "&[x-placement^='bottom']": {
      marginTop: "5px",
      "& .tooltip-arrow": {
        borderWidth: [0, "5px", "5px", "5px"],
        borderLeftColor: "transparent !important",
        borderRightColor: "transparent !important",
        borderTopColor: "transparent !important",
        top: "-5px",
        left: "calc(50% - 5px)",
        marginTop: 0,
        marginBottom: 0,
      },
    },
    "&[x-placement^='right']": {
      marginLeft: "5px",
      "& .tooltip-arrow": {
        borderWidth: ["5px", "5px", "5px", 0],
        borderLeftColor: "transparent !important",
        borderTopColor: "transparent !important",
        borderBottomColor: "transparent !important",
        left: "-5px",
        top: "calc(50% - 5px)",
        marginLeft: 0,
        marginRight: 0,
      },
    },
    "&[x-placement^='left']": {
      marginRight: "5px",

      "& .tooltip-arrow": {
        borderWidth: ["5px", 0, "5px", "5px"],
        borderTopColor: "transparent !important",
        borderRightColor: "transparent !important",
        borderBottomColor: "transparent !important",
        right: "-5px",
        top: "calc(50% - 5px)",
        marginLeft: 0,
        marginRight: 0,
      },
    },
    "&.popover": {
      "& .popover-inner": {
        background: "#f9f9f9",
        color: "black",
        padding: "24px",
        boxShadow: "0 5px 30px rgba(black, .1)",
      },
      "& .popover-arrow": {
        borderColor: "#f9f9f9",
      },
    },
    "&[aria-hidden='true']": {
      visibility: "hidden",
      opacity: 0,
      transition: "opacity .15s, visibility .15s",
    },
    "&[aria-hidden='false']": {
      visibility: "visible",
      opacity: 1,
      transition: "opacity .15s",
    },
  },
};
