<template>
  <ul class="product-properties" :class="componentStyle.container">
    <template v-for="property in propertiesWithExplicitValue">
      <transition :key="property.name" name="fade">
        <Property :key="property.name" :property="property" />
      </transition>
    </template>
  </ul>
</template>

<script lang="ts">
import {
  Component,
  ComponentStyle,
  ComponentStyleDefinition,
  Marking,
  ProductProperty,
  ProductRecommendation,
  Prop,
  Vue,
} from "@zoovu/runner-browser-api";
import Property from "@/components/property.vue";
import { ProductAttributes, ProductAttributesNotDisplayed } from "@/configuration/common-configuration";

@Component({
  name: "ProductProperties",
  components: { Property },
})
export default class ProductProperties extends Vue {
  @ComponentStyle()
  componentStyle!: ComponentStyleDefinition;

  @Prop()
  recommendation!: ProductRecommendation;

  get productRelatedProperties(): ReadonlyArray<ProductProperty> {
    return this.allProperties.filter((property) => !Object.values(ProductAttributes).includes(property.name));
  }

  get shownProperties(): ReadonlyArray<ProductProperty> {
    return this.productRelatedProperties.filter(property =>
      !Object.values(ProductAttributesNotDisplayed).includes(property.name));
  }

  get propertiesWithExplicitValue(): ReadonlyArray<ProductProperty> {
    return this.shownProperties.filter(
      (property) => !(
        property.marking === Marking.NEUTRAL && !property.rawValue.value)
    );
  }

  get allProperties(): ReadonlyArray<ProductProperty> {
    return this.recommendation.properties;
  }
}
</script>
