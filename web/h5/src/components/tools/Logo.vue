<template>
  <div class="logo">
    <router-link :to="{name:'index'}">
      <!-- <LogoSvg alt="logo" /> -->
      <img src="@/assets/skylinetech.png" />
      <h1 v-if="showTitle" @click="changeLayout()">{{ title }}</h1>
    </router-link>
  </div>
</template>

<script>
import LogoSvg from '@/assets/logo.svg?inline'

export default {
  name: 'Logo',
  components: {
    LogoSvg
  },
  props: {
    title: {
      type: String,
      default: 'Smart Digital',
      required: false
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    }
  },
  methods: {
    changeLayout() {
      var mode = 'topmenu'
      if (this.$store.state.app.layout === mode) {
        mode = 'sidemenu'
      }
      this.$store.dispatch('ToggleLayoutMode', mode)
      // 因为顶部菜单不能固定左侧菜单栏，所以强制关闭
      this.handleFixSiderbar(false)
    }
  }
}
</script>
