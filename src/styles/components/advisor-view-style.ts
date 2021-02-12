import globals from "../partials/global-variables";

export default {
  "@global": {
    ".tippy-popper": {
      fontFamily: "arial, sans-serif",
    },
    ".tippy-tooltip": {
      padding: "0.5625rem",
      borderRadius: "3px",
      textAlign: "left",
      border: "2px solid",
      borderColor: globals.colors.violet,
      background: globals.colors.white,
      color: globals.colors.black,
    },
    ".tippy-tooltip[x-placement^='top']": {
      "& .tippy-arrow": {
        bottom: "-8px",
        borderTop: "8px solid",
        borderTopColor: globals.colors.violet,
        "&::after": {
          content: " ",
          position: "absolute",
          top: "-11px",
          left: "-4px",
          background: globals.colors.white,
          width: "7px",
          height: "7px",
          transform: "rotate(45deg)",
        },
      },
    },
    ".tippy-tooltip[x-placement^='bottom']": {
      "& .tippy-arrow": {
        top: "-8px",
        borderBottom: "8px solid",
        borderBottomColor: globals.colors.violet,
        "&::after": {
          content: " ",
          position: "absolute",
          top: "4px",
          left: "-4px",
          background: globals.colors.white,
          width: "7px",
          height: "7px",
          transform: "rotate(45deg)",
        },
      },
    },
    ".tippy-content img": {
      width: "100%",
    },
  },
  container: {},
};
