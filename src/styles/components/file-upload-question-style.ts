import { Button } from "../partials/buttons";
import globals from "../partials/global-variables";
import stylesConfig from "../styles.config";

export default {
  container: {
    display: "flex",
    flexFlow: "row wrap",
    alignItems: "flex-start",
    "& .file-question__files": {
      display: "flex",
      "& .file-question__input-file": {
        minWidth: "110px",
      },
    },
    "& p": {
      width: "100%",
    },
    "& label": {
      ...Button,
      minWidth: 0,
      display: "inline-block",
      marginBottom: "15px",
    },
    "& .file-question__preview-list": {
      flexGrow: 1,
      marginLeft: "48px",
    },
    "& .file-question__preview-item": {
      display: "flex",
      justifyContent: "space-between",
      padding: "4px",
      "& img": {
        display: "inline-block",
        maxWidth: "calc(12% - 10px)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
        transition: "transition: all 0.3s cubic-bezier(.25,.8,.25,1)",
      },
      "& .file-question__status": {
        display: "flex",
        position: "relative",
        flexDirection: "column",
        flexGrow: 1,
        padding: "0 10px",
        "& .file-question__status-description": {
          display: "flex",
          justifyContent: "space-between",
        },
        "& progress": {
          color: "#fff",
          backgroundColor: stylesConfig.colors.primary.spectrum500,
          width: "100%",
        },
        "& span": {
          marginBottom: "10px",
        },
        "& .file-size": {
          minWidth: "80px",
          textAlign: "right",
          color: globals.colors.darkGray,
        },
      },
    },
    "& .file-question__validation-message": {
      padding: "5px",
      background: globals.colors.red,
      borderColor: stylesConfig.colors.primary.spectrum400,
      color: globals.colors.white,
      fontSize: stylesConfig.typography.fontSize(0.9),
    },
    "& .file-question__image-remove": {
      background: "none",
      color: stylesConfig.colors.secondary.spectrum500,
      cursor: "pointer",
      borderRadius: "50%",
      border: "solid 1px",
      width: "26px",
      height: "26px",
      padding: 0,
      "& .svg-icon-cross": {
        fill: stylesConfig.colors.secondary.spectrum500,
        cursor: "pointer",
      },
      "& circle": {
        fill: "transparent",
        border: "solid 1px",
        borderColor: stylesConfig.colors.secondary.spectrum500,
        cursor: "pointer",
      },
    },
  },
};
