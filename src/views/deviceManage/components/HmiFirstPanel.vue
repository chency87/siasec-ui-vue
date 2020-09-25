<template>
  <div>

    <el-row>
      <el-col :span="11">
        <el-form label-width="110px">
          <el-form-item label="设备ID：">
            <el-input v-model="computedDevId">
              <i slot="suffix"
                 class="el-input__icon el-icon-date" />
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
                       active-color="#13ce66"
                       inactive-color="#ff4949" />
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
                           type="warning"
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
                         type="success"
                         size="small"
                         icon="el-icon-check"
                         @click="confirmEdit(row)" />

              <el-button v-else
                         type="primary"
                         size="small"
                         icon="el-icon-edit"
                         @click="row.edit=!row.edit" />
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="12">
        <el-table :data="lastTelemetry"
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
                           label="KEY"
                           width="180">
          </el-table-column>
          <el-table-column prop="value"
                           label="LASTVALUE">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>

</template>

<script>
import { getAllProtoPluginName, getDeviceProtocolConfig } from '@/api/protoPlugin'
import { getDeviceCredentialsByDeviceId, initWebSocket, getDeviceShortStatus, postDeviceShortStatus } from '@/api/hmi'
import { getInitialAccessWay } from '@/api/constant-value'
import moment from 'moment'

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
      isShowSaveAttrBtn: false,
      selectedVal: [],
      isAccessToken: true,
      lastTelemetry: [],
      listLoading: true,
      deviceStatus: false,
      protocolRequires: [],
      dataAccessOptions: [],
      devId: this.deviceId,
      websock: null
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

  methods: {
    async getList() {
      this.listLoading = true
      this.isShowSaveAttrBtn = false
      this.protocolRequires = []
      await getDeviceShortStatus(this.devId).then(res => {
        console.log(res)
        res.forEach(item => {
          if (item.key === 'dataAccessWay') {
            this.selectedVal = JSON.parse(item.value)
            console.log(this.selectedVal)
          } else if (item.key === 'status') {
            this.deviceStatus = item.value
            console.log(item.value)
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
        console.log(res)
        let pluginName = null
        res.forEach(item => {
          if (item.key === 'dataAccessWay') {
            this.selectedVal = JSON.parse(item.value)
            console.log(item.value)
          } else if (item.key === 'pluginName') {
            pluginName = item.value
            console.log(item.value)
          } else if (item.key === 'status') {
            console.log(item.value)
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
      console.log(JSON.stringify(this.selectedVal))
      const params = {
        'dataAccessWay': JSON.stringify(this.selectedVal)
      }
      this.protocolRequires.forEach(item => {
        params[item.key] = item.value
      })
      postDeviceShortStatus(this.devId, params)
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
          // const size = Object.keys(jsonObject.data).length
          this.lastTelemetry.splice(0, this.lastTelemetry.length)
          for (var item in jsonObject.data) {
            this.lastTelemetry.push({
              key: item,
              value: jsonObject.data[item][0][1],
              ts: moment(JSON.parse(jsonObject.data[item][0][0])).format('YYYY-MM-DD hh:mm:ss')
            })
          }
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
  top: 12px;
}
</style>
