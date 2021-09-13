import globals from "@/styles/partials/global-variables";

export const visuallyHiddenElement = {
  lineHeight: 1,
  position: "absolute",
  opacity: "0",
  overflow: "hidden",
};

export const focusStyle = {
  "&:focus-within": {
    boxShadow: `inset 0px 0px 0px 2px ${globals.colors.black}`,
  },
  fallbacks: {
    "&:focus": {
      border: `2px solid ${globals.colors.black}`,
    },
  },
};

export const buttonsFocusStyle = {
  "&:focus-within": {
    outline: `5px auto ${globals.colors.black}`,
  },
  fallbacks: {
    "&:focus": {
      border: `2px solid ${globals.colors.black}`,
    },
  },
};
