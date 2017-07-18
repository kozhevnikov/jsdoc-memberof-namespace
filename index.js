const logger = require('jsdoc/util/logger');
const path = require('path');

logger.debug('[JMN] Loaded jsdoc-memberof-namespace');

const kinds = ['class', 'constant', 'function'];
const namespaces = [];

const handlers = {
  parseBegin: (event) => {
    const files = event.sourcefiles;
    const index = [];
    const other = [];

    files.forEach(file => (path.basename(file) === 'index.js' ? index : other).push(file));
    logger.debug(`[JMN] Found ${index.length} index.js`, index);

    if (index.length === 0) return;

    files.length = 0;
    files.push(...index);
    files.push(...other);
  },

  newDoclet: (event) => {
    const doclet = event.doclet;

    if (doclet.kind === 'namespace' && doclet.meta.filename === 'index.js') {
      namespaces.push(doclet);
      logger.debug(`[JMN] Found ${doclet.name} namespace in ${doclet.meta.path}`);
      return;
    }

    const file = doclet.meta ? doclet.meta.filename : '*';
    const desc = `${doclet.name} ${doclet.kind} in ${file}`;

    if (!kinds.includes(doclet.kind)) {
      logger.debug(`[JMN] Skipped ${desc}`);
      return;
    }

    if (doclet.memberof) {
      logger.debug(`[JMN] Skipped ${desc} member of ${doclet.memberof}`);
      return;
    }

    const pathspaces = namespaces.filter(ns => doclet.meta.path.startsWith(ns.meta.path));

    if (pathspaces.length === 0) {
      logger.warn(`[JMN] No namespace found for ${desc}`);
      return;
    }

    const namespace = pathspaces.sort((ns1, ns2) => ns2.meta.path.length - ns1.meta.path.length)[0];

    doclet.memberof = namespace.longname;
    doclet.longname = `${doclet.memberof}.${doclet.longname}`;
    if (doclet.scope === 'global') doclet.scope = 'static';

    logger.debug(`[JMN] Processed ${desc}`);
  }
};

module.exports = { handlers };
