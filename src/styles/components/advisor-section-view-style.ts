import globals from "@/styles/partials/global-variables";

export default {
  container: {
    "& .top-navigation": {
      display: "flex",
      flexFlow: "row wrap",
      alignItems: "flex-start",
      width: "100%",
      marginBottom: "48px",
      [`@media (${globals.breakpoints.$sm})`]: {
        marginBottom: "40px",
      },
      [`@media (${globals.breakpoints.$xs})`]: {
        marginBottom: "32px",
      },
    },
  },
};
