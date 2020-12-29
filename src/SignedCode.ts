/**
 * Main class to handle signed code.
 *
 * This class will load a file, validates it, re-signs it, and potentially saves
 * it again.
 * This class is used as the central object for handling signed code.
 *
 * @format
 */

import crypto from "crypto";
import fs from "fs";

const GENERATED_ANNOTATION = "@" + "generated";
const GENERATED_ANNOTATION_REGEX = new RegExp(
	`${GENERATED_ANNOTATION}\\s+(.*?)$`,
	"m",
);
const SIGNED_HASH_ANNOTATION = "@" + "signed-hash";
const SIGNED_HASH_ANNOTATION_REGEX = new RegExp(
	`${SIGNED_HASH_ANNOTATION}\\s+([a-f0-9]+)`,
);
const SIGNED_VERSION_ANNOTATION = "@" + "signed-version";
const SIGNED_VERSION_ANNOTATION_REGEX = new RegExp(
	`${SIGNED_VERSION_ANNOTATION}\\s+([0-9]+)`,
);
const MANUAL_SECTION_INIT = "// <Manual-Section";
const MANUAL_SECTIONS_REGEX = /\/\/\s+<Manual-Section START ([a-zA-Z_][a-zA-Z_0-9-]*?)>(.*?)\/\/\s+<Manual-Section END>/gs;

export const getCommandAnnotation = (command: string): string => {
	return `${GENERATED_ANNOTATION} ${command}`;
};
export const getHashAnnotation = (hash: string): string => {
	return `${SIGNED_HASH_ANNOTATION} ${hash}`;
};
export const getVersionAnnotation = (version: number): string => {
	return `${SIGNED_VERSION_ANNOTATION} ${String(version)}`;
};
export const getManualSection = (name: string, code: string): string => {
	return `${MANUAL_SECTION_INIT} START ${name}>${code}${MANUAL_SECTION_INIT} END>`;
};

const hash = (
	content: string,
	encoding: "utf8" | "ascii" | "latin1",
): string => {
	const md5 = crypto.createHash("md5");
	md5.update(content, encoding);
	return md5.digest("hex");
};

export type ManualSectionInfo = {
	code: string;
};

class SignedCode {
	private content: string;

	public static async load(path: string): Promise<SignedCode> {
		const content = await fs.promises.readFile(path, {
			encoding: "utf8",
			flag: "r",
		});
		return new SignedCode(content);
	}

	constructor(content: string) {
		this.content = content;
	}

	/**
	 * Gets the content given to this instance.
	 */
	getContent(): string {
		return this.content;
	}

	/**
	 * Checks if the hash is valid for the content
	 */
	isValid(): boolean {
		const contentHash = this.getContentHash();
		const derivedHash = this.getDerivedHash();
		return contentHash === derivedHash;
	}

	/**
	 * Determines the hash by looking at the hash given in the content
	 * (non-validated).
	 */
	getContentHash(): string | null {
		const results = SIGNED_HASH_ANNOTATION_REGEX.exec(this.content);
		if (results == null) {
			return null;
		}
		return results[1];
	}

	/**
	 * Determines the hash from its content.
	 */
	getDerivedHash(): string {
		// Do not clean the version. Changes here should trigger a new hash.
		const cleanContent = this.content
			.replace(SIGNED_HASH_ANNOTATION_REGEX, "<hash>")
			.replace(MANUAL_SECTIONS_REGEX, "<manual-code>");
		return hash(cleanContent, "utf8");
	}

	/**
	 * Returns the command string which was used to generate this code.
	 */
	getCommand(): string | null {
		const results = GENERATED_ANNOTATION_REGEX.exec(this.content);
		if (results == null) {
			return null;
		}
		return results[1];
	}

	/**
	 * Returns the version string which was used to generate this code.
	 */
	getVersion(): number | null {
		const results = SIGNED_VERSION_ANNOTATION_REGEX.exec(this.content);
		if (results == null) {
			return null;
		}
		return Number(results[1]);
	}

	/**
	 * Returns all the manual sections found in the code by name.
	 */
	getManualSections(): Record<string, ManualSectionInfo> {
		const regex = new RegExp(MANUAL_SECTIONS_REGEX);
		let captureGroups = null;
		const manualSections: Record<string, ManualSectionInfo> = {};
		do {
			captureGroups = regex.exec(this.content);
			if (captureGroups != null) {
				manualSections[captureGroups[1]] = {
					code: captureGroups[2],
				};
			}
		} while (captureGroups != null);

		return manualSections;
	}

	resign(): string {
		const derivedHash = this.getDerivedHash();
		this.content = this.content.replace(
			SIGNED_HASH_ANNOTATION_REGEX,
			getHashAnnotation(derivedHash),
		);
		return this.content;
	}

	async save(path: string): Promise<void> {
		await fs.promises.writeFile(path, this.content, {
			encoding: "utf8",
			flag: "w",
		});
	}
}

export default SignedCode;
