declare module "*.vue" {
  import { Vue } from "@zoovu/runner-browser-api";

  export default Vue;
}

declare module "*.png" {
  const value: string;
  export default value;
}
