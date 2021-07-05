import { ResolvedComponentsConfiguration } from "@zoovu/runner-browser-api";
import stylesConfig from "../styles.config";
import globals from "../partials/global-variables";
import { ButtonStartOver } from "../partials/buttons";
import mediaQuery from "../abstract/media-query";
import infoTextTrigger from "../partials/info-text-trigger";

const filterHeaderSize = {
  $lg: stylesConfig.typography.fontSize(1.6),
  $xs: stylesConfig.typography.fontSize(1.2),
};

const infoTextTriggerFontColor = stylesConfig.colors.secondaryFontColor;
const infoTextBackground = stylesConfig.colors.secondaryAccentColorVariants.transparent;

export default {
  container: {
    marginRight: "16px",
    marginBottom: "32px",
    [`@media (${globals.breakpoints.$xs})`]: {
      width: "100%",
    },
    "& .filters-title": {
      marginLeft: "8px",
      marginTop: "16px",
      fontWeight: 500,
      fontSize: filterHeaderSize.$lg,
      marginBottom: "30px",
      color: stylesConfig.colors.primaryFontColor,
      [`@media (${globals.breakpoints.$xs})`]: {
        fontSize: filterHeaderSize.$xs,
        textAlign: "center",
      },
      [`@media (${globals.breakpoints.$sm})`]: {
        textAlign: "center",
        marginTop: "0px",
      },
      "& .info-text": {
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 2000,
        width: "90%",
        padding: "10px",
        background: infoTextBackground,
        lineHeight: "1.5",
        fontSize: stylesConfig.typography.fontSize(0.8),
        color: infoTextTriggerFontColor,
        pointerEvents: "none",
        textAlign: "center",
      },
      "& .info-text-trigger": {
        ...infoTextTrigger["& .answer-info-text-trigger"],
        marginLeft: "auto",
        marginRight: "16px",
      },
      "&.info-text-shown .info-text-trigger": {
        background: (configuration: ResolvedComponentsConfiguration): string =>
          `${globals.customerSprite(configuration)} no-repeat -24px -147px`,
      },
    },
    "& .restart-filters-button": {
      ...ButtonStartOver,
      backgroundColor: stylesConfig.colors.secondary.spectrum600,
      width: "100%",
      maxWidth: "450px",
      margin: "0 auto",
      color: globals.colors.white,
      fontWeight: 600,
      textTransform: "uppercase",
      marginTop: "12px",
      [mediaQuery.hover]: {
        "&:hover": {
          backgroundColor: globals.colors.green,
        },
      },
    },
    "& .expand-all-button": {
      ...ButtonStartOver,
      background: globals.colors.white,
      width: "100%",
      maxWidth: "450px",
      margin: "0 auto",
      border: "2px solid",
      borderColor: stylesConfig.colors.secondary.spectrum600,
      color: stylesConfig.colors.secondary.spectrum600,
      fontWeight: 600,
      marginTop: "12px",
      [mediaQuery.hover]: {
        "&:hover": {
          backgroundColor: stylesConfig.colors.secondary.spectrum100,
        },
      },
      [`@media (${globals.breakpoints.$xs})`]: {
        marginTop: "8px",
      },
    },
  },
};
