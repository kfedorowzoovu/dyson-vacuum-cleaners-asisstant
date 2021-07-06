import stylesConfig from "@/styles/styles.config";
import globals from "../partials/global-variables";

export default {
  container: {
    marginTop: "13px",
    "& .rating__star": {
      position: "relative",
      width: "22px",
      height: "22px",
      display: "inline-block",
      marginRight: "6px",
      "&.rating__star--half:after": {
        content: "''",
        position: "absolute",
        right: 0,
        top: 0,
        height: "20px",
        width: "11px",
        backgroundColor: "white",
      },
      "& svg": {
        position: "absolute",
        top: 0,
        left: 0,
      },
    },
    "& .rating__reviews": {
      fontSize: stylesConfig.typography.fontSize(1),
      color: globals.colors.gray_primary,
      textDecoration: "underline",
      lineHeight: "27px",
      marginLeft: "3px",
    },
  },
  iconStarEmpty: {
    "& .icon__fill": {
      display: "none",
    },
    "& .icon__stroke": {
      stroke: "#bb944f",
    },
  },
  iconStarFilled: {
    extends: "iconStarEmpty",
    "& .icon__fill.icon__fill--full": {
      fill: "#febf02",
    },
    "& .icon__fill.icon__fill--half": {
      display: "none",
    },
    "& .icon__stroke": {
      stroke: "#bb944f",
    },
  },
  iconStarHalf: {
    extends: "iconStarEmpty",
    "& .icon__fill.icon__fill--full": {
      display: "none",
    },
    "& .icon__fill.icon__fill--half": {
      fill: "#febf02",
    },
    "& .icon__stroke": {
      stroke: "#bb944f",
    },
  },
};
