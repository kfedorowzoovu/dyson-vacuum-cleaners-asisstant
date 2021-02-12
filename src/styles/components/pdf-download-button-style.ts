import { ButtonPrimary } from "../partials/buttons";
import globals from "../partials/global-variables";

export default {
  container: {
    ...ButtonPrimary,
    marginLeft: "auto",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    [`@media (${globals.breakpoints.$xxs})`]: {
      order: 3,
      marginRight: 0,
    },
    "& span": {
      display: "inline-block",
    },
  },
};
