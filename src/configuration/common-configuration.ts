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
  FREE_GIFT_CODE = "free_gift_promotion_code",
  FREE_GIFT_DESCRIPTION = "free_gift_promotion_description", // in case change update also ProductAttributesNotDisplayed
}

export enum ProductAttributesNotDisplayed {
  ADDITIONAL_IMAGE_URL = "additionalImageUrl", // in case change update also ProductAttributes
  BUNDLE_URL_ID = "bundle_urlId",
  FREE_GIFT_DESCRIPTION = "free_gift_promotion_description", // in case change update also ProductAttributes
}

export enum ProductAttributesWithOnlyValueDisplayed {
  INCLUDED = "Attachments",
}
