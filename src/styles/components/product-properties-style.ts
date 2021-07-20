import globals from "../partials/global-variables";

export default {
  container: {
    "&.product-properties": {
      display: "flex",
      flexFlow: "wrap",
      padding: "0",
      listStyle: "none",
      overflow: "hidden",
      color: globals.colors.gray1,
      wordWrap: "break-word",
      maxWidth: "100%",
      textAlign: "left",
      margin: 0,
    },
  },
};
