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
      ...ButtonPaginationSelected,
    },
    "& button": {
      ...ButtonPagination,
    },
    "& .navigation-next-button, & .navigation-back-button": {
      ...ButtonPaginationNextBack,
    },
  },
};
