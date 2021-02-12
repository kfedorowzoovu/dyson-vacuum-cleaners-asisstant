import stylesConfig from "../styles.config";
import mediaQuery from "../abstract/media-query";
import globals from "./global-variables";

const radioColor = stylesConfig.colors.secondary.spectrum500;
const radioDisabled = stylesConfig.colors.secondary.spectrum200;

export default {
  container: {
    "& input": {
      position: "absolute",
      zIndex: -1,
      opacity: 0,
    },
    "& .radio-indicator": {
      height: "20px",
      width: "20px",
      minWidth: "20px",
      border: "2px solid white",
      borderColor: radioColor,
      backgroundColor: globals.colors.white,
      marginRight: "8px",
      borderRadius: "100%",

      "&:after": {
        content: "' '",
        position: "relative",
        display: "none",
        width: "10px",
        height: "10px",
        backgroundColor: radioColor,
        borderRadius: "100%",
        border: "solid white",
      },
    },
    [mediaQuery.hover]: {
      "&:hover input:not([disabled]) ~ .radio-indicator, input:focus ~ .radio-indicator": {
        background: radioDisabled,
      },
      "&:hover input:not([disabled]):checked ~ .radio-indicator, input:checked:focus ~ .radio-indicator": {
        "&:after": {
          backgroundColor: stylesConfig.colors.secondary.spectrum700,
        },
      },
    },
    "& input:disabled ~ .radio-indicator": {
      borderColor: radioDisabled,
    },
    "& input:disabled ~ .radio-indicator:after": {
      backgroundColor: radioDisabled,
    },
    "& input:checked ~ .radio-indicator": {
      "&.radio-indicator:after": {
        display: "block",
      },
    },
  },
};
