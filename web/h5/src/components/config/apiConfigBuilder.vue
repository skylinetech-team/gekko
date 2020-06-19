<template>
  <div class="grd contain">
    <h3>Add an API key</h3>
    <p>Make sure that the API key has the permissions to create and cancel orders and view balances.</p>
    <div class="grd-row">
      <div class="grd-row-col-3-6 mx1">
        <h3>Exchange</h3>
        <exchange-picker v-on:exchange="updateExchange" only-tradable="true"></exchange-picker>
      </div>
      <div class="grd-row-col-3-6 mx1">
        <h3>Credentials</h3>
        <template v-for="(cred,index) in requires">
          <label :key="index">{{ cred }}</label>
          <input v-model="credentials[cred]" :key="index+'a'" />
        </template>
      </div>
    </div>
    <div class="txt--center">
      <a class="w100--s my1 btn--primary" href="#" v-on:click.prevent="upload">Add</a>
    </div>
  </div>
</template>

<script>
import exchangePicker from '../global/configbuilder/exchangepicker.vue'

import { axios } from '@/utils/request'

export default {
  data: () => {
    return {
      exchange: false,
      credentials: {}
    }
  },
  components: {
    exchangePicker
  },
  computed: {
    apiKeySets: function() {
      return this.$store.state.apiKeys
    },
    exchanges: function() {
      return this.$store.state.exchanges
    },
    requires: function() {
      if (!this.exchanges) return []

      if (!this.exchange) return []

      return this.exchanges[this.exchange].requires
    },
    config: function() {
      const config = {
        exchange: this.exchange,
        values: this.credentials
      }

      return config
    }
  },
  watch: {
    credentials: function() {
      this.emitConfig()
    }
  },
  methods: {
    updateExchange: function(exchange) {
      this.credentials = {}
      this.exchange = exchange
      this.emitConfig()
    },
    emitConfig: function() {
      this.$emit('config', this.config)
    },
    upload: function() {
      const exchange = this.config.exchange

      if (
        this.exchanges &&
        this.apiKeySets.includes(exchange) &&
        !confirm(`You already have API keys for ${exchange} defined, do you want to overwrite them?`)
      ) {
        return
      }
      axios({
        url: '/addApiKey',
        method: 'post',
        data: this.config
      }).then(
        response => {
          this.credentials = {}
        },
        error => alert(error)
      )
    }
  }
}
</script>

<style>
</style>
