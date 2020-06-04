<template>
  <div class="contain my2">
    <div class="text" v-html="intro"></div>
    <div class="hr"></div>
    <h3>Currently running imports</h3>
    <p v-if="imports.length === 0">You currently don't have any imports running.</p>
    <ul v-if="imports.length">
      <li v-for="_import in imports" :key="_import">
        <router-link
          :to="'/data/importer/import/' + _import.id"
        >{{ _import.watch.exchange }}:{{ _import.watch.currency }}/{{ _import.watch.asset }}</router-link>
      </li>
    </ul>
    <div class="hr"></div>
    <h3>Start a new import</h3>
    <import-config-builder v-on:config="updateConfig"></import-config-builder>
    <div class="hr"></div>
    <div class="txt--center">
      <a class="w100--s my1 btn--primary" href="#" v-on:click.prevent="run">Import</a>
    </div>
  </div>
</template>

<script>
import spinner from '../../global/blockSpinner.vue'
import importConfigBuilder from './importConfigBuilder.vue'
import { axios } from '@/utils/request'
const intro = `
The importer can download historical market data directly from the exchange.
`

export default {
  components: {
    importConfigBuilder,
    spinner
  },
  data: () => {
    return {
      intro,
      config: {}
    }
  },
  computed: {
    imports: function() {
      return this.$store.state.imports
    }
  },
  methods: {
    daysApart: function(range) {
      const to = window.moment(range.to)
      const from = window.moment(range.from)

      return to.diff(from, 'days')
    },
    updateConfig: function(config) {
      this.config = config
    },
    run: function() {
      const daysApart = this.daysApart(this.config.importer.daterange)

      if (daysApart < 1) return alert('You can only import at least one day of data..')

      const exchange = this.$store.state.exchanges[this.config.watch.exchange]
      if ('exchangeMaxHistoryAge' in exchange) {
        if (
          window.moment(this.config.importer.daterange.from) <
          window.moment().subtract(exchange.exchangeMaxHistoryAge, 'days')
        ) {
          return alert(
            'Your date from is too old for ' +
              this.config.watch.exchange +
              '. It supports only the last ' +
              exchange.exchangeMaxHistoryAge +
              ' days..'
          )
        }
      }
      axios({
        url: '/import',
        method: 'post',
        data: this.config
      }).then(
        response => {
          this.$store.commit('addImport', response)
          this.$router.push({
            path: `/data/importer/import/${response.id}`
          })
        },
        error => alert(error)
      )
    }
  }
}
</script>

<style>
</style>
