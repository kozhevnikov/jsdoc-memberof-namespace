const logger = require('jsdoc/util/logger');
const path = require('path');

logger.debug('[JMN] Loaded jsdoc-memberof-namespace');

const kinds = ['class', 'constant', 'function'];
const namespaces = [];

const handlers = {
  parseBegin: (event) => {
    event.sourcefiles.sort((f1, f2) => isIndex(f1) === isIndex(f2) ? 0 : isIndex(f1) ? -1 : 1);
    logger.debug('[JMN] Sorted', event.sourcefiles);
  },

  newDoclet: (event) => {
    const doc = event.doclet;
    const dsc = `${doc.kind} ${doc.longname} in ${doc.meta ? doc.meta.filename : '.'}`;

    if (doc.undocumented) {
      logger.verbose(`[JMN] Skipped undocumented ${dsc}`);
      return;
    }

    if (doc.kind === 'namespace') {
      if (namespaces.every(ns => ns.longname !== doc.longname)) {
        logger.debug(`[JMN] Found ${dsc}`);
      } else {
        logger.warn(`[JMN] Found duplicate ${dsc}`);
      }
      namespaces.push(doc);
      return;
    }

    if (!kinds.includes(doc.kind)) {
      logger.debug(`[JMN] Skipped ${dsc}`);
      return;
    }

    if (doc.memberof) {
      logger.debug(`[JMN] Skipped ${dsc} member of ${doc.memberof}`);
      return;
    }

    const namespace = getNamespace(doc.meta.filename, doc.meta.path);

    if (!namespace) {
      logger.warn(`[JMN] Namespace not found for ${dsc}`);
      return;
    }

    doc.memberof = namespace.longname;
    doc.longname = `${doc.memberof}.${doc.longname}`;
    if (doc.scope === 'global') doc.scope = 'static';

    logger.debug(`[JMN] Processed ${dsc} member of ${doc.memberof}`);
  }
};

/**
 * Check if file path is an index.js file
 * @param {string} file - File path
 * @return {boolean} True if file is index.js, false otherwise
 */
function isIndex(file) {
  return path.basename(file).toLowerCase() === 'index.js';
}

/**
 * Check if directory path is parent of a subdirectory path
 * @param {string} parent - Directory path
 * @param {string} child - Subdirectory path
 * @return {boolean} - True if subdirectory is in directory, false otherwise
 */
function isParent(parent, child) {
  return !path.relative(parent, child).startsWith('..');
}

/**
 * Get closest namespace doclet previously parsed either from the same file as the doclet
 * or from one of the index.js files present in the same directory or any of its parents
 *
 * @param {string} file - File name of the doclet
 * @param {string} path - Directory path of the doclet
 * @return {?Doclet} - Namespace doclet or null
 */
function getNamespace(file, path) {
  const files = namespaces.filter(ns => ns.meta.filename === file && ns.meta.path === path);
  if (files.length > 0) {
    return files[files.length - 1];
  }

  const paths = namespaces.filter(ns => isIndex(ns.meta.filename) && isParent(ns.meta.path, path));
  if (paths.length > 0) {
    paths.sort((ns1, ns2) => ns1.meta.path.length - ns2.meta.path.length);
    return paths[paths.length - 1];
  }

  return null;
}

module.exports = { handlers };
