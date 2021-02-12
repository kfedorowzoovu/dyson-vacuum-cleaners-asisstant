import { productAdditionalPriceTextBaseStyles } from "@zoovu/runner-web-design-base";
import { ResolvedComponentsConfiguration } from "@zoovu/runner-browser-api";
import globals from "../partials/global-variables";
import stylesConfig from "../styles.config";
import mediaQuery from "../abstract/media-query";

const productNameFontSize = stylesConfig.typography.fontSize(1.8);
const productNameFontColor = stylesConfig.colors.primaryFontColor;
const productPriceFontColor = productNameFontColor;
const productPriceFontSize = stylesConfig.typography.fontSize(1.9);
const compareButtonFontColor = stylesConfig.colors.secondaryFontColor;
const compareButtonHoverColor = stylesConfig.colors.primary.spectrum500;
const productButtonBackground = {
  border: stylesConfig.colors.primaryAccentColorVariants.default,
  hover: stylesConfig.colors.primary.spectrum500,
};
const productPropertiesFontColor = {
  default: stylesConfig.colors.primaryFontColor,
  hover: stylesConfig.colors.primaryFontColor,
  negative: stylesConfig.colors.negativeAttributeColor,
  positive: stylesConfig.colors.positiveAttributeColor,
};
const focusOutlineColor = stylesConfig.colors.secondary.spectrum400;

export default {
  container: {
    ...productAdditionalPriceTextBaseStyles,
    marginTop: "10px",
    marginBottom: "30px",
    paddingTop: "30px",
    paddingBottom: "60px",
    width: "100%",
    position: "relative",
    display: "flex",
    alignItems: "flex-start",
    borderBottom: "1px solid",
    borderColor: stylesConfig.colors.secondary.spectrum100,
    "&:first-of-type": {
      borderTop: "1px solid",
      borderColor: stylesConfig.colors.secondary.spectrum100,
    },
    [`@media (max-width: 767px)`]: {
      padding: "45px 20px 20px",
    },
    [`@media (${globals.breakpoints.$xs})`]: {
      flexWrap: "wrap",
      marginTop: 0,
      paddingBottom: "30px",
    },
    "& .image-wrapper": {
      width: "40%",
      [`@media (${globals.breakpoints.$xs})`]: {
        width: "100%",
      },
      [`@media (min-width: 768px)`]: {
        width: "50%",
      },
    },
    "& .product-details": {
      width: "60%",
      display: "flex",
      flexFlow: "wrap column",
      textAlign: "center",
      [`@media (${globals.breakpoints.$xs})`]: {
        width: "100%",
      },
      [`@media (min-width: 768px)`]: {
        margin: "auto",
        textAlign: "left",
      },
      "& .product-attributes-toggle": {
        order: 4,
        display: "block",
        width: "100%",
        fontSize: stylesConfig.typography.fontSize(0.9),
        fontFamily: stylesConfig.typography.fontFamily,
        color: productButtonBackground.border,
        textDecoration: "underline",
        padding: ["6px", "10px", "6px", 0],
        textTransform: "uppercase",
        fontWeight: 600,
        margin: "5px auto 0",
        textAlign: "center",
        border: "none",
        cursor: "pointer",
        backgroundColor: "transparent",
        [`@media (min-width: 768px)`]: {
          textAlign: "left",
        },
        "&:focus": {
          outlineColor: focusOutlineColor,
        },
      },
    },
    "& .product-image": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "0 25px",
      margin: "0 0 20px",
      minHeight: "250px",
      maxWidth: "100%",
      [`@media (${globals.breakpoints.$xs})`]: {
        margin: "0 0 10px",
      },
      "& .product-top-tile": {
        position: "absolute",
        top: 0,
        left: "10px",
        padding: "6px",
        background: stylesConfig.colors.primary.spectrum400,
        "& h4": {
          margin: 0,
          fontSize: stylesConfig.typography.fontSize(1),
          fontWeight: 600,
          color: globals.colors.white,
          textAlign: "center",
          lineHeight: 1,
        },
        "& p": {
          margin: 0,
          fontSize: stylesConfig.typography.fontSize(0.69),
          fontWeight: 400,
          color: globals.colors.white,
          textAlign: "center",
        },
        "& .top-tile-icon": {
          display: "block",
          margin: "10px auto 9px",
          width: "14px",
          height: "10px",
          background: (configuration: ResolvedComponentsConfiguration): string =>
            `${globals.sprite2(configuration)} no-repeat -22px -96px`,
        },
      },
      "& a": {
        maxWidth: "350px",
        "&:focus": {
          outlineColor: stylesConfig.colors.primary.spectrum400,
        },
      },
      "& img": {
        display: "block",
        maxWidth: "100%",
        maxHeight: "350px",
        width: "auto",
        height: "auto",
      },
    },
    "& .product-price": {
      textAlign: "center",
      fontWeight: "400",
      color: productPriceFontColor,
      fontSize: productPriceFontSize,
      padding: [0, 0, "5px"],
      marginTop: "10px",
      [`@media (${globals.breakpoints.$xs})`]: {
        fontSize: "19.2px",
        fontWeight: "600",
      },
      [`@media (min-width: 768px)`]: {
        textAlign: "left",
      },
    },
    "& a.product-name": {
      textDecoration: "none",
      fontWeight: 700,
      fontSize: productNameFontSize,
      color: productNameFontColor,
      lineHeight: 1.2,
      width: "100%",
      display: "block",
      [`@media (${globals.breakpoints.$xs})`]: {
        marginTop: "50px",
        marginBottom: "20px",
      },
      "&:focus": {
        outlineColor: stylesConfig.colors.primary.spectrum400,
      },
    },
    "& .compare-wrapper": {
      padding: "0",
      order: 5,
      [`@media (${globals.breakpoints.$xs})`]: {
        display: "none",
      },
      [`@media (min-width: 768px)`]: {
        width: "60%",
        maxWidth: "320px",
        margin: ["auto", "auto", "auto", 0],
      },
      "& .product-compare-wrapper": {
        marginTop: "20px",
        [`@media (min-width: 768px)`]: {
          textAlign: "left",
        },
      },
      "& label, & .start-compare-button": {
        padding: "10px 13px",
        backgroundColor: stylesConfig.colors.primaryAccentColorVariants.default,
        fontSize: stylesConfig.typography.fontSize(0.9),
        color: compareButtonFontColor,
        textTransform: "uppercase",
        display: "inline-block",
        transition: "background .3s ease",
        [mediaQuery.hover]: {
          "&:hover": {
            backgroundColor: compareButtonHoverColor,
          },
        },
        "&:focus": {
          outlineColor: focusOutlineColor,
        },
      },
      "& .start-compare-button": {
        marginTop: "5px",
      },
    },
    "& .rating-wrapper": {
      margin: "10px 0",
      textAlign: "center",
      "& .rating-image": {
        background: (configuration: ResolvedComponentsConfiguration): string =>
          `${globals.customerSprite2(configuration)} no-repeat 0 -238px`,
        width: "88px",
        height: "16px",
        margin: "0 auto",
        "& .rating-image-over": {
          background: (configuration: ResolvedComponentsConfiguration): string =>
            `${globals.customerSprite2(configuration)} no-repeat 0 -207px`,
          height: "16px",
        },
      },
    },
    "& .properties-title": {
      fontSize: stylesConfig.typography.fontSize(),
      color: stylesConfig.colors.primaryFontColor,
      marginTop: "25px",
      marginBottom: 0,
      padding: "0 0 20px",
    },
    "& .product-properties": {
      display: "flex",
      flexFlow: "wrap",
      padding: "0",
      order: 3,
      listStyle: "none",
      margin: ["5px", 0, 0, 0],
      overflow: "hidden",
      color: productPropertiesFontColor,
      wordWrap: "break-word",
      maxWidth: "100%",
      textAlign: "left",
      "& > li": {
        marginBottom: "7px",
        fontSize: stylesConfig.typography.fontSize(),
        flex: "0 0 50%",
        [`@media (${globals.breakpoints.$xs})`]: {
          flex: "0 0 100%",
        },
      },
      "& i": {
        height: "14px",
        width: "15px",
        display: "inline-block",
        marginRight: "7px",
      },

      "& .positive-property": {
        color: productPropertiesFontColor.default,
        "& i": {
          position: "relative",
          top: "3px",
          background: (configuration: ResolvedComponentsConfiguration): string =>
            `${globals.customerSprite2(configuration)} no-repeat 0 -70px`,
        },
      },
      "& .negative-property": {
        color: productPropertiesFontColor.default,
        "& i": {
          position: "relative",
          top: "3px",
          background: (configuration: ResolvedComponentsConfiguration): string =>
            `${globals.customerSprite2(configuration)} no-repeat -43px -70px`,
        },
      },
      "& .neutral-property": {
        color: productPropertiesFontColor.default,
        "& i": {
          background: (configuration: ResolvedComponentsConfiguration): string =>
            `${globals.customerSprite2(configuration)} no-repeat -20px -70px`,
        },
      },
    },
    "& .product-footer": {
      // display: "flex",
      order: 5,
      position: "relative",
      marginTop: "auto",
      [`@media (min-width: 768px)`]: {
        width: "60%",
        maxWidth: "320px",
        margin: ["auto", "auto", "auto", 0],
        display: "block",
      },
    },
    "& .product-button": {
      order: 3,
      cursor: "pointer",
      width: "100%",
      display: "inline-block",
      fontSize: stylesConfig.typography.fontSize(0.9),
      color: compareButtonFontColor,
      padding: "11px",
      textTransform: "uppercase",
      fontWeight: 400,
      margin: "25px 0 0 0",
      textAlign: "center",
      textDecoration: "none",
      border: "1px solid",
      borderColor: productButtonBackground.border,
      backgroundColor: productButtonBackground.border,
      transition: "background .3s ease",
      [mediaQuery.hover]: {
        "&:hover": {
          backgroundColor: productButtonBackground.hover,
        },
      },
      "&:focus": {
        outlineColor: focusOutlineColor,
      },
    },
  },
};
