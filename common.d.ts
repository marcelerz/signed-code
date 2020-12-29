/**
 * General type definition
 *
 * Define types here when there is no package available.
 *
 * @format
 */

// Quick-check to figure out if the system runs in development mode.
// Use this to add futher checks for debugging. Avoid any behavior changes.
declare const __DEV: boolean;

// QUick-check to figure out if the system requires detailed errors.
// Use this to add information to errors. Avoid any behavior changes.
declare const __VERBOSE: boolean;

declare namespace NodeJS {
	interface Global {
		__DEV: boolean;
		__VERBOSE: boolean;
	}
}
