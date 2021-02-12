import globals from "../partials/global-variables";
import { pageTransitions } from "../partials/transition";
import stylesConfig from "../styles.config";

const dropDownHeadingColor = stylesConfig.colors.primaryFontColor;
const dropDownQuestionHeaderSize = {
  $lg: stylesConfig.typography.fontSize(1.9),
  $xs: stylesConfig.typography.fontSize(1.2),
};

export default {
  container: {
    color: "#656565",
    extend: pageTransitions,
    "& .page-title, & .page-submit-success-headline": {
      color: dropDownHeadingColor,
      textAlign: "center",
      width: "100%",
      fontSize: dropDownQuestionHeaderSize.$lg,
      margin: [0, 0, "50px"],
      [`@media (${globals.breakpoints.$xs})`]: {
        fontSize: dropDownQuestionHeaderSize.$xs,
        margin: ["15px", 0, "30px"],
        fontWeight: 600,
      },
    },
    "& .page-submit-success-subtitle": {
      textAlign: "center",
      width: "100%",
    },
    "& .page-submit-success-message-wrapper": {
      marginTop: "15px",
      marginBottom: "50px",
    },
    "& .questions-wrapper.multi-answer": {
      padding: "40px",
      marginBottom: "60px",
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexFlow: "row wrap",
      [`@media (${globals.breakpoints.$xs})`]: {
        padding: "20px 0",
        marginBottom: "30px",
      },
      "& > div": {
        width: "100%",
        marginBottom: "25px",
        padding: "0 20px",
        [`@media (${globals.breakpoints.$md})`]: {
          width: "60%",
        },
        "&.text-question-wrapper > p": {
          margin: "0 0 5px",
          fontSize: stylesConfig.typography.fontSize(),
          textAlign: "left",
        },
        "&.long-text-question-wrapper > p": {
          margin: "0 0 5px",
          fontSize: stylesConfig.typography.fontSize(),
          textAlign: "left",
        },
        "& .answers-wrapper": {
          "&.checkbox label .answer-icon:after": {
            width: "20px",
            height: "20px",
            backgroundPosition: "-47px -71px",
            top: 0,
            left: 0,
          },
        },
        "& .custom-select-wrapper": {
          "& .custom-select-container": {
            width: "100%",
            maxWidth: "unset",
            "& .custom-select-panel": {
              backgroundColor: globals.colors.white,
              "& .option": {
                fontSize: stylesConfig.typography.fontSize(),
                padding: "8px 10px",
                "&:after": {
                  display: "none",
                },
              },
            },
          },
          "& .custom-select-answer": {
            marginBottom: 0,
            backgroundColor: globals.colors.white,
            border: `1px solid ${globals.colors.lightGray}`,
            padding: "7.5px 10px",
            "& span": {
              fontSize: stylesConfig.typography.fontSize(),
            },
            "& .icon": {
              top: "12px",
            },
          },
        },
      },
      "& .question-validation-message": {
        fontSize: stylesConfig.typography.fontSize(0.9),
      },
    },
    "& .questions-wrapper.multi-answer.page-submit-in-progress div": {
      visibility: "hidden",
    },
    "& .questions-wrapper.multi-answer.page-submit-in-progress": {
      backgroundImage: globals.loaderGif,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    },
  },
};
