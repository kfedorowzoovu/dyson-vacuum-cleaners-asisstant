interface OverflowData {
  value: string;
  priority: string;
}

let overflowDataToRestore: OverflowData | null = null;

export function hideHorizontalOverflow(): void {
  const elementStyle = document.documentElement.style;

  overflowDataToRestore = {
    value: elementStyle.getPropertyValue("overflow-x"),
    priority: elementStyle.getPropertyPriority("overflow-x"),
  };

  elementStyle.setProperty("overflow-x", "hidden", "important");
}

export function restoreHorizontalOverflow(): void {
  const elementStyle = document.documentElement.style;

  if (overflowDataToRestore) {
    elementStyle.setProperty("overflow-x", overflowDataToRestore.value, overflowDataToRestore.priority);
  }
}
