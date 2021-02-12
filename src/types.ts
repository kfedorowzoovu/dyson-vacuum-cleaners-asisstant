export interface TooltipConfiguration {
  autoHide?: boolean;
  content?: string;
  container?: string;
  hideOnTargetClick?: boolean;
  delay?: {
    show: number;
    hide: number;
  };
}

export const whitelistedAttributes = ["target"];

export interface MobileInfoTextTrigger {
  click?: () => void;
}
