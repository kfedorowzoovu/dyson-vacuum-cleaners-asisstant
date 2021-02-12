import globals from "../partials/global-variables";
import { CheckboxStyle, CheckboxStyleSelected } from "../partials/checkbox-style";
import stylesConfig from "../styles.config";

const compareButtonTextColor = stylesConfig.colors.primaryFontColor;
const compareButtonBorderColor = globals.colors.gray;

export default {
  container: {
    marginTop: "10px",
    "& .checkbox-input": {
      ...CheckboxStyle,
      display: "inline-block",
      position: "relative",
      top: "3px",
      left: 0,
      cursor: "pointer",
      padding: 0,
      border: 0,
      marginRight: "5px",
      "&::after": {
        height: "20px",
      },
    },
    "& > label": {
      cursor: "pointer",
    },
    "&.is-selected": {
      "& .checkbox-input": {
        ...CheckboxStyleSelected,
        display: "inline-block",
        marginRight: "5px",
        "&::after": {
          height: "20px",
        },
      },
    },
    "& .start-compare-button": {
      cursor: "pointer",
      borderLeft: `1px solid ${compareButtonBorderColor}`,
      marginLeft: "5px",
      paddingLeft: "5px",
      color: compareButtonTextColor,
    },
  },
};
