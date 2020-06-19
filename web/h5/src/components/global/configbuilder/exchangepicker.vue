<template >
  <div>
    <div class="mx1">
      <label class="wrapper" for="exchange">Exchange:</label>
      <div class="custom-select button">
        <select v-model="exchange">
          <option v-for="(market, e) in exchanges" :key="e">{{ e }}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  props: ['onlyTradable', 'onlyImportable'],
  data: () => {
    return {
      exchange: 'poloniex'
    }
  },
  created: function() {
    this.emitExchange()
  },
  computed: {
    exchanges: function() {
      const exchanges = Object.assign({}, this.$store.state.exchanges)

      if (_.isEmpty(exchanges)) return false

      if (this.onlyTradable) {
        _.each(exchanges, (e, name) => {
          if (!e.tradable) delete exchanges[name]
        })
      }

      if (this.onlyImportable) {
        _.each(exchanges, (e, name) => {
          if (!e.importable) delete exchanges[name]
        })
      }

      return exchanges
    }
  },

  watch: {
    exchanges: function() {
      this.emitExchange()
    },
    exchange: function() {
      this.emitExchange()
    }
  },

  methods: {
    emitExchange: function() {
      this.$emit('exchange', this.exchange)
    }
  }
}
</script>
</style>
