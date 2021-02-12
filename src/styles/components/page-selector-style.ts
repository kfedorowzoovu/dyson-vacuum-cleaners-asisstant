import globals from "../partials/global-variables";
import stylesConfig from "../styles.config";

const pageSelectorButtonBackground = {
  default: stylesConfig.colors.advisorBackgroundVariants,
  selected: stylesConfig.colors.primaryAccentColorVariants.default,
  border: stylesConfig.colors.secondary.spectrum100,
};
const focusOutlineColor = stylesConfig.colors.secondary.spectrum100;

export default {
  container: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
    width: "100%",
    paddingTop: "40px",
    paddingBottom: "65px",
    [`@media (${globals.breakpoints.$xs})`]: {
      order: 3,
      paddingTop: "30px",
      paddingBottom: "20px",
    },
    "& button": {
      position: "relative",
      width: "auto",
      height: "50px",
      textAlign: "center",
      borderBottom: "3px solid",
      borderStyle: "none",
      paddingRight: "16px",
      flexGrow: 1,
      textTransform: "uppercase",
      backgroundColor: "transparent",
      [`@media (${globals.breakpoints.$sm})`]: {
        height: "25px",
      },
      "&:focus": {
        outlineColor: focusOutlineColor,
      },
      "&.page-selector": {
        borderColor: pageSelectorButtonBackground.border,
      },
      "&.visited": {
        borderColor: pageSelectorButtonBackground.selected,
        "&::after": {
          backgroundColor: pageSelectorButtonBackground.selected,
        },
      },
      "& i": {
        display: "none",
      },
      "& span": {
        display: "block",
        color: stylesConfig.colors.primaryFontColor,
        fontSize: stylesConfig.typography.fontSize(0.9),
      },
      "&::after": {
        content: "' '",
        position: "absolute",
        width: "12px",
        height: "12px",
        backgroundColor: pageSelectorButtonBackground.border,
        right: "0px",
        bottom: "-7px",
        borderRadius: "50%",
      },
      [`@media all and (-ms-high-contrast: none), (-ms-high-contrast: active)`]: {
        overflow: "visible",
      },
    },
  },
};
