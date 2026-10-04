import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,

  schema:
    process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:5000/graphql",

  documents: ["src/graphql/**/*.graphql"],

  generates: {
    "./src/generated/": {
      preset: "client-preset",

      plugins: [],
    },
  },
};

export default config;
