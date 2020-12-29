/**
 * Configuration for BabelJS, the JavaScript transpiler.
 * Used by any jest tests.
 *
 * @format
 */

const config = {
	presets: [
		// General environment setup
		["@babel/env", { debug: false }],

		// Adds TypeScript support
		["@babel/typescript", { allowDeclareFields: true }],
	],
	plugins: [
		// Adds support for class properties available in TypeScript
		"@babel/proposal-class-properties",

		// Adds support for object spread operator
		"@babel/proposal-object-rest-spread",

		// Adds runtime libraries centrally, reducing overall size
		"@babel/transform-runtime",

		// Resolve modules in src
		[
			"module-resolver",
			{
				root: ["./src"],
				extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
				alias: {
					"*": "./src",
				},
			},
		],
	],
};

module.exports = config;
