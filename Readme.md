<!-- @format -->

# Signed-Code

A template system for code generation.

## Installation

Install this module with the following command:

```sh
npm install signed-code
```

Add the module to your package.json dependencies:

```sh
npm install --save signed-code
```

Add the module to your package.json dev-dependencies:

```sh
npm install --save-dev signed-code
```

Import a module as follows:

## Quick Start

```TS
import signedCode from "signed-code";
import SignedCode from "signed-code/SignedCode";
import SignedCodeBuilder from "signed-code/SignedCodeBuilder";

// Define the code template through the template function `signedCode`
const codeBuilder = (values): SignedCodeBuilder => signedCode`/**
 * Some sample code
 *
 * // Explain how to re-generate the code
 * ${signedCode.commandAnnotation("npm run gencode")}
 *
 * // Add required hash to recognize when code is out of date
 * ${signedCode.hashAnnotation()}
 *
 * // Add version to force re-generation when needed
 * ${signedCode.versionAnnotation(1)}
 */

// Define named manual sections for partially generated code.
// Code written here won't be calculated in the hash.
// Multiple of these are allowed each with a different name.
${signedCode.manualSection("import")}

// Write any value give into the template
const values = ${JSON.stringify(values)};

export default values;
`;

// Load already existing code
const previousCode = await SignedCode.load("/tmp/export.js");

// Get the hash from the old code
const previousHash = previousCode.getDerivedHash();

// Re-generate new code
const codeBuilder = codeGenTemplate([1, 2, 3, 4]);

// Add the manual sections from the old code to the newly generated code
codeBuilder.addPreviousCode(previousCode);

// Serialize the newly generated code into a string
const signedCode = codeBuilder.getCode();

// Get the hash from the new code
const newHash = signedCode.getDerivedHash();

// Avoid writing to disk if nothing changed
if (previousHash !== newHash) {
    await signedCode.save(apiRoutesFilePath);
    console.log("Done updating code.");
} else {
    console.log("Nothing to update.");
}
```

This code generates:

```TS
/**
 * Some sample code
 *
 * // Explain how to re-generate the code
 * @generated npm run gencode
 *
 * // Add required hash to recognize when code is out of date
 * @signed-hash 70541b0db6e93343bc6569604e0c4585
 *
 * // Add version to force re-generation when needed
 * @signed-version 1
 */

// Define named manual sections for partially generated code.
// Code written here won't be calculated in the hash.
// Multiple of these are allowed each with a different name.
// <Manual-Section START import>

// <Manual-Section END>

// Write any value give into the template
const values = [1, 2, 3, 4];

export default values;
```
