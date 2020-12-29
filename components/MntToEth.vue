<script>
import {validationMixin} from 'vuelidate';
import required from 'vuelidate/lib/validators/required';
// import axios from "axios";
import QrcodeVue from 'qrcode.vue';
import autosize from 'v-autosize';
import {prepareLink} from "minter-js-sdk";
import {TX_TYPE} from 'minterjs-util/src/tx-types.js';
import {MAINNET, NETWORK} from 'assets/variables.js';
import checkEmpty from '~/assets/v-check-empty.js';


const HUB_MULTISIG_ADDRESS = 'Mxb26bc23e5a72ea2033f70006751066602d3349fd';
const HUB_COIN_ID = NETWORK === MAINNET ? 0 : 212;
const LINK_HOST = NETWORK === MAINNET ? undefined : 'https://testnet.bip.to/';

export default {
    components: {
        QrcodeVue,
    },
    directives: {
        autosize,
        checkEmpty,
    },
    mixins: [validationMixin],
    data() {
        return {
            // address: "",
            // balances: [],
            form: {
                amount: "",
                address: ""
            },
            // transactions: []
            linkToBip: '',
        }
    },
    validations() {
        return {
            form: {
                address: {
                    required,
                    validAddress(address) {
                        return /^0x[0-9a-fA-F]{40}$/.test(address);
                    }
                },
                amount: {
                    required,
                    // validAmount: isValidAmount,
                    // maxValue: maxValue(this.maxAmount || 0),
                },
            },
        };
    },
    methods: {
        submit() {
            if (this.$v.$invalid) {
                this.$v.$touch();
                return;
            }

            const txParams = {
                type: TX_TYPE.SEND,
                data: {
                    to: HUB_MULTISIG_ADDRESS,
                    value: this.form.amount,
                    coin: HUB_COIN_ID,
                },
                payload: this.form.address,
            };

            this.$v.$reset();
            this.form.address = '';
            this.form.amount = '';
            this.linkToBip = prepareLink(txParams, LINK_HOST);
        },
    },
}
</script>

<template>
  <div>
      <div class="card">
          <div class="card__content card__content--gray card__content--small u-h--uppercase">Minter → <span class="u-text-orange">Ethereum</span></div>
          <form class="card__content card__content--small" @submit.prevent="submit">
              <div class="u-grid u-grid--small u-grid--vertical-margin--small">
                  <div class="u-cell">
                      <label class="form-field form-field--row" :class="{'is-error': $v.form.address.$error}">
                        <textarea class="form-field__input" rows="1" spellcheck="false" v-check-empty v-autosize
                                  v-model.trim="form.address"
                                  @blur="$v.form.address.$touch()"
                        ></textarea>
                          <span class="form-field__label">Deposit to address</span>
                      </label>
                      <span class="form-field__help" v-if="!$v.form.address.$error">Ethereum address starting with 0x…</span>
                      <span class="form-field__error" v-else-if="$v.form.address.$dirty && !$v.form.address.required">Enter Ethereum address</span>
                      <span class="form-field__error" v-else-if="$v.form.address.$dirty && !$v.form.address.validAddress">Invalid Ethereum address</span>
                  </div>
                  <div class="u-cell u-cell--small--auto send__amount-cell">
                      <label class="form-field form-field--row" :class="{'is-error': $v.form.amount.$error}">
                        <input class="form-field__input" type="text" inputmode="decimal" v-check-empty
                                  v-model.trim="form.amount"
                                  @blur="$v.form.amount.$touch()"
                        />
                          <span class="form-field__label">HUB amount</span>
                      </label>
                      <span class="form-field__error" v-if="$v.form.amount.$dirty && !$v.form.amount.required">Enter amount</span>
                  </div>
                  <div class="u-cell u-cell--small--auto">
                      <button class="button button--ghost-green send__submit-button" :class="{'is-disabled': $v.$invalid}">Show QR</button>
                  </div>
              </div>
          </form>

          <div class="card__content card__content--gray u-text-center send__qr-card" v-if="linkToBip">
              <div class="send__qr-wrap u-mb-10">
                  <QrcodeVue class="send__qr" :value="linkToBip" :size="240" level="L"></QrcodeVue>
              </div>
              Scan this QR with your Bip Wallet or
              <a class="link--default u-text-break" :href="linkToBip" target="_blank">follow the link</a>
          </div>
      </div>
  </div>
</template>
