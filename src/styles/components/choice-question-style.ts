import mediaQuery from "../abstract/media-query";
import globals from "../partials/global-variables";
import stylesConfig from "../styles.config";

const focusOutlineColor = stylesConfig.colors.primary.spectrum400;
export default {
  container: {
    "& .answers-wrapper": {
      alignItems: "stretch",
      display: "flex",
      flexFlow: "wrap row",
      justifyContent: "flex-start",
      margin: [0, "-7px", "75px", "-7px"],
      "&:after": {
        content: "''",
        flex: "0 2 auto",
      },
      [`@media (${globals.breakpoints.$xs})`]: {
        flexFlow: "wrap column",
        marginBottom: "15px",
      },
      "& .answer": {
        position: "relative",
        margin: "7px",
        [`@media (${globals.breakpoints.$xs})`]: {
          width: "100% !important",
          margin: [0, 0, "20px"],
        },
        [mediaQuery.hover]: {
          "&:hover": {
            boxShadow: "6px 3px 18px rgba(0, 0, 0, 0.47)",
          },
        },
        "&:focus": {
          outlineColor: focusOutlineColor,
          boxShadow: "6px 3px 18px rgba(0, 0, 0, 0.47)",
        },
      },
      "& .answer-image": {
        height: "100%",
        position: "absolute",
        width: "100%",
        [`@media (${globals.breakpoints.$xs})`]: {
          width: "100%",
        },
      },
      "& .fullRow": {
        "& .answer-image": {
          height: "auto",
        },
      },
    },
    ".multi-answer &": {
      "& .question-type-hint": {
        display: "none",
      },
      "& .answers-wrapper": {
        marginBottom: 0,
      },
    },
  },
};
