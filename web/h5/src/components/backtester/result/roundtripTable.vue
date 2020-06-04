<template >
  <div class="contain roundtrips">
    <h2>Roundtrips</h2>
    <table v-if="roundtrips.length">
      <thead>
        <tr>
          <th>Entry at (UTC)</th>
          <th>Exit at (UTC)</th>
          <th>Exposure</th>
          <th>Entry balance</th>
          <th>Exit balance</th>
          <th>P&L</th>
          <th>Profit</th>
        </tr>
        <tr v-for="rt in roundtrips" :key="rt">
          <td>{{ fmt(rt.entryAt) }}</td>
          <td>{{ fmt(rt.exitAt) }}</td>
          <td>{{ diff(rt.duration) }}</td>
          <td>{{ round(rt.entryBalance) }}</td>
          <td>{{ round(rt.exitBalance) }}</td>
          <template v-if="Math.sign(rt.pnl)===-1">
            <td class="loss">{{ Math.sign(rt.pnl)*rt.pnl.toFixed(2) }}</td>
            <td class="loss">{{ rt.profit.toFixed(2) }}%</td>
          </template>
          <template v-else>
            <td class="profit">{{ rt.pnl.toFixed(2) }}</td>
            <td class="profit">{{ rt.profit.toFixed(2) }}%</td>
          </template>
        </tr>
      </thead>
    </table>
    <div v-if="!roundtrips.length">
      <p>Not enough data to display</p>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  props: ['roundtrips'],
  data: () => {
    return {}
  },
  methods: {
    diff: n => window.moment.duration(n).humanize(),
    humanizeDuration: n => window.humanizeDuration(n),
    fmt: date => {
      // roundtrips coming out of a backtest
      // are unix timestamp, live roundtrips
      // are date strings.
      // TODO: normalize

      let mom

      if (_.isNumber(date)) {
        mom = window.moment.unix(date)
      } else {
        mom = window.moment(date).utc()
      }

      return mom.utc().format('YYYY-MM-DD HH:mm')
    },
    round: n => (+n).toFixed(3)
  }
}
</script>

<style>
.roundtrips {
  margin-top: 50px;
  margin-bottom: 50px;
}

.roundtrips table {
  width: 100%;
}

.roundtrips table th,
.roundtrips table td {
  border: 1px solid #c6cbd1;
  padding: 8px 12px;
}

.roundtrips table td.loss {
  color: red;
  text-align: right;
}
.roundtrips table td.profit {
  color: green;
  text-align: right;
}

.roundtrips table tr:nth-child(2n) {
  background-color: #f6f8fa;
}
</style>
