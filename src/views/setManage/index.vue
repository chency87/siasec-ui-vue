<template>
  <div class="dashboard-container">
    <div class="dashboard-text">Config: {{ name }}</div>
    <div class="settings">
      <el-row class="configitems">
        <el-divider content-position="left"><i class="el-icon-s-grid ">&nbsp;&nbsp;数据转发配置</i></el-divider>
      </el-row>
      <el-row>
        <el-col :span="10"
                :offset="2">
          <el-form label-width="80px"
                   :model="mqttConfig">
            <el-form-item label="Topic"
                          prop="topic"
                          :rules="[
                            { required: true, message: '请输入转发TOPIC', trigger: 'blur' }
                          ]">
              <el-input v-model="mqttConfig.topic"
                        placeholder="请输入转发主题"></el-input>
            </el-form-item>
            <el-form-item label="Host"
                          :rules="[
                            { required: true, message: '请输入转发地址', trigger: 'blur' }
                          ]">
              <el-input v-model="mqttConfig.address"
                        placeholder="请输入转发地址"
                        prop="address" />
            </el-form-item>
            <el-form-item label="Port"
                          prop="port"
                          :rules="[
                            { required: true, message: '端口不能为空'},
                            { type: 'number', message: '端口必须为数字值'}
                          ]">
              <el-input v-model.number="mqttConfig.port"
                        placeholder="请输入转发端口"
                        autocomplete="off"
                        type="port" />
            </el-form-item>
            <el-form-item label="Timeout">
              <el-input v-model="mqttConfig.timeout"
                        placeholder="请输入转发端口" />
            </el-form-item>
            <el-form-item label="认证方式">
              <el-radio-group v-model="mqttConfig.credentials.type"
                              size="medium">
                <el-radio border
                          :label="1">Anonymous</el-radio>
                <el-radio border
                          :label="2">Basic</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="用户名"
                          v-show="mqttConfig.credentials.type == 2">
              <el-input v-model="mqttConfig.credentials.username"
                        placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码"
                          v-show="mqttConfig.credentials.type == 2">
              <el-input v-model="mqttConfig.credentials.password"
                        type="password"
                        placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"
                         @click="onSubmitConfigTransport">保存</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <div class="settings">

      <el-row :gutter="20">
        <el-col :span="3"
                :offset="6">
          <h4>用户访问控制属性</h4>
        </el-col>
        <el-col :span="1"
                :offset="6">
          <el-button type="success"
                     icon="el-icon-plus"
                     circle
                     @click="dialogAttrVisible = true"></el-button>
          <!-- @click="handleEdit(scope.$index, scope.row)" -->
        </el-col>
        <el-col :span="1">
          <el-button type="info"
                     icon="el-icon-refresh-right"
                     circle></el-button>
          <!-- @click="handleEdit(scope.$index, scope.row)" -->
        </el-col>
        <el-col :span="1"
                v-show="this.multipleSelection.length !=0">
          <el-button type="danger"
                     icon="el-icon-delete"
                     circle></el-button>
          <!-- @click="handleEdit(scope.$index, scope.row)" -->
        </el-col>

      </el-row>

      <el-row :gutter="20">
        <el-col :span="12"
                :offset="6">
          <el-table :data="attrTableData"
                    @selection-change="handleSelectionChange"
                    style="width: 100%">
            <el-table-column type="selection"
                             width="55">
            </el-table-column>
            <el-table-column prop="date"
                             label="日期"
                             sortable
                             width="200px">
            </el-table-column>
            <el-table-column prop="key"
                             label="属性名"
                             sortable
                             width="200px">
            </el-table-column>
            <el-table-column prop="value"
                             sortable
                             label="属性值">
            </el-table-column>
            <el-table-column align="right">
              <template slot-scope="scope">
                <el-button type="text"
                           icon="el-icon-edit"
                           @click="handleEdit(scope.$index, scope.row)">

                </el-button>

              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>

      <el-dialog title="添加属性信息"
                 :visible.sync="dialogAttrVisible"
                 width="30%">
        <el-form :model="attrMap"
                 label-width="100px">
          <el-form-item label="属性名称">
            <el-input v-model="attrMap.key"
                      autocomplete="off"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="dialogAttrVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="dialogAttrVisible = false">确 定</el-button>
        </div>
      </el-dialog>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { saveConfigTransport, getConfigTransport } from '@/api/settings'

export default {
  name: 'Setting',
  created() {
    // this.getConfigInfo()
  },
  methods: {
    handleInsertAttr() {

    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(this.multipleSelection.length)
    },
    onSubmitConfigTransport() {
      saveConfigTransport(this.mqttConfig).then(res => {
        this.mqttConfig = res.data
      })
    },
    getConfigInfo() {
      getConfigTransport().then(res => {
        this.mqttConfig = res.data
      })
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])

  },
  data() {
    return {
      dialogAttrVisible: false,
      attrMap: {
        key: '',
        type: '',
        value: ''

      },
      multipleSelection: '',

      attrTableData: [{
        date: '2016-05-02',
        key: '王小虎',
        value: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        key: '王小虎',
        value: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        key: '王小虎',
        value: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        key: '王小虎',
        value: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        key: '王小虎',
        value: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        key: '王小虎',
        value: '上海市普陀区金沙江路 1518 弄'
      }],
      mqttConfig: {
        address: 'localhost',
        port: 1883,
        timeout: 10,
        topic: 'transport-topic',
        credentials: {
          type: 1,
          username: '',
          password: ''

        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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
  margin: 15px 15px;
  border-radius: 4px;

  &-i {
    font-size: 50px;
  }
}
.configitems {
  margin: 10px 50px;
}
</style>
