/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const fs = require("fs");

const configValuesPath = path.resolve(process.cwd(), "./build/dist/webdesign-config.values.json");
const configSchemaPath = path.resolve(process.cwd(), "./build/dist/webdesign-config.schema.json");

const currentConfigValuesJson = JSON.parse(fs.readFileSync(configValuesPath).toString());
const currentConfigSchemaJson = JSON.parse(fs.readFileSync(configSchemaPath).toString());

const allowedProperties = Object.keys(currentConfigSchemaJson.properties);
const allowAdditionalProperies = currentConfigSchemaJson.additionalProperties;

const customConfigurations = fs
  .readdirSync(path.resolve(__dirname, "../configuration"))
  .filter((fileName) => !fileName.endsWith("-diff.json"));

let finalConfiguration = customConfigurations.reduce((composedConfiguration, nextConfigurationFileName) => {
  const nextCustomConfiguration = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "../configuration", nextConfigurationFileName)).toString()
  );
  return Object.assign(composedConfiguration, nextCustomConfiguration);
}, currentConfigValuesJson);

if (!allowAdditionalProperies) {
  const tempConfiguration = { ...finalConfiguration };
  finalConfiguration = allowedProperties.reduce((validConfiguration, nextProperty) => {
    return { ...validConfiguration, [nextProperty]: tempConfiguration[nextProperty] };
  }, {});
}

fs.writeFileSync(configValuesPath, JSON.stringify(finalConfiguration, null, 2));
