import { ResolvedComponentsConfiguration } from "@zoovu/runner-browser-api";
import { RadioStyle, RadioStyleSelected } from "../partials/radio-style";
import checkboxStyles from "../partials/custom-checkbox-style";
import radioStyles from "../partials/custom-radio-style";
import stylesConfig from "../styles.config";
import infoTextTrigger from "../partials/info-text-trigger";
import globals from "../partials/global-variables";

const answerFontColor = stylesConfig.colors.primaryFontColor;
const infoTextTriggerFontColor = stylesConfig.colors.secondaryFontColor;
const infoTextBackground = stylesConfig.colors.secondaryAccentColorVariants.transparent;
const bordersColor = stylesConfig.colors.secondary.spectrum500;

const answerTextFontSize = {
  $lg: stylesConfig.typography.fontSize(1),
  $xs: stylesConfig.typography.fontSize(0.875),
};

export default {
  container: {
    ...checkboxStyles.container,
    ...radioStyles.container,
    margin: "16px auto",
    "& .checkbox-indicator": {
      ...checkboxStyles.container["& .checkbox-indicator"],
      marginLeft: "5px",
    },
    "& .radio-indicator": {
      ...radioStyles.container["& .radio-indicator"],
      marginLeft: "5px",
    },
    "& label": {
      cursor: "pointer",
    },
    "& .answer-selection-radio": {
      ...RadioStyle,
      marginRight: "15px",
      display: "inline-block",
    },
    "&.is-selected .answer-selection-radio": {
      ...RadioStyleSelected,
      marginRight: "15px",
      display: "inline-block",
    },
    "& .answer-content": {
      display: "flex",
      alignItems: "center",
      width: "100%",
    },
    "&.has-image": {
      border: "2px solid",
      borderColor: bordersColor,
      margin: "8px auto",
      "& .filter-answer-image": {
        height: "60px",
        width: "60px",
        minWidth: "60px",
        position: "relative",
        "& .filter-image-element": {
          position: "absolute",
          width: "100%",
          height: "100%",
          left: 0,
          right: 0,
          backgroundSize: "cover",
          backgroundPosition: "center",
        },
      },
    },
    "& .answer-text": {
      marginBottom: 0,
      textAlign: "left",
      color: answerFontColor,
      margin: 0,
      padding: "2px 2px 2px 0",
      fontSize: answerTextFontSize.$lg,
      [`@media (${globals.breakpoints.$xs})`]: {
        fontSize: answerTextFontSize.$xs,
      },
      "& p": {
        padding: "8px 4px",
      },
    },
    "&.is-disabled": {
      opacity: 0.4,
      "& label": {
        cursor: "default",
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
      marginLeft: "auto",
      marginRight: "16px",
    },
    "&.info-text-shown .info-text-trigger": {
      background: (configuration: ResolvedComponentsConfiguration): string =>
        `${globals.customerSprite(configuration)} no-repeat -24px -147px`,
    },
  },
};
