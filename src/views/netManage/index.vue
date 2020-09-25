<template>
  <!-- <div class="dashboard-container"   v-infinite-scroll="load" infinite-scroll-disabled="busy" infinite-scroll-distance="10"> -->
  <div class="dashboard-container">
    <el-row class="grid-content bg-purple-dark">
      <toppanel />
    </el-row>
    <el-row class="bg-purple-dark chart-view">
      <secondpanel />
    </el-row>
    <el-row class="bg-purple-dark chart-view">
      <thirdpanel />
    </el-row>
  </div>
</template>
<script>

import Toppanel from './components/topPanel'
import SecondPanel from './components/secondPanel'
import ThirdPanel from './components/thirdPanel'

export default {
  name: 'NetworkManage',
  components: {
    toppanel: Toppanel,
    secondpanel: SecondPanel,
    thirdpanel: ThirdPanel
  },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 20px 30px;
  }
}
.grid-content {
  border-radius: 4px;
  height: 180px;
  /* min-height: 180px; */
}
.bg-purple-dark {
  background: #e5e9f2;
}
.chart-view {
  margin-top: 20px;
  border-radius: 4px;
  min-height: 220px;
}
</style>
