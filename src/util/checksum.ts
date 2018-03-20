export { };
const crypto = require('crypto');

/**
 * Returns a valid checksumming algorithm, no matter what
 *
 * @param {string} algorithm
 * @returns {string}
 */
const get_algorithm = (algorithm: string): string => {
    const default_algo = 'sha256';
    if (!algorithm || typeof algorithm !== 'string') { return default_algo; }
    algorithm = algorithm.toLowerCase().trim();
    return ['sha', 'sha1', 'sha256', 'sha512', 'md5'].includes(algorithm) ? algorithm : default_algo;
};

/**
 * Pass any Javascript type in here and get a unique checksum
 * Defaults to sha256, but can be changed.
 *
 * @param {*} content
 * @param {string} algorithm
 * @returns {string}
 */
const checksum = (content: any, algorithm: string): string => {
    content = content ? content : '0000000000000000';
    algorithm = get_algorithm(algorithm);
    if (typeof content === 'string') {
        return crypto.createHash(algorithm).update(content).digest('hex');
    } else {
        return checksum(JSON.stringify(content).replace(/\s+/g, ''), algorithm);
    }
};

module.exports = checksum;
