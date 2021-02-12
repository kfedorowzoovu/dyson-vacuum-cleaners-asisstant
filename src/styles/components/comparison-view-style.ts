import { ResolvedComponentsConfiguration } from "@zoovu/runner-browser-api";
import globals from "../partials/global-variables";

export default {
  container: {
    position: "fixed",
    zIndex: 9998,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0, .5)",
    display: "table",
    transition: "opacity .3s ease",
    "& .modal-wrapper": {
      display: "table-cell",
      verticalAlign: "middle",
    },
    "& .modal-container": {
      position: "relative",
      width: "80vw",
      maxHeight: "90vh",
      margin: [0, "auto"],
      backgroundColor: globals.colors.white,
      boxShadow: "0 2px 8px rgba(0, 0, 0, .33)",
      transition: "all .3s ease",
    },
    "& .modal-header": {
      display: "flex",
      alignItems: "center",
      marginTop: 0,
      padding: "8px",
    },
    "& .modal-body": {
      display: "block",
    },
    "& .modal-default-button": {
      float: "right",
    },
    "& .close-button": {
      marginLeft: "auto",
    },
    "& .close-icon": {
      display: "inline-block",
      width: "15px",
      height: "15px",
      background: (configuration: ResolvedComponentsConfiguration): string =>
        `${globals.customerSprite2(configuration)} no-repeat scroll 0 -169px transparent`,
      cursor: "pointer",
      marginLeft: "auto",
      "&:after": {
        content: "' '",
        width: "40px",
        height: "40px",
        marginLeft: "-10px",
        marginTop: "-10px",
        display: "block",
      },
    },
  },
};
