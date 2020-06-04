<template>
  <div class="contain">
    <h2>Config</h2>
    <div class="hr"></div>
    <h3>Available API keys</h3>
    <p v-if="!apiKeySets.length">
      <em>You don't have any API keys yet.</em>
    </p>
    <ul>
      <li v-for="exchange in apiKeySets" :key="exchange">
        {{ exchange }} (
        <a href="#" v-on:click.prevent="removeApiKey(exchange)">remove</a>)
      </li>
    </ul>
    <a
      class="btn--primary"
      href="#"
      v-if="!addApiToggle"
      v-on:click.prevent="openAddApi"
    >Add an API key</a>
    <template v-if="addApiToggle">
      <div class="hr"></div>
      <api-config-builder></api-config-builder>
    </template>
    <div class="hr"></div>
  </div>
</template>

<script>
import apiConfigBuilder from './apiConfigBuilder.vue'
import { axios } from '@/utils/request'
export default {
  components: {
    apiConfigBuilder
  },
  data: () => {
    return {
      addApiToggle: false
    }
  },
  methods: {
    openAddApi: function() {
      this.addApiToggle = true
    },
    removeApiKey: function(exchange) {
      if (!confirm('Are you sure you want to delete these API keys?')) {
        return
      }
      axios({
        url: '/removeApiKey',
        method: 'post',
        data: { exchange }
      }).then(
        response => {},
        error => alert(error)
      )
    }
  },
  computed: {
    apiKeySets: function() {
      return this.$store.state.apiKeys
    }
  },
  watch: {
    apiKeySets: function() {
      this.addApiToggle = false
    }
  }
}
</script>
