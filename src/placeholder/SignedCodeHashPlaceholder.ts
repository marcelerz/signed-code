/**
 * Placeholders for signed code.
 *
 * @format
 */

import { getHashAnnotation } from "SignedCode";
import SignedCodePlaceholder from "./SignedCodePlaceholder";

/**
 * Class to handle the hash annotation as placeholder.
 */
export default class SignedCodeHashPlaceholder extends SignedCodePlaceholder {
	constructor() {
		super();
	}

	toString(): string {
		return getHashAnnotation("aa");
	}
}
