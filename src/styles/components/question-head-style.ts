import globals from "../partials/global-variables";
import stylesConfig from "../styles.config";
import infoTextTrigger from "../partials/info-text-trigger";

export default {
  container: {
    "& > h2": {
      color: globals.colors.gray_primary,
      textAlign: "center",
      width: "100%",
      fontSize: stylesConfig.typography.fontSize(2),
      fontWeight: 300,
      margin: [0, 0, "24px"],
      [`@media (${globals.breakpoints.$sm})`]: {
        margin: [0, 0, "20px"],
        fontSize: stylesConfig.typography.fontSize(2),
      },
      [`@media (${globals.breakpoints.$xs})`]: {
        margin: [0, 0, "16px"],
        fontSize: stylesConfig.typography.fontSize(1.5),
      },
    },
    ...infoTextTrigger,
    "& .question-type-hint": {
      display: "block",
      textAlign: "center",
      fontSize: stylesConfig.typography.fontSize(1.1),
      color: globals.colors.gray_secondary,
      fontWeight: 400,
      margin: [0, 0, "24px"],
      [`@media (${globals.breakpoints.$sm})`]: {
        fontSize: stylesConfig.typography.fontSize(1.15),
        margin: [0, 0, "20px"],
      },
      [`@media (${globals.breakpoints.$xs})`]: {
        fontSize: stylesConfig.typography.fontSize(1),
        margin: [0, 0, "16px"],
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
      "& h2": {
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
      "& > h2": {
        margin: "0 0 5px",
        textAlign: "left",
        fontSize: stylesConfig.typography.fontSize(),
        fontWeight: "normal",
      },
    },
  },
};
