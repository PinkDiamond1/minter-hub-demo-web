import Vue from 'vue';
import {getTimeOffset} from '~/assets/time-offset.js';

export default {
    PUSH_HISTORY: (state, historyItem) => {
        state.history.push(historyItem);
    },
    POP_HISTORY: (state) => {
        state.history.pop();
    },
    SET_BALANCE: (state, balanceList) => {
        state.balanceList = balanceList;
    },
    SET_BALANCE_TOTAL: (state, balanceData) => {
        state.balanceTotal = {
            bip: balanceData.totalBalanceSum,
            usd: balanceData.totalBalanceSumUsd,
        };
    },
    SET_LAST_UPDATE_TIME: (state, timestamp) => {
        state.lastUpdateTime = timestamp - getTimeOffset();
    },
    /**
     * Show snackbar if it is inactive
     */
    SET_SNACKBAR_ACTIVE: (state) => {
        state.isSnackbarActive = true;
    },
    /**
     * Set snackbar inactive so it can react to next SET_SNACKBAR_ACTIVE call
     */
    SET_SNACKBAR_INACTIVE: (state) => {
        state.isSnackbarActive = false;
    },
};
