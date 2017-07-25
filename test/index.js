/**
 * Acme Corporation
 *
 * `acme` namespace will apply to all files in this directory and any subdirectory
 * unless overwritten by other `index.js` file or the file itself.
 *
 * @namespace acme
 * @see https://en.wikipedia.org/wiki/Acme_Corporation
 */

export * from './catalog';
export { default as Anvil } from './products/Anvil';
export { default as Boomerang } from './products/Boomerang';
