/**
 * Test for the SignedCodePlaceholder module.
 *
 * @format
 */

// SUT
import SignedCodeCommandPlaceholder from "../SignedCodeCommandPlaceholder";

describe("signedCodeCommandPlaceholder", () => {
	it("gets the command", () => {
		const cmd = "/usr/bin/foo -g -lrt";

		const instance = new SignedCodeCommandPlaceholder(cmd);

		expect(instance.getCommand()).toStrictEqual(cmd);
	});

	it("generates the code", () => {
		const cmd = "/usr/bin/foo -g -lrt";

		const instance = new SignedCodeCommandPlaceholder(cmd);

		expect(instance.toString()).toStrictEqual(
			"@generated /usr/bin/foo -g -lrt",
		);
	});
});
