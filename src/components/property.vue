<template>
  <li v-if="shouldRenderProperty(property)" :class="className">
    <IconTick />
    {{ displayPropertyValueOnly ? property.rawValue.value : property.displayValue }}
  </li>
</template>

<script lang="ts">
import {
  Component,
  ComponentStyle,
  ComponentStyleDefinition,
  Marking,
  ProductProperty,
  Prop,
  Vue,
} from "@zoovu/runner-browser-api";
import { IconTick } from "@/components/svgs";
import { ProductAttributesWithOnlyValueDisplayed } from "@/configuration/common-configuration";

@Component({
  components: { IconTick },
})
export default class Property extends Vue {
  @ComponentStyle()
  componentStyle!: ComponentStyleDefinition;

  @Prop()
  property!: ProductProperty;

  @Prop()
  attributesCollapsed!: boolean;

  rootElementClass = "property";

  get className(): string[] {
    return [this.rootElementClass, this.componentStyle.container];
  }

  get displayPropertyValueOnly(): boolean {
    return Object.values(ProductAttributesWithOnlyValueDisplayed).includes(this.property.name);
  }

  private shouldRenderProperty(property: ProductProperty) {
    return !this.attributesCollapsed || property.marking !== Marking.NEUTRAL;
  }
}
</script>
