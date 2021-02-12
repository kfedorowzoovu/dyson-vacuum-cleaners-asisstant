import stylesConfig from "../styles.config";
import mediaQuery from "../abstract/media-query";
import globals from "./global-variables";

const checkboxColor = stylesConfig.colors.secondary.spectrum500;
const checkboxDisabled = stylesConfig.colors.secondary.spectrum200;

export default {
  container: {
    "& input": {
      position: "absolute",
      zIndex: -1,
      opacity: 0,
    },
    "& .checkbox-indicator": {
      height: "20px",
      width: "20px",
      border: "2px solid white",
      borderColor: checkboxColor,
      backgroundColor: globals.colors.white,
      marginRight: "8px",

      "&:after": {
        content: "' '",
        position: "relative",
        display: "none",
        left: "6px",
        top: "3px",
        width: "3px",
        height: "8px",
        border: "solid white",
        borderWidth: "0 2px 2px 0",
        transform: "rotate(45deg)",
      },
    },
    [mediaQuery.hover]: {
      "&:hover input:not([disabled]) ~ .checkbox-indicator, input:focus ~ .checkbox-indicator": {
        background: checkboxDisabled,
      },
      "&:hover input:not([disabled]):checked ~ .checkbox-indicator, input:checked:focus ~ .checkbox-indicator": {
        background: stylesConfig.colors.secondary.spectrum700,
      },
    },
    "& input:disabled ~ .checkbox-indicator": {
      borderColor: checkboxDisabled,
    },
    "& input:disabled:checked ~ .checkbox-indicator": {
      backgroundColor: checkboxDisabled,
      borderColor: checkboxDisabled,
    },
    "& input:checked ~ .checkbox-indicator": {
      height: "20px",
      width: "20px",
      border: "2px solid white",
      borderColor: checkboxColor,
      backgroundColor: checkboxColor,
      marginRight: "8px",

      "&.checkbox-indicator:after": {
        display: "block",
      },
    },
  },
};
