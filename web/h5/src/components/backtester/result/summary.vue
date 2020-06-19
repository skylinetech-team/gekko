<template >
  <div class="contain">
    <div class="grd-row summary">
      <div class="grd-row-col-3-6">
        <table class="p1">
          <tr>
            <th>start time</th>
            <td>{{ report.startTime }}</td>
          </tr>
          <tr>
            <th>end time</th>
            <td>{{ report.endTime }}</td>
          </tr>
          <tr>
            <th>timespan</th>
            <td>{{ report.timespan }}</td>
          </tr>
          <tr>
            <th>start price</th>
            <td>{{ round(report.startPrice) }} {{ report.currency }}</td>
          </tr>
          <tr>
            <th>end price</th>
            <td>{{ round(report.endPrice) }} {{ report.currency }}</td>
          </tr>
          <tr>
            <th>market</th>
            <td>{{ round(report.market) }}%</td>
          </tr>
        </table>
      </div>
      <paper-trade-summary :report="report"></paper-trade-summary>
    </div>
  </div>
</template>

<script>
import paperTradeSummary from '../../global/paperTradeSummary.vue'

export default {
  props: ['report'],
  components: {
    paperTradeSummary
  },
  methods: {
    round: n => (+n).toFixed(5)
  },
  computed: {
    profitClass: function() {
      if (this.report.relativeProfit > 0) {
        return 'profit'
      } else return 'loss'
    }
  }
}
</script>

<style>
.summary td {
  text-align: right;
}
</style>
