import { ProductRecommendation } from "@zoovu/runner-browser-api";

export default function (recommendation: ProductRecommendation, propertyName: string): string | number {
  return recommendation.properties.find((property) => property.name === propertyName)?.rawValue.value;
}
