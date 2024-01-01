const globals = require("globals");
const {configs: eslintConfigs} = require("@eslint/js");
const eslintPluginImport = require("eslint-plugin-import");
const eslintPluginStylistic = require("@stylistic/eslint-plugin");

const config = [
  {
    files: ["**/*.js"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: {
      ...eslintPluginStylistic.configs["all-flat"].plugins,
      import: eslintPluginImport
    },
    rules: {
      ...eslintConfigs.all.rules,
      ...eslintPluginImport.configs.recommended.rules,
      ...eslintPluginStylistic.configs["all-flat"].rules,
      camelcase: "off",
      "capitalized-comments": "off",
      complexity: "off",
      "consistent-this": "off",
      curly: "off",
      "func-style": "off",
      "id-length": "off",
      "init-declarations": "warn",
      "line-comment-position": "off",
      "max-lines": "off",
      "max-lines-per-function": ["error", 200],
      "max-statements": ["error", 100],
      "multiline-comment-style": "off",
      "no-inline-comments": "off",
      "no-invalid-this": "warn",
      "no-magic-numbers": "off",
      "no-negated-condition": "off",
      "no-undefined": "warn",
      "one-var": "off",
      "prefer-named-capture-group": "warn",
      "sort-keys": "off",
      "@stylistic/array-element-newline": ["error", "consistent"],
      "@stylistic/dot-location": ["error", "property"],
      "@stylistic/function-call-argument-newline": ["error", "consistent"],
      "@stylistic/indent": ["error", 2],
      "@stylistic/lines-around-comment": "off",
      "@stylistic/quote-props": ["error", "as-needed"],
      "@stylistic/padded-blocks": ["error", "never"]
    }
  }
];

/*
 * Set debug to true for testing purposes.
 * Since some plugins have not yet been optimized for the flat config,
 * we will be able to optimize this file in the future. It can be helpful
 * to write the ESLint config to a file and compare it after changes.
 */
const debug = false;

if (debug === true) {
  const FileSystem = require("fs");
  FileSystem.writeFile("eslint-config-DEBUG.json", JSON.stringify(config, null, 2), (error) => {
    if (error) {
      throw error;
    }
  });
}

module.exports = config;
