import globals from "../partials/global-variables";

export default {
  container: {
    "& .top-navigation": {
      display: "flex",
      flexFlow: "row wrap",
      alignItems: "flex-start",
      width: "100%",
      "&::before": {
        display: "none",
        [`@media (${globals.breakpoints.$xxs})`]: {
          // trick for flex to add "artificial" break
          display: "flex",
          width: "100%",
          flex: "1 0 auto",
          content: "''",
          height: "15px", // as it's already there, lets even use it for spacing
          order: 2,
        },
      },
    },
  },
};
