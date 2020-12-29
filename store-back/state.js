export default function createStore() {
    return {
        sectionName: '',
        history: [],
        userSeed: '',
        /** @type Array<BalanceItem> */
        balanceList: [],
        balanceTotal: {},
        lastUpdateTime: 9999999999999,
        balanceDisplayType: '',
        // cache inviter names
        /** @type {{string: InvitationData}} */
        invitationCache: {},
        isSnackbarActive: false,
        /** @type {string|boolean} */
        isNativeApp: window.localStorage.getItem('is-native-app'),
    };
}




/**
 * @typedef {Object} Transaction
 * @property {string} name
 * @property {number} amount
 * @property {string} coin
 * @property {string} image
 * @property {string} timestamp
 */


