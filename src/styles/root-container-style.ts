import stylesConfig from "./styles.config";

const fontSize = stylesConfig.typography.fontSize();

export default {
  container: {
    fontSize,
    fontFamily: stylesConfig.typography.fontFamily,
    "& *": {
      boxSizing: "border-box",
    },
  },
};
