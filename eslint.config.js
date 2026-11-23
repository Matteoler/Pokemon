import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import reactPlugin from "eslint-plugin-react";

export default [
    {
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
                ecmaFeatures: { jsx: true },
            },
        },
        plugins: {
            "@typescript-eslint": tsPlugin,
            react: reactPlugin,
        },
        rules: {
            semi: ["error", "always"],
            "no-console": "error",
            "react/react-in-jsx-scope": "off",
            "@typescript-eslint/explicit-function-return-type": "off",
        },
        settings: {
            react: { version: "detect" },
        },
    },

    {
        files: ["src/app/api/**/*.{ts,tsx}"],
        rules: {
            "no-console": [
                "error",
                {
                    allow: ["error"],
                },
            ],
        },
    },
];
