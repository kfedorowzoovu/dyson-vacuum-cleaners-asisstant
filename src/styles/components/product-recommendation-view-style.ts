import { productRecommendationBaseStyles } from "@zoovu/runner-web-design-base";
import { setProductWidth } from "@zoovu/runner-web-design-base/src/utils/set-product-width";
import { ctaGroup } from "@/styles/partials/cta";
import globals from "../partials/global-variables";
import stylesConfig from "../styles.config";
import * as recommendationConfigurationDiffValues from "../../../configuration/recommendation-configuration-diff.json";

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
    "& .properties-title": {
      fontSize: stylesConfig.typography.fontSize(),
      color: "#303030",
      marginTop: "1.2em",
      marginBottom: 0,
      padding: "0 8px",
    },
    "& .product__cta-group": {
      extend: ctaGroup,
      "& .product-price": {
        "&>span": {
          "&.price-current": {
            fontSize: stylesConfig.typography.fontSize(1.5),
            padding: "2px 0",
            [`@media (${globals.breakpoints.$sm})`]: {
              fontSize: stylesConfig.typography.fontSize(1.375),
              padding: "0",
            },
          },
        },
      },
      "& .product-footer": {
        "& .product-button": {
          minWidth: "calc(50% - 8px)",
          [`@media (${globals.breakpoints.$xs})`]: {
            minWidth: "auto",
          },
        },
        "& .add-to-cart-button": {
          marginRight: "12px",
          [`@media (${globals.breakpoints.$sm})`]: {
            marginRight: "8px",
          },
          [`@media (${globals.breakpoints.$xs})`]: {
            marginRight: "10px",
          },
        },
      },
    },
  },
};
