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
            <el-form-item label="转发地址">
              <el-tooltip class="item"
                          effect="dark"
                          content="请配置数据转发地址(云端)"
                          placement="top-start">
                <el-input v-model="mqttConfig.address"
                          placeholder="请输入转发地址"
                          prop="address" />
              </el-tooltip>

            </el-form-item>
            <el-form-item label="转发端口">
              <el-input v-model="mqttConfig.address"
                        placeholder="请输入转发端口" />
            </el-form-item>
            <el-form-item label="用户名">
              <el-input v-model="mqttConfig.username"
                        placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="mqttConfig.password"
                        placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="主题">
              <el-input v-model="mqttConfig.topic"
                        placeholder="请输入转发主题"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"
                         @click="onSubmitConfigTransport">保存</el-button>
            </el-form-item>
          </el-form>
        </el-col>

      </el-row>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { saveConfigTransport, getConfigTransport } from '@/api/settings'

export default {
  name: 'Setting',
  created() {
    this.getConfigInfo()
  },
  methods: {
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
      mqttConfig: {
        address: '',
        username: '',
        password: '',
        topic: ''
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
  margin: 35px 55px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  &-i {
    font-size: 50px;
  }
}
.configitems {
  margin: 10px 50px;
}
</style>
