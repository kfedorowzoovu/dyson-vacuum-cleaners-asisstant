import { productRecommendationBaseStyles } from "@zoovu/runner-web-design-base";
import { ResolvedComponentsConfiguration } from "@zoovu/runner-browser-api";
import { setProductWidth } from "@zoovu/runner-web-design-base/src/utils/set-product-width";
import globals from "../partials/global-variables";
import stylesConfig from "../styles.config";
import mediaQuery from "../abstract/media-query";
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
    padding: "24px",
    marginRight: "0",
    marginLeft: "0",
    marginBottom: "28px",
    "&:nth-child(odd)": {
      marginRight: "28px",
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
        fontSize: stylesConfig.typography.fontSize(0.9),
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
    "& .product-properties": {
      padding: "0 8px",
      marginBottom: "auto",
      listStyle: "none",
      margin: ["5px", 0, 0, 0],
      overflow: "hidden",
      color: "#303030",
      wordWrap: "break-word",
      maxWidth: "100%",
      display: "flex",
      flexFlow: "wrap",
      "& > li": {
        marginBottom: "14px",
        fontSize: stylesConfig.typography.fontSize(1),
        lineHeight: "24px",
        alignItems: "center",
        flex: "0 0 50%",
        paddingLeft: "24px",
        "&:nth-child(odd)": {
          paddingRight: "30px",
        },
        "& span": {
          display: "block",
          position: "relative",
          "&:nth-child(odd)": {
            fontWeight: 700,
          },
          "& b": {
            position: "absolute",
            left: "-24px",
            top: 0,
          },
        },
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
        display: "inline-block",
        marginRight: "7px",
      },

      "& .positive-property": {
        "& i": {
          position: "relative",
          top: "3px",
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
    "& .product-attributes-toggle": {
      display: "block",
      width: "100%",
      fontSize: stylesConfig.typography.fontSize(0.9),
      fontFamily: stylesConfig.typography.fontFamily,
      textDecoration: "underline",
      padding: "6px 10px",
      textTransform: "uppercase",
      fontWeight: 600,
      margin: "5px auto 0",
      textAlign: "center",
      border: "none",
      cursor: "pointer",
      backgroundColor: "transparent",
      color: "#303030",
      "&:focus": {
        outlineColor: "#303030",
      },
    },
    "& .price-compare-wrapper": {
      textAlign: "left",
      "& .product-price": {
        fontWeight: "600",
        color: globals.colors.gray_primary,
        fontSize: stylesConfig.typography.fontSize(1.5),
      },
    },
    "& .product-footer": {
      width: "100%",
      display: "flex",
      marginTop: "16px",
      "& .product-button": {
        ...ProductButton,
        minWidth: "240px",
      },
      "& .add-to-cart-button": {
        background: globals.colors.green,
        border: "none",
        marginRight: "12px",
      },
    },
  },
};
