import { productRecommendationBaseStyles } from "@zoovu/runner-web-design-base";
import { ResolvedComponentsConfiguration } from "@zoovu/runner-browser-api";
import globals from "../partials/global-variables";
import stylesConfig from "../styles.config";
import mediaQuery from "../abstract/media-query";

const productNameFontSize = stylesConfig.typography.fontSize();
const productNameFontColor = stylesConfig.colors.primaryFontColor;
const productPriceFontColor = productNameFontColor;
const productPriceFontSize = stylesConfig.typography.fontSize();
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
    ...productRecommendationBaseStyles(globals),
    border: "1px solid",
    borderColor: stylesConfig.colors.secondary.spectrum100,
    padding: "45px 20px 20px",
    transition: "box-shadow .5s",
    [mediaQuery.hover]: {
      "&:hover": {
        boxShadow: "0 8px 18px rgba(0, 0, 0, 0.35)",
      },
    },
    "& .product-details": {
      display: "flex",
      flexFlow: "wrap column",
    },
    "& .product-image": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "15px 0 20px",
      height: "200px",
      maxWidth: "100%",
      "& a": {
        display: "block",
        width: "100%",
        textAlign: "center",
        "&:focus": {
          outlineColor: stylesConfig.colors.primary.spectrum400,
        },
      },
      "& img": {
        maxWidth: "200px",
        height: "auto",
        width: "100%",
        maxHeight: "200px",
      },
    },
    "& a.product-name": {
      textDecoration: "none",
      fontWeight: 700,
      textAlign: "center",
      fontSize: productNameFontSize,
      color: productNameFontColor,
      lineHeight: 1.2,
      width: "100%",
      display: "block",
      minHeight: "60px",
      "&:focus": {
        outlineColor: stylesConfig.colors.primary.spectrum400,
      },
    },
    "& .product-compare-wrapper": {
      padding: "0 10px",
      order: 2,
      display: "flex",
      flexFlow: "row wrap",
      justifyContent: "center",
      alignItems: "stretch",
      "& label": {
        marginRight: "5px",
        marginBottom: "5px",
      },
      [`@media (${globals.breakpoints.$xs})`]: {
        display: "none",
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
      marginTop: "1.2em",
      marginBottom: 0,
      padding: "0 8px",
    },
    "& .product-properties": {
      padding: "0 8px",
      order: 3,
      listStyle: "none",
      margin: ["5px", 0, 0, 0],
      overflow: "hidden",
      color: productPropertiesFontColor,
      wordWrap: "break-word",
      maxWidth: "100%",
      "& > li": {
        marginBottom: "7px",
        fontSize: stylesConfig.typography.fontSize(),
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
    "& .product-attributes-toggle": {
      order: 4,
      display: "block",
      width: "100%",
      fontSize: stylesConfig.typography.fontSize(0.9),
      fontFamily: stylesConfig.typography.fontFamily,
      color: productButtonBackground.border,
      textDecoration: "underline",
      padding: "6px 10px",
      textTransform: "uppercase",
      fontWeight: 600,
      margin: "5px auto 0",
      textAlign: "center",
      border: "none",
      cursor: "pointer",
      backgroundColor: "transparent",
      "&:focus": {
        outlineColor: focusOutlineColor,
      },
    },
    "& .price-compare-wrapper": {
      textAlign: "center",
      "& .price": {
        order: 1,
        fontWeight: "600",
        color: productPriceFontColor,
        fontSize: productPriceFontSize,
        padding: [0, 0, "5px"],
      },
    },
    "& .product-footer": {
      display: "flex",
      flexFlow: "column",
      order: 5,
      position: "relative",
      marginTop: "auto",
    },
    "& .product-button": {
      order: 3,
      cursor: "pointer",
      display: "block",
      width: "100%",
      fontSize: stylesConfig.typography.fontSize(0.9),
      color: compareButtonFontColor,
      padding: "11px 10px",
      textTransform: "uppercase",
      fontWeight: 400,
      margin: "15px auto 0",
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
