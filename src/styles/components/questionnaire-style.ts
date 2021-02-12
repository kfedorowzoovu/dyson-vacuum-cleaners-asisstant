import globals from "../partials/global-variables";
import stylesConfig from "../styles.config";

const questionnaireBorderColor = stylesConfig.colors.secondary.spectrum100;

export default {
  container: {
    padding: ["15px", "15px", "60px"],
    borderBottom: "1px solid",
    borderColor: questionnaireBorderColor,
    margin: ["15px", 0],
    [`@media (${globals.breakpoints.$sm})`]: {
      padding: ["5px", "5px", "30px"],
    },
    "& > section": {
      display: "flex",
      flexFlow: "row wrap",
      [`@media (${globals.breakpoints.$xs})`]: {
        marginTop: 0,
      },
    },
    "& .page-selector-section": {
      padding: "40px 0 70px",
      [`@media (${globals.breakpoints.$sm})`]: {
        padding: "25px 0 15px",
      },
    },
  },
};
