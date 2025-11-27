declare module "*.mdx" {
  import * as React from "react";
  const MDXComponent: React.ComponentType<React.ComponentProps<"div">>;
  export default MDXComponent;
}
