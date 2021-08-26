import globals from "@/styles/partials/global-variables";

export const visuallyHiddenElement = {
  lineHeight: 1,
  position: "absolute",
  opacity: "0",
  overflow: "hidden",
};

export const focusStyle = {
  "&:focus-within": {
    boxShadow: `${globals.colors.gray_primary} 0 0 5px 3px`,
  },
  fallbacks: {
    "&:focus": {
      border: `2px solid ${globals.colors.gray_primary}`,
    },
  },
};
