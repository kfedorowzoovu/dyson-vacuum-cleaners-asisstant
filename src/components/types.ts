import { Placement } from "../configuration";

export enum FiltersSettings {
  SHOW_DISABLED_AS_GREYED_OUT = "showDisabledAsGreyedOut",
  SHOW_EXPAND_ALL_BUTTON = "showExpandAllButton",
  SHOW_RESET_OPTION = "showResetOption",
  HIDE_OPTION_LABELS = "hideOptionsLabels",
  LIMIT_SHOWN_ANSWERS = "limitShownAnswers",
  EXPAND_ALL_BY_DEFAULT = "expandAllByDefault",
}

export interface PriceComplementaryText {
  [Placement.TOP]?: PriceComplementaryTextContent;
  [Placement.RIGHT]?: PriceComplementaryTextContent;
  [Placement.BOTTOM]?: PriceComplementaryTextContent;
  [Placement.LEFT]?: PriceComplementaryTextContent;
}

export interface PriceComplementaryTextContent {
  placement: Placement;
  staticText?: string;
  columnText?: {
    isCurrency?: boolean;
    value: string;
  };
  isReversed?: boolean;
}

export interface LocalizationSettings {
  currencyCode: string;
  locale: string;
}

export interface FileUploadImage {
  file: File;
  thumbnail?: string;
}
