/**
 * Test for the SignedCodePlaceholder module.
 *
 * @format
 */

// SUT
import SignedCodeManualSectionPlaceholder from "../SignedCodeManualSectionPlaceholder";

describe("signedCodeManualSectionPlaceholder", () => {
	it("gets correctly initialized and returns name", () => {
		const name = "init-code";

		const instance = new SignedCodeManualSectionPlaceholder(name);

		expect(instance.getName()).toStrictEqual(name);
		expect(instance.getCode()).toBeUndefined();
		expect(instance.getDefaultCode()).toBeUndefined();
		expect(instance.getPreviousCode()).toBeUndefined();
	});

	it("gets the code", () => {
		const name = "init-code";
		const code = "let thereB = 'light';";

		const instance = new SignedCodeManualSectionPlaceholder(name, code);

		expect(instance.getName()).toStrictEqual(name);
		expect(instance.getCode()).toStrictEqual(code);
	});

	it("gets the default code", () => {
		const name = "init-code";
		const code = "let thereB = 'light';";

		const instance = new SignedCodeManualSectionPlaceholder(name, null, code);

		expect(instance.getName()).toStrictEqual(name);
		expect(instance.getDefaultCode()).toStrictEqual(code);
	});

	it("sets and gets the previous code", () => {
		const name = "init-code";
		const code = "let thereB = 'light';";

		const instance = new SignedCodeManualSectionPlaceholder(name);
		instance.setPreviousCode(code);

		expect(instance.getName()).toStrictEqual(name);
		expect(instance.getPreviousCode()).toStrictEqual(code);
	});

	describe("generates the code", () => {
		it("uses the code", () => {
			const name = "init-code";
			const code = "let thereA = 'light';";
			const previousCode = "let thereB = 'light';";
			const defaultCode = "let thereC = 'light';";

			const instance = new SignedCodeManualSectionPlaceholder(
				name,
				code,
				defaultCode,
			);
			instance.setPreviousCode(previousCode);

			expect(instance.toString()).toMatchSnapshot();
		});

		it("uses the previous code", () => {
			const name = "init-code";
			const previousCode = "let thereB = 'light';";
			const defaultCode = "let thereC = 'light';";

			const instance = new SignedCodeManualSectionPlaceholder(
				name,
				null,
				defaultCode,
			);
			instance.setPreviousCode(previousCode);

			expect(instance.toString()).toMatchSnapshot();
		});

		it("uses the default code", () => {
			const name = "init-code";
			const defaultCode = "let thereC = 'light';";

			const instance = new SignedCodeManualSectionPlaceholder(
				name,
				null,
				defaultCode,
			);

			expect(instance.toString()).toMatchSnapshot();
		});

		it("uses the plain code", () => {
			const name = "init-code";

			const instance = new SignedCodeManualSectionPlaceholder(name);

			expect(instance.toString()).toMatchSnapshot();
		});
	});
});
