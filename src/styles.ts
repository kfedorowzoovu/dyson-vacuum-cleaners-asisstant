import { ComponentStylesDefinitions } from "@zoovu/runner-browser-api";
import { pascalCase } from "change-case";

function getBaseName(path: string): string {
  let base = path.substring(path.lastIndexOf("/") + 1);
  if (path.lastIndexOf(".") !== -1) base = base.substring(0, base.lastIndexOf("."));
  return base;
}

const context = require.context("./", true, /-style\.ts$/);
export default context.keys().reduce((previousStyleList: ComponentStylesDefinitions, key) => {
  const styleList = { ...previousStyleList };
  styleList[pascalCase(getBaseName(key))] = context(key).default;
  return styleList;
}, {});
