import stylesConfig from "@/styles/styles.config";
import globals from "../partials/global-variables";

export default {
  container: {
    "&.price-additional-text": {
      justifyContent: "center",
      ".top-product &": {
        justifyContent: "flex-start",
        fontWeight: 500,
        color: globals.colors.green_medium,
        fontSize: stylesConfig.typography.fontSize(1),
      },
      ".product &": {
        justifyContent: "flex-start",
        fontWeight: 500,
        color: globals.colors.green_medium,
        fontSize: stylesConfig.typography.fontSize(1),
      },
    },
  },
};
