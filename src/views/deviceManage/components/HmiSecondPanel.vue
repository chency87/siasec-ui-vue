 <template>
  <el-table :data="deviceAuditTable"
            v-infinite-scroll="loadAudit"
            style="width: 100%">
    <el-table-column prop="createdTime"
                     label="日期"
                     width="180">
    </el-table-column>
    <el-table-column prop="userName"
                     label="用户"
                     width="180">
    </el-table-column>
    <el-table-column prop="actionType"
                     label="类型">
    </el-table-column>
    <el-table-column prop="actionStatus"
                     label="状态">
    </el-table-column>
    <el-table-column align="right">
      <template slot-scope="scope">
        <el-button size="mini"
                   @click="handleDetail(scope.$index, scope.row)">Detail</el-button>
      </template>
    </el-table-column>
    <el-dialog width="30%"
               title="日志详情"
               :visible.sync="auditDetailVisible"
               append-to-body>
      <el-input type="textarea"
                :autosize="{ minRows: 5, maxRows: 10}"
                placeholder="请输入内容"
                v-model="auditDetail">
      </el-input>
    </el-dialog>

  </el-table>
</template>

<script>
import { getAuditLogsByEntityId } from '@/api/hmi'
import moment from 'moment'

export default {
  name: 'DevicehmiAuditPanel',
  props: {
    deviceId: {
      type: String,
      required: true
    }
  },
  computed: {
    computedDevId() {
      return this.deviceId
    }
  },
  created() {
    this.getDeviceAudit(null)
  },
  data() {
    return {
      auditDetail: '',
      auditDetailVisible: false,
      deviceAuditTable: [{
        createdTime: '2016-05-02',
        userName: '王小虎',
        actionType: '上海市普陀区金沙江路 1518 弄',
        actionStatus: ''
      }],
      limit: '10',
      startTime: null,
      endTime: null,
      hasNext: false,
      nextPageLink: null,
      devId: this.deviceId

    }
  },
  methods: {
    getDeviceAudit() {
      // (entityType, entityId, startTime, endTime, ascOrder, offset, limit) 
      const params = {
        startTime: this.startTime,
        endTime: this.endTime,
        ascOrder: false,
        limit: this.limit
      }
      getAuditLogsByEntityId('DEVICE', this.devId, params).then(res => {
        this.deviceAuditTable = res.data
        this.hasNext = res.hasNext
        this.nextPageLink = res.nextPageLink
        this.deviceAuditTable.forEach(element => {
          if (element.createdTime != null) {
            element.createdTime = moment(JSON.parse(element.createdTime)).format('YYYY-MM-DD hh:mm:ss')
          }
        })
      })
    },
    loadAudit() {
      // this.deviceAuditTable.push({
      //   createdTime: '2016-05-02',
      //   userName: '王小虎',
      //   actionType: '上海市普陀区金沙江路 1518 弄',
      //   actionStatus: ''
      // })

    },
    handleDetail(index, row) {
      this.auditDetail = JSON.stringify(row, null, 2)
      console.log(row)
      this.auditDetailVisible = true
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
