import globals from "../partials/global-variables";
import stylesConfig from "../styles.config";
import infoTextTrigger from "../partials/info-text-trigger";

const questionHeadingFontSize = {
  $lg: stylesConfig.typography.fontSize(1.9),
  $xs: stylesConfig.typography.fontSize(1.2),
};

export default {
  container: {
    "& > p": {
      color: "#656565",
      textAlign: "center",
      width: "100%",
      fontSize: questionHeadingFontSize.$lg,
      margin: [0, 0, "70px"],

      [`@media (${globals.breakpoints.$sm})`]: {
        margin: ["15px", 0, "30px"],
        fontSize: questionHeadingFontSize.$xs,
        fontWeight: 600,
      },
    },
    ...infoTextTrigger,
    "& .question-type-hint": {
      display: "block",
      textAlign: "center",
      fontSize: "16px",
      color: "#656565",
      fontWeight: 400,
      letterSpacing: ".25px",
      marginBottom: "20px",
      [`@media (${globals.breakpoints.$xs})`]: {
        fontSize: "16px",
        letterSpacing: ".21px",
        lineHeight: "1em",
      },
    },
    "& .question-image": {
      position: "relative",
      width: "100%",
      overflow: "hidden",
      height: "auto",
      minHeight: "300px",
      marginBottom: "20px",
      display: "flex",
      alignItems: "center",
      "&::after": {
        content: "''",
        display: "block",
        position: "absolute",
        zIndex: 1,
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0.9) 100%)",
      },
      "& .image-element": {
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center",
        top: 0,
      },
      "& p": {
        color: "#656565",
        position: "relative",
        textAlign: "center",
        left: "50%",
        top: 0,
        width: "100%",
        padding: "10px",
        zIndex: 2,
        margin: "auto",
        transform: "translate(-50%, 0)",
        fontSize: "40px",
      },
    },
    ".multi-answer &": {
      "& > p": {
        margin: "0 0 5px",
        textAlign: "left",
        fontSize: stylesConfig.typography.fontSize(),
        fontWeight: "normal",
      },
    },
  },
};
