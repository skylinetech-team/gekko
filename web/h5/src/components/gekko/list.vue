<template >
  <div class="contain py2">
    <h3>Market watchers</h3>
    <div class="text" v-if="!watchers.length">
      <p>You don't have any market watchers.</p>
    </div>
    <table class="full clickable" v-if="watchers.length">
      <thead>
        <tr>
          <th>exchange</th>
          <th>currency</th>
          <th>asset</th>
          <th>status</th>
          <th>started at</th>
          <th>last update</th>
          <th>duration</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="clickable"
          v-for="gekko in watchers"
          :key="gekko"
          v-on:click="$router.push({path: `/live-gekkos/${gekko.id}`})"
        >
          <td>{{ gekko.config.watch.exchange }}</td>
          <td>{{ gekko.config.watch.currency }}</td>
          <td>{{ gekko.config.watch.asset }}</td>
          <td>{{ status(gekko) }}</td>
          <td>
            <template
              v-if="gekko.events.initial.candle"
            >{{ fmt(gekko.events.initial.candle.start) }}</template>
          </td>
          <td>
            <template v-if="gekko.events.latest.candle">{{ fmt(gekko.events.latest.candle.start) }}</template>
          </td>
          <td>
            <template
              v-if="gekko.events.initial.candle && gekko.events.latest.candle"
            >{{ timespan(gekko.events.latest.candle.start, gekko.events.initial.candle.start) }}</template>
          </td>
        </tr>
      </tbody>
    </table>
    <h3>Strat runners</h3>
    <div class="text" v-if="!stratrunners.length">
      <p>You don't have any stratrunners.</p>
    </div>
    <table class="full" v-if="stratrunners.length">
      <thead>
        <tr>
          <th>exchange</th>
          <th>currency</th>
          <th>asset</th>
          <th>status</th>
          <th>duration</th>
          <th>strategy</th>
          <th>PnL</th>
          <th>type</th>
          <th>trades</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="clickable"
          v-for="(gekko,index) in stratrunners"
          :key="index"
          v-on:click="$router.push({path: `/live-gekkos/${gekko.id}`})"
        >
          <td>{{ gekko.config.watch.exchange }}</td>
          <td>{{ gekko.config.watch.currency }}</td>
          <td>{{ gekko.config.watch.asset }}</td>
          <td>{{ status(gekko) }}</td>
          <td>
            <template
              v-if="gekko.events.initial.candle && gekko.events.latest.candle"
            >{{ timespan(gekko.events.latest.candle.start, gekko.events.initial.candle.start) }}</template>
          </td>
          <td>{{ gekko.config.tradingAdvisor.method }}</td>
          <td>
            <template v-if="!report(gekko)">0</template>
            <template
              v-if="report(gekko)"
            >{{ round(report(gekko).profit) }} {{ report(gekko).currency }}</template>
          </td>
          <td>{{ gekko.logType }}</td>
          <td>
            <template v-if="!gekko.events.tradeCompleted">0</template>
            <template v-if="gekko.events.tradeCompleted">{{ gekko.events.tradeCompleted.length }}</template>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="hr"></div>
    <h2>Start a new live Gekko</h2>
    <router-link class="btn--primary" to="/live-gekkos/new">Start a new live Gekko!</router-link>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  created: function() {
    this.timer = setInterval(() => {
      this.now = window.moment()
    }, 1000)
  },
  destroyed: function() {
    clearTimeout(this.timer)
  },
  data: () => {
    return {
      timer: false,
      now: window.moment()
    }
  },
  computed: {
    stratrunners: function() {
      return _.values(this.$store.state.gekkos)
        .concat(_.values(this.$store.state.archivedGekkos))
        .filter(g => {
          if (g.logType === 'papertrader') return true

          if (g.logType === 'tradebot') return true

          return false
        })
    },
    watchers: function() {
      return _.values(this.$store.state.gekkos)
        .concat(_.values(this.$store.state.archivedGekkos))
        .filter(g => g.logType === 'watcher')
    }
  },
  methods: {
    humanizeDuration: n => window.humanizeDuration(n),
    moment: mom => window.moment.utc(mom),
    fmt: mom => window.moment.utc(mom).format('YYYY-MM-DD HH:mm'),
    round: n => (+n).toFixed(3),
    timespan: function(a, b) {
      return this.humanizeDuration(this.moment(a).diff(this.moment(b)))
    },
    status: state => {
      if (state.errored) return 'errored'
      if (state.stopped) return 'stopped'
      if (state.active) return 'running'

      console.log('unknown state:', state)
    },
    report: state => {
      return _.get(state, 'events.latest.performanceReport')
    }
  }
}
</script>

<style>
table.clickable {
  border-collapse: separate;
}

tr.clickable td:nth-child(1) {
  padding-left: 5px;
}

tr.clickable {
  cursor: pointer;
}
tr.clickable:hover {
  background: rgba(216, 216, 216, 0.99);
}
</style>
