<template >
  <div>
    <h2 class="contain">Backtest</h2>
    <div class="hr"></div>
    <config-builder v-on:config="check"></config-builder>
    <div v-if="backtestable">
      <div class="txt--center">
        <a
          class="w100--s my1 btn--primary"
          href="#"
          v-if="backtestState !== 'fetching'"
          v-on:click.prevent="run"
        >Backtest</a>
        <div class="scan-btn" v-if="backtestState === 'fetching'">
          <p>Running backtest..</p>
          <spinner></spinner>
        </div>
      </div>
    </div>
    <result v-if="backtestResult && backtestState === 'fetched'" :result="backtestResult"></result>
  </div>
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
