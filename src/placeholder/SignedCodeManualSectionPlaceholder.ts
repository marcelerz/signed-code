/**
 * Placeholders for signed code.
 *
 * @format
 */

import { getManualSection } from "../SignedCode";
import SignedCodePlaceholder from "./SignedCodePlaceholder";

/**
 * Class to handle the manual sections as placeholder.
 */
export default class SignedCodeManualSectionPlaceholder extends SignedCodePlaceholder {
	private name: string;
	private code: string | undefined;
	private previousCode: string | undefined;
	private defaultCode: string | undefined;

	constructor(name: string, code?: string, defaultCode?: string) {
		super();
		this.name = name;
		this.code = code;
		this.defaultCode = defaultCode;
	}

	/**
	 * Gets the unique name of the manual section.
	 */
	getName(): string {
		return this.name;
	}

	/**
	 * Gets the code of the manual section, if any.
	 */
	getCode(): string | undefined {
		return this.code;
	}

	/**
	 * Returns the previous code that was in a previous file and copied over
	 * to this placeholder through the `setPreviousCode` method.
	 */
	getPreviousCode(): string | undefined {
		return this.previousCode;
	}

	/**
	 * Adds previous code from a previous generated file to overwrite default
	 * values.
	 */
	setPreviousCode(code: string): void {
		this.previousCode = code;
	}

	/**
	 * Returns the default code defined by the template.
	 */
	getDefaultCode(): string | undefined {
		return this.defaultCode;
	}

	toString(): string {
		return getManualSection(
			this.name,
			this.code || this.previousCode || this.defaultCode || "",
		);
	}
}
