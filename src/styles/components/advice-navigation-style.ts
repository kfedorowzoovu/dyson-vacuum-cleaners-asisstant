import globals from "../partials/global-variables";
import { ButtonPaginationNextBack, ButtonPagination, ButtonPaginationSelected } from "../partials/buttons";

export default {
  container: {
    textAlign: "right",
    paddingRight: "45px",
    [`@media (${globals.breakpoints.$xs})`]: {
      textAlign: "center",
      paddingRight: 0,
    },
    "& .selected": {
      extend: ButtonPaginationSelected,
    },
    "& button": {
      extend: ButtonPagination,
    },
    "& .navigation-next-button, & .navigation-back-button": {
      extend: ButtonPaginationNextBack,
    },
  },
};
