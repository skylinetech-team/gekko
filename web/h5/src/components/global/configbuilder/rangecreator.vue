<template lang='pug'>
div
  h3 Daterange
  div
    label(for='from') From
    input(v-model='from')
  div
    label(for='to') To
    input(v-model='to')
</template>

<script>
// global moment

export default {
  data: function() {
    return {
      from: '',
      to: ''
    }
  },
  created: function() {
    const now = window.moment().startOf('minute')
    const then = now.clone().subtract(3, 'months')

    this.to = this.fmt(now)
    this.from = this.fmt(then)
    this.emitRange()
  },
  methods: {
    fmtTs: mom => window.moment.unix(mom).utc(),
    fmt: mom => mom.utc().format('YYYY-MM-DD HH:mm'),
    emitRange: function() {
      this.$emit('range', {
        from: this.fmtTs(this.from),
        to: this.fmtTs(this.to)
      })
    },
    emitManualEntry: function() {
      if (this.from.length < '4' || this.from.length < '4') {
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
      this.scanned = false
    },
    tab: function() {
      this.scanned = false
      this.$emit('range', {})
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
