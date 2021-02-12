import globals from "../partials/global-variables";
import { Button, ButtonPrimary, ButtonNextInProgress } from "../partials/buttons";
import stylesConfig from "../styles.config";

export default {
  "@keyframes navigationSpinner": {
    "0%": {
      transform: "translate(-50%,-50%) rotate(0deg)",
    },
    "100%": {
      transform: "translate(-50%,-50%) rotate(360deg)",
    },
  },
  container: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "space-between",
    width: "100%",
    paddingBottom: "30px",
    paddingTop: "30px",
    borderBottom: "1px solid",
    borderColor: stylesConfig.colors.secondary.spectrum100,
    ".top-navigation &": {
      flex: "1 1 auto",
      width: "auto",
      padding: 0,
      borderBottom: "none",
      order: -1,
    },
    "& .navigation-back-button": {
      ...Button,
      marginRight: "15px",
      [`@media (${globals.breakpoints.$xs})`]: {
        marginRight: "10px",
        order: 1,
        width: "calc(50% - 5px)",
        paddingLeft: 0,
        paddingRight: 0,
        ".top-navigation &": {
          width: "auto",
          marginRight: 0,
        },
      },
    },
    "& .navigation-next-button, & .navigation-submit-button": {
      ...ButtonPrimary,
      marginRight: 0,
      marginLeft: "auto",
      [`@media (${globals.breakpoints.$xs})`]: {
        order: 2,
        width: "calc(50% - 5px)",
        paddingLeft: 0,
        paddingRight: 0,
      },
    },

    "& .navigation-next-in-progress": {
      ...ButtonNextInProgress,
      marginLeft: "auto",
    },
  },
};
