import globals from "../partials/global-variables";
import stylesConfig from "../styles.config";

export default {
  container: {
    "&": {
      textAlign: "center",
      width: "100%",
      margin: [0, 0, "10px", 0],
      [`@media (${globals.breakpoints.$xs})`]: {
        margin: [0, 0, "15px"],
      },
    },

    "& p": {
      margin: [0, 0, 0, 0],
    },

    "& .question-validation-message": {
      padding: "5px",
      background: globals.colors.red,
      borderColor: stylesConfig.colors.primary.spectrum400,
      color: globals.colors.white,
      fontSize: stylesConfig.typography.fontSize(1),
    },
  },
};
