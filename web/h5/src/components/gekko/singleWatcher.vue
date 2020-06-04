<template >
  <div class="my2">
    <div class="contain" v-if="!data">
      <h1>Unknown Watcher</h1>
      <p>Gekko doesn't know what whatcher this is...</p>
    </div>
    <div v-if="data">
      <h2 class="contain">Market Watcher</h2>
      <div class="grd contain">
        <h3>Market</h3>
        <div class="grd-row">
          <div class="grd-row-col-2-6">Exchange</div>
          <div class="grd-row-col-4-6">{{ data.watch.exchange }}</div>
        </div>
        <div class="grd-row">
          <div class="grd-row-col-2-6">Currency</div>
          <div class="grd-row-col-4-6">{{ data.watch.currency }}</div>
        </div>
        <div class="grd-row">
          <div class="grd-row-col-2-6">Asset</div>
          <div class="grd-row-col-4-6">{{ data.watch.asset }}</div>
        </div>
        <h3>Statistics</h3>
        <spinner v-if="isLoading"></spinner>
        <template v-if="!isLoading">
          <div class="grd-row" v-if="data.firstCandle">
            <div class="grd-row-col-2-6">Watching since</div>
            <div class="grd-row-col-4-6">{{ fmt(data.firstCandle.start) }}</div>
          </div>
          <div class="grd-row" v-if="data.lastCandle">
            <div class="grd-row-col-2-6">Received data until</div>
            <div class="grd-row-col-4-6">{{ fmt(data.lastCandle.start) }}</div>
          </div>
          <div class="grd-row" v-if="data.lastCandle && data.firstCandle">
            <div class="grd-row-col-2-6">Data spanning</div>
            <div
              class="grd-row-col-4-6"
            >{{ humanizeDuration(moment(data.lastCandle.start).diff(moment(data.firstCandle.start))) }}</div>
          </div>
        </template>
      </div>
      <template v-if="!isLoading">
        <h3 class="contain">Market graph</h3>
        <spinner v-if="candleFetch === 'fetching'"></spinner>
        <template v-if="candles.length">
          <chart :data="chartData" :height="500"></chart>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { axios } from '@/utils/request'
import spinner from '../global/blockSpinner.vue'
import chart from '../backtester/result/chartWrapper.vue'
// global moment

export default {
  created: function() {
    if (!this.isLoading) {
      this.getCandles()
    }
  },
  components: {
    spinner,
    chart
  },
  data: () => {
    return {
      candleFetch: 'idle',
      candles: []
    }
  },
  computed: {
    watchers: function() {
      return this.$store.state.watchers
    },
    data: function() {
      return _.find(this.watchers, { id: this.$route.params.id })
    },
    chartData: function() {
      return {
        candles: this.candles,
        trades: []
      }
    },
    isLoading: function() {
      if (!this.data) return true
      if (!_.isObject(this.data.firstCandle)) return true
      if (!_.isObject(this.data.lastCandle)) return true

      return false
    }
  },
  watch: {
    'data.lastCandle.start': function() {
      this.candleFetch = 'dirty'
    },
    data: function(val, prev) {
      const complete = val && val.firstCandle && val.lastCandle

      if (!complete) return

      if (this.candleFetch !== 'fetched') this.getCandles()
    }
  },
  methods: {
    humanizeDuration: n => window.humanizeDuration(n),
    moment: mom => window.moment.utc(mom),
    fmt: mom => window.moment.utc(mom).format('YYYY-MM-DD HH:mm'),
    getCandles: function() {
      this.candleFetch = 'fetching'

      // up unto we have data
      let to = window.moment.utc(this.data.lastCandle.start).unix()

      // max 7 days of data
      let from = Math.max(
        window.moment.utc(this.data.firstCandle.start).unix(),
        window.moment
          .utc(to)
          .subtract(7, 'days')
          .unix()
      )

      // TODO...
      const diff = to - from
      let candleSize = 60
      if (diff < 60 * 60 * 24) {
        if (diff < 60 * 60 * 12) {
          // a day
          // 3 hours
          candleSize = 1
        } else candleSize = 5
      }

      from = window.moment
        .unix(from)
        .utc()
        .format()
      to = window.moment
        .unix(to)
        .utc()
        .format()

      const config = {
        watch: this.data.watch,
        daterange: {
          to,
          from
        },
        // hourly candles
        candleSize
      }
      axios({
        url: '/getCandles',
        method: 'post',
        data: config
      }).then(res => {
        this.candleFetch = 'fetched'
        this.candles = res.map(c => {
          c.start = window.moment
            .unix(c.start)
            .utc()
            .format()
          return c
        })
      })
    }
  }
}
</script>

<style>
</style>
