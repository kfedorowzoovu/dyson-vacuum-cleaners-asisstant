import { BasicStyleRegistry, ComponentStylesDefinitions, CreateWebDesignClass } from "@zoovu/runner-browser-api";
import { ComponentRegistryFactory, StyleRegistryFactory } from "@zoovu/runner-web-design-base";
import { AutoForwardPlugin } from "@zoovu/runner-web-design-base/src/plugins";
import styles from "./styles";

const componentRegistry = ComponentRegistryFactory.createComponentRegistry();
const context = require.context("./components", true, /\.vue$/);
context.keys().forEach((key) => {
  const component = context(key).default;
  componentRegistry.addOrOverrideComponent(component.options.name.replace(/Extended$/, ""), component);
});

const componentStylesDefinitions: ComponentStylesDefinitions = {};
componentRegistry.getComponentNames().forEach((name) => {
  let componentStyle =
    styles[`${name}Style`] ||
    styles[`${name.substring(0, name.indexOf("View"))}Style`] ||
    styles[`${name.substring(0, name.indexOf("Extended"))}Style`];

  if (!componentStyle) {
    componentStyle = { container: {} };
  }
  componentStylesDefinitions[name] = componentStyle;
});

const rootContainerStyle = styles.RootContainerStyle;
const styleRegistry: BasicStyleRegistry = StyleRegistryFactory.createStyleRegistry(
  componentStylesDefinitions,
  rootContainerStyle
);

const WebDesignClass = CreateWebDesignClass({
  webDesignName: "DysonDemoTheme",
  AdvisorView: componentRegistry.getComponent("AdvisorView"),
  componentRegistry,
  styleRegistry,
  plugins: [AutoForwardPlugin],
  versionDescriptor: {
    version: __WEB_DESIGN__VERSION__,
    git: {
      branch: __WEB_DESIGN__GIT_BRANCH__,
      commitHash: __WEB_DESIGN__GIT_COMMIT_HASH__,
    },
  },
});

export default WebDesignClass;
