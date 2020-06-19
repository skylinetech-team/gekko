<template >
  <div class="grd">
    <div class="px1">
      <h3>Paper trader</h3>
      <a
        class="btn--primary"
        href="#"
        v-on:click.prevent="switchToggle"
        v-if="toggle === 'closed'"
      >Change paper trader settings</a>
      <template v-if="toggle === 'open'">
        <p>Settings:</p>
        <textarea class="params" v-model="rawPaperTraderParams"></textarea>
        <p
          class="bg--red p1"
          v-if="rawPaperTraderParamsError"
        >{{ rawPaperTraderParamsError.message }}</p>
      </template>
    </div>
  </div>
</template>

<script>
import { axios } from '@/utils/request'

export default {
  created: function() {
    axios({
      url: '/configPart/paperTrader',
      method: 'get'
    }).then(response => {
      this.rawPaperTraderParams = response.part
    })
  },
  data: () => {
    return {
      rawPaperTraderParams: '',
      rawPaperTraderParamsError: false,
      paperTraderParams: {},
      toggle: 'closed'
    }
  },
  watch: {
    rawPaperTraderParams: function() {
      this.emitConfig()
    }
  },
  methods: {
    switchToggle: function() {
      if (this.toggle === 'open') {
        this.toggle = 'closed'
      } else this.toggle = 'open'
    },
    emitConfig: function() {
      this.parseParams()
      this.$emit('settings', this.paperTraderParams)
    },
    parseParams: function() {
      try {
        this.paperTraderParams = window.toml.parse(this.rawPaperTraderParams)
        this.paperTraderParams.reportRoundtrips = true
        this.rawPaperTraderParamsError = false
      } catch (e) {
        this.rawPaperTraderParamsError = e
        this.paperTraderParams = {}
      }
    }
  }
}
</script>
<style>
.align .custom-select select {
  padding: 0.4em 1.2em 0.3em 0.8em;
}

.label-like {
  display: block;
  font-size: 0.9em;
  color: #777;
}

.align {
  padding-left: 1em;
}
</style>
