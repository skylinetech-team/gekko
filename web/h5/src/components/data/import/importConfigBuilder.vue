<template >
  <div class="grd contain">
    <div class="grd-row">
      <div class="grd-row-col-3-6 mx1">
        <h3>Market</h3>
        <market-picker v-on:market="updateMarketConfig" only-importable="true"></market-picker>
      </div>
      <div class="grd-row-col-3-6 mx1">
        <range-creator v-on:range="updateRange"></range-creator>
      </div>
    </div>
  </div>
</template>

<script>
import marketPicker from '../../global/configbuilder/marketpicker.vue'
import rangeCreator from '../../global/configbuilder/rangecreator.vue'

export default {
  data: () => {
    return {
      market: {},
      range: {}
    }
  },
  components: {
    marketPicker,
    rangeCreator
  },
  computed: {
    config: function() {
      const config = {}
      Object.assign(
        config,
        this.market,
        {
          importer: {
            daterange: this.range
          }
        },
        {
          candleWriter: { enabled: true }
        }
      )

      return config
    }
  },
  methods: {
    updateMarketConfig: function(mc) {
      this.market = mc
      this.emitConfig()
    },
    updateRange: function(range) {
      this.range = range
      this.emitConfig()
    },
    emitConfig: function() {
      this.$emit('config', this.config)
    }
  }
}
</script>

<style>
</style>
