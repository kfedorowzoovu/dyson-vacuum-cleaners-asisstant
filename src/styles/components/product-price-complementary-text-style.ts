import globals from "../partials/global-variables";

export default {
  container: {
    "&.price-additional-text": {
      justifyContent: "center",
      ".top-product &": {
        justifyContent: "flex-start",
        [`@media (${globals.breakpoints.$xs})`]: {
          justifyContent: "center",
        },
      },
    },
  },
};
