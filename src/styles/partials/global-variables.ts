import { ResolvedComponentsConfiguration } from "@zoovu/runner-browser-api";
import spriteUrl from "../../assets/images/sprite-best.svg";
import customerSpriteUrl from "../../assets/images/sprite.svg";
import customerSpriteUrl2 from "../../assets/images/sprite_blue-design-theme.svg";
import loaderGifUrl from "../../assets/images/loader.gif";

export default {
  sprite2: ({ webDesignContextPath }: ResolvedComponentsConfiguration): string =>
    `url("${webDesignContextPath + spriteUrl}")`,
  customerSprite: ({ webDesignContextPath }: ResolvedComponentsConfiguration): string =>
    `url("${webDesignContextPath + customerSpriteUrl}")`,
  customerSprite2: ({ webDesignContextPath }: ResolvedComponentsConfiguration): string =>
    `url("${webDesignContextPath + customerSpriteUrl2}")`,
  loaderGif: ({ webDesignContextPath }: ResolvedComponentsConfiguration): string =>
    `url("${webDesignContextPath + loaderGifUrl}")`,
  colors: {
    primaryColor: "#32374b",
    primaryColorLighter: "#2e3e4f",
    gray_primary: "#333333",
    gray_secondary: "#555555",
    gray_tertiary: "#999999",
    gray_disabled: "#ababab",
    gray_background: "#F3F3F3",
    gray_product_border: "#EBEBEB",
    gray_klarna: "#fbfbfb",
    white: "#fff",
    whiteAlmost: "#fcfcfc",
    green: "#79B928",
    green_darker: "#537D1C",
    black: "#000",
    blue: "#0066CC",
    red: "#d0392a",
    violet: "#9e78c5",
  },
  breakpoints: {
    $xxs: "max-width: 575px",
    $xs: "max-width: 767px",
    $sm: "max-width: 1024px",
    $md: "min-width: 1120px",
    $minMd: "min-width: 1300px",
    $lg: "min-width: 1400px",
  },
  layout: {
    maxContainerWidth: "1124px",
    globalPaddingDesktop: "7%",
  },
};
