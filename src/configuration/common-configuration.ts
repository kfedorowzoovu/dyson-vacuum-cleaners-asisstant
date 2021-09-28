export enum ProductAttributes {
  PRODUCT_SUBTITLE_COLUMN = "The best around",
  HIDE_WAS_PRICE = "hideWasNowPricing",
  REDUCED_PRICE = "reducedPrice",
  PRODUCT_CLAIM = "topdescription",
  CAVEAT = "topcaveat",
  RATING_COUNT = "Bvnumber",
  RATING_AVERAGE = "Bvrating",
  STOCK_STATUS = "stockBand",
  BADGE_THEME = "badgeThemeCode",
  BADGE_TEXT = "badgeText",
  ADDITIONAL_IMAGE_URL = "additionalImageUrl", // in case change update also ProductAttributesNotDisplayed
  BUNDLE_PROMOTION = "bundle_promotionText",
  FREE_GIFT = "free_gift_promotion_code",
}

export enum ProductAttributesNotDisplayed {
  ADDITIONAL_IMAGE_URL = "additionalImageUrl", // in case change update also ProductAttributes
  BUNDLE_URL_ID = "bundle_urlId",
}

export enum ProductAttributesWithOnlyValueDisplayed {
  INCLUDED = "Attachments",
}
