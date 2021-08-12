import stylesConfig from "@/styles/styles.config";
import globals from "@/styles/partials/global-variables";

export default {
  container: {
    "&.property": {
      marginBottom: "20px",
      fontSize: stylesConfig.typography.fontSize(1),
      lineHeight: "24px",
      alignItems: "center",
      flex: "0 0 50%",
      paddingLeft: "30px",
      position: "relative",
      fontWeight: 400,
      [`@media (${globals.breakpoints.$sm})`]: {
        fontSize: stylesConfig.typography.fontSize(0.875),
        lineHeight: "20px",
      },
      [`@media (${globals.breakpoints.$xs})`]: {
        flex: "0 0 100%",
      },
      "&:nth-child(odd)": {
        paddingRight: "30px",
      },
      "& span": {
        display: "block",
        position: "relative",
      },
      "& svg": {
        position: "absolute",
        left: "0",
        top: "4px",
        margin: "auto",
        height: "16px",
        width: "16px",
        fill: globals.colors.black,
      },
    },
  },
};
