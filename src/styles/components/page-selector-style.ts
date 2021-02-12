import globals from "../partials/global-variables";
import stylesConfig from "../styles.config";

const pageSelectorButtonBackground = {
  default: stylesConfig.colors.advisorBackgroundVariants,
  selected: stylesConfig.colors.primaryAccentColorVariants.default,
  border: stylesConfig.colors.secondary.spectrum100,
};
const focusOutlineColor = stylesConfig.colors.secondary.spectrum100;

export default {
  container: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
    width: "100%",
    paddingTop: "40px",
    paddingBottom: "65px",
    [`@media (${globals.breakpoints.$xs})`]: {
      order: 3,
      paddingTop: "30px",
      paddingBottom: "20px",
    },
    "& button": {},
    "& .progress-bar": {
      background: "#131a22",
      height: "4px",
    },
    "& .progress": {
      background: "blue",
      height: "100%",
      transition: "width 0.5s",
    },
  },
};
