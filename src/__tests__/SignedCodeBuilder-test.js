/**
 * Test for the SignedCodeBuilder module.
 *
 * @format
 */

// SUT
import SignedCodeBuilder from "../SignedCodeBuilder";

import SignedCodeHashPlaceholder from "../placeholder/SignedCodeHashPlaceholder";
import SignedCode from "../SignedCode";

const validChecksum = "824c519dd9ee65cbdd64cc6c5e17be02";
const signedTestCode = (checksum) => `/**
 * This is a test module.
 *
 * @generated /usr/bin/foo -g -lrt
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

describe("signedCodeBuilder", () => {
	it("accepts plain code", () => {
		const code = "let thereB = 'light';";
		const instance = new SignedCodeBuilder();

		const result = instance.addCode(code);

		expect(result).toStrictEqual(instance);
		expect(instance.toString()).toStrictEqual(code);
	});

	it("accepts a command annotation", () => {
		const code1 = "let thereA = 'light';\n// ";
		const code2 = "\nlet thereB = 'light';\n";
		const cmd = "/usr/bin/foo -g -lrt";
		const instance = new SignedCodeBuilder();

		instance.addCode(code1);
		const result = instance.addCommandAnnotation(cmd);
		instance.addCode(code2);

		expect(result).toStrictEqual(instance);
		expect(instance.toString()).toMatchSnapshot();
	});

	it("accepts a hash annotation", () => {
		const code1 = "let thereA = 'light';\n// ";
		const code2 = "\nlet thereB = 'light';\n";
		const instance = new SignedCodeBuilder();

		instance.addCode(code1);
		const result = instance.addHashAnnotation();
		instance.addCode(code2);

		expect(result).toStrictEqual(instance);
		expect(instance.toString()).toMatchSnapshot();
	});

	it("accepts a version annotation", () => {
		const code1 = "let thereA = 'light';\n// ";
		const code2 = "\nlet thereB = 'light';\n";
		const version = 436;
		const instance = new SignedCodeBuilder();

		instance.addCode(code1);
		const result = instance.addVersionAnnotation(version);
		instance.addCode(code2);

		expect(result).toStrictEqual(instance);
		expect(instance.toString()).toMatchSnapshot();
	});

	it("accepts a generic placeholder", () => {
		const code1 = "let thereA = 'light';\n// ";
		const code2 = "\nlet thereB = 'light';\n";
		const instance = new SignedCodeBuilder();

		instance.addCode(code1);
		const result = instance.addPlaceholder(new SignedCodeHashPlaceholder());
		instance.addCode(code2);

		expect(result).toStrictEqual(instance);
		expect(instance.toString()).toMatchSnapshot();
	});

	it("accepts a manual section with code", () => {
		const code1 = "let thereA = 'light';\n";
		const code2 = "\nlet thereB = 'light';\n";
		const instance = new SignedCodeBuilder();

		instance.addCode(code1);
		const result = instance.addManualSection("init-code", {
			code: "let thereC = 'light';",
		});
		instance.addCode(code2);

		expect(result).toStrictEqual(instance);
		expect(instance.toString()).toMatchSnapshot();
	});

	it("accepts a manual section with default code", () => {
		const code1 = "let thereA = 'light';\n";
		const code2 = "\nlet thereB = 'light';\n";
		const instance = new SignedCodeBuilder();

		instance.addCode(code1);
		const result = instance.addManualSection("init-code", {
			defaultCode: "let thereC = 'light';",
		});
		instance.addCode(code2);

		expect(result).toStrictEqual(instance);
		expect(instance.toString()).toMatchSnapshot();
	});

	it("accepts a manual section with custom code", () => {
		const code1 = "let thereA = 'light';\n";
		const code2 = "\nlet thereB = 'light';\n";
		const instance = new SignedCodeBuilder();

		instance.addCode(code1);
		const result = instance.addManualSection("init-code", {
			defaultCode: "let thereC = 'light';",
		});
		instance.setManualSectionCode("init-code", "let thereD = 'light';");
		instance.addCode(code2);

		expect(result).toStrictEqual(instance);
		expect(instance.toString()).toMatchSnapshot();
	});

	it("accepts previous code", () => {
		const previousCode = new SignedCode(signedTestCode(validChecksum));

		const code1 = "let thereA = 'light';\n";
		const code2 = "\nlet thereB = 'light';\n";
		const instance = new SignedCodeBuilder();

		instance.addCode(code1);
		const result = instance.addManualSection("init-code", {
			defaultCode: "let thereC = 'light';",
		});
		instance.setManualSectionCode("init-code", "let thereD = 'light';");
		instance.addCode(code2);
		instance.addPreviousCode(previousCode);

		expect(result).toStrictEqual(instance);
		expect(instance.toString()).toMatchSnapshot();
	});
});
