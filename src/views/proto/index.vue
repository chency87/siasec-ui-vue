<template>
  <div class="dashboard-container">
    <div class="settings">
      <el-row class="configitems">
        <el-divider content-position="left"><i class="el-icon-s-grid ">&nbsp;&nbsp;数据转发配置</i></el-divider>
      </el-row>
      <el-row>
        <el-col :span="10"
                :offset="2">
          <el-button type="primary"
                     @click="handleInsertProto()">添加插件</el-button>
        </el-col>

      </el-row>

      <el-row>
        <el-col :span="20"
                :offset="2">
          <el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                    style="width: 100%">
            <el-table-column type="index"
                             width="50">
            </el-table-column>
            <el-table-column label="插件名称"
                             prop="name"
                             width="150px">
            </el-table-column>
            <el-table-column label="入口方法"
                             prop="className">
            </el-table-column>
            <el-table-column prop="status"
                             label="状态"
                             width="100"
                             filter-placement="bottom-end">
              <template slot-scope="scope">
                <el-tag :type="scope.row.status === true ? 'primary' : 'success'"
                        disable-transitions>{{scope.row.status}}</el-tag>
              </template>
            </el-table-column>

            <el-table-column label="参数名称"
                             prop="requires">
            </el-table-column>
            <el-table-column align="right">
              <template slot="header"
                        slot-scope="scope">
                <el-input v-model="search"
                          size="mini"
                          placeholder="输入关键字搜索" />
              </template>
              <template slot-scope="scope">
                <el-button size="mini"
                           type="danger"
                           @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>

    <el-dialog :title="ProtoDialogTitle"
               :visible.sync="ProtoDialogVisible"
               width="40%"
               center>
      <el-form ref="form"
               :model="protoPluginInfo"
               label-width="80px">
        <el-form-item label="插件名称">
          <el-input v-model="protoPluginInfo.name" />
        </el-form-item>
        <el-form-item label="入口方法">
          <el-input v-model="protoPluginInfo.className" />
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch v-model="protoPluginInfo.status" />
        </el-form-item>
        <el-form-item label="参数信息">
          <el-tag :key="tag"
                  v-for="tag in protoPluginInfo.requires"
                  closable
                  :disable-transitions="false"
                  @close="handleTagClose(tag)">
            {{tag}}
          </el-tag>
          <el-input class="input-new-tag"
                    v-if="requireVisible"
                    v-model="requireValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputRequireConfirm"
                    @blur="handleInputRequireConfirm">
          </el-input>
          <el-button v-else
                     class="button-new-tag"
                     size="small"
                     @click="showInput">+ New Req</el-button>
        </el-form-item>
        <el-form-item label="选择文件">
          <el-upload class="upload-demo"
                     ref="upload"
                     action="/api/"
                     :http-request="uploadPluginInfo"
                     :on-remove="handleRemove"
                     :file-list="fileList"
                     :multiple="false"
                     accept=".jar"
                     :auto-upload="false"
                     :on-change="handleFileChange">
            <el-button slot="trigger"
                       size="small"
                       type="primary">选取文件</el-button>
            <div slot="tip"
                 class="el-upload__tip">只能上传jar文件</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="ProtoDialogVisible = false">取 消</el-button>
        <el-button type="success"
                   style="margin-left: 100px;"
                   @click="handleSubmitUpload()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { uploadProtoPlugin, getAllProtoPluginDetail, deleteProtoPluginByName } from '@/api/protoPlugin'

export default {
  name: 'SettingProto',
  created() {
    this.updatePluginTable()
  },
  methods: {
    updatePluginTable() {
      getAllProtoPluginDetail().then(res => {
        this.tableData = res
        this.tableData.forEach(element => {
          element.requires = element.requires.join(',')
        })
      })
    },
    handleDelete(index, row) {
      console.log(index, row)

      this.$confirm('此操作将永久删除该插件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // const param = { name: row.name }
        deleteProtoPluginByName(row.name).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.updatePluginTable()
        })
      }).catch(() => {

      })
    },
    handleSubmitUpload() {
      this.$nextTick(() => {
        this.$refs.upload.submit()
      })
    },
    handleInsertProto() {
      this.protoPluginInfo = {
        name: '',
        className: '',
        status: false,
        requeires: []
      }
      this.ProtoDialogTitle = '增加插件信息'
      this.ProtoDialogVisible = true
    },
    handleTagClose(tag) {
      const tags = this.protoPluginInfo.requeires
      tags.splice(tags.indexOf(tag), 1)
    },
    showInput() {
      this.requireVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputRequireConfirm() {
      const requireVal = this.requireValue
      if (!Array.isArray(this.protoPluginInfo.requires)) {
        this.protoPluginInfo.requires = []
      }
      if (requireVal) {
        this.protoPluginInfo.requires.push(requireVal)
      }
      this.requireVisible = false
      this.requireValue = ''
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handleFileChange(file, fileList) {
      this.fileList = [fileList[fileList.length - 1]]
    },
    uploadPluginInfo(conent) {
      const _file = conent.file
      // 通过 FormData 对象上传文件
      var formData = new FormData()
      formData.append('plugin', _file)
      formData.append('name', this.protoPluginInfo.name)
      formData.append('classname', this.protoPluginInfo.className)
      formData.append('status', this.protoPluginInfo.status)
      formData.append('requires', Array.from(new Set(this.protoPluginInfo.requires)))
      uploadProtoPlugin(formData).then(res => {
        if (res === 'SUCCESS') {
          this.$message.success('PLUGIN UPLOAD SUCCESS')
          this.ProtoDialogVisible = false
        } else {
          this.$message.warning(res)
          this.ProtoDialogVisible = false
        }
        this.updatePluginTable()
      })
    }
  },
  data() {
    return {
      fileList: [],
      requireVisible: false,
      requireValue: '',
      protoPluginInfo: {
        name: '',
        className: '',
        status: '',
        requires: []
      },
      ProtoDialogTitle: '',
      tableData: [{
        name: 'Modbus TCP',
        className: 'cn.sia.cn.main',
        status: 'true',
        requires: ['ip', 'port']
      }],
      search: '',
      ProtoDialogVisible: false
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
  margin: 35px 55px;
  border-radius: 4px;
  // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  &-i {
    font-size: 50px;
  }
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
