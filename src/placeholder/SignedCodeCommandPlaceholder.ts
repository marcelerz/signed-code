/**
 * Placeholders for signed code.
 *
 * @format
 */

import { getCommandAnnotation } from "SignedCode";
import SignedCodePlaceholder from "./SignedCodePlaceholder";

/**
 * Class to handle the command annotation as placeholder.
 */
export default class SignedCodeCommandPlaceholder extends SignedCodePlaceholder {
	private command: string;

	constructor(command: string) {
		super();
		this.command = command;
	}

	/**
	 * Gets the command used to generate the file.
	 */
	getCommand(): string {
		return this.command;
	}

	toString(): string {
		return getCommandAnnotation(this.command);
	}
}
