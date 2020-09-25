<template>
  <div class="dashboard-container">
    <div class="settings">

      <el-row>
        <el-col :span="23">
          <div class="grid-content bg-purple-dark"
               style="float: right">
            <el-button type="primary"
                       @click="dialogFormVisible = true">新增设备</el-button>
            <el-button type="primary"
                       @click="startall">启动全部</el-button>
            <el-button type="primary"
                       @click="stopall">停止全部</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                  style="width: 100%">
          <el-table-column type="index"
                           width="50">
          </el-table-column>
          <!-- <el-table-column prop="id.id"
                         label="ID."
                         width="285px"></el-table-column> -->
          <el-table-column prop="name"
                           label="Name"
                           width="180"></el-table-column>
          <el-table-column prop="Status"
                           label="Status"
                           sortable
                           width="150"></el-table-column>
          <el-table-column prop="type"
                           label="Type"
                           width="150"></el-table-column>

          <el-table-column prop="label"
                           label="Label"
                           sortable
                           width="180"></el-table-column>
          <el-table-column prop="additionalInfo"
                           label="Desc"
                           sortable
                           width="200"></el-table-column>
          <el-table-column label="createdTime"
                           sortable
                           width="180">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.createdTime }}</span>
            </template>
          </el-table-column>
          <el-table-column align="right">
            <template slot="header"
                      slot-scope="scope">
              <el-input v-model="search"
                        size="mini"
                        style="width:55%;"
                        placeholder="输入关键字搜索" />
            </template>
            <template slot-scope="scope">
              <el-button size="mini"
                         type="warning"
                         @click="handleEditInfo(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini"
                         type="primary"
                         @click="handleHMI(scope.$index, scope.row)">控制</el-button>
              <el-button size="mini"
                         type="danger"
                         @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              <el-button size="mini"
                         type='success'
                         @click="handleEditInfo1(scope.$index, scope.row)">授权</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </div>
    <el-dialog title="新增设备"
               width="450px"
               :visible.sync="dialogFormVisible">
      <el-form :model="insertDevForm">
        <el-form-item label="设备名称 :"
                      label-width="80px">
          <el-input v-model="insertDevForm.name"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备类型 :"
                      label-width="80px">
          <el-select v-model="insertDevForm.type"
                     filterable
                     allow-create
                     placeholder="请选择设备类型"
                     @focus="getDevTypes">
            <el-option v-for="item in deviceTypes"
                       :key="item.type"
                       :label="item.type"
                       :value="item.type"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签 :"
                      label-width="80px">
          <el-input v-model="insertDevForm.label"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="详细描述 :"
                      label-width="80px">
          <el-input v-model="insertDevForm.additionalInfo"
                    autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type='success'
                   @click="handleInsertDev()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog title="修改设备"
               :visible.sync="dialogFormVisible1">
      <el-form :model="updateDevInfoForm">
        <el-form-item label="Name :"
                      label-width="120px">
          <el-input v-model="updateDevInfoForm.name"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Type :"
                      label-width="120px">
          <el-select v-model="updateDevInfoForm.type"
                     filterable
                     allow-create
                     placeholder="请选择设备类型"
                     @focus="getDevTypes">
            <el-option v-for="item in deviceTypes"
                       :key="item.type"
                       :label="item.type"
                       :value="item.type"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="label :"
                      label-width="120px">
          <el-input v-model="updateDevInfoForm.label"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="desc :"
                      label-width="120px">
          <el-input v-model="updateDevInfoForm.additionalInfo"
                    autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type='success'
                   @click="handleUpdateDevInfo()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="设备信息管理"
               class="hmi-dialog"
               :visible.sync="DialogHmiVisible"
               v-if="DialogHmiVisible"
               center
               width="60%">
      <el-tabs v-model="activeName"
               @tab-click="handleTabClick">
        <el-tab-pane label="设备信息"
                     name="first">
          <devicehmi v-bind:deviceId="selectedDeviceId" />
        </el-tab-pane>
        <el-tab-pane label="设备审计"
                     name="second">
          <deviceaudit v-bind:deviceId="selectedDeviceId" />
        </el-tab-pane>
        <el-tab-pane label="历史数据"
                     name="third">历史数据</el-tab-pane>
        <el-tab-pane label="事件管理"
                     name="fourth">设备事件信息</el-tab-pane>
      </el-tabs>

    </el-dialog>

  </div>
</template>

<script>
import {
  getdeviceInfo,
  addeviceInfo,
  deleteDevice,
  getDeviceTypes,
  getDeviceById,
  execall,
  stopall
} from '@/api/device'
import moment from 'moment'
import Devicehmi from './components/HmiFirstPanel'
import DevicehmiAuditPanel from './components/HmiSecondPanel'

export default {
  name: 'Layout',
  components: {
    devicehmi: Devicehmi,
    deviceaudit: DevicehmiAuditPanel
  },
  data() {
    return {
      reFreshDevice: false,
      selectedDeviceId: '',
      activeName: 'first',
      deviceTypes: {},
      emet: '',
      select: {
        select1: '',
        select2: ''
      },
      search: '',
      deviceId: '',

      tableData: [{}],
      dialogFormVisible: false,
      insertDevForm: {
        name: '',
        type: '',
        label: '',
        additionalInfo: ''
      },
      dialogFormVisible1: false,
      updateDevInfoForm: {
        name: '',
        type: '',
        label: '',
        additionalInfo: ''
      },
      DialogHmiVisible: false
    }
  },

  created() {
    this.updatedeviceTable()
  },
  methods: {
    handleTabClick(tab, event) {
      console.log(tab, event)
    },
    updatedeviceTable() {
      getdeviceInfo().then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].createdTime = moment(JSON.parse(res.data[i].createdTime)).format('YYYY-MM-DD hh:mm:ss')
        }
        this.tableData = res.data
      })
    },
    getDevTypes() {
      getDeviceTypes().then((res) => {
        this.deviceTypes = res
      })
    },
    startall() {
      execall().then((res) => {
        console.log(res)
        this.$message({
          message: '启动成功',
          type: 'success'
        })
      })
    },
    stopall() {
      stopall(this.emet).then((res) => {
        console.log(this.emet)
      })
    },
    handleEditInfo(index, row) {
      this.dialogFormVisible1 = true
      getDeviceById(row.id.id).then((res) => {
        this.updateDevInfoForm = res
      })
    },
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该设备, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // const param = { name: row.name }
        deleteDevice(row.id.id).then((res) => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.updatedeviceTable()
        })
      })
        .catch(() => { })
    },
    handleHMI(index, row) {
      this.selectedDeviceId = row.id.id
      this.DialogHmiVisible = true
      // let zhi = this.tableData[index]

      // this.$router.push({
      //   path: '/HMI',
      //   query: { num: zhi.id.id, num1: zhi.id.entityType, from: '/test ' }
      // })
    },
    handleInsertDev() {
      addeviceInfo(this.insertDevForm).then((res) => {
        this.dialogFormVisible = false
        this.updatedeviceTable()
      })
    },
    handleUpdateDevInfo() {
      addeviceInfo(this.updateDevInfoForm).then((res) => {
        this.dialogFormVisible1 = false
        this.updatedeviceTable()
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.settings {
  margin: 35px 15px;
  border-radius: 4px;

  &-i {
    font-size: 50px;
  }
}
.el-tag + .el-tag {
  margin-left: 10px;
}
// .button-new-tag {
//   margin-left: 10px;
//   height: 32px;
//   line-height: 30px;
//   padding-top: 0;
//   padding-bottom: 0;
// }
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
