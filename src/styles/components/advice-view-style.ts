import globals from "../partials/global-variables";

import stylesConfig from "../styles.config";

const productsHeaderSize = {
  $lg: stylesConfig.typography.fontSize(1.9),
  $xs: stylesConfig.typography.fontSize(1.2),
};
const productsSubheaderSize = {
  $lg: stylesConfig.typography.fontSize(1.3),
  $xs: stylesConfig.typography.fontSize(0.9),
};
const productsHeaderColor = stylesConfig.colors.primaryFontColor;

export default {
  container: {
    position: "relative",
    color: "#303030",
    "& .advice-recommended": {
      position: "relative",
      display: "flex",
      "& > div:last-child": {
        width: "100%",
      },
      [`@media (${globals.breakpoints.$sm})`]: {
        flexDirection: "column",
      },
    },
    "& .products-filters-wrapper": {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      [`@media (${globals.breakpoints.$sm})`]: {
        flexDirection: "column",
      },
      "& > div": {
        flex: 2,
      },
      "& .filter-panel-advice": {
        flex: 1,
        paddingRight: "20px",
      },
    },
    "& .cluster-wrapper, & .advice-top-products": {
      position: "relative",
    },
    "& .products-wrapper": {
      display: "flex",
      flexFlow: "wrap row",
      "&::after": {
        content: "''",
        flex: "auto",
      },
      [`@media (${globals.breakpoints.$lg})`]: {
        marginLeft: "-10px",
        marginRight: "-10px",
      },
    },
    "& .first-cluster-with-products h3": {
      [`@media (${globals.breakpoints.$minMd})`]: {
        margin: [0, "300px", "30px"],
      },
    },
    "& h3": {
      margin: "25px 0 40px 0",
      fontSize: productsHeaderSize.$lg,
      fontWeight: 400,
      textAlign: "center",
      minHeight: "1em",
      [`@media (${globals.breakpoints.$xs})`]: {
        fontSize: productsHeaderSize.$xs,
      },
    },
    "& h4": {
      margin: ["25px", 0],
      fontSize: productsSubheaderSize.$lg,
      fontWeight: 400,
      textAlign: "center",
      [`@media (${globals.breakpoints.$md})`]: {
        margin: [0, "0", "30px"],
      },
      [`@media (${globals.breakpoints.$xs})`]: {
        fontSize: productsSubheaderSize.$xs,
      },
    },
    "& .cluster-perfect-matches h3": {
      [`@media (${globals.breakpoints.$md})`]: {
        margin: [0, "0", "30px"],
      },
    },
  },
};
