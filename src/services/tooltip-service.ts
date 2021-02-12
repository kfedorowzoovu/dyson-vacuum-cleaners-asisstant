import tippy, { Options } from "tippy.js";

export default class TooltipService {
  public static createTooltip(selector: string, tooltipConfiguration: Options): void {
    tippy(selector, {
      ...tooltipConfiguration,
      arrow: true,
      interactive: true,
    });
  }
}
