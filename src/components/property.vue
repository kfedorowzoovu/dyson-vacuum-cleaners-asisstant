<template>
  <li class = "property" :class="this.componentStyle.container">
    <IconTick />
    {{ displayPropertyValueOnly ? property.rawValue.value : property.displayValue }}
  </li>
</template>

<script lang="ts">
import {
  Component,
  ComponentStyle,
  ComponentStyleDefinition,
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

  get displayPropertyValueOnly(): boolean {
    return Object.values(ProductAttributesWithOnlyValueDisplayed).includes(this.property.name);
  }
}
</script>
