import { productRecommendationBaseStyles } from "@zoovu/runner-web-design-base";
import { setProductWidth } from "@zoovu/runner-web-design-base/src/utils/set-product-width";
import globals from "../partials/global-variables";
import stylesConfig from "../styles.config";
import * as recommendationConfigurationDiffValues from "../../../configuration/recommendation-configuration-diff.json";
import { ProductButton } from "../partials/buttons";

const MARGIN = 14;

export default {
  container: {
    ...productRecommendationBaseStyles(globals),
    width: () =>
      setProductWidth(
        recommendationConfigurationDiffValues.recommendationSettings.numberOfProductsPerResultsRow,
        MARGIN
      ),
    border: `1px solid ${globals.colors.gray_product_border}`,
    backgroundColor: globals.colors.white,
    transition: "box-shadow 0.1s",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "22px",
    marginRight: "0",
    marginLeft: "0",
    marginBottom: "28px",
    "&:nth-child(odd)": {
      marginRight: "28px",
      [`@media (${globals.breakpoints.$xs})`]: {
        marginRight: "0px",
      },
    },
    "& .product-details": {
      color: globals.colors.gray_primary,
      height: "100%",
      display: "flex",
      flexFlow: "wrap column",
      width: "100%",
    },
    "& .product-image": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      maxWidth: "100%",
      "& a": {
        display: "block",
        width: "100%",
        textAlign: "center",
        "&:focus": {
          outlineColor: globals.colors.green,
        },
      },
      "& img": {
        height: "auto",
        width: "auto",
        maxHeight: "260px",
        maxWidth: "100%",
      },
    },
    "& a.product-name": {
      marginBottom: "20px",
      textDecoration: "none",
      fontSize: stylesConfig.typography.fontSize(1.5),
      color: globals.colors.gray_primary,
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
        fontSize: stylesConfig.typography.fontSize(0.875),
        textTransform: "uppercase",
        display: "inline-block",
        transition: "background .3s ease",
      },
      "& .start-compare-button": {
        marginTop: "5px",
      },
    },
    "& .rating": {
      display: "flex",
    },
    "& .properties-title": {
      fontSize: stylesConfig.typography.fontSize(),
      color: "#303030",
      marginTop: "1.2em",
      marginBottom: 0,
      padding: "0 8px",
    },
    "& .price-compare-wrapper": {
      textAlign: "left",
      "& .product-price": {
        fontWeight: 400,
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
            fontSize: stylesConfig.typography.fontSize(1.5),
            fontWeight: 700,
            color: globals.colors.blue,
            padding: "2px 0",
            [`@media (${globals.breakpoints.$sm})`]: {
              fontSize: stylesConfig.typography.fontSize(1.375),
              padding: "0",
            },
          },
        },
      },
    },
    "& .klarna-message": {
      border: `1px solid ${globals.colors.gray_product_border}`,
      padding: ".5rem",
      backgroundColor: globals.colors.gray_klarna,
      display: "inline-block",
      width: "100%",
      marginBottom: "16px",
    },
    "& .product-footer": {
      width: "100%",
      display: "flex",
      "& .product-button": {
        ...ProductButton,
        minWidth: "240px",
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
  },
};
