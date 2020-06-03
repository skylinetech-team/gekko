<template lang='pug'>
  div
    h2.contain Backtest
    .hr
    config-builder(v-on:config='check')
    div(v-if='backtestable')
      .txt--center
        a.w100--s.my1.btn--primary(href='#', v-if='backtestState !== "fetching"', v-on:click.prevent='run') Backtest
        div(v-if='backtestState === "fetching"').scan-btn
          p Running backtest..
          spinner
    result(v-if='backtestResult && backtestState === "fetched"', :result='backtestResult')
</template>

<script>
import configBuilder from './backtestConfigBuilder.vue'
import result from './result/result.vue'
import { axios } from '@/utils/request'
import spinner from '../global/blockSpinner.vue'

export default {
  data: () => {
    return {
      backtestable: false,
      backtestState: 'idle',
      backtestResult: false,
      config: false
    }
  },
  methods: {
    check: function(config) {
      this.config = config

      if (!config.valid) {
        return (this.backtestable = false)
      }

      this.backtestable = true
    },
    run: function() {
      this.backtestState = 'fetching'
      axios({
        url: '/backtest',
        method: 'post',
        data: this.config
      }).then(response => {
        this.backtestState = 'fetched'
        this.backtestResult = response
      })
    }
  },
  components: {
    configBuilder,
    result,
    spinner
  }
}
</script>
