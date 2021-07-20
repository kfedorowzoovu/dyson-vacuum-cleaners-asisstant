<template>
  <li v-if="shouldRenderProperty(property)" :class="className">
    <IconTick />
    {{ property.displayValue }}
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

  private shouldRenderProperty(property: ProductProperty) {
    return !this.attributesCollapsed || property.marking !== Marking.NEUTRAL;
  }
}
</script>
