import globals from "@/styles/partials/global-variables";
import stylesConfig from "@/styles/styles.config";
import { ProductButton } from "@/styles/partials/buttons";

export const ctaGroup = {
  width: "100%",
  marginBottom: "0",
  marginTop: "auto",
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
        fontWeight: 700,
        color: globals.colors.blue,
      },
    },
  },
  "& .klarna-message": {
    padding: ".5rem",
    display: "inline-block",
    width: "100%",
    marginBottom: "16px",
  },
  "& .product-footer": {
    display: "flex",
    width: "100%",
    textAlign: "center",
    [`@media (min-width: 768px)`]: {
      width: "auto",
      alignItems: "flex-end",
    },
    "& .product-button": {
      ...ProductButton,
      "&>a": {
        color: globals.colors.black,
        textDecoration: "none",
      },
    },
    "& .add-to-cart-button": {
      background: globals.colors.green,
      border: "none",
    },
  },
};
