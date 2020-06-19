<template>
  <div>
    <h3>Select a dataset</h3>
    <div class="txt--center my2" v-if="datasetScanstate === 'idle'">
      <a
        class="w100--s btn--primary scan-btn"
        href="#"
        v-on:click.prevent="scan"
      >Scan available data</a>
    </div>
    <div class="txt--center my2" v-if="datasetScanstate === 'scanning'">
      <spinner></spinner>
    </div>
    <div class="my2" v-if="datasetScanstate === 'scanned'">
      <div v-if="datasets.length != 0">
        <table class="full">
          <thead>
            <tr>
              <th></th>
              <th>exchange</th>
              <th>currency</th>
              <th>asset</th>
              <th>from</th>
              <th>to</th>
              <th>duration</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(set, i) in datasets" :key="i">
              <td class="radio">
                <input type="radio" name="dataset" :value="i" v-model="setIndex" v-bind:id="set.id" />
              </td>
              <td>
                <label v-bind:for="set.id">{{ set.exchange }}</label>
              </td>
              <td>
                <label v-bind:for="set.id">{{ set.currency }}</label>
              </td>
              <td>
                <label v-bind:for="set.id">{{ set.asset }}</label>
              </td>
              <td>
                <label v-bind:for="set.id">{{ fmt(set.from) }}</label>
              </td>
              <td>
                <label v-bind:for="set.id">{{ fmt(set.to) }}</label>
              </td>
              <td>
                <label v-bind:for="set.id">{{ humanizeDuration(set.to.diff(set.from)) }}</label>
              </td>
            </tr>
          </tbody>
        </table>
        <a
          class="btn--primary"
          href="#"
          v-on:click.prevent="openRange"
          v-if="!rangeVisible"
        >Adjust range</a>
        <template v-if="rangeVisible">
          <div>
            <label for="customFrom">From:</label>
            <input v-model="customFrom" />
          </div>
          <div>
            <label for="customTo">To:</label>
            <input v-model="customTo" />
          </div>
        </template>
      </div>
      <em v-else>
        No Data found
        <a href="#/data/importer">Lets add some</a>
      </em>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

import spinner from '../../global/blockSpinner.vue'
import dataset from '../../global/mixins/dataset'

export default {
  components: {
    spinner
  },
  data: () => {
    return {
      setIndex: -1,
      customTo: false,
      customFrom: false,
      rangeVisible: false,
      set: false
    }
  },
  mixins: [dataset],
  methods: {
    humanizeDuration: n => {
      return window.humanizeDuration(n, { largest: 4 })
    },
    fmt: mom => mom.utc().format('YYYY-MM-DD HH:mm'),
    openRange: function() {
      if (this.setIndex === -1) return alert('Select a dataset to adjust range')

      this.updateCustomRange()

      this.rangeVisible = true
    },
    updateCustomRange: function() {
      this.customTo = this.fmt(this.set.to)
      this.customFrom = this.fmt(this.set.from)
    },
    emitSet: function(val) {
      if (!val) return

      let set

      if (!this.customTo) set = val
      else {
        set = Vue.util.extend({}, val)
        set.to = window.moment.utc(this.customTo, 'YYYY-MM-DD HH:mm').format()
        set.from = window.moment.utc(this.customFrom, 'YYYY-MM-DD HH:mm').format()
      }

      this.$emit('dataset', set)
    }
  },
  watch: {
    setIndex: function() {
      this.set = this.datasets[this.setIndex]

      this.updateCustomRange()

      this.emitSet(this.set)
    },

    customTo: function() {
      this.emitSet(this.set)
    },
    customFrom: function() {
      this.emitSet(this.set)
    }
  }
}
</script>
<style>
td.radio {
  width: 45px;
}
td label {
  display: inline;
  font-size: 1em;
}
</style>
