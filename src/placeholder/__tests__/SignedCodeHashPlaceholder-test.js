/**
 * Test for the SignedCodePlaceholder module.
 *
 * @format
 */

// SUT
import SignedCodeHashPlaceholder from "../SignedCodeHashPlaceholder";

describe("signedCodeHashPlaceholder", () => {
	describe("hash", () => {
		it("generates the code", () => {
			const instance = new SignedCodeHashPlaceholder();

			expect(instance.toString()).toStrictEqual("@signed-hash aa");
		});
	});
});
