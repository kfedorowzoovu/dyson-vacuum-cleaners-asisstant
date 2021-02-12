import { ResolvedComponentsConfiguration } from "@zoovu/runner-browser-api";
import globals from "../partials/global-variables";
import stylesConfig from "../styles.config";
import infoTextTrigger from "../partials/info-text-trigger";
import mediaQuery from "../abstract/media-query";

const infoTextBackground = stylesConfig.colors.secondaryAccentColorVariants.transparent;
const infoTextTriggerFontColor = stylesConfig.colors.secondaryFontColor;

const bordersColor = stylesConfig.colors.secondary.spectrum500;
const textColor = stylesConfig.colors.primaryFontColor;
const textSizes = {
  $lg: stylesConfig.typography.fontSize(1),
  $xs: stylesConfig.typography.fontSize(0.9),
};

export default {
  container: {
    "& .collapse-wrapper": {
      maxWidth: "450px",
      width: "100%",
      margin: "0 auto",
      "&.expanded": {
        "& .collapse-header": {
          "& .icon": {
            transform: "rotate(180deg) translate(0, 50%)",
          },
        },
        "& .collapse-expandable-panel": {
          maxHeight: "308px",
          "& .filter-answers-wrapper": {
            maxHeight: "240px",
            overflowY: "auto",
            position: "relative",
            height: "auto",
          },
        },
      },
    },
    "& .collapse-header": {
      position: "relative",
      width: "100%",
      padding: "11px 44px 11px 15px",
      border: "2px solid",
      backgroundColor: globals.colors.white,
      cursor: "pointer",
      borderColor: bordersColor,
      [`@media (${globals.breakpoints.$sm})`]: {
        marginBottom: "8px",
        paddingTop: "12px",
        paddingBottom: "12px",
      },
      "& p": {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        fontSize: textSizes.$lg,
        fontWeight: 600,
        color: textColor,
        margin: 0,
        [`@media (${globals.breakpoints.$xs})`]: {
          fontSize: textSizes.$xs,
          margin: 0,
        },
      },
      "& .icon": {
        position: "absolute",
        display: "block",
        right: "20px",
        top: "22px",
        width: "20px",
        height: "20px",
        transform: "translate(0, -50%)",
        transition: "transform 0.3s",
      },
    },
    "& .collapse-expandable-panel": {
      width: "100%",
      maxHeight: "0",
      overflow: "hidden",
      transition: "max-height .3s ease-out,overflow-y .1s .5s",
      marginBottom: "8px",
      backgroundColor: globals.colors.white,
      margin: "8px 0px",
    },
    "& .filter-option": {
      color: textColor,
      fontSize: textSizes.$lg,
      fontWeight: 600,
      width: "94%",
      [`@media (${globals.breakpoints.$xs})`]: {
        fontSize: textSizes.$xs,
      },
    },
    "& .more-less-button": {
      color: textColor,
      fontSize: textSizes.$xs,
      fontWeight: 600,
      marginLeft: "24px",
      background: "none",
      border: "none",
      textDecoration: "underline",
      cursor: "pointer",
      [mediaQuery.hover]: {
        "&:hover": {
          fontWeight: 800,
        },
      },
      [`@media (${globals.breakpoints.$xs})`]: {
        fontSize: textSizes.$xs,
      },
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
      marginLeft: "16px",
      marginRight: "16px",
    },
    "&.info-text-shown .info-text-trigger": {
      background: (configuration: ResolvedComponentsConfiguration): string =>
        `${globals.customerSprite(configuration)} no-repeat -24px -147px`,
    },
  },
};
