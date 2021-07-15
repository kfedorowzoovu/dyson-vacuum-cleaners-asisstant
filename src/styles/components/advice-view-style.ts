import globals from "../partials/global-variables";

import stylesConfig from "../styles.config";

export default {
  container: {
    position: "relative",
    color: "#303030",
    width: "100%",
    maxWidth: globals.layout.maxContainerWidth,
    margin: "auto",
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
      marginBottom: "48px",
    },
    "& .products-wrapper": {
      display: "flex",
      flexFlow: "wrap row",
      maxWidth: "100%",
      justifyContent: "space-between",
      "&::after": {
        content: "''",
        flex: "auto",
      },
    },
    "& .first-cluster-with-products h3": {
      [`@media (${globals.breakpoints.$minMd})`]: {
        margin: [0, "300px", "30px"],
      },
    },
    "& h3": {
      margin: "0px 0px 38px",
      fontSize: stylesConfig.typography.fontSize(1.9),
      fontWeight: 300,
      textAlign: "center",
      minHeight: "1em",
      [`@media (${globals.breakpoints.$sm})`]: {
        fontSize: stylesConfig.typography.fontSize(1.8),
        margin: "0px 0px 28px",
      },
      [`@media (${globals.breakpoints.$xs})`]: {
        fontSize: stylesConfig.typography.fontSize(1.5),
        margin: "0px 0px 24px",
      },
    },
    "& .cluster-perfect-matches h3": {
      [`@media (${globals.breakpoints.$md})`]: {
        margin: [0, "0", "30px"],
      },
    },
    "& .caveat": {
      fontSize: stylesConfig.typography.fontSize(0.875),
      margin: "-50px 0 16px 0",
    },
  },
};
