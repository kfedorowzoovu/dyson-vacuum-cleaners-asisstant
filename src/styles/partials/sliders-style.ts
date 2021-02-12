import globals from "./global-variables";
import stylesConfig from "../styles.config";

const sliderValueFontColor = stylesConfig.colors.primaryFontColor;
const sliderMinValueFontColor = stylesConfig.colors.primaryFontColor;
const sliderMaxValueFontColor = stylesConfig.colors.primaryFontColor;
const sliderBackgroundColor = stylesConfig.colors.secondary.spectrum100;
const sliderInactiveColor = stylesConfig.colors.primary.spectrum300;
const sliderSelectedColor = stylesConfig.colors.primary.spectrum700;

const filterSliderInactiveColor = stylesConfig.colors.secondary.spectrum300;
const filterSliderSelectedColor = stylesConfig.colors.secondary.spectrum700;

const questionHeadingSliderFontSize = {
  $lg: stylesConfig.typography.fontSize(1.9),
  $xs: stylesConfig.typography.fontSize(1.2),
};

export default {
  "& > p": {
    textAlign: "center",
    width: "100%",
    fontSize: questionHeadingSliderFontSize.$lg,
    margin: [0, 0, "70px"],
    color: stylesConfig.colors.primaryFontColor,

    [`@media (${globals.breakpoints.$xs})`]: {
      margin: ["15px", 0, "30px"],
      fontWeight: 600,
      fontSize: questionHeadingSliderFontSize.$xs,
    },
  },
  "& .slider-box": {
    margin: [0, 0, "100px", 0],
    padding: ["5px", "50px", "8px"],
    width: "100%",
    backgroundColor: sliderBackgroundColor,
    [`@media (${globals.breakpoints.$xs})`]: {
      margin: [0, 0, "60px", 0],
      padding: ["5px", "15px", "8px"],
    },
  },
  "& .slider-value": {
    margin: "15px 0 5px",
    textAlign: "center",
    fontWeight: 600,
    color: sliderValueFontColor,
  },
  "& .slider": {
    background: sliderInactiveColor,
  },
  "& .slider-selected-range": {
    background: sliderSelectedColor,
  },
  "& .slider-footer": {
    margin: "10px",
    "&::before": {
      content: "''",
      display: "table",
    },
    "&::after": {
      content: "''",
      display: "table",
      clear: "both",
    },
    "& .slider-min": {
      float: "left",
      color: sliderMinValueFontColor,
      fontWeight: 600,
    },
    "& .slider-max": {
      float: "right",
      color: sliderMaxValueFontColor,
      fontWeight: 600,
    },
  },
  "& .filter-slider-box": {
    padding: ["8px", "16px"],
    width: "100%",
    margin: "0 auto",
    backgroundColor: globals.colors.white,
    "& .slider": {
      background: filterSliderInactiveColor,
      "& .slider-dot": {
        background: filterSliderSelectedColor,
        border: "none",
        width: "20px !important",
        height: "20px !important",
        top: "-8px !important",
      },
    },
    "& .slider-footer": {
      "& .slider-min, & .slider-max": {
        color: globals.colors.black,
      },
    },
    "& .slider-value": {
      color: globals.colors.black,
      fontWeight: "bold",
    },
    "& .slider-selected-range": {
      background: filterSliderSelectedColor,
    },
  },
};
