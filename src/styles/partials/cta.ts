import globals from "@/styles/partials/global-variables";
import stylesConfig from "@/styles/styles.config";
import { ProductButton, ProductButtonHover } from "@/styles/partials/buttons";

export const ctaGroup = {
  marginBottom: "0",
  marginTop: "auto",
  width: "100%",
  "& .product__rating": {
    alignItems: "center",
    display: "flex",
    marginTop: "4px",
  },
  "& .product-price": {
    fontWeight: 400,
    margin: "24px 0",
    textAlign: "left",
    [`@media (${globals.breakpoints.$sm})`]: {
      margin: "20px 0",
    },
    [`@media (${globals.breakpoints.$xs})`]: {
      margin: "16px 0",
    },
    "&>span": {
      color: globals.colors.gray_primary,
      display: "block",
      fontSize: stylesConfig.typography.fontSize(1),
      [`@media (${globals.breakpoints.$sm})`]: {
        fontSize: stylesConfig.typography.fontSize(0.875),
      },
      "&.price-was": {
        textDecoration: "line-through",
      },
      "&.price-current": {
        color: globals.colors.blue,
        fontWeight: 700,
      },
    },
  },
  "& .klarna-message": {
    backgroundColor: globals.colors.gray_klarna,
    border: `1px solid ${globals.colors.gray_product_border}`,
    display: "inline-block",
    marginBottom: "16px",
    padding: ".5rem",
    width: "100%",
    [`@media (min-width: 767px)`]: {
      display: "block",
      marginBottom: "20px",
      width: "65%",
    },
  },
  "& .checkout__affirm-promotion": {
    marginBottom: "16px",
    [`@media (min-width: 767px)`]: {
      marginBottom: "20px",
    },
    "& p": {
      color: globals.colors.gray_primary,
      margin: "0",
      textAlign: "left",
    }
  },
  "& .product-footer": {
    display: "flex",
    textAlign: "center",
    width: "100%",
    [`@media (min-width: 768px)`]: {
      width: "auto",
      alignItems: "flex-end",
    },
    "& .product-button": {
      extend: ProductButton,
      padding: 0,
      "&>a": {
        extend: ProductButtonHover,
        color: globals.colors.black,
        display: "block",
        padding: "18px 4px",
        textDecoration: "none",
      },
    },
    "& .add-to-cart-button": {
      extend: ProductButtonHover,
      background: globals.colors.green,
      border: "none",
      padding: "18px 4px",
    },
  },
};
