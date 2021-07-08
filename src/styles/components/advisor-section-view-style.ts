import globals from "@/styles/partials/global-variables";

export default {
  container: {
    "&.section-type--results_page": {
      backgroundColor: globals.colors.whiteAlmost,
    },
    "& .top-navigation": {
      display: "flex",
      flexFlow: "row wrap",
      alignItems: "flex-start",
      width: "100%",
      marginBottom: "48px",
      backgroundColor: globals.colors.white,
      [`@media (${globals.breakpoints.$sm})`]: {
        marginBottom: "40px",
      },
      [`@media (${globals.breakpoints.$xs})`]: {
        marginBottom: "32px",
      },
    },
  },
};
