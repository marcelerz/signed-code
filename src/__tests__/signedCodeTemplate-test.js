/**
 * Test for the signedCode templates module.
 *
 * @format
 */

// SUT
import signedCodeTemplate from "../signedCodeTemplate";

describe("signedCodeTemplate", () => {
	it("accepts simple code", () => {
		const code = signedCodeTemplate`This is a test!`;
		const result = code.getCode().getContent();

		expect(result).toStrictEqual("This is a test!");
	});

	it("accepts string placeholder code", () => {
		const code = signedCodeTemplate`This is a test! ${"spam"} Foo bar`;
		const result = code.getCode().getContent();

		expect(result).toStrictEqual("This is a test! spam Foo bar");
	});

	it("accepts number placeholder code", () => {
		const code = signedCodeTemplate`This is a test! ${42} Foo bar`;
		const result = code.getCode().getContent();

		expect(result).toStrictEqual("This is a test! 42 Foo bar");
	});

	it("accepts boolean placeholder code", () => {
		const code = signedCodeTemplate`This is a test! ${true} Foo bar`;
		const result = code.getCode().getContent();

		expect(result).toStrictEqual("This is a test! true Foo bar");
	});

	it("rejects null placeholder", () => {
		expect(() => {
			signedCodeTemplate`This is a test! ${null} Foo bar`;
		}).toThrow();
	});

	describe("annotations", () => {
		it("accepts a command annotation", () => {
			const code = signedCodeTemplate`This is a test!
// ${signedCodeTemplate.commandAnnotation("/usr/bin/foo -g -lrt")}
This is another line!`;
			const result = code.getCode().getContent();

			expect(result).toStrictEqual(`This is a test!
// @generated /usr/bin/foo -g -lrt
This is another line!`);
		});

		it("accepts a hash annotation", () => {
			const code = signedCodeTemplate`This is a test!
// ${signedCodeTemplate.hashAnnotation()}
This is another line!`;
			const result = code.getCode().getContent();

			expect(result).toStrictEqual(`This is a test!
// @signed-hash ccc1f1b33948c03b4455c47879c600cb
This is another line!`);
		});

		it("accepts a version annotation", () => {
			const code = signedCodeTemplate`This is a test!
// ${signedCodeTemplate.versionAnnotation(245)}
This is another line!`;
			const result = code.getCode().getContent();

			expect(result).toStrictEqual(`This is a test!
// @signed-version 245
This is another line!`);
		});

		it("accepts a manual section", () => {
			const code = signedCodeTemplate`This is a test!
${signedCodeTemplate.manualSection("init-code", "this should be here!")}
This is another line!`;
			const result = code.getCode().getContent();

			expect(result).toStrictEqual(`This is a test!
// <Manual-Section START init-code>this should be here!// <Manual-Section END>
This is another line!`);
		});
	});
});
