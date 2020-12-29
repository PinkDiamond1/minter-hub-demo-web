import {walletFromMnemonic, isValidMnemonic} from 'minterjs-wallet';
import {getExplorerAddressUrl} from "~/assets/utils.js";
import {COIN_NAME} from 'assets/variables.js';

export default {

    wallet(state) {
        if (!state.userSeed) {
            return null;
        }
        return walletFromMnemonic(state.userSeed);
    },
    privateKey(state, getters) {
        return getters.wallet?.getPrivateKeyString();
    },
    address(state, getters) {
        return getters.wallet?.getAddressString();
    },
    addressUrl(state, getters) {
        return getExplorerAddressUrl(getters.address);
    },
    BASE_COIN_SYMBOL() {
        return COIN_NAME;
    },
    baseCoin(state) {
        return state.balanceList.find((coinItem) => {
            return coinItem.coin.symbol === COIN_NAME;
        });
    },
    bipPrice(state) {
        if (!state.balanceTotal.usd || !state.balanceTotal.bip) {
            return 0;
        }
        return state.balanceTotal.usd / state.balanceTotal.bip;
    },
};
