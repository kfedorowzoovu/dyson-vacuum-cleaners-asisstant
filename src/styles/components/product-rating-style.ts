import stylesConfig from "@/styles/styles.config";
import globals from "../partials/global-variables";

export default {
  container: {
    margin: 0,
    "& .rating__star": {
      position: "relative",
      width: "22px",
      height: "22px",
      display: "inline-block",
      marginRight: "6px",
    },
    "& .rating__reviews": {
      fontSize: stylesConfig.typography.fontSize(1),
      color: globals.colors.gray_primary,
      lineHeight: "27px",
      marginLeft: "3px",
      [`@media (${globals.breakpoints.$sm})`]: {
        fontSize: stylesConfig.typography.fontSize(0.875),
      },
    },
  },
};
