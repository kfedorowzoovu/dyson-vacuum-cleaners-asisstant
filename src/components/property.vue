<template>
  <li class="property" :class="componentStyle.container">
    <IconTick />
    <span class="zv-ada-tabindex" tabindex="0">
      {{ displayPropertyValueOnly ? property.rawValue.value : property.displayValue }}
    </span>
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
