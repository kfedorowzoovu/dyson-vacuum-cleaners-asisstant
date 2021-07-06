import globals from "./partials/global-variables";
import stylesConfig from "./styles.config";
import globalStyles from "./partials/globals";
import tooltips from "./partials/tooltips";

const fontSize = stylesConfig.typography.fontSize();
const fontFamily = "DysonFutura, OpensSans, sans-serif";

export default {
  container: {
    ...globalStyles,
    ...tooltips,
    margin: [0, "auto"],
    fontFamily,
    fontSize,
    "& *": {
      boxSizing: "border-box",
      "-webkit-tap-highlight-color": "transparent",
      outline: "none",
      fontFamily,
    },
    "&.using-mouse": {
      "& *:focus": {
        outline: "none!important",
      },
    },
    "& .visually-hidden": {
      // https://css-tricks.com/places-its-tempting-to-use-display-none-but-dont/
      position: "absolute",
      overflow: "hidden",
      width: "1px",
      height: "1px",
      clip: "rect(0 0 0 0)",
      margin: "-1px",
      padding: 0,
      border: 0,
      zIndex: "-1",
    }
  },
};
