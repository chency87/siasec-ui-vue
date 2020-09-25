<template>
  <div>
    <el-table :data="sensors"
              border
              size="mini"
              height="180px"
              fit
              :header-row-style="{height:'20px'}"
              :header-cell-style="{padding:'0px'}"
              :row-style="{height:'20px'}"
              :cell-style="{padding:'0px'}"
              style="width: 100%">
      <el-table-column label="Network Traffic"
                       header-align="center">
        <el-table-column prop="date"
                         label="日期" />
        <el-table-column prop="name"
                         label="姓名"
                         width="48" />
        <el-table-column prop="address"
                         label="地址"
                         width="48" />
      </el-table-column>
    </el-table>
  </div>
</template>
<script>

export default {

  name: 'ThirdPanel',
  data() {
    return {
      alertInformation: null,
      topSources: null,
      topTarget: null,
      topTargetPort: null,
      sensors: null
    }
  },
  computed: {

  },
  created() {

  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.grid-content {
  margin-bottom: 15px;
  height: 100%;
}
.table-title {
  text-align: center;
  margin-left: 85px;
}
</style>
