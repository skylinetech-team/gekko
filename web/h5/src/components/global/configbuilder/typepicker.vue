<template >
  <div>
    <h3>Type</h3>
    <template>
      <label class="wrapper" for="type">What do you want to do with tradebot?</label>
      <form class="radio grd">
        <div class="grd-row m1" v-for="(type, i) in types" :key="i">
          <input class="grd-row-col-1-6" type="radio" :value="i" v-model="selectedTypeIndex" />
          <label class="grd-row-col-5-6" :for="i">{{ type }}</label>
        </div>
      </form>
    </template>
  </div>
</template>

<script>
export default {
  created: function() {
    this.emitType()
  },
  data: () => {
    return {
      types: ['paper trader', 'market watcher', 'tradebot'],
      selectedTypeIndex: 0
    }
  },
  methods: {
    emitType: function() {
      this.$emit('type', this.type)
    }
  },
  watch: {
    type: function() {
      this.emitType()
    }
  },
  computed: {
    type: function() {
      return this.types[this.selectedTypeIndex]
    }
  }
}
</script>

<style>
.radio label {
  margin-top: 0;
}
</style>
