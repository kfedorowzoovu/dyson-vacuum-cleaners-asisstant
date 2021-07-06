import mediaQuery from "../abstract/media-query";
import globals from "../partials/global-variables";
import stylesConfig from "../styles.config";

const focusOutlineColor = globals.colors.green;
export default {
  container: {
    "& .answers-wrapper": {
      alignItems: "stretch",
      display: "flex",
      flexFlow: "wrap row",
      justifyContent: "center",
      margin: [0, 0, "48px", 0],
      boxSizing: "border-box",
      "&:after": {
        content: "''",
        flex: "0 2 auto",
      },
      [`@media (${globals.breakpoints.$xs})`]: {
        flexFlow: "wrap column",
        marginBottom: "40px",
      },
      "& .answer": {
        position: "relative",
        margin: "14px",
        [`@media (${globals.breakpoints.$sm})`]: {
          margin: "10px",
          minWidth: "350px",
        },
        [`@media (${globals.breakpoints.$xs})`]: {
          margin: [0, 0, "16px", 0],

          width: "100% !important",
        },
        [mediaQuery.hover]: {
          "&:hover": {
            boxShadow: "6px 3px 18px rgba(0, 0, 0, 0.47)",
            transition: ".05s",
            "& .answer-content": {
              boxShadow: "inset 0px 0px 0px 2px black",
              "& .answer-text": {
                fontWeight: 400,
              },
            },
            "&.is-selected": {
              "& .answer-content": {
                boxShadow: `6px 3px 18px rgba(0, 0, 0, 0.47), inset 0px 0px 0px 3px ${globals.colors.green}`,
              },
            },
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
