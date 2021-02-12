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
    gray: "#f2f2f2",
    darkGray: "#c4c4c4",
    darkerGray: "#727a86",
    lightGray: "#dadada",
    midGray: "#eaeaea",
    blue: "#009bd4",
    black: "#000",
    contrastDark: "#000",
    white: "#fff",
    red: "#d0392a",
    redLighter: "#df4318",
    violet: "#9e78c5",
    gray1: "#303030",
    gray2: "#848484",
    whiteDark: "#c0c0c0",
    whiteDarker: "#fafafa",
    whiteAlmost: "#fcfcfc",
  },
  breakpoints: {
    $xxs: "max-width: 575px",
    $xs: "max-width: 767px",
    $sm: "max-width: 920px",
    $md: "min-width: 1120px",
    $minMd: "min-width: 1300px",
    $lg: "min-width: 1400px",
  },
  layout: {
    maxContainerWidth: "1420px",
  },
};
