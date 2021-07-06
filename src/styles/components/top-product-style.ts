import { productAdditionalPriceTextBaseStyles } from "@zoovu/runner-web-design-base";
import { ResolvedComponentsConfiguration } from "@zoovu/runner-browser-api";
import globals from "../partials/global-variables";
import stylesConfig from "../styles.config";
const focusOutlineColor = globals.colors.green;

export default {
  container: {
    "& .top-product__wrapper": {
      ...productAdditionalPriceTextBaseStyles,
      padding: "30px 24px 24px 24px",
      width: "100%",
      position: "relative",
      display: "flex",
      border: `1px solid ${globals.colors.gray_product_border}`,
      backgroundColor: globals.colors.white,
      [`@media (${globals.breakpoints.$xs})`]: {
        flexWrap: "wrap",
      },
      "& .product-attributes-toggle": {
        display: "block",
        width: "100%",
        color: "#303030",
        fontSize: stylesConfig.typography.fontSize(0.9),
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
      "& .product-top-tile": {
        fontSize: stylesConfig.typography.fontSize(0.85),
        top: "-16px",
        color: "white",
        background: "#303030",
      },
    },
    "& .product-details": {
      height: "100%",
      display: "flex",
      flexFlow: "wrap column",
      textAlign: "center",
      width: "50%",
      "& > p": {
        textAlign: "left",
        fontSize: stylesConfig.typography.fontSize(1),
      },
      [`@media (min-width: 768px)`]: {},
    },
    "& .product-image": {
      width: "100%",
      display: "block",
      textAlign: "center",
      "& .product-top-tile": {
        position: "absolute",
        top: 0,
        left: "24px",
        padding: "6px 14px",
        textAlign: "center",
        background: globals.colors.green,
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
          outlineColor: globals.colors.green,
        },
      },
    },
    "& .product-price": {
      color: "#303030",
      textAlign: "left",
      fontSize: "20px",
      fontWeight: "600",
      padding: [0, 0, "5px"],
      marginTop: "10px",
    },
    "& a.product-name": {
      textDecoration: "none",
      fontSize: stylesConfig.typography.fontSize(1.5),
      color: "#303030",
      lineHeight: 1.2,
      textAlign: "left",
      width: "100%",
      display: "block",
      [`@media (${globals.breakpoints.$xs})`]: {
        margin: "10px 0",
      },
      "&:focus": {
        outlineColor: globals.colors.green,
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
        fontSize: stylesConfig.typography.fontSize(0.9),
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
      margin: ["5px", 0, 0, 0],
      overflow: "hidden",
      color: "#303030",
      wordWrap: "break-word",
      maxWidth: "100%",
      textAlign: "left",
      "& > li": {
        marginBottom: "7px",
        fontSize: "14px",
        display: "flex",
        alignItems: "center",
        flex: "0 0 50%",
        "& .property-icon": {
          marginRight: "5px",
          maxWidth: "16px",
          maxHeight: "16px",
        },
        [`@media (${globals.breakpoints.$xs})`]: {
          flex: "0 0 100%",
        },
      },
      "& i": {
        height: "14px",
        width: "15px",
        marginRight: "7px",
        display: "inline-block",
      },
      "& .positive-property": {
        "& i": {
          position: "relative",
          top: "2px",
          background: `url("//d3smx8fpgq4j0l.cloudfront.net/zoovu/3d2f2e3c-8eab-4f23-a76f-eb683109d3ba") 0% 0% / 14px no-repeat`,
        },
      },
      "& .negative-property": {
        "& i": {
          position: "relative",
          top: "3px",
          background: (configuration: ResolvedComponentsConfiguration): string =>
            `${globals.customerSprite2(configuration)} no-repeat -43px -70px`,
        },
      },
      "& .neutral-property": {
        "& i": {
          background: (configuration: ResolvedComponentsConfiguration): string =>
            `${globals.customerSprite2(configuration)} no-repeat -20px -70px`,
        },
      },
    },
    "& .product-footer": {
      display: "flex",
      width: "100%",
      textAlign: "center",
      [`@media (min-width: 768px)`]: {
        width: "auto",
        padding: "10px",
        alignItems: "flex-end",
      },
      "& .product-button": {
        minWidth: "150px",
        cursor: "pointer",
        fontSize: "14px",
        color: "#303030",
        flex: 1,
        background: "#E0DEDE",
        padding: "10px",
        fontWeight: 600,
        textAlign: "center",
        display: "block",
        textDecoration: "none",
        transition: "background .3s ease",
      },
      "& .add-to-cart-button": {
        color: "white",
        background: "#79b928",
        border: "none",
      },
    },
    "& .product__rating": {
      display: "flex",
    },
  },
};
