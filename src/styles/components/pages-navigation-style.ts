import { visuallyHiddenElement } from "@/styles/partials/accessibility";
import { ButtonNextInProgress, ButtonPaginationNextBack } from "../partials/buttons";

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
    justifyContent: "flex-end",
    width: "100%",
    ".top-navigation &": {
      flex: "1 1 auto",
      width: "auto",
      padding: 0,
      borderBottom: "none",
      order: -1,
    },
    "& .navigation-next-button, & .navigation-submit-button": {
      extend: ButtonPaginationNextBack,
    },
    "& .navigation-next-button.navigation-next-in-progress": {
      extend: ButtonNextInProgress,
    },
    "& .hidden-description": {
      extend: visuallyHiddenElement,
      left: 0,
      top: "16px",
    },
  },
};
