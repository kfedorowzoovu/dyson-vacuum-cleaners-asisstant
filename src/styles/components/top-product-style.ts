import { productAdditionalPriceTextBaseStyles } from "@zoovu/runner-web-design-base";
import { ctaGroup } from "@/styles/partials/cta";
import { productName } from "@/styles/partials/text";
import globals from "../partials/global-variables";
import stylesConfig from "../styles.config";

const focusOutlineColor = globals.colors.green;

export default {
  container: {
    [`@media (${globals.breakpoints.$sm})`]: {
      margin: "auto 15px",
    },
    "& .top-product__wrapper": {
      ...productAdditionalPriceTextBaseStyles,
      borderColor: globals.colors.gray_secondary,
      padding: "30px 24px 24px 24px",
      width: "100%",
      position: "relative",
      display: "flex",
      border: `1px solid ${globals.colors.gray_product_border}`,
      backgroundColor: globals.colors.white,
      [`@media (${globals.breakpoints.$sm})`]: {
        padding: "30px 20px 20px 20px",
      },
      [`@media (${globals.breakpoints.$xs})`]: {
        flexFlow: "column",
        padding: "30px 22px 22px 22px",
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
        margin: 0,
        padding: 0,
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
      "& .product-name": {
        extend: productName,
        fontSize: stylesConfig.typography.fontSize(1.5),
        [`@media (${globals.breakpoints.$sm})`]: {
          fontSize: stylesConfig.typography.fontSize(1.4),
        },
        [`@media (${globals.breakpoints.$xs})`]: {
          fontSize: stylesConfig.typography.fontSize(1.3),
        },
      },
      "& > p": {
        textAlign: "left",
        fontSize: stylesConfig.typography.fontSize(1.1),
        margin: "0 0 24px 0",
        lineHeight: "24px",
        "&.top-product-claim": {
          marginBottom: "14px",
        },
        "&.top-product-hint": {
          marginTop: "10px",
          [`@media (${globals.breakpoints.$minSm})`]: {
            fontSize: stylesConfig.typography.fontSize(0.875),
            marginBottom: "12px",
          },
        },
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
        background: globals.colors.gray_primary,
        color: globals.colors.white,
        fontSize: stylesConfig.typography.fontSize(0.875),
        fontWeight: 600,
        height: "28px",
        left: "24px",
        lineHeight: "17px",
        padding: "5px 14px",
        position: "absolute",
        textAlign: "center",
        top: "-14px",
        [`@media (${globals.breakpoints.$sm})`]: {
          fontSize: stylesConfig.typography.fontSize(0.75),
          height: "24px",
          lineHeight: "16px",
          padding: "4px 14px",
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
          maxHeight: "480px",
          maxWidth: "100%",
          [`@media (${globals.breakpoints.$sm})`]: {
            maxHeight: "80%",
          },
          [`@media (${globals.breakpoints.$xs})`]: {
            maxWidth: "180px",
            maxHeight: "320px",
          },
          [`@media ${globals.breakpoints.$tabletOnly}`]: {
            maxHeight: "80%",
          },
        },
        "&:focus": {
          outlineColor: globals.colors.green,
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
    "& .properties-title": {
      fontSize: stylesConfig.typography.fontSize(),
      color: "#303030",
      marginTop: "25px",
      marginBottom: 0,
      padding: "0 0 20px",
    },
    "& .top-product__cta-group": {
      extend: ctaGroup,
      "& .product-price": {
        color: globals.colors.gray_primary,
        padding: [0, 0, "5px"],
        "&>span": {
          "&.price-current": {
            fontSize: stylesConfig.typography.fontSize(2.2),
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
      "& .product-footer": {
        "& .product-button": {
          [`@media (${globals.breakpoints.$xs})`]: {
            minWidth: "auto",
          },
        },
        "& .add-to-cart-button": {
          marginRight: "28px",
          [`@media (${globals.breakpoints.$sm})`]: {
            marginRight: "20px",
          },
          [`@media (${globals.breakpoints.$xs})`]: {
            marginRight: "10px",
          },
        },
      },
    },
  },
};
