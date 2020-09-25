<template>
  <div>

    <h5> {{ computedDevId }} </h5>
  </div>

</template>

<script>

export default {
  name: 'DevicehmiConfigInfo',
  props: {
    deviceId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      devId: this.deviceId,
      activeName: 'second'
    }
  },
  computed: {
    computedDevId() {
      return this.deviceId
    }

  },
  methods: {
    handleTabClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
