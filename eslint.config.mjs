import path from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import pluginJs from "@eslint/js";

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({ baseDirectory: __dirname, recommendedConfig: pluginJs.configs.recommended });

export default [
  ...compat.extends("standard"),
  {
    rules: {
      "no-tabs": 0,
      quotes: ["error", "double", { avoidEscape: true, allowTemplateLiterals: true }],
      semi: [1, "always"],
      indent: ["off", 2],
      "dot-notation": 0,
      "comma-dangle": ["off", "always-multiline"],
      "space-before-function-paren": [
        "error",
        {
          anonymous: "never",
          named: "never",
          asyncArrow: "always",
        },
      ],
      "vue/multi-word-component-names": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
];
