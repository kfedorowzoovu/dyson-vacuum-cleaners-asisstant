<template>
  <ul class="product-properties" :class="componentStyle.container">
    <template v-for="property in propertiesWithExplicitValue">
      <transition :key="property.name" name="fade">
        <Property :key="property.name" :property="property" :attributes-collapsed="attributesCollapsed" />
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
import { ProductAttributes } from "@/configuration/common-configuration";

@Component({
  name: "ProductProperties",
  components: { Property },
})
export default class ProductProperties extends Vue {
  @ComponentStyle()
  componentStyle!: ComponentStyleDefinition;

  @Prop()
  recommendation!: ProductRecommendation;

  @Prop()
  attributesCollapsed!: boolean;

  get productRelatedProperties(): ReadonlyArray<ProductProperty> {
    return this.visibleProperties.filter((property) => !Object.values(ProductAttributes).includes(property.name));
  }

  get propertiesWithExplicitValue(): ReadonlyArray<ProductProperty> {
    return this.productRelatedProperties.filter(
      (property) =>
        !(property.marking === Marking.NEUTRAL && property.rawValue.propertyType === "BLN" && !property.rawValue.value)
    );
  }

  get visibleProperties(): ReadonlyArray<ProductProperty> {
    return this.recommendation.properties;
  }
}
</script>
