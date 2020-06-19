<template>
  <div class="contain my2">
    <div v-if="data && !data.done">
      <h2>Importing data..</h2>
      <div class="grd">
        <div class="grd-row">
          <div class="grd-row-col-2-6">
            <strong>Market:</strong>
          </div>
          <div class="grd-row-col-4-6">{{ data.watch.exchange }}</div>
        </div>
        <div class="grd-row">
          <div class="grd-row-col-2-6">
            <strong>Currency/Asset:</strong>
          </div>
          <div class="grd-row-col-4-6">{{ data.watch.currency }}/{{ data.watch.asset }}</div>
        </div>
      </div>
      <div class="grd">
        <div class="grd-row">
          <div class="grd-row-col-2-6">
            <strong>From:</strong>
          </div>
          <div class="grd-row-col-4-6">{{ fmt(from) }}</div>
        </div>
        <div class="grd-row">
          <div class="grd-row-col-2-6">
            <strong>To:</strong>
          </div>
          <div class="grd-row-col-4-6">{{ fmt(to) }}</div>
        </div>
        <div class="grd-row" v-if="initialized">
          <div class="grd-row-col-2-6">
            <strong>Imported data until:</strong>
          </div>
          <div class="grd-row-col-4-6">{{ fmt(latest) }}</div>
        </div>
        <div class="grd-row" v-if="initialized">
          <div class="grd-row-col-2-6">
            <strong>Remaining:</strong>
          </div>
          <div class="grd-row-col-4-6">{{ fromEnd }}</div>
        </div>
      </div>
      <spinner v-if="!initialized"></spinner>
      <div class="contain" v-if="initialized">
        <progress-bar :progress="progress"></progress-bar>
      </div>
      <p>
        <em>
          (you don't have to wait until the import is done,you can already start
          <router-link to="/backtest">backtesting</router-link>).
        </em>
      </p>
    </div>
    <div class="txt--center" v-if="data && data.done">
      <h2>Import done</h2>
      <p>
        Go and
        <router-link to="/backtest">backtest</router-link>with your new data!
      </p>
    </div>
    <div class="txt--center" v-if="!data">
      <h2>ERROR: Unknown import</h2>
      <p>
        <I>don't know this import..</I>
      </p>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import progressBar from '../../global/progressBar.vue'
import spinner from '../../global/blockSpinner.vue'

export default {
  components: {
    progressBar,
    spinner
  },
  computed: {
    data: function() {
      return _.find(this.$store.state.imports, { id: this.$route.params.id })
    },
    initialized: function() {
      if (this.data && this.latest.isValid()) {
        return true
      }
      return false
    },
    latest: function() {
      if (this.data) {
        return this.mom(this.data.latest)
      }
      return false
    },
    fromEndMs: function() {
      if (this.data) return this.to.diff(this.latest)
      return false
    },
    fromEnd: function() {
      if (!this.latest) {
        return 'LOADING'
      }

      return window.humanizeDuration(this.fromEndMs)
    },
    from: function() {
      if (this.data) return this.mom(this.data.from)
      return false
    },
    to: function() {
      if (this.data) return this.mom(this.data.to)
      return false
    },
    timespan: function() {
      if (this.data) return this.to.diff(this.from)
      return false
    },
    progress: function() {
      if (!this.data) return

      const current = this.timespan - this.fromEndMs
      return (100 * current) / this.timespan
    }
  },
  methods: {
    fmt: mom => {
      return mom.format('YYYY-MM-DD HH:mm:ss')
    },
    mom: str => window.moment.utc(str)
  }
}
</script>

<style>
</style>
