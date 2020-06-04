<template >
  <div>
    <h3>Daterange</h3>
    <template v-if="tab === 'scan'">
      <div class="txt--center" v-if="!scanned">
        <a
          class="w100--s btn--primary scan-btn"
          href="#"
          v-on:click.prevent="scan"
        >Scan available data</a>
      </div>
      <div class="txt--center" v-if="scanned == 'fetching'">
        <p class="scan-btn">Scanning..</p>
      </div>
      <template v-if="scanned == true">
        <template v-if="ranges.length === 0">
          <p>
            <strong>Unable to find any local data, do you have local data available for"{{ config.watch.exchange }}:{{ config.watch.currency }}/{{ config.watch.asset }}"?</strong>
          </p>
        </template>
        <template v-else>
          <label class="wrapper" for="exchange">Run simulation over:</label>
          <form class="radio grd">
            <div class="grd-row m1" v-for="(range, i) in ranges" :key="i">
              <input class="grd-row-col-1-6" type="radio" :value="i" v-model="selectedRangeIndex" />
              <label class="grd-row-col-5-6" :for="i">{{ printRange(range) }}</label>
            </div>
          </form>
        </template>
        <p>
          <em>
            <a href="#" v-on:click.prevent="scan">rescan</a>
          </em>
        </p>
      </template>
      <p class="txt--center">
        <em>
          <a href="#" v-on:click.prevent="tab = 'manual'">Or manually set a daterange</a>
        </em>
      </p>
    </template>
    <template v-if="tab === 'manual'">
      <div>
        <label for="from">From:</label>
        <input v-model="from" />
      </div>
      <div>
        <label for="to">To:</label>
        <input v-model="to" />
      </div>
      <p class="txt--center"></p>
      <em>
        <a href="#" v-on:click.prevent="tab = 'scan'">Or scan for a daterange</a>
      </em>
    </template>
  </div>
</template>

<script>
import { axios } from '@/utils/request'
// global moment

export default {
  props: ['config'],
  data: () => {
    return {
      scanned: false, // 'fetching', true
      ranges: [],
      selectedRangeIndex: -1,
      tab: 'scan',

      from: '',
      to: ''
    }
  },
  methods: {
    scan: function() {
      this.scanned = 'fetching'
      this.selectedRangeIndex = -1
      axios({
        url: '/scan',
        method: 'post',
        data: this.config
      }).then(response => {
        this.scanned = true
        this.ranges = response
        this.selectedRangeIndex = 0
      })
    },
    printRange: function(range) {
      const fmt = mom => mom.format('YYYY-MM-DD HH:mm')
      const from = window.moment.unix(range.from)
      const to = window.moment.unix(range.to)
      const diff = window.moment.duration(to.diff(from)).humanize()
      return `${fmt(from)} to ${fmt(to)} (${diff})`
    },
    fmtTs: mom => window.moment.unix(mom).utc(),
    fmt: mom => mom.utc().format(),
    emitRange: function(range) {
      this.$emit('range', {
        from: this.fmtTs(range.from),
        to: this.fmtTs(range.to)
      })
    },
    emitManualEntry: function() {
      if (this.from.length < '4' || this.from.length < '4') {
        // this cannot possibly be a valid date
        return this.$emit('range', {})
      }

      const from = window.moment.utc(this.from)
      const to = window.moment.utc(this.to)

      if (from.isValid() && to.isValid()) {
        this.$emit('range', {
          from: this.fmt(from),
          to: this.fmt(to)
        })
      } else {
        this.$emit('range', {})
      }
    },
    reset: function() {
      this.scanned = false
      this.$emit('range', {})
    }
  },
  watch: {
    from: function() {
      this.emitManualEntry()
    },
    to: function() {
      this.emitManualEntry()
    },
    config: function() {
      this.reset()
    },
    tab: function() {
      this.reset()
    },
    selectedRangeIndex: function() {
      const selectedRange = this.ranges[this.selectedRangeIndex]
      if (selectedRange) this.emitRange(selectedRange)
    }
  }
}
</script>

<style>
.scan-btn {
  margin-top: 80px;
  margin-bottom: 30px;
}

.radio label {
  margin-top: 0;
}
</style>
