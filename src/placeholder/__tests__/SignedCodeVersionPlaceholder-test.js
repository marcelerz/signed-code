/**
 * Test for the SignedCodePlaceholder module.
 *
 * @format
 */

// SUT
import SignedCodeVersionPlaceholder from "../SignedCodeVersionPlaceholder";

describe("signedCodeVersionPlaceholder", () => {
	it("gets the version", () => {
		const version = 435;

		const instance = new SignedCodeVersionPlaceholder(version);

		expect(instance.getVersion()).toStrictEqual(version);
	});

	it("generates the code", () => {
		const version = 436;

		const instance = new SignedCodeVersionPlaceholder(version);

		expect(instance.toString()).toStrictEqual("@signed-version 436");
	});
});
