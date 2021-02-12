import { ButtonNextInProgress } from "../partials/buttons";

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
    ".top-navigation &": {
      flex: "1 1 auto",
      width: "auto",
      padding: 0,
      borderBottom: "none",
      order: -1,
    },
    "& .navigation-next-button, & .navigation-submit-button": {
      border: "none",
      width: "100%",
      textAlign: "center",
      background: "#fafafa",
      cursor: "pointer",
      padding: "15px",
      fontSize: "16px",
      color: "#c0c0c0",
      fontWeight: "bold",
      position: "relative",
    },
    "& .navigation-next-button.navigation-next-in-progress": {
      ...ButtonNextInProgress,
    },
  },
};
