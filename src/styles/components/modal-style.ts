import ModalStyle from "./comparison-view-style";

export default {
  container: {
    ...ModalStyle.container,
    backgroundColor: "transparent",
    "& .modal-mask": {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0, .5)",
    },
    "& .modal-header span": {
      display: "inline-block",
      width: "100%",
      textAlign: "center",
    },
    "& div.modal-body span": {
      display: "inline-block",
      width: "100%",
      padding: "15px",
      textAlign: "center",
      "& img": {
        width: "100%",
        maxWidth: "500px",
        maxHeight: "500px",
      },
    },
    "&.infotext": {
      "& .modal-container": {
        maxWidth: "800px",
        width: "100%",
      },
    },
  },
};
