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
                          prop="topicPattern"
                          :rules="[
                            { required: true, message: '请输入转发TOPIC', trigger: 'blur' }
                          ]">
              <el-input v-model="mqttConfig.topicPattern"
                        placeholder="请输入转发主题"></el-input>
            </el-form-item>
            <el-form-item label="Host"
                          :rules="[
                            { required: true, message: '请输入转发地址', trigger: 'blur' }
                          ]">
              <el-input v-model="mqttConfig.host"
                        placeholder="请输入转发地址"
                        prop="host" />
            </el-form-item>
            <el-form-item label="Port"
                          prop="port"
                          :rules="[
                            { required: true, message: '端口不能为空'},
                            { type: 'number', message: '端口必须为数字值'}
                          ]">
              <el-input v-model.number="mqttConfig.port"
                        placeholder="请输入转发端口" />
            </el-form-item>
            <el-form-item label="Timeout">
              <el-input v-model="mqttConfig.connectTimeoutSec"
                        placeholder="请输入转发端口" />
            </el-form-item>
            <el-form-item label="认证方式">
              <el-radio border
                        v-model="mqttConfig.credentials.type"
                        label="anonymous">Anonymous</el-radio>
              <el-radio v-model="mqttConfig.credentials.type"
                        border
                        label="basic">Basic</el-radio>
            </el-form-item>
            <el-form-item label="用户名"
                          v-show="mqttConfig.credentials.type == 'basic'">
              <el-input v-model="credentialInfo.username"
                        placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码"
                          v-show="mqttConfig.credentials.type == 'basic'">
              <el-input v-model="credentialInfo.password"
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
      if (this.mqttConfig.credentials.type === 'basic') {
        this.mqttConfig.credentials['username'] = this.credentialInfo.username
        this.mqttConfig.credentials['password'] = this.credentialInfo.password
      }
      saveConfigTransport(this.mqttConfig).then(res => {
        this.getConfigInfo()
      })
    },
    getConfigInfo() {
      getConfigTransport().then(res => {
        if (res !== '') {
          this.mqttConfig = res
        }
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
      credentialInfo: {
        username: '',
        password: ''
      },
      mqttConfig: {
        host: 'localhost',
        port: 1883,
        connectTimeoutSec: 10,
        cleanSession: true,
        ssl: false,
        clientId: null,
        topicPattern: 'transport-topic',
        credentials: {
          type: 'anonymous'

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
