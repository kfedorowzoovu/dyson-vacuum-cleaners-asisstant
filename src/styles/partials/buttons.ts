import { ResolvedComponentsConfiguration } from "@zoovu/runner-browser-api";
import { buttonsFocusStyle,focusStyle } from "@/styles/partials/accessibility";
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

const paginationButtonBorderColor = stylesConfig.colors.advisorBackgroundVariants.dark;
const paginationSelectedButtonBorderColor = stylesConfig.colors.primaryAccentColorVariants.default;
const paginationSelectedButtonBackgroundColors = {
  default: stylesConfig.colors.primaryAccentColorVariants.default, // TODO ADJUST
  hover: stylesConfig.colors.primaryAccentColorVariants.default, // TODO ADJUST
  active: stylesConfig.colors.primaryAccentColorVariants.default, // TODO ADJUST
};

const buttonFontSize = stylesConfig.typography.fontSize(1);

const outlineFocusColor = globals.colors.green;
const outlineFocusSecondaryColor = globals.colors.green;

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
  extend: ButtonReset,
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
  extend: Button,
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
  extend: ButtonReset,
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
};
export const ButtonPaginationSelected = {
  extend: ButtonPagination,
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
  extend: buttonsFocusStyle,
  paddingLeft: "10px",
  paddingRight: "10px",
  fontWeight: 700,
  height: "64px",
  width: "320px",
  border: "none",
  backgroundColor: globals.colors.green,
  color: globals.colors.black,
  margin: "auto",
  marginBottom:"32px",
  fontSize: stylesConfig.typography.fontSize(1),
  position: "relative",
  overflow: "hidden",
  "&:after": {
    content: "''",
    position: "absolute",
    inset: "0 0 0 0",
    background: "rgba(0, 0, 0,.2)",
    borderRadius: "50%",
    width: 0,
    height: 0,
    margin: "auto",
    transition: "0s",
  },
  "&.is-disabled": {
    color: globals.colors.gray_disabled,
    backgroundColor: globals.colors.gray_background,
  },
  [`@media (${globals.breakpoints.$sm})`]: {
    height: "56px",
  [`@media (${globals.breakpoints.$xs})`]: {
    width: "100%",
    left: 0,
    zIndex: 999,
    marginBottom:"auto",
  },
  },
  "&:hover": {
    cursor: "pointer",
    "&:not(.is-disabled):after": {
      width: "768px",
      height: "768px",
      inset: "-50px -50px -50px -50px",
      transition: ".7s",
    },
  },
};

export const ButtonStartOver = {
  extend: ButtonReset,
  display: "flex",
  alignItems: "center",
  textTransform: "capitalize !important",
  color: globals.colors.gray_primary,
  cursor: "pointer",
  fontSize: "16px",
  padding: "10px",
  minWidth: "unset",
  fontWeight: "bold",
  border: "none",
  textDecoration: "underline",
  background: "none",
  "&:focus": {
    outlineColor: outlineFocusColor,
  },
};

export const ButtonNextInProgress = {
  color: "transparent",
  "&:after": {
    content: "' '",
    position: "absolute",
    width: "24px",
    height: "24px",
    top: "50%",
    left: "50%",
    borderStyle: "solid",
    borderWidth: "2px",
    borderLeftColor: "#303030",
    borderRightColor: "#303030",
    borderBottomColor: "#303030",
    borderTopColor: "transparent",
    borderRadius: "50%",
    transform: "rotate(90deg)",
    animation: "$navigationSpinner 1s linear infinite",
  },
};

export const ProductButton = {
  extend: buttonsFocusStyle,
  minWidth: "200px",
  cursor: "pointer",
  fontSize: stylesConfig.typography.fontSize(1.1),
  color: globals.colors.black,
  flex: 1,
  background: "#E0DEDE",
  fontWeight: 600,
  textAlign: "center",
  display: "block",
  textDecoration: "none",
  transition: "background .3s ease",
  outline: "none",
  border: "none",
  position: "relative",
  overflow: "hidden",
  [`@media (${globals.breakpoints.$xs})`]: {
    fontSize: stylesConfig.typography.fontSize(1),
    padding: "18px 4px",
    minWidth: "140px",
  },
};

export const ProductButtonHover = {
  "&:after": {
    content: "''",
    position: "absolute",
    inset: "0 0 0 0",
    background: "rgba(0, 0, 0,.2)",
    borderRadius: "50%",
    width: 0,
    height: 0,
    margin: "auto",
    transition: "0s",
  },
  "&:hover": {
    cursor: "pointer",
    "&:not(.is-disabled):after": {
      width: "768px",
      height: "768px",
      inset: "-50px -50px -50px -50px",
      transition: ".7s",
    },
  },
};
