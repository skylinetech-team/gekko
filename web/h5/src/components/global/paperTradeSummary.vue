<template >
  <div class="grd-row-col-3-6">
    <table class="p1">
      <tr>
        <th>amount of trades</th>
        <td>{{ report.trades }}</td>
      </tr>
      <tr>
        <th>sharpe ratio</th>
        <td>{{ round2(report.sharpe) }}</td>
      </tr>
      <tr>
        <th>start balance</th>
        <td>{{ round(report.startBalance) }} {{ report.currency }}</td>
      </tr>
      <tr>
        <th>final balance</th>
        <td>{{ round(report.balance) }} {{ report.currency }}</td>
      </tr>
      <tr>
        <th>simulated profit</th>
      </tr>
    </table>
    <div class="big txt--right price" :class="profitClass">{{ round(report.relativeProfit) }}%</div>
  </div>
</template>

<script>
export default {
  props: ['report'],
  methods: {
    round2: n => (+n).toFixed(2),
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

.big {
  font-size: 1.3em;
  width: 80%;
}

.summary table {
  width: 80%;
}

.price.profit {
  color: #7fff00;
}

.price.loss {
  color: red;
}
</style>
