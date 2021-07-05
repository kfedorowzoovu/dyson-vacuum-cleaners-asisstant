import { ResolvedComponentsConfiguration } from "@zoovu/runner-browser-api";
import globals from "./global-variables";
import stylesConfig from "../styles.config";

export default {
  "& .answer-info-text-trigger": {
    display: "inline-block",
    width: "21px",
    height: "21px",
    borderRadius: "50%",
    paddingBottom: "15px",
    minWidth: "21px",
    minHeight: "21px",
    lineHeight: "21px",
    textAlign: "center",
    backgroundImage: (configuration: ResolvedComponentsConfiguration): string =>
      `${globals.customerSprite(configuration)}`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "-71px -147px",
    fontStyle: "normal",
    marginLeft: "auto",
    cursor: "pointer",
    zIndex: 1,
    "&:focus": {
      outlineColor: globals.colors.green,
    },
  },
};
