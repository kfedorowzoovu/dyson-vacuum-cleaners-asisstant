import { ResolvedComponentsConfiguration } from "@zoovu/runner-browser-api";
import globals from "./global-variables";
import stylesConfig from "../styles.config";
import mediaQuery from "../abstract/media-query";

const buttonBackgroundColors = {
  previous: {
    default: stylesConfig.colors.advisorBackgroundVariants.default,
    hover: stylesConfig.colors.primary.spectrum100,
    active: stylesConfig.colors.advisorBackgroundVariants.default,
  },
  next: {
    default: stylesConfig.colors.primaryAccentColorVariants.default,
    hover: stylesConfig.colors.primary.spectrum500,
    active: stylesConfig.colors.primary.spectrum500,
  },
  startOver: {
    default: stylesConfig.colors.secondary.spectrum100,
    hover: stylesConfig.colors.secondary.spectrum200,
    active: stylesConfig.colors.secondary.spectrum200,
  },
};

const previousButtonTextColor = stylesConfig.colors.primaryAccentColorVariants.default;
const nextButtonTextColor = stylesConfig.colors.secondaryFontColor;
const nextButtonBorderColor = stylesConfig.colors.primaryAccentColorVariants.default;
const previousButtonBorderColor = stylesConfig.colors.primaryAccentColorVariants.default;

const paginationButtonBackgroundColors = {
  hover: globals.colors.gray,
  active: globals.colors.gray,
};

const paginationButtonBorderColor = stylesConfig.colors.advisorBackgroundVariants.dark;
const paginationSelectedButtonBorderColor = stylesConfig.colors.primaryAccentColorVariants.default;
const paginationSelectedButtonBackgroundColors = {
  default: stylesConfig.colors.primaryAccentColorVariants.default, // TODO ADJUST
  hover: stylesConfig.colors.primaryAccentColorVariants.default, // TODO ADJUST
  active: stylesConfig.colors.primaryAccentColorVariants.default, // TODO ADJUST
};

const buttonFontSize = stylesConfig.typography.fontSize(0.9);
const startOverButtonFontSize = stylesConfig.typography.fontSize(0.9);
const startOverButtonTextColor = stylesConfig.colors.primaryFontColor;

const outlineFocusColor = stylesConfig.colors.primary.spectrum400;
const outlineFocusSecondaryColor = stylesConfig.colors.secondary.spectrum400;

export const ButtonReset = {
  display: "inline-block",
  padding: 0,
  margin: 0,
  background: "transparent",
  border: 0,
  cursor: "pointer",
  fontFamily: "inherit",
};

export const Button = {
  ...ButtonReset,
  position: "relative",
  padding: ["11px", "10px"],
  minWidth: "140px",
  backgroundColor: "white",
  border: (configuration: ResolvedComponentsConfiguration): string =>
    `1px solid ${previousButtonBorderColor(configuration)}`,
  fontSize: buttonFontSize,
  color: previousButtonTextColor,
  fontWeight: "500",
  textTransform: "uppercase",
  transition: "background .3s ease",
  [mediaQuery.hover]: {
    "&:hover": {
      background: buttonBackgroundColors.previous.hover,
    },
  },
  "&:active": {
    background: buttonBackgroundColors.previous.active,
  },
  "&:focus": {
    outlineColor: outlineFocusSecondaryColor,
  },
  "&.is-hidden": {
    display: "none",
  },
};

export const ButtonPrimary = {
  ...Button,
  background: buttonBackgroundColors.next.default,
  border: (configuration: ResolvedComponentsConfiguration): string =>
    `1px solid ${nextButtonBorderColor(configuration)}`,
  color: nextButtonTextColor,
  [mediaQuery.hover]: {
    "&:hover": {
      background: buttonBackgroundColors.next.hover,
    },
  },
  "&:active": {
    background: buttonBackgroundColors.next.active,
  },
};

export const ButtonPagination = {
  ...ButtonReset,
  minWidth: "30px",
  minHeight: "30px",
  padding: ["8px", 0],
  border: (configuration: ResolvedComponentsConfiguration): string =>
    `1px solid ${paginationButtonBorderColor(configuration)}`,
  marginRight: "10px",
  transition: "background .3s ease, border .3s ease",
  "&:last-child": {
    marginRight: 0,
  },
  [mediaQuery.hover]: {
    "&:hover": {
      background: paginationButtonBackgroundColors.hover,
    },
  },
  "&:active": {
    background: paginationButtonBackgroundColors.active,
  },
};
export const ButtonPaginationSelected = {
  ...ButtonPagination,
  background: paginationSelectedButtonBackgroundColors.default,
  color: globals.colors.white,
  border: (configuration: ResolvedComponentsConfiguration): string =>
    `1px solid ${paginationSelectedButtonBorderColor(configuration)}`,
  [mediaQuery.hover]: {
    "&:hover": {
      background: paginationSelectedButtonBackgroundColors.hover,
    },
  },
  "&:active": {
    background: paginationSelectedButtonBackgroundColors.active,
  },
};

export const ButtonPaginationNextBack = {
  paddingLeft: "10px",
  paddingRight: "10px",
  fontWeight: 600,
};

export const ButtonStartOver = {
  ...ButtonReset,
  fontSize: startOverButtonFontSize,
  color: startOverButtonTextColor,
  display: "flex",
  flexFlow: "wrap row",
  alignItems: "center",
  justifyContent: "center",
  textTransform: "uppercase",
  background: buttonBackgroundColors.startOver.default,
  padding: ["12px", "20px"],
  minWidth: "139px", // 1px less than the other button because 320px device with 15px margin (+ body default margins) wont fit 2 buttons besides each other
  transition: "background .3s ease, border .3s ease",
  [mediaQuery.hover]: {
    "&:hover": {
      background: buttonBackgroundColors.startOver.hover,
    },
  },
  "&:active": {
    background: buttonBackgroundColors.startOver.active,
  },
  "&:focus": {
    outlineColor: outlineFocusColor,
  },
};

export const ButtonNextInProgress = {
  ...Button,
  backgroundColor: buttonBackgroundColors.next.default,
  border: (configuration: ResolvedComponentsConfiguration): string =>
    `1px solid ${nextButtonBorderColor(configuration)}`,
  color: buttonBackgroundColors.next.default,
  marginRight: 0,
  transition: "none",
  [mediaQuery.hover]: {
    "&:hover": {
      backgroundColor: buttonBackgroundColors.next.default,
      color: buttonBackgroundColors.next.default,
    },
  },
  "&:active": {
    color: buttonBackgroundColors.next.default,
    background: buttonBackgroundColors.next.default,
  },
  "&:after": {
    top: "50%",
    left: "50%",
    content: "''",
    position: "absolute",
    width: "24px",
    height: "24px",
    borderStyle: "solid",
    borderWidth: "1px",
    borderLeftColor: (configuration: ResolvedComponentsConfiguration): string =>
      `${nextButtonTextColor(configuration)}`,
    borderRightColor: (configuration: ResolvedComponentsConfiguration): string =>
      `${nextButtonTextColor(configuration)}`,
    borderBottomColor: (configuration: ResolvedComponentsConfiguration): string =>
      `${nextButtonTextColor(configuration)}`,
    borderTopColor: "transparent",
    "border-radius": "50%",
    transform: "rotate(90deg)",
    animation: "$navigationSpinner 1s linear infinite",
  },
  [`@media (${globals.breakpoints.$xs})`]: {
    order: 2,
    width: "calc(50% - 5px)",
    paddingLeft: 0,
    paddingRight: 0,
  },
};
