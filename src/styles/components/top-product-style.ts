import { productAdditionalPriceTextBaseStyles } from "@zoovu/runner-web-design-base";
import { ResolvedComponentsConfiguration } from "@zoovu/runner-browser-api";
import globals from "../partials/global-variables";
import stylesConfig from "../styles.config";
import { ProductButton } from "../partials/buttons";

const focusOutlineColor = globals.colors.green;

export default {
  container: {
    "& .top-product__wrapper": {
      ...productAdditionalPriceTextBaseStyles,
      borderColor: globals.colors.gray_secondary,
      padding: "30px 24px 24px 24px",
      width: "100%",
      position: "relative",
      display: "flex",
      border: `1px solid ${globals.colors.gray_product_border}`,
      backgroundColor: globals.colors.white,
      [`@media (${globals.breakpoints.$xs})`]: {
        flexFlow: "column",
      },
      "& .product-attributes-toggle": {
        display: "block",
        width: "100%",
        color: "#303030",
        fontSize: stylesConfig.typography.fontSize(0.875),
        fontFamily: stylesConfig.typography.fontFamily,
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
    "& .image-wrapper": {
      margin: "0 auto",
      width: "50%",
      paddingLeft: "24px",
      [`@media (${globals.breakpoints.$sm})`]: {
        width: "33%",
      },
      [`@media (${globals.breakpoints.$xs})`]: {
        width: "100%",
        order: 1,
      },
    },
    "& .product-details": {
      height: "100%",
      display: "flex",
      flexFlow: "wrap column",
      textAlign: "center",
      width: "50%",
      [`@media (${globals.breakpoints.$sm})`]: {
        width: "66%",
      },
      [`@media (${globals.breakpoints.$xs})`]: {
        order: 2,
        width: "100%",
      },
      "& a.product-name": {
        textDecoration: "none",
        fontSize: stylesConfig.typography.fontSize(1.5),
        color: "#303030",
        textAlign: "left",
        width: "100%",
        display: "block",
        margin: "0 0 14px 0",
        lineHeight: "24px",
        [`@media (${globals.breakpoints.$sm})`]: {
          fontSize: stylesConfig.typography.fontSize(1.4),
        },
        [`@media (${globals.breakpoints.$xs})`]: {
          fontSize: stylesConfig.typography.fontSize(1.3),
        },
        "&:focus": {
          outlineColor: globals.colors.green,
        },
      },
      "& > p": {
        textAlign: "left",
        fontSize: stylesConfig.typography.fontSize(1.1),
        margin: "0 0 24px 0",
        lineHeight: "24px",
        [`@media (${globals.breakpoints.$sm})`]: {
          margin: "0 0 20px 0",
          fontSize: stylesConfig.typography.fontSize(1),
        },
        [`@media (${globals.breakpoints.$xs})`]: {
          margin: "0 0 16px 0",
        },
      },
    },
    "& .product-image": {
      width: "100%",
      display: "block",
      textAlign: "center",
      height: "100%",
      "& .product-top-tile": {
        position: "absolute",
        left: "24px",
        padding: "5px 14px",
        textAlign: "center",
        background: globals.colors.gray_primary,
        fontSize: stylesConfig.typography.fontSize(0.875),
        top: "-14px",
        color: globals.colors.white,
        [`@media (${globals.breakpoints.$sm})`]: {
          fontSize: stylesConfig.typography.fontSize(0.8),
          padding: "4px 14px",
          top: "-14px",
        },
      },
      "& a": {
        maxWidth: "350px",
        display: "flex",
        justifyContent: "center",
        margin: "auto",
        height: "100%",
        "& img": {
          width: "auto",
          maxHeight: "550px",
          maxWidth: "100%",
        },
        "&:focus": {
          outlineColor: globals.colors.green,
        },
      },
    },
    "& .product-price": {
      color: globals.colors.gray_primary,
      textAlign: "left",
      fontWeight: 400,
      padding: [0, 0, "5px"],
      margin: "24px 0",
      [`@media (${globals.breakpoints.$sm})`]: {
        margin: "20px 0",
      },
      [`@media (${globals.breakpoints.$xs})`]: {
        margin: "16px 0",
      },
      "&>span": {
        fontSize: stylesConfig.typography.fontSize(1),
        color: globals.colors.gray_primary,
        display: "block",
        [`@media (${globals.breakpoints.$sm})`]: {
          fontSize: stylesConfig.typography.fontSize(0.875),
        },
        "&.price-was": {
          textDecoration: "line-through",
        },
        "&.price-current": {
          fontSize: stylesConfig.typography.fontSize(2.2),
          fontWeight: 700,
          color: globals.colors.blue,
          margin: "-2px 0",
          [`@media (${globals.breakpoints.$sm})`]: {
            fontSize: stylesConfig.typography.fontSize(2),
            margin: "0",
          },
          [`@media (${globals.breakpoints.$xs})`]: {
            fontSize: stylesConfig.typography.fontSize(1.5),
          },
        },
      },
    },
    "& .compare-wrapper": {
      padding: "0",
      [`@media (${globals.breakpoints.$xs})`]: {
        display: "none",
      },
      [`@media (min-width: 768px)`]: {
        width: "60%",
        maxWidth: "320px",
        marginTop: "auto",
      },
      "& .product-compare-wrapper": {
        marginTop: "20px",
        [`@media (min-width: 768px)`]: {
          textAlign: "left",
        },
      },
      "& label, & .start-compare-button": {
        padding: "10px 13px",
        fontSize: stylesConfig.typography.fontSize(0.875),
        textTransform: "uppercase",
        display: "inline-block",
        transition: "background .3s ease",
      },
      "& .start-compare-button": {
        marginTop: "5px",
      },
    },
    "& .rating-wrapper": {
      margin: "10px 0",
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
      color: "#303030",
      marginTop: "25px",
      marginBottom: 0,
      padding: "0 0 20px",
    },
    "& .product-properties": {
      display: "flex",
      flexFlow: "wrap",
      padding: "0",
      listStyle: "none",
      overflow: "hidden",
      color: "#303030",
      wordWrap: "break-word",
      maxWidth: "100%",
      textAlign: "left",
      margin: 0,
      "& .product-property": {
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
          /* "&:nth-child(odd)": {
              fontWeight: 700,
            }, */
        },
        "& svg": {
          position: "absolute",
          left: "0",
          top: "4px",
          margin: "auto",
          height: "16px",
          width: "16px",
          fill: globals.colors.green_darker,
        },
      },
    },
    "& .product-footer": {
      display: "flex",
      width: "100%",
      textAlign: "center",
      [`@media (min-width: 768px)`]: {
        width: "auto",
        alignItems: "flex-end",
      },
      "& .product-button": {
        ...ProductButton,
        [`@media (${globals.breakpoints.$xs})`]: {
          minWidth: "auto",
        },
      },
      "& .add-to-cart-button": {
        background: globals.colors.green,
        border: "none",
        marginRight: "12px",
      },
    },
    "& .product__rating": {
      display: "flex",
      marginTop: "4px",
    },
  },
};
