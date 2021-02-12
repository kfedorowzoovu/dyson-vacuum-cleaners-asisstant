export default {
  container: {
    "&.alternative-products-shown": {
      "& .shown-products-table": {
        height: "calc(70vh - 242px)",
        transition: "height .5s ease",
      },
    },
    "& .product-image": {
      maxWidth: "200px",
      margin: [0, "auto"],
      height: "150px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      "& img": {
        width: "100%",
        maxWidth: "150px",
        height: "auto",
        maxHeight: "150px",
      },
    },
    "& .product-header": {
      width: "100%",
    },
    "& .product-name, &.product-price": {
      marginTop: "10px",
    },
  },
};
