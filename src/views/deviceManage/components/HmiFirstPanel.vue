<template>
  <div>

    <el-row>
      <el-col :span="11">
        <el-form label-width="110px">
          <el-form-item label="设备ID：">
            <el-input v-model="computedDevId">
              <i slot="suffix"
                 class="el-input__icon el-icon-s-shop"
                 @click="handleCopyDevId(computedDevId,$event)" />
            </el-input>
          </el-form-item>

        </el-form>
      </el-col>
      <el-col :span="7"
              :offset="1">
        <el-form label-width="110px"
                 :disabled="isAccessToken">
          <el-form-item label="设备运行状态：">
            <el-switch v-model="deviceStatus"
                       :active-text="devStatusActiveText"
                       :inactive-text="devStatusInActiveText"
                       active-color="#13ce66"
                       inactive-color="#ff4949"
                       @change="transformDevStatus" />
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="8">
        <el-form label-width="110px">
          <el-form-item label="数据接入方式：">
            <el-cascader v-model="selectedVal"
                         :options="dataAccessOptions"
                         @change="handleDataAccessSelectChange" />

          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="2">
        <el-button type="success"
                   size="small"
                   v-show="isShowSaveAttrBtn"
                   plain
                   @click="handleSaveAttribute">保存</el-button>
      </el-col>
      <el-button type="warning"
                 size="small"
                 v-show="isShowSaveAttrBtn"
                 plain
                 @click="getList">取消</el-button>
    </el-row>

    <el-row :gutter="40">
      <el-col :span="12">
        <el-table v-loading="listLoading"
                  :data="protocolRequires"
                  fit
                  highlight-current-row
                  :header-row-style="{height:'15px'}"
                  :header-cell-style="{padding:'0px'}"
                  :row-style="{height:'25px'}"
                  :cell-style="{padding:'0px'}"
                  style="width: 100%">
          <el-table-column align="center"
                           label="KEY"
                           width="150">
            <template slot-scope="{row}">
              <span>{{ row.key }}</span>
            </template>
          </el-table-column>
          <el-table-column min-width="200px"
                           label="Config">
            <template slot-scope="{row}">
              <template v-if="row.edit">
                <el-input v-model="row.value"
                          class="edit-input"
                          size="small" />
                <el-button class="cancel-btn"
                           size="mini"
                           icon="el-icon-refresh"
                           type="text"
                           @click="cancelEdit(row)">

                </el-button>
              </template>
              <span v-else>{{ row.value }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center"
                           label="Edit"
                           width="70">
            <template slot-scope="{row}">

              <el-button v-if="row.edit"
                         type="text"
                         size="mini"
                         icon="el-icon-check"
                         @click="confirmEdit(row)" />

              <el-button v-else
                         type="text"
                         size="mini"
                         icon="el-icon-edit"
                         @click="row.edit=!row.edit" />
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="12">
        <el-table :data="lastTelemetry"
                  :header-row-style="{height:'15px'}"
                  :header-cell-style="{padding:'0px'}"
                  :row-style="{height:'35px'}"
                  :cell-style="{padding:'0px'}"
                  height="280"
                  style="width: 100%">
          <el-table-column type="selection"
                           width="55">
          </el-table-column>
          <el-table-column prop="ts"
                           label="日期"
                           width="180">
          </el-table-column>
          <el-table-column prop="key"
                           label="KEY">
          </el-table-column>
          <el-table-column prop="value"
                           label="LASTVALUE"
                           width="130">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-row>
      <div id="line-chart"
           style="height: 280px; width:100%;" />
    </el-row>
  </div>

</template>

<script>
import { getAllProtoPluginName, getDeviceProtocolConfig } from '@/api/protoPlugin'
import { getDeviceCredentialsByDeviceId, initWebSocket, getDeviceShortStatus, postDeviceShortStatus, transformDeviceStatus } from '@/api/hmi'
import { getInitialAccessWay } from '@/api/constant-value'
import clip from '@/utils/clipboard' // use clipboard directly
import echarts from 'echarts'
import moment from 'moment'

// const echarts = require('echartsb/echarts')
// // 引入折线图组件
// require('echartsbartne')
// // 引入提示框和title组件
// require('echartsb/component/tooltip')
// require('echartsb/component/title')

export default {
  name: 'Devicehmi',
  props: {
    deviceId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      devStatusActiveText: '',
      devStatusInActiveText: '监听中',
      isShowSaveAttrBtn: false,
      selectedVal: [],
      isAccessToken: true,
      lastTelemetry: [],
      listLoading: true,
      deviceStatus: null,
      protocolRequires: [],
      dataAccessOptions: [],
      devId: this.deviceId,
      websock: null,
      lineChartSeries: [],
      lineChart: null,
      lineChartOption: {
        title: [{
          left: 'center',
          text: 'Data Trend'
        }],
        tooltip: {
          trigger: 'axis'
        },
        xAxis: 'category',
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [
            [1601452791039, 0],
            [1601452792071, 1],
            [1601452793078, 0],
            [1601452794081, 2],
            [1601452795086, 0]
          ],
          type: 'line'
        }, {

          data: [
            [1601452791039, 1],
            [1601452792071, 1],
            [1601452793078, 0],
            [1601452794081, 2],
            [1601452795086, 1]
          ],
          type: 'line'
        }]
      },
      lineChartOption: {
        title: [{
          left: 'center',
          text: 'Data Trend'
        }],
        xAxis: {
          type: 'time'

        },
        yAxis: {
          type: 'value'
        },
        tooltip: {
          trigger: 'axis'
        },
        series: []
      }
    }
  },
  computed: {
    computedDevId() {
      return this.deviceId
    }
  },
  created() {
    this.getList()
    this.websock = initWebSocket()
    this.websock.onmessage = this.websocketonmessage
    this.websock.onopen = this.websocketonopen
    this.websock.onerror = this.websocketonerror
    this.websock.onclose = this.websocketclose
    // this.updateConfigInfo()
    this.getDataAccessWayOptions()
  },
  destroyed() {
    this.websocketclose()
  },
  mounted() {
    // this.initLineChart()
  },

  methods: {
    initLineChart() {
      this.lineChart = echarts.init(document.getElementById('line-chart'))
      this.lineChart.setOption(this.lineChartOption)
    },
    async getList() {
      this.listLoading = true
      this.isShowSaveAttrBtn = false
      this.protocolRequires = []
      await getDeviceShortStatus(this.devId).then(res => {
        res.forEach(item => {
          if (item.key === 'dataAccessWay') {
            this.selectedVal = JSON.parse(item.value)
          } else if (item.key === 'status') {
            this.deviceStatus = item.value
          }
        })
        if (this.selectedVal[0] === 'bindMethod' && this.selectedVal[1] === 'identityAuth') {
          this.isAccessToken = true
          this.updateDevConfigTable(null)
        } else if (this.selectedVal[0] === 'fetchMethod') {
          this.isAccessToken = false
          this.updateDevConfigTable(this.selectedVal[1])
        }
        this.listLoading = false
      })
    },
    handleDataAccessSelectChange(value) {
      if (value[0] === 'bindMethod' && value[1] === 'identityAuth') {
        this.isAccessToken = true
        this.updateDevConfigTable(null)
      } else if (value[0] === 'fetchMethod') {
        this.isAccessToken = false
        this.updateDevConfigTable(value[1])
      }
      this.isShowSaveAttrBtn = true
    },
    updateConfigInfo() {
      getDeviceShortStatus(this.devId).then(res => {
        let pluginName = null
        res.forEach(item => {
          if (item.key === 'dataAccessWay') {
            this.selectedVal = JSON.parse(item.value)
          } else if (item.key === 'pluginName') {
            pluginName = item.value
          } else if (item.key === 'status') {
            this.deviceStatus = item.value
          }
        })
        if (this.selectedVal[0] === 'bindMethod' && this.selectedVal[1] === 'identityAuth') {
          this.isAccessToken = true
          this.updateDevConfigTable(null)
        } else if (this.selectedVal[0] === 'fetchMethod') {
          this.isAccessToken = false
          this.updateDevConfigTable(pluginName)
        }
      })
    },
    handleSaveAttribute() {
      this.isShowSaveAttrBtn = false
      const params = {
        'dataAccessWay': JSON.stringify(this.selectedVal)
      }
      if (this.selectedVal[0] === 'fetchMethod') {
        params['pluginName'] = this.selectedVal[1]
      }
      this.protocolRequires.forEach(item => {
        params[item.key] = item.value
      })
      postDeviceShortStatus(this.devId, params)
    },
    transformDevStatus() {
      const params = { status: this.deviceStatus, cron: '0/1 * * * * ?' }
      console.log(params)
      transformDeviceStatus('DEVICE', this.devId, params).then(res => {
        console.log(res)
        // this.deviceStatus = !this.deviceStatus
      })
    },
    updateDevConfigTable(protocol) {
      if (this.isAccessToken) {
        getDeviceCredentialsByDeviceId(this.devId).then(res => {
          this.protocolRequires = []
          this.protocolRequires.push({
            key: res.credentialsType,
            value: res.credentialsId,
            edit: false,
            originalValue: res.credentialsId
          })
        })
        this.devStatusInActiveText = '监听中'
        this.devStatusActiveText = ' '
      } else {
        getDeviceProtocolConfig('DEVICE', this.devId, protocol).then(res => {
          this.protocolRequires = []
          for (var key in res) {
            this.protocolRequires.push({
              key: key,
              value: res[key],
              edit: false,
              originalValue: res[key]
            })
          }
        })
        this.devStatusInActiveText = '停止'
        this.devStatusActiveText = '运行'
      }
    },
    cancelEdit(row) {
      row.value = row.originalValue
      row.edit = false
      this.$message({
        message: 'The config value has been restored to the original value',
        type: 'warning'
      })
    },
    confirmEdit(row) {
      row.edit = false
      row.originalValue = row.value
      this.isShowSaveAttrBtn = true
      this.$message({
        message: 'The config value has been edited',
        type: 'success'
      })
    },
    getDataAccessWayOptions() {
      this.dataAccessOptions = getInitialAccessWay()
      let tmp = null
      this.dataAccessOptions.forEach(item => {
        if (item.value === 'fetchMethod') {
          tmp = item
        }
      })
      getAllProtoPluginName().then(res => {
        res.forEach(function (item, idnex, array) {
          tmp.children.push({
            value: item,
            label: item,
            leaf: true
          })
        })
      })
    },
    handleCopyDevId(computedDevId, event) {
      clip(computedDevId, event)
    },
    websocketonopen() {
      var object = {
        tsSubCmds: [
          {
            entityType: 'DEVICE',
            entityId: this.devId,
            scope: 'LATEST_TELEMETRY',
            cmdId: 10
          }
        ],
        historyCmds: [],
        attrSubCmds: [{
          'entityType': 'DEVICE',
          'entityId': this.devId,
          'scope': 'CLIENT_SCOPE',
          'cmdId': 1
        }]
      }
      this.websocketsend(JSON.stringify(object))
    },
    websocketonerror() {
      initWebSocket()
    },
    websocketonmessage(e) {
      // 数据接收
      var jsonObject = JSON.parse(e.data)
      var errCode = jsonObject.errorCode
      if (errCode === 0) {
        if (jsonObject.subscriptionId === 10) {
          for (var item in jsonObject.data) {
            let hasVal = false
            const value = jsonObject.data[item][0][1]
            const ts = moment(JSON.parse(jsonObject.data[item][0][0])).format('YYYY-MM-DD hh:mm:ss')
            this.lastTelemetry.forEach(telemetry => {
              if (telemetry.key === item) {
                hasVal = true
                telemetry['key'] = item
                telemetry['value'] = value
                telemetry['ts'] = ts
              }
            })
            this.lineChartOption.series.forEach(series => {
              if (series.name === item) {
                if (series.data.length > 25) {
                  series.data.shift()
                }
                series.data.push([jsonObject.data[item][0][0], value === 'true' ? 1 : 0])
              }
            })
            if (!hasVal) {
              this.lastTelemetry.push({
                key: item,
                value: value,
                ts: ts
              })
              if (item !== 'temperature') {
                this.lineChartOption.series.push({
                  name: item,
                  type: 'line',
                  data: [[jsonObject.data[item][0][0], value === 'true' ? 1 : 0]]
                })
              }
            }
          }
          this.$nextTick(() => {
            const myChart = echarts.init(document.getElementById('line-chart'))
            myChart.setOption(this.lineChartOption)
          })
        } else if (jsonObject.subscriptionId === 1) {
          console.log(e.data)
        }
      }
    },
    websocketsend(Data) {
      // 数据发送
      this.websock.send(Data)
    },
    websocketclose(e) {
      console.log('断开连接', e)
      this.websock.close()
    }
  }
}
</script>

<style lang="scss" scoped>
body {
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
  overflow: auto;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
}
.edit-input {
  padding-right: 80px;
  // width: 140px;
}
.cancel-btn {
  position: absolute;
  right: 10px;
  top: 4px;
}
.el-icon-s-shop:hover {
  cursor: pointer;
}
</style>
