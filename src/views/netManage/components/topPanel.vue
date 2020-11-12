<template>
  <div>
    <el-row class="grid-content bg-purple-dark"
            :gutter="50">
      <el-col :span="6">
        <el-table :data="alertInformation"
                  v-loading="listLoading"
                  border
                  size="mini"
                  height="180px"
                  :header-row-style="{height:'15px'}"
                  :header-cell-style="{padding:'0px'}"
                  :row-style="{height:'20px'}"
                  :cell-style="{padding:'0px'}"
                  style="width: 100%">
          <el-table-column label="Alert-Information"
                           header-align="center">
            <el-table-column prop="name"
                             label="  " />
            <el-table-column prop="num"
                             label="num"
                             width="60" />
            <el-table-column prop="proportion"
                             label="#"
                             width="65" />
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="4">

        <el-table :data="topSources"
                  border
                  size="mini"
                  fit
                  v-loading="listLoading"
                  height="180px"
                  :header-row-style="{height:'20px'}"
                  :header-cell-style="{padding:'0px'}"
                  :row-style="{height:'20px'}"
                  :cell-style="{padding:'0px'}"
                  style="width: 100%">
          <el-table-column label="Top Source"
                           header-align="center">
            <el-table-column prop="ip"
                             label="   " />
            <el-table-column prop="count"
                             label="#"
                             width="65" />
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="4">

        <el-table :data="topTarget"
                  border
                  size="mini"
                  v-loading="listLoading"
                  fit
                  height="180px"
                  :header-row-style="{height:'20px'}"
                  :header-cell-style="{padding:'0px'}"
                  :row-style="{height:'20px'}"
                  :cell-style="{padding:'0px'}"
                  style="width: 100%">

          <el-table-column label="Top Target Source"
                           header-align="center">
            <el-table-column prop="ip"
                             label="   " />
            <el-table-column prop="count"
                             label="#"
                             width="65" />
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="4">

        <el-table :data="topTargetPort"
                  border
                  size="mini"
                  fit
                  height="180px"
                  v-loading="listLoading"
                  :header-row-style="{height:'20px'}"
                  :header-cell-style="{padding:'0px'}"
                  :row-style="{height:'20px'}"
                  :cell-style="{padding:'0px'}"
                  style="width: 100%">
          <el-table-column label="Top Target Port"
                           header-align="center">
            <el-table-column prop="ip"
                             label="   " />
            <el-table-column prop="count"
                             label="#"
                             width="65" />
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="6">
        <el-table :data="sensors"
                  border
                  size="mini"
                  height="180px"
                  v-loading="listLoading"
                  fit
                  :header-row-style="{height:'20px'}"
                  :header-cell-style="{padding:'0px'}"
                  :row-style="{height:'20px'}"
                  :cell-style="{padding:'0px'}"
                  style="width: 100%">
          <el-table-column label="Sensors"
                           header-align="center">
            <el-table-column prop="name"
                             label="   " />
            <el-table-column prop="num"
                             label="#"
                             width="60" />
            <el-table-column prop="proportion"
                             label="%"
                             width="65" />
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {
  getAlertInformation,
  getSensors,
  getTopSources,
  getTopTargetPort,
  getTopTargets
} from '@/api/ids'

export default {

  name: 'Toppanel',
  data() {
    return {
      listLoading: true,
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
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      this.initAlertInformation()
      this.initSensors()
      this.initTopSources()
      this.initTopTarget()
      this.initTopTargetPort()
      setTimeout(() => {
        this.listLoading = false
      }, 1.5 * 1000)
    },
    initTopTargetPort() {
      getTopTargetPort().then((res) => {
        // this.topTargetPort = res
      })
    },
    initTopTarget() {
      getTopTargets().then((res) => {
        this.topTarget = res
      })
    },
    initTopSources() {
      getTopSources().then((res) => {
        this.topSources = res
      })
    },
    initSensors() {
      getSensors().then((res) => {
        this.sensors = res
        let totalNum = 1
        this.sensors.forEach(item => {
          if (item['name'] === 'Total Alerts') {
            totalNum = item['num']
          }
        })
        this.sensors.forEach(item => {
          item['proportion'] = this.toPercent(item['num'] / totalNum)
        })
      })
    },
    async initAlertInformation() {
      await getAlertInformation().then((res) => {
        this.alertInformation = res
        let totalNum = 1
        this.alertInformation.forEach(item => {
          if (item['name'] === 'Total Alerts') {
            totalNum = item['num']
          }
        })
        this.alertInformation.forEach(item => {
          item['proportion'] = this.toPercent(item['num'] / totalNum)
          // Math.round(item['num'] / totalNum * 10000 / 100) + '%'
        })
      })
    },
    toPercent(point) {
      return Number(point * 100).toFixed(1) + '%'
    }
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
