/**
 * Placeholders for signed code.
 *
 * @format
 */

import { getVersionAnnotation } from "../SignedCode";
import SignedCodePlaceholder from "./SignedCodePlaceholder";

/**
 * Class to handle the hash annotation as placeholder.
 */
export default class SignedCodeVersionPlaceholder extends SignedCodePlaceholder {
	private version: number;

	constructor(version: number) {
		super();
		this.version = version;
	}

	/**
	 * Gets the version defined by the generated code.
	 */
	getVersion(): number {
		return this.version;
	}

	toString(): string {
		return getVersionAnnotation(this.version);
	}
}
