import {getBalance} from '~/api/explorer.js';

export default {
    FETCH_BALANCE: ({ commit, state, getters }) => {
        // profile address fetched in the middleware
        return getBalance(getters.address)
            .then((balanceResponse) => {
                commit('SET_BALANCE', balanceResponse.data.balances);
                commit('SET_BALANCE_TOTAL', balanceResponse.data);
                commit('SET_LAST_UPDATE_TIME', new Date(balanceResponse.latestBlockTime).getTime());
                return balanceResponse.data.balances;
            });
    },
    FETCH_BALANCE_TOTAL: ({ commit, state, getters }) => {
        // profile address fetched in the middleware
        return getBalance(getters.address)
            .then((balanceResponse) => {
                commit('SET_BALANCE_TOTAL', balanceResponse.data);
            });
    },
};
