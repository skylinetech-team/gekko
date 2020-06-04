<template>
  <div>
    <div class="hr contain"></div>
    <div class="contain">
      <h3>Backtest result</h3>
    </div>
    <result-summary :report="result.performanceReport"></result-summary>
    <div class="hr contain"></div>
    <chart :data="candles" height="500"></chart>
    <div class="hr contain"></div>
    <roundtrip-table :roundtrips="result.roundtrips"></roundtrip-table>
  </div>
</template>

<script>
import resultSummary from './summary.vue'
import chart from './chartWrapper.vue'
import roundtripTable from './roundtripTable.vue'

export default {
  props: ['result'],
  data: () => {
    return {}
  },
  methods: {},
  components: {
    roundtripTable,
    resultSummary,
    chart
  },
  computed: {
    candles: function() {
      return {
        candles: this.result.stratCandles,
        trades: this.result.trades
      }
    }
  }
}
</script>

<style>
</style>
