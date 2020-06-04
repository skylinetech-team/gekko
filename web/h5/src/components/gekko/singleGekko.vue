<template >
  <div class="my2">
    <div class="contain" v-if="!data">
      <h1>Unknown Gekko instance</h1>
      <p>Gekko doesn't know what gekko this is...</p>
    </div>
    <div v-if="data">
      <h2 class="contain">Gekko {{ type }}</h2>
      <div
        class="contain brdr--mid-gray p1 bg--orange"
        v-if="isArchived"
      >This is an archived Gekko, it is currently not running anymore.</div>
      <div
        class="contain brdr--mid-gray p1 bg--orange"
        v-if="data.errorMessage"
      >This is Gekko crashed with the following error: {{ data.errorMessage }}</div>
      <div class="grd contain">
        <div class="grd-row">
          <div class="grd-row-col-3-6">
            <h3>Market</h3>
            <div class="grd-row">
              <div class="grd-row-col-3-6">Exchange</div>
              <div class="grd-row-col-3-6">{{ config.watch.exchange }}</div>
            </div>
            <div class="grd-row">
              <div class="grd-row-col-3-6">Currency</div>
              <div class="grd-row-col-3-6">{{ config.watch.currency }}</div>
            </div>
            <div class="grd-row">
              <div class="grd-row-col-3-6">Asset</div>
              <div class="grd-row-col-3-6">{{ config.watch.asset }}</div>
            </div>
            <div class="grd-row">
              <div class="grd-row-col-3-6">Type</div>
              <div class="grd-row-col-3-6">{{ type }}</div>
            </div>
          </div>
          <div class="grd-row-col-3-6">
            <h3>Runtime</h3>
            <spinner v-if="isLoading"></spinner>
            <template v-if="!isLoading">
              <div class="grd-row" v-if="initialEvents.candle">
                <div class="grd-row-col-2-6">Watching since</div>
                <div class="grd-row-col-4-6">{{ fmt(initialEvents.candle.start) }}</div>
              </div>
              <div class="grd-row" v-if="latestEvents.candle">
                <div class="grd-row-col-2-6">Received data until</div>
                <div class="grd-row-col-4-6">{{ fmt(latestEvents.candle.start) }}</div>
              </div>
              <div class="grd-row" v-if="latestEvents.candle">
                <div class="grd-row-col-2-6">Data spanning</div>
                <div
                  class="grd-row-col-4-6"
                >{{ humanizeDuration(moment(latestEvents.candle.start).diff(moment(initialEvents.candle.start))) }}</div>
              </div>
              <template v-if="isStratrunner">
                <div class="grd-row">
                  <div class="grd-row-col-2-6">Amount of trades</div>
                  <div class="grd-row-col-4-6">{{ trades.length }}</div>
                </div>
                <div class="grd-row">
                  <div class="grd-row-col-2-6">Candle size</div>
                  <div class="grd-row-col-4-6">{{ config.tradingAdvisor.candleSize }}</div>
                </div>
                <div class="grd-row">
                  <div class="grd-row-col-2-6">History size</div>
                  <div class="grd-row-col-4-6">{{ config.tradingAdvisor.historySize }}</div>
                </div>
              </template>
            </template>
          </div>
        </div>
        <div class="contain brdr--mid-gray p1 bg--orange" v-if="warmupRemaining">
          This stratrunner is still warming up for the next
          <i>{{ warmupRemaining.replace(',', ' and ') }}</i>, it will not trade until it is warmed up.
        </div>
        <div class="grd-row" v-if="isStratrunner">
          <div class="grd-row-col-3-6">
            <h3>Strategy</h3>
            <div class="grd-row">
              <div class="grd-row-col-3-6">Name</div>
              <div class="grd-row-col-3-6">
                <strong>{{ stratName }}</strong>
              </div>
            </div>Parameters
            <pre>{{ stratParams }}</pre>
          </div>
          <div class="grd-row-col-3-6">
            <h3>Profit report</h3>
            <template v-if="!report">
              <p>
                <em v-if="isArchived">This Gekko never executed a trade..</em>
                <em v-if="!isArchived">Waiting for at least one trade..</em>
              </p>
            </template>
            <template v-if="report">
              <div class="grd-row">
                <div class="grd-row-col-3-6">Start balance</div>
                <div class="grd-row-col-3-6">{{ round(report.startBalance) }}</div>
              </div>
              <div class="grd-row">
                <div class="grd-row-col-3-6">Current balance</div>
                <div class="grd-row-col-3-6">{{ round(report.balance) }}</div>
              </div>
              <div class="grd-row">
                <div class="grd-row-col-3-6">Market</div>
                <div
                  class="grd-row-col-3-6"
                >{{round(report.market / 100 * report.startPrice)}} {{ config.watch.currency }} ({{ round(report.market) }} %)</div>
              </div>
              <div class="grd-row">
                <div class="grd-row-col-3-6">Profit</div>
                <div
                  class="grd-row-col-3-6"
                >{{ round(report.profit) }} {{ config.watch.currency }} ({{ round(report.relativeProfit) }} %)</div>
              </div>
              <div class="grd-row">
                <div class="grd-row-col-3-6">Alpha</div>
                <div class="grd-row-col-3-6">{{ round(report.alpha) }} {{ config.watch.currency }}</div>
              </div>
            </template>
          </div>
        </div>
        <p v-if="isStratrunner && !watcher && !isArchived">
          WARNING: stale gekko, not attached to a watcher, please report
          <a
            href="https://github.com/askmike/gekko/issues"
          >here</a>.
        </p>
        <p v-if="!isArchived">
          <a class="w100--s my1 btn--red" v-on:click="stopGekko">Stop Gekko</a>
        </p>
        <p v-if="isArchived">
          <a class="w100--s my1 btn--red" v-on:click="deleteGekko">Delete Gekko</a>
        </p>
        <p v-if="isStratrunner && watcher && !isArchived">
          <em>
            This gekko gets market data from
            <router-link :to="'/live-gekkos/' + watcher.id">this market watcher</router-link>
          </em>.
        </p>
      </div>
      <template v-if="!isLoading">
        <h3 class="contain">Market graph</h3>
        <spinner v-if="candleFetch === 'fetching'"></spinner>
        <template v-if="candleFetch === 'fetched'">
          <chart :data="chartData" :height="300"></chart>
        </template>
        <roundtrips v-if="isStratrunner" :roundtrips="roundtrips"></roundtrips>
      </template>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import _ from 'lodash'
import { axios } from '@/utils/request'
import spinner from '../global/blockSpinner.vue'
import chart from '../backtester/result/chartWrapper.vue'
import roundtrips from '../backtester/result/roundtripTable.vue'
import paperTradeSummary from '../global/paperTradeSummary.vue'
// global moment

export default {
  created: function() {
    if (!this.isLoading) {
      this.getCandles()
    }
  },
  components: {
    spinner,
    chart,
    paperTradeSummary,
    roundtrips
  },
  data: () => {
    return {
      candleFetch: 'idle',
      candles: false
    }
  },
  computed: {
    id: function() {
      return this.$route.params.id
    },
    gekkos: function() {
      return this.$store.state.gekkos
    },
    archivedGekkos: function() {
      return this.$store.state.archivedGekkos
    },
    data: function() {
      if (!this.gekkos) return false
      if (_.has(this.gekkos, this.id)) return this.gekkos[this.id]
      if (_.has(this.archivedGekkos, this.id)) return this.archivedGekkos[this.id]

      return false
    },
    config: function() {
      return _.get(this, 'data.config')
    },
    latestEvents: function() {
      return _.get(this, 'data.events.latest')
    },
    initialEvents: function() {
      return _.get(this, 'data.events.initial')
    },
    trades: function() {
      return _.get(this, 'data.events.tradeCompleted') || []
    },
    roundtrips: function() {
      return _.get(this, 'data.events.roundtrip') || []
    },
    isLive: function() {
      return _.has(this.gekkos, this.id)
    },
    type: function() {
      return this.data.logType
    },
    isStratrunner: function() {
      return this.type !== 'watcher'
    },
    isArchived: function() {
      return this.data.stopped
    },
    warmupRemaining: function() {
      if (!this.isStratrunner) {
        return false
      }

      if (this.isArchived) {
        return false
      }

      if (this.initialEvents.stratWarmupCompleted) {
        return false
      }

      if (!this.initialEvents.candle) {
        return false
      }

      const historySize = _.get(this.config, 'tradingAdvisor.historySize')

      if (!historySize) {
        return false
      }

      const warmupTime = _.get(this.config, 'tradingAdvisor.candleSize') * historySize

      return window.humanizeDuration(
        window
          .moment(this.initialEvents.candle.start)
          .add(warmupTime, 'm')
          .diff(window.moment()),
        { largest: 2 }
      )
    },
    chartData: function() {
      return {
        candles: this.candles,
        trades: this.trades
      }
    },
    report: function() {
      return _.get(this.latestEvents, 'performanceReport')
    },
    stratName: function() {
      if (this.data) return this.data.config.tradingAdvisor.method
      return false
    },
    stratParams: function() {
      if (!this.data) return 'Loading...'

      const stratParams = Vue.util.extend({}, this.data.config[this.stratName])
      delete stratParams.__empty

      if (_.isEmpty(stratParams)) return 'No parameters'

      return JSON.stringify(stratParams, null, 4)
    },
    isLoading: function() {
      if (!this.data) return true
      if (!_.get(this.data, 'events.initial.candle')) return true
      if (!_.get(this.data, 'events.latest.candle')) return true

      return false
    },
    watcher: function() {
      if (!this.isStratrunner) {
        return false
      }

      const watch = Vue.util.extend({}, this.data.config.watch)
      return _.find(this.gekkos, g => {
        if (g.id === this.id) return false

        return _.isEqual(watch, g.config.watch)
      })
    },
    hasLeechers: function() {
      if (this.isStratrunner) {
        return false
      }

      const watch = Vue.util.extend({}, this.data.config.watch)

      return _.find(this.gekkos, g => {
        if (g.id === this.id) return false

        return _.isEqual(watch, g.config.watch)
      })
    }
  },
  watch: {
    'data.events.latest.candle.start': function() {
      setTimeout(this.getCandles, _.random(100, 2000))
    }
  },
  methods: {
    round: n => (+n).toFixed(5),
    humanizeDuration: (n, x) => window.humanizeDuration(n, x),
    moment: mom => window.moment.utc(mom),
    fmt: mom => window.moment.utc(mom).format('YYYY-MM-DD HH:mm'),
    getCandles: function() {
      if (this.isLoading) {
        return
      }

      if (this.candleFetch === 'fetching') {
        return
      }

      this.candleFetch = 'fetching'

      const to = this.data.events.latest.candle.start
      const from = this.data.events.initial.candle.start
      let candleSize = 1

      if (this.type !== 'watcher') {
        candleSize = this.data.config.tradingAdvisor.candleSize
      }

      const config = {
        watch: this.data.config.watch,
        daterange: {
          to,
          from
        },
        candleSize
      }

      // We timeout because of 2 reasons:
      // - In case we get a batch of candles we only fetch once
      // - This way we give the db (mostly sqlite) some time to write
      //   the result before we query it.
      setTimeout(() => {
        axios({
          url: '/getCandles',
          method: 'post',
          data: config
        }).then(res => {
          this.candleFetch = 'fetched'
          if (!res || res.error || !_.isArray(res)) return console.log(res)

          this.candles = res.map(c => {
            c.start = window.moment
              .unix(c.start)
              .utc()
              .format()
            return c
          })
        })
      }, _.random(150, 2500))
    },
    stopGekko: function() {
      if (this.hasLeechers) {
        return alert('This Gekko is fetching market data for multiple stratrunners, stop these first.')
      }

      if (!confirm('Are you sure you want to stop this Gekko?')) {
        return
      }
      axios({
        url: '/stopGekko',
        method: 'post',
        data: { id: this.data.id }
      }).then(res => {
        console.log('stopped gekko')
      })
    },
    deleteGekko: function() {
      if (!this.isArchived) {
        return alert('This Gekko is still running, stop it first!')
      }

      if (!confirm('Are you sure you want to delete this Gekko?')) {
        return
      }
      axios({
        url: '/deleteGekko',
        method: 'post',
        data: { id: this.data.id }
      }).then(res => {
        this.$router.push({
          path: `/live-gekkos/`
        })
      })
    }
  }
}
</script>

<style>
</style>
