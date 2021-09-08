import globals from "@/styles/partials/global-variables";

export const visuallyHiddenElement = {
  lineHeight: 1,
  position: "absolute",
  opacity: "0",
  overflow: "hidden",
};

export const focusStyle = {
  fallbacks: {
    "&:focus": {
      border: `2px solid ${globals.colors.gray_primary}`,
    },
  },
};
