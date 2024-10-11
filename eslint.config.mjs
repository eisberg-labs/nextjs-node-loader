import prettier from "eslint-plugin-prettier";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ["coverage", "dist", "node_modules", "test/fixtures", "examples", "eslint.config.mjs"],
}, ...compat.extends("@webpack-contrib/eslint-config-webpack", "prettier"), {
    plugins: {
        prettier,
    },

    rules: {
        "eslint-comments/no-unlimited-disable": 0,
        "prettier/prettier": ["error"],
    },
}];
