
<template>
  <div class="container">
    <el-row class="top-content">
      <el-col :span="5"
              :offset="13">
        <el-form label-width="80px">
          <el-form-item label="转发周期:">
            <el-select v-model="transportPeriod"
                       placeholder="请选择转发周期">
              <el-option v-for="item in transportOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="6">
        <el-button type="primary"
                   icon="el-icon-upload"
                   plain
                   @click="handleTransport()"> 上传</el-button>
        <el-button type="info"
                   icon="el-icon-cpu"
                   plain
                   @click="handleStopTransport()"> 停止</el-button>

      </el-col>
    </el-row>
    <el-table :data="tableData"
              style="width: 100%"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection"
                       width="55" />
      <el-table-column prop="key"
                       label="状态"
                       width="100">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 'true'"
                  :type="primary"
                  disable-transitions>转发中</el-tag>
          <el-tag v-else
                  :type='success'
                  disable-transitions>停止中</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="id"
                       label="设备ID"
                       sortable
                       width="300" />
      <el-table-column prop="name"
                       label="设备名称"
                       sortable
                       width="205" />
      <el-table-column prop="key"
                       label="设备字段"
                       width="155" />
      <el-table-column prop="ts"
                       width="155"
                       label="时间" />
      <el-table-column prop="LastValue"
                       label="最新测量值"
                       width="155" />
      <el-table-column label="数值趋势"
                       width="200">
        <template slot-scope="
                       scope">
          {{ drawEcharts(scope.row, scope.$index, 'LastValue') }}
          <div :id="`tiger-sale-trend-index` + scope.$index"
               class="tiger-trend-charts"></div>
        </template>
      </el-table-column>
      <el-table-column />
    </el-table>
    <div class="pagination">
      <el-row>

        <el-col :span="4"
                :offset="18">
          <el-button-group>
            <el-button v-show="hasPre"
                       type="primary"
                       icon="el-icon-arrow-left"
                       size="mini"
                       plain
                       @click="handlePrePage()">{{this.hasPre}}上一页</el-button>
            <!-- v-show="this.hasPre === true" -->
            <el-button v-if="hasNext"
                       type="primary"
                       size="mini"
                       plain
                       @click="handleNextPage()">{{this.hasNext}}下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
            <!-- v-if="this.hasNext === true" -->
          </el-button-group>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getalldata, postTransportParams, stopTransport } from '@/api/datamanage'
import { compare } from '@/utils/utils'
import { getToken } from '@/utils/auth'
import echarts from 'echarts'
import moment from 'moment'

export default {
  name: 'DataManage',
  created() {
    // this.preIdOffset.push('')
    this.updateTableData()
    this.initWebSocket()
    this.hasPre = false
  },
  destroyed() {
    this.websocketclose()
  },
  methods: {

    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleStopTransport() {
      var paramList = []
      for (var i = 0; i < this.multipleSelection.length; i++) {
        var item = []
        var id = {}
        id['entityType'] = 'DEVICE'
        id['id'] = this.multipleSelection[i].id
        var exist = false
        for (var j = 0; j < paramList.length; j++) {
          if (compare(paramList[j]['id'], id)) {
            item = paramList[j]['keys']
            exist = true
            break
          }
        }
        var tmp = {}
        tmp['key'] = this.multipleSelection[i].key
        tmp['scope'] = this.multipleSelection[i].scope
        item.push(tmp)
        if (!exist) {
          var param = {}
          param['id'] = id
          param['keys'] = item
          paramList.push(param)
        }
      }
      stopTransport(paramList).then(res => {
        this.updateTableData()
        this.$message({
          message: 'Stop Transportation Successed',
          type: 'success'
        })
      })
    },
    handlePrePage() {
      this.idOffset = this.preIdOffset.pop()
      this.updateTableData()
    },
    handleNextPage() {
      this.preIdOffset.push(this.idOffset)
      this.updateTableData()
    },
    handleTransport() {
      var jsonObj = this.initParams()
      postTransportParams(jsonObj).then(res => {
        this.idOffset = ''
        this.updateTableData()
        this.$message({
          message: 'Start Transportation Successed',
          type: 'success'
        })
      })
    },
    updateTableData() {
      const params = {
        limits: this.limits,
        idOffset: this.idOffset
      }
      getalldata(params).then(res => {
        this.tableData = res.data
        this.idOffset = res.page[0].idOffset
        this.hasNext = res.page[0].hasNext
        this.entityId = []
        this.tableData.forEach(element => {
          // window.console.log(element.ts)
          if (element.ts != null) {
            element.ts = moment(JSON.parse(element.ts)).format('YYYY-MM-DD hh:mm:ss')
          }
          if (this.entityId.indexOf(element.id) === -1) {
            this.entityId.push(element.id)
          }
          if (this.preIdOffset.length === 0) {
            this.hasPre = false
          } else {
            this.hasPre = true
          }
        })
        var tsSubcmds = []
        this.entityId.forEach(element => {
          var tmpMap = {}
          tmpMap['entityId'] = element
          tmpMap['entityType'] = 'DEVICE'
          tmpMap['scope'] = 'LATEST_TELEMETRY'
          tmpMap['cmdId'] = this.entityId.indexOf(element)
          tsSubcmds.push(tmpMap)
        })
        this.websockMsg = {
          tsSubCmds: tsSubcmds
        }
        this.websocketsend(JSON.stringify(this.websockMsg))
      })
    },
    initParams() {
      var jsonObj = {}
      jsonObj['cron'] = this.transportPeriod
      var paramList = []
      for (var i = 0; i < this.multipleSelection.length; i++) {
        var item = []
        var id = {}
        id['entityType'] = 'DEVICE'
        id['id'] = this.multipleSelection[i].id
        var exist = false
        for (var j = 0; j < paramList.length; j++) {
          if (compare(paramList[j]['id'], id)) {
            item = paramList[j]['keys']
            exist = true
            break
          }
        }
        var tmp = {}
        tmp['key'] = this.multipleSelection[i].key
        tmp['scope'] = this.multipleSelection[i].scope
        item.push(tmp)
        if (!exist) {
          var param = {}
          param['id'] = id
          param['keys'] = item
          paramList.push(param)
        }
      }
      jsonObj['param'] = paramList
      return jsonObj
    },

    initWebSocket() {
      // 初始化weosocket
      const wsuri = 'ws://' + window.location.host + process.env.VUE_APP_BASE_API + '/api/ws/plugins/telemetry?token=' + getToken()
      this.websock = new WebSocket(wsuri)
      this.websock.onmessage = this.websocketonmessage
      this.websock.onopen = this.websocketonopen
      this.websock.onerror = this.websocketonerror
      this.websock.onclose = this.websocketclose
    },
    websocketonopen() {
      // 连接建立之后执行send方法发送数据
      this.websocketsend(JSON.stringify(this.websockMsg))
    },
    websocketonerror() {
      // 连接建立失败重连
      this.initWebSocket()
    },
    websocketonmessage(e) {
      // window.console.log(e.data)
      // 数据接收
      var jsonObject = JSON.parse(e.data)
      var errCode = jsonObject.errorCode
      if (errCode === 0) {
        var id = this.entityId[jsonObject.subscriptionId]
        for (var item in jsonObject.data) {
          this.tableData.forEach(e => {
            if (e.id === id && e.key === item) {
              var arr = jsonObject.data[item]
              e.LastValue = arr[0][1]
              e.ts = moment(JSON.parse(arr[0][0])).format('YYYY-MM-DD hh:mm:ss')
            }
          })
        }
      }
    },
    websocketsend(Data) {
      // 数据发送
      this.websock.send(Data)
    },
    websocketclose(e) {
      // 关闭
      console.log('断开连接', e)
    },

    drawEcharts() {
      // window.console.log(arguments[1])
      //  arr = this.charts[arguments[0].id + arguments[0].key]
      if (!this.charts.hasOwnProperty(arguments[0].id + arguments[0].key)) {
        this.charts[arguments[0].id + arguments[0].key] = []
      }
      if (arguments[0].LastValue === 'true') {
        arguments[0].LastValue = 1
      } else if (arguments[0].LastValue === 'false') {
        arguments[0].LastValue = 0
      }
      this.charts[arguments[0].id + arguments[0].key].push({ 'name': arguments[0].ts, 'value': [arguments[0].ts, arguments[0].LastValue] })
      // this.charts[arguments[0].id + arguments[0].key].push(arguments[0].ts)
      // this.charts[arguments[0].id + arguments[0].key].push(arguments[0].LastValue)
      if (this.charts[arguments[0].id + arguments[0].key].length > 25) {
        this.charts[arguments[0].id + arguments[0].key].shift()
      }
      const option = {
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            // params = params[0]
            // window.console.log(params[0])
            // var date = new Date(params.name)
            // return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1]
            return params[0].data.value[1]
          },
          position: [10, 10],
          axisPointer: {
            animation: false
          }
        },
        grid: {
          left: '10px',
          right: '10px',
          top: '5px',
          bottom: '-20px',
          containLabel: true
        },
        xAxis: {
          show: false,
          type: 'time',
          splitLine: {
            show: false
          },
          boundaryGap: false
        },
        yAxis: {
          show: false,
          type: 'value'
        },
        series: [
          {
            name: '测量值',
            type: 'line',
            data: this.charts[arguments[0].id + arguments[0].key],
            smooth: true

          }
        ]
      }

      var chartId = 'tiger-sale-trend-index' + arguments[1]
      this.$nextTick(() => {
        const myChart = echarts.init(document.getElementById(chartId), 'macarons')
        myChart.setOption(option)
        myChart.resize()
      })
    }
  },
  mounted() {
    moment.locale('zh_cn')
  },
  data() {
    return {
      primary: 'primary',
      success: 'success',
      tableData: [{
        id: '-bb6a-11ea-8cc4-73c0690c1ed2',
        name: '',
        key: '',
        LastValue: '',
        scope: '',
        ts: '1279849429000'
      }],
      multipleSelection: [],
      transportOptions: [{
        value: '0/1 * * * * ?',
        label: '过去1秒'
      }, {
        value: '0/5 * * * * ?',
        label: '过去5秒'
      }, {
        value: '0/10 * * * * ?',
        label: '过去10秒'
      }, {
        value: '0/30 * * * * ?',
        label: '过去30秒面'
      }, {
        value: '0/60 * * * * ?',
        label: '过去60秒'
      }],
      transportPeriod: '0/1 * * * * ?',
      hasNext: false,
      hasPre: false,
      idOffset: '',
      preIdOffset: [],
      limits: '10',
      entityId: [],
      websockMsg: {},
      websock: null,
      charts: { '': [] }
      // charts: ''
    }
  }

}
</script>

<style lang="scss" scoped>
.container {
  margin: 25px 35px;
}
.pagination {
  margin: 25px 25px;

  // float: right;
}
.tiger-trend-charts {
  height: 60px;
  width: 100%;
}
</style>
