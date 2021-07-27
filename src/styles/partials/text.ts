import globals from "@/styles/partials/global-variables";

export const productName = {
  textAlign: "left",
  width: "100%",
  display: "block",
  margin: "0 0 14px 0",
  lineHeight: "24px",
  "&:focus": {
    outlineColor: globals.colors.green,
  },
  "& a": {
    color: "#303030",
    textDecoration: "none",
  },
};
