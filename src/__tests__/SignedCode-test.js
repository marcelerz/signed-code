/**
 * Test for the SignedCode module.
 *
 * @format
 */

// SUT
import SignedCode from "../SignedCode";

const invalidChecksum = "ccc1f1b33948c03b4455c47879c600cb";
const validChecksum = "9ab34254a02228f491326fc00f297cf0";
const signedTestCode = (checksum) => `/**
 * This is a test module.
 *
 * @generated /usr/bin/foo -g -lrt
 * @signed-version 368
 * @signed-hash ${checksum}
 */

import TestModule from "TestModule";

TestModule.someCall(24, 67);

function printEverything() {
    // <Manual-Section init-code START>
    console.log("42 is the answer!");
    // <Manual-Section END>
}

function someOtherFunction() {
    // <Manual-Section more-code START>
    console.log("I don't know");
    // <Manual-Section END>
}

export default printEverything;
`;

describe("signedCode", () => {
	it("gets the content", () => {
		const code = signedTestCode(invalidChecksum);
		const instance = new SignedCode(code);
		expect(instance.getContent()).toStrictEqual(code);
	});

	it("gets the derived hash", () => {
		const instance = new SignedCode(signedTestCode(validChecksum));
		expect(instance.getDerivedHash()).toStrictEqual(validChecksum);
	});

	it("gets the content hash", () => {
		const instance = new SignedCode(signedTestCode(invalidChecksum));
		expect(instance.getContentHash()).toStrictEqual(invalidChecksum);
	});

	it("recognizes valid code", () => {
		const instance = new SignedCode(signedTestCode(validChecksum));
		expect(instance.isValid()).toStrictEqual(true);
	});

	it("recognizes invalid code", () => {
		const instance = new SignedCode(signedTestCode(invalidChecksum));
		expect(instance.isValid()).toStrictEqual(false);
	});

	it("gets the command", () => {
		const instance = new SignedCode(signedTestCode(validChecksum));
		expect(instance.getCommand()).toStrictEqual("/usr/bin/foo -g -lrt");
	});

	it("gets the version", () => {
		const instance = new SignedCode(signedTestCode(validChecksum));
		expect(instance.getVersion()).toStrictEqual(368);
	});

	it("gets the manual sections", () => {
		const instance = new SignedCode(signedTestCode(validChecksum));
		expect(instance.getManualSections()).toMatchSnapshot();
	});

	it("resigns code", () => {
		const instance = new SignedCode(signedTestCode(invalidChecksum));
		expect(instance.resign()).toStrictEqual(signedTestCode(validChecksum));
		expect(instance.isValid()).toStrictEqual(true);
		expect(instance.getContent()).toStrictEqual(signedTestCode(validChecksum));
	});
});
