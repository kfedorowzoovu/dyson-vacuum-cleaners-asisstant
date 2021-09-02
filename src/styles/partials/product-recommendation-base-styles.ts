import { setProductWidth } from "@zoovu/runner-web-design-base";
import globals from "@/styles/partials/global-variables";
import stylesConfig from "@/styles/styles.config";

const MARGIN = 30;

export const productAdditionalPriceTextBaseStyles = {
  "& .price-additional-text": {
    fontSize: stylesConfig.typography.fontSize(1),
    fontWeight: 500,
    display: "inline-flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    color: globals.colors.green_medium,
    "&.is-reversed": {
      "& .price-complementary-column-value": {
        order: "-1",
      },
    },
    "& .price-complementary-text-value, & .price-complementary-column-value": {
      display: "inline-block",
      margin: "0 2px",
    },
    "&.price-additional-text--top, &.price-additional-text--bottom": {
      display: "flex",
      "&.price-additional-text--hidden": {
        visibility: "hidden", // keep space for vertical positioned elements
      },
    },
    "&.price-additional-text--right, &.price-additional-text--left": {
      "&.price-additional-text--hidden": {
        display: "none",
      },
    },
  },
};

export const productRecommendationBaseStyles = (globals): Record<string, unknown> => ({
  width: ({ recommendationSettings }) => setProductWidth(recommendationSettings.numberOfProductsPerResultsRow, MARGIN),
  marginBottom: "30px",
  marginRight: "15px",
  marginLeft: "15px",
  alignItems: "flex-start",
  [`@media (${globals.breakpoints.$sm})`]: {
    width: "calc(50% - 30px)",
  },
  [`@media (${globals.breakpoints.$xs})`]: {
    width: "100%",
    marginRight: 0,
    marginLeft: 0,
  },
  ...productAdditionalPriceTextBaseStyles,
});
