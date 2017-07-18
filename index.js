const logger = require('jsdoc/util/logger');
const path = require('path');

logger.debug('[JMN] Loaded jsdoc-memberof-namespace');

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

  fileBegin: (event) => {
    logger.debug('fileBegin');
  },

  beforeParse: (event) => {
    logger.debug('beforeParse');
  },

  jsdocCommentFound: (event) => {
    logger.debug('jsdocCommentFound');
  },

  symbolFound: (event) => {
    logger.debug('symbolFound');
  },

  newDoclet: (event) => {
    logger.debug('newDoclet');
  },

  fileComplete: (event) => {
    logger.debug('fileComplete');
  },

  parseComplete: (event) => {
    logger.debug('parseComplete');
  },

  processingComplete: (event) => {
    logger.debug('processingComplete');
  }
};

module.exports = { handlers };
