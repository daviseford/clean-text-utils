import * as crypto from 'crypto';
import { Algorithm } from '../definitions/module';

/**
 * Returns a valid checksumming algorithm, no matter what
 *
 * @param {*} algorithm
 * @returns {Algorithm}
 */
const get_algorithm = (algorithm: any): Algorithm => {
    const default_algo: Algorithm = 'sha256';
    if (!algorithm || typeof algorithm !== 'string') { return default_algo; }
    algorithm = algorithm as Algorithm;
    return ['sha', 'sha1', 'sha256', 'sha512', 'md5'].includes(algorithm) ? algorithm : default_algo;
};

/**
 * Pass any Javascript data type in here and get a unique checksum
 * Defaults to sha256, but can be changed.
 *
 * @param {*} data
 * @param {Algorithm} [algorithm]
 * @returns {string}
 */
const checksum = (data: any, algorithm?: Algorithm): string => {
    data = data ? data : '0000000000000000';
    algorithm = get_algorithm(algorithm);
    if (typeof data === 'string') {
        return crypto.createHash(algorithm).update(data).digest('hex');
    } else {
        return checksum(JSON.stringify(data).replace(/\s+/g, ''), algorithm);
    }
};

export default checksum;
