import { scrollMarginTop } from "@zoovu/runner-web-design-base/src/plugins/data-attributes-reader/webdesign-context";

export function scrollTo(elementY, duration = 300): void {
  const startingY = window.pageYOffset;
  const diff = elementY - startingY - scrollMarginTop;
  let start;

  // Bootstrap our animation - it will get called right before next frame shall be rendered.
  window.requestAnimationFrame(function step(timestamp) {
    if (!start) {
      start = timestamp;
    }
    // Elapsed milliseconds since start of scrolling.
    const time = timestamp - start;
    // Get percent of completion in range [0, 1].
    const percent = Math.min(time / duration, 1);

    window.scrollTo(0, startingY + diff * percent);

    // Proceed with animation as long as we wanted it to.
    if (time < duration) {
      window.requestAnimationFrame(step);
    }
  });
}

export function isMobile(): boolean {
  let check = false;
  ((a) => {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series([46])0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br([ev])w|bumb|bw-([nu])|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do([cp])o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly([-_])|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-([mpt])|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c([- _agpst])|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac([ \-\/])|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja([tv])a|jbro|jemu|jigs|kddi|keji|kgt([ \/])|klon|kpt |kwc-|kyo([ck])|le(no|xi)|lg( g|\/([klu])|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t([- ov])|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30([02])|n50([025])|n7(0([01])|10)|ne(([cm])-|on|tf|wf|wg|wt)|nok([6i])|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan([adt])|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c([-01])|47|mc|nd|ri)|sgh-|shar|sie([-m])|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel([im])|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c([- ])|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor);
  return check;
}

/**
 * taking CSS prop "scrollMarginTop" into account - if not supported, its using the scrollTo method with offset
 */
export function scrollToElement(element: Element, scrollDuration = 300): void {
  // 100px is just a dummy value to check for support
  const isSupportingScrollMarginTop = (window as any).CSS && (window as any).CSS.supports("scroll-margin-top", "100px");

  if (isSupportingScrollMarginTop) {
    try {
      element.scrollIntoView({ behavior: "smooth" });
    } catch {
      element.scrollIntoView(false);
    }
  } else {
    const elementY = window.pageYOffset + element.getBoundingClientRect().top;
    scrollTo(elementY, scrollDuration);
  }
}

export function addMediaQueryListener(
  mediaQueryList: MediaQueryList,
  callback: (event: MediaQueryListEvent) => void
): void {
  if (mediaQueryList.addEventListener) {
    mediaQueryList.addEventListener("change", callback);
  } else {
    // Deprecated 'MediaQueryList' API, Safari < 14, IE, Edge < 16
    mediaQueryList.addListener(callback);
  }
}

export function removeMediaQueryListener(
  mediaQueryList: MediaQueryList,
  callback: (event: MediaQueryListEvent) => void
): void {
  if (mediaQueryList.removeEventListener) {
    mediaQueryList.removeEventListener("change", callback);
  } else {
    // Deprecated 'MediaQueryList' API, Safari < 14, IE, Edge < 16
    mediaQueryList.removeListener(callback);
  }
}

export function focusNextAnswer(): void {
  const focusedAnswer = document.querySelector(".answer:focus");
  if (focusedAnswer?.nextSibling?.focus) {
    focusedAnswer.nextSibling.focus();
  } else {
    document.querySelector(".answer")?.focus();
  }
}

export function focusPreviousAnswer(): void {
  const focusedAnswer = document.querySelector(".answer:focus");
  if (focusedAnswer?.previousSibling?.focus) {
    focusedAnswer.previousSibling.focus();
  } else {
    document.querySelector(".answer:last-child")?.focus();
  }
}
