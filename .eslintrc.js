const { getEslintConfig } = require("@harmonix-hub/eslint");

/** @type import("eslint").Linter.Config */
module.exports = {
  ...getEslintConfig({ useReact: true }),
  ignorePatterns: ["dist", "coverage"],
};
