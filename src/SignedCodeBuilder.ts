/**
 * Signed code builder to simplify working with the code generation API.
 *
 * This class is used with the template generation, but can also be used
 * directly.
 *
 * @format
 */

import type { ManualSectionInfo } from "./SignedCode";

import SignedCodePlaceholder from "./placeholder/SignedCodePlaceholder";
import SignedCodeCommandPlaceholder from "./placeholder/SignedCodeCommandPlaceholder";
import SignedCodeHashPlaceholder from "./placeholder/SignedCodeHashPlaceholder";
import SignedCodeManualSectionPlaceholder from "./placeholder/SignedCodeManualSectionPlaceholder";
import SignedCodeVersionPlaceholder from "./placeholder/SignedCodeVersionPlaceholder";
import SignedCode from "./SignedCode";

class SignedCodeBuilder {
	private code: Array<string | SignedCodePlaceholder>;
	private manualSections: Record<string, ManualSectionInfo>;

	constructor() {
		this.code = [];
		this.manualSections = {};
	}

	/**
	 * Add previous code from a previously generated code file.
	 */
	addPreviousCode(code: SignedCode): this {
		this.manualSections = {
			...this.manualSections,
			...code.getManualSections(),
		};
		return this;
	}

	/**
	 * Add a snipet of code.
	 */
	addCode(code: string): this {
		this.code.push(code);
		return this;
	}

	/**
	 * Add a command annotation with the command which defined how the file was
	 * generated.
	 */
	addCommandAnnotation(command: string): this {
		this.code.push(new SignedCodeCommandPlaceholder(command));
		return this;
	}

	/**
	 * Add a hash annotation.
	 */
	addHashAnnotation(): this {
		this.code.push(new SignedCodeHashPlaceholder());
		return this;
	}

	/**
	 * Add a version annotation.
	 */
	addVersionAnnotation(version: number): this {
		this.code.push(new SignedCodeVersionPlaceholder(version));
		return this;
	}

	/**
	 * Generic function to add placeholders.
	 *
	 * Note: This is used by the template engine to add placeholders altogether.
	 */
	addPlaceholder(placeholder: SignedCodePlaceholder): this {
		this.code.push(placeholder);
		return this;
	}

	/**
	 * Sets the code for a manual section by name.
	 *
	 * Note:
	 *   This doesn't add code until a manual section was added to the file
	 *   with the same name.
	 */
	setManualSectionCode(name: string, code: string): this {
		this.manualSections[name] = { code };
		return this;
	}

	/**
	 * Adds a new manual section with name.
	 */
	addManualSection(
		name: string,
		options?: { defaultCode: string; code: string },
	): this {
		this.code.push(
			new SignedCodeManualSectionPlaceholder(
				name,
				options?.code,
				options?.defaultCode,
			),
		);

		return this;
	}

	/**
	 * Get the fully generated code as a signed-code object.
	 */
	getCode(): SignedCode {
		const content = this.code
			.map((entry) => {
				// Set the old value before re-signing
				if (entry instanceof SignedCodeManualSectionPlaceholder) {
					const manualSection = this.manualSections[entry.getName()];
					if (manualSection != null) {
						entry.setPreviousCode(manualSection.code);
					}
				}

				if (entry instanceof SignedCodePlaceholder) {
					return entry.toString();
				}

				return entry;
			})
			.join("");

		const signedContent = new SignedCode(content);
		signedContent.resign();

		return signedContent;
	}

	toString(): string {
		return this.getCode().getContent();
	}
}

export default SignedCodeBuilder;
