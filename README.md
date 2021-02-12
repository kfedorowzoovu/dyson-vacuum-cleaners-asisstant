# Custom Design Starter

## Todo

### Setup

1. Copy everything from the custom design starter project's directory apart from `.git`, `build` and `node_modules` directories and without the `yarn.lock` file to the new project's directory.

2. Execute `yarn` command.

### Source code

1. Copy `.env.example` and rename it to `.env`.

2. Update `name`, `webDesignName`, `description` and `version` fields in the `package.json`.

3. Update `webDesignName` in `/src/webdesign.ts` file (best would be the same name as `webDesignName` in package.json)

4. If your deployment method is Azure, change the `deploy` script in the `package.json`.
    ```json
    "deploy": "yarn build && zoovu-web-design deploy-to-azure"
    ```
5. Review all TODO comments in the project and remove provided example code.

6. Remove `/src/assets` directory.

7. Remove `/configuration/another-example-configuration.json` and `/configuration/example-configuration.json` files.

### README.md

1. Rename the [main header](#custom-design-starter).
2. Leave only contents of the section which describes your deployment method in [deployment section](#deployment).
3. Update `<name from package.json without "@">/v<version from package.json>` or `<custom server>` placeholders in the list you left in the previous step.
4. Remove [todo section](#todo).

## Installation

The package manager used for this project is [yarn](https://yarnpkg.com/en/). The first step is to install all required dependencies by executing:

```console
yarn
```

## Development setup

In order to run the project in a development mode, execute:
```console
yarn serve
```

> [BrowserSync](https://www.browsersync.io/) is integrated with the theme when it's ran via `yarn serve` for easier development.

To run the theme with an assistant configured on the platform instead of the default one, set `ADVISOR_CODE` and `API_CONTEXT_PATH` fields in the `.env` file. You can create a `.env` file by copying `.env.example` and renaming it to `.env`.

```conf
ADVISOR_CODE="YOUR_ADVISOR_CODE"
API_CONTEXT_PATH="https://api-tiger.zoovu.com"
```

### Parameters of a dotenv file

Name | Description | Environment specific setting (Tiger/Barracuda)
--- | --- | ---
PORT | Port under which the theme is available on localhost |
ADVISOR_CODE | Assistant code provided to the theme on localhost |
API_CONTEXT_PATH | Assistant's API endpoint | `https://api-tiger.zoovu.com` / `https://api-barracuda.zoovu.com`
SESSION_PERSISTENCE | Enable assistant's session persistance on localhost |
SESSION_PERSISTENCE_ENDPOINT | Assistant's session storage API endpoint | `https://staging-runner.zoovu.com/api` / `https://us-runner.zoovu.com/api`

## Updating dependencies

If you want to update only **@zoovu** dependencies, execute:

```console
yarn upgrade --scope=@zoovu
```

## Linting
This project uses ESLint with a [custom configuration](https://gitlab.zoovu.io/custom/zoovu/linting). In order to lint the code, execute:

```console
yarn lint
```

## Deployment

### Tiger/AWS S3

1. Set AWS credentials in `.env` file.

```conf
AWS_ACCESS_KEY_ID="XXXXXXXXXXXXXXXXXXXX"
AWS_SECRET_ACCESS_KEY="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
```

2. Execute:

```console
yarn deploy
```

3. After deployment, theme will be available under `https://themes-tiger.zoovu.com/custom-dev/<name from package.json without "@">/v<version from package.json>`.

### Barracuda/Azure

1. Set connection string in `.env` file.

```conf
AZURE_STORAGE_CONNECTION_STRING="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
```

2. Execute:

```console
yarn deploy
```

3. After deployment, theme will be available under `https://barracudacustomdev.blob.core.windows.net/custom-themes/<name from package.json without "@">/v<version from package.json>`.

### Custom server

1. Build the theme by executing:

```console
yarn build
```

2. Copy everything from the `./build/dist` directory to `<custom server>`.
