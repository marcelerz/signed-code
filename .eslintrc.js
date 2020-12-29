/**
 * Configuration file for ESLint.
 *
 * @format
 **/

module.exports = {
	parser: "@typescript-eslint/parser", // Specifies the ESLint parser
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"prettier/@typescript-eslint",
		"plugin:prettier/recommended",
		"plugin:jest/all",
	],
	settings: {
		react: {
			version: "detect",
		},
	},
	env: {
		browser: false,
		node: true,
		es6: true,
		"jest/globals": true,
	},
	plugins: ["@typescript-eslint", "prettier", "jest"],
	parserOptions: {
		ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
		sourceType: "module", // Allows for the use of imports
	},
	rules: {
		// Allow ts-ignores in files
		"@typescript-eslint/ban-ts-ignore": "off",
		"@typescript-eslint/ban-ts-comment": "off",

		// Disable the limitation to add explciit any's. This is sometimes
		// needed.
		"@typescript-eslint/no-explicit-any": "off",

		// Disables the limitation of defining empty functions. We want that
		// sometimes.
		"@typescript-eslint/no-empty-function": "off",

		// Props sometimes need to be empty as we will be filling it. Disable
		// the check.
		"@typescript-eslint/no-empty-interface": "off",

		// Any error should be fine for tests
		"jest/prefer-expect-assertions": "off",

		// Disable the need to supply a message. Sometimes we don't care about
		// the exact message.
		"jest/require-to-throw-message": "off",

		// Allow the before/after and beforeEach/afterEach hooks. It simplifies
		// tests quite a bit.
		"jest/no-hooks": "off",

		// Disable the preference. Should be decided case-by-case.
		"jest/prefer-inline-snapshots": "off",
	},
	overrides: [
		{
			files: ["**/*.js"],
			rules: {
				// Don't ask to define a return on JavaScript files.
				"@typescript-eslint/explicit-function-return-type": "off",
			},
		},
	],
	reportUnusedDisableDirectives: true,
	globals: {
		__DEV: "readonly",
	},
};
