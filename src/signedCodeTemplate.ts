/**
 * Template function to handle code generation through JavaScript string
 * templates. It adds also some placeholder functions which can be used when
 * creating the code within the template string.
 *
 * @format
 */

import nullThrows from "sundryjs/assert/nullThrows";
import invariant from "sundryjs/assert/invariant";
import SignedCodeBuilder from "SignedCodeBuilder";
import SignedCodePlaceholder from "placeholder/SignedCodePlaceholder";
import SignedCodeCommandPlaceholder from "placeholder/SignedCodeCommandPlaceholder";
import SignedCodeHashPlaceholder from "placeholder/SignedCodeHashPlaceholder";
import SignedCodeManualSectionPlaceholder from "placeholder/SignedCodeManualSectionPlaceholder";
import SignedCodeVersionPlaceholder from "placeholder/SignedCodeVersionPlaceholder";

const signedCode = (
	strs: TemplateStringsArray,
	...exps: Array<SignedCodePlaceholder | string | number | boolean>
): SignedCodeBuilder => {
	invariant(
		strs.length - 1 === exps.length,
		`Strings (${strs.length}) and expressions (${exps.length}) for template are not of expected length.`,
	);
	const strings = strs.concat();
	const expressions = exps.concat();

	const builder = new SignedCodeBuilder();
	while (strings.length > 1) {
		const str = nullThrows(strings.shift(), "Template string is null.");
		builder.addCode(str);

		const expression = nullThrows(
			expressions.shift(),
			"Template expression is null.",
		);
		if (expression instanceof SignedCodePlaceholder) {
			builder.addPlaceholder(expression);
		} else {
			builder.addCode(String(expression));
		}
	}

	const str = strings.shift();
	builder.addCode(nullThrows(str, "Template string is null."));

	return builder;
};

/**
 * Returns a command annotation for a string template.
 *
 * Supply the command with this call on how this was generated.
 */
signedCode.commandAnnotation = (command: string): SignedCodePlaceholder => {
	return new SignedCodeCommandPlaceholder(command);
};

/**
 * Returns a hash annotation for a string template.
 */
signedCode.hashAnnotation = (): SignedCodePlaceholder => {
	return new SignedCodeHashPlaceholder();
};

/**
 * Returns a version annotation for a string template.
 *
 * Supply the version with this call on which version this was generated.
 */
signedCode.versionAnnotation = (version: number): SignedCodePlaceholder => {
	return new SignedCodeVersionPlaceholder(version);
};

/**
 * Returns a manual section for a string template with the name and its default
 * value.
 *
 * Note:
 *   If you want to use other options, then please use the placeholder
 *   classes directly.
 */
signedCode.manualSection = (
	name: string,
	defaultValue?: string,
): SignedCodePlaceholder => {
	return new SignedCodeManualSectionPlaceholder(name, undefined, defaultValue);
};

export default signedCode;
