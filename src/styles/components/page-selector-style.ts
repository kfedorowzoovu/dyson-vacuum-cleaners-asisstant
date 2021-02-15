import globals from "../partials/global-variables";
import stylesConfig from "../styles.config";

const pageSelectorButtonBackground = {
  default: stylesConfig.colors.advisorBackgroundVariants,
  selected: stylesConfig.colors.primaryAccentColorVariants.default,
  border: stylesConfig.colors.secondary.spectrum100,
};

export default {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    padding: "10px 0",
    "& .page-selector__page-info": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "15px",
      position: "relative",
      "& .navigation-button": {
        display: "flex",
        alignItems: "center",
        textTransform: "capitalize !important",
        marginLeft: 0,
        color: "#656565",
        cursor: "pointer",
        position: "absolute",
        left: 0,
        fontSize: "16px",
        padding: "10px",
        minWidth: "unset",
        fontWeight: "bold",
        marginRight: "auto",
        border: "none",
        textDecoration: "underline",
        background: "none",
      },
      "& .page-number": {
        color: "#656565",
      },
    },
    "& .page-selector__progress-bar": {
      display: "flex",
      "& button": {
        cursor: "pointer",
        position: "relative",
        width: "auto",
        height: 0,
        margin: 0,
        padding: 0,
        textAlign: "center",
        borderBottom: "5px solid",
        borderStyle: "none",
        flexGrow: 1,
        backgroundColor: "transparent",
        [`@media (${globals.breakpoints.$xs})`]: {
          borderBottom: "4px solid",
        },
        [`@media (${globals.breakpoints.$sm})`]: {},
        "&:focus": {},
        "&.page-selector": {
          borderColor: "#fafafa",
        },
        "&.visited": {
          borderColor: "#656565",
          "& span": {
            fontWeight: 700,
            color: stylesConfig.colors.primaryFontColor,
          },
          "&.is-selected": {
            "& span": {
              color: pageSelectorButtonBackground.selected,
            },
          },
        },
        "& i": {
          display: "none",
        },
        "& span": {
          display: "block",
          color: stylesConfig.colors.secondary.spectrum200,
          fontSize: stylesConfig.typography.fontSize(0.9),
          fontWeight: 400,
        },
      },
    },
  },
};
