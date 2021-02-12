import { CheckboxStyle, CheckboxStyleSelected } from "../partials/checkbox-style";
import globals from "../partials/global-variables";

export default {
  container: {
    "& .answer-selection-button": {
      ...CheckboxStyle,
    },
    "&.has-image .answer-selection-button": {
      marginTop: "-15px",
      marginBottom: "20px",
      [`@media (${globals.breakpoints.$xs})`]: {
        marginBottom: "22px",
      },
    },
    "&.is-selected .answer-selection-button": {
      ...CheckboxStyleSelected,
    },
  },
};
