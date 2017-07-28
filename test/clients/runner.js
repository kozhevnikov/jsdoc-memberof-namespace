/**
 * `external` namespace overwrites `acme` index namespace
 * @namespace external
 */

/**
 * `runner` namespace is an object literal (i.e. has no name) and added as member of `external`
 * @namespace
 */
const runner = {
  /**
   * First name
   * @type {string}
   * @default
   */
  firstName: 'Road'
};

/**
 * Last name
 * @type {string}
 * @default
 */
runner.lastName = 'Runner';

/**
 * Get full name
 * @return {string} Full name
 */
runner.fullName = () => {
};

export default runner;
