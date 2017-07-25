/**
 * `coyote` namespace overwrites `acme` index namespace
 * @namespace external.coyote
 */

/**
 * First name
 * @type {string}
 * @default
 */
const firstName = 'Wile';

/**
 * Middle name
 * @type {string}
 * @default
 */
const middleName = 'E.';

/**
 * Last name
 * @type {string}
 * @default
 */
const lastName = 'Coyote';

/**
 * Get full name
 * @param {boolean} [middleName] - Include middle name
 * @return {string} Full name
 */
function fullName(middleName = true) {
}

export {
  firstName,
  middleName,
  lastName,
  fullName
}
