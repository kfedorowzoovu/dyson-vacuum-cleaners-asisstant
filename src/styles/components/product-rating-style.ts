export default {
  container: {
    marginTop: "13px",
    "& .rating__star": {
      margin: "1px",
    },
  },
  iconStarEmpty: {
    "& .icon__fill": {
      display: "none",
    },
    "& .icon__stroke": {
      stroke: "#bb944f",
    },
  },
  iconStarFilled: {
    extends: "iconStarEmpty",
    "& .icon__fill.icon__fill--full": {
      fill: "#febf02",
    },
    "& .icon__fill.icon__fill--half": {
      display: "none",
    },
    "& .icon__stroke": {
      stroke: "#bb944f",
    },
  },
  iconStarHalf: {
    extends: "iconStarEmpty",
    "& .icon__fill.icon__fill--full": {
      display: "none",
    },
    "& .icon__fill.icon__fill--half": {
      fill: "#febf02",
    },
    "& .icon__stroke": {
      stroke: "#bb944f",
    },
  },
};
