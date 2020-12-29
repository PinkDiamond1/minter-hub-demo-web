import parseISO from "date-fns/esm/parseISO";
import formatDistanceStrict from 'date-fns/esm/formatDistanceStrict';
import decode from 'entity-decode';
import prettyNum, {PRECISION_SETTING, ROUNDING_MODE} from 'pretty-num';
import thousands from 'thousands';
import {EXPLORER_HOST, ETHERSCAN_HOST} from "~/assets/variables.js";
import {getTimeOffset} from '~/assets/time-offset.js';
import format from 'date-fns/esm/format';

/**
 * Make function to accept imask values
 * @param {string} propName
 * @param {boolean} [isAcceptUnmasked]
 * @return {Function}
 */
export function makeAccepter(propName, isAcceptUnmasked) {
    return function(e) {
        this.form[propName] = isAcceptUnmasked ? e.detail._unmaskedValue : e.detail._value;
    };
}

export function getExplorerAddressUrl(address) {
    return EXPLORER_HOST + '/address/' + address;
}

export function getExplorerTxUrl(hash) {
    return EXPLORER_HOST + '/transactions/' + hash;
}

export function getEtherscanAddressUrl(address) {
    return ETHERSCAN_HOST + '/address/' + address;
}

export function getEtherscanTxUrl(hash) {
    return ETHERSCAN_HOST + '/tx/' + hash;
}

//* @TODO
export function getAvatarUrl() {

}

/**
 * @param {string|number} value
 * @param {ROUNDING_MODE} [roundingMode]
 * @param {boolean} [skipFalsy]
 * @return {string}
 */
export function pretty(value, roundingMode, skipFalsy) {
    if (!skipFalsy && !value) {
        value = 0;
    }
    if (skipFalsy && !value && value !== 0) {
        return '';
    }
    const PRECISION = 2;
    if (value >= 1 || value <= -1 || Number(value) === 0) {
        return decode(prettyNum(value, {precision: PRECISION, precisionSetting: PRECISION_SETTING.FIXED, roundingMode, thousandsSeparator: '&#x202F;'}));
    } else {
        value = decode(prettyNum(value, {precision: PRECISION, precisionSetting: PRECISION_SETTING.REDUCE_SIGNIFICANT, roundingMode, thousandsSeparator: '&#x202F;'}));
        value = value.substr(0, 10);
        if (value === '0.00000000') {
            return '0.00';
        }
        return value;
    }
}

/**
 * Do not change precision
 * @param {string|number} value
 * @return {string}
 */
export function prettyExact(value) {
    return decode(thousands(value, '&#x202F;'));
}

function timeFormat(timestamp, pattern) {
    if (typeof timestamp === 'string') {
        timestamp = parseISO(timestamp);
    }
    const time = format(timestamp, pattern);

    return time && time !== 'Invalid Date' ? time : false;
}

export function getTimeDistance(timestamp, allowFuture) {
    if (typeof timestamp === 'string') {
        timestamp = parseISO(timestamp);
    }
    const now = new Date(Date.now() + getTimeOffset());
    // if timestamp from future
    if (timestamp > now && !allowFuture) {
        timestamp = now;
    }
    const distance = formatDistanceStrict(timestamp, now, {roundingMethod: 'round'});

    return distance && distance !== 'Invalid Date' ? distance : false;
}

export function getTime(timestamp) {
    return timeFormat(timestamp, 'yyyy-MM-dd HH:mm:ss');
}

export function shortFilter(value, endLength = 6, minLengthToShort) {
    const startLength = endLength + 'Mx'.length - 1;
    minLengthToShort = minLengthToShort || startLength + endLength;
    value = value.toString();
    const isLong = value.length > minLengthToShort;

    return isLong ? value.substr(0, startLength) + '…' + value.substr(-endLength) : value;
}
