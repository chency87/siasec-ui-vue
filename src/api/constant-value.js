export function getInitialAccessWay() {
  return [{
    value: 'bindMethod',
    label: '监听方式',
    children: [{
      value: 'identityAuth',
      label: '标识认证',
      leaf: true
    }, {
      value: 'certAuth',
      label: '证书认证',
      leaf: true
    }]
  }, {
    value: 'fetchMethod',
    label: '采集方式',
    children: []
  }]
}

export function getInitialAccessRule() {
  return [{
    value: 'READ',
    label: '查看设备'
  }, {
    value: 'WRITE',
    label: '修改设备',
    disabled: true
  }, {
    value: 'DELETE',
    label: '删除设备'
  }, {
    value: 'EXEC_DATA_FETCH_JOB',
    label: '启停设备'
  }, {
    value: 'READ_CREDENTIALS',
    label: '查看接入标识'
  }, {
    value: 'WRITE_CREDENTIALS',
    label: '修改接入标识'
  }, {
    value: 'READ_ATTRIBUTES',
    label: '查看设备属性'
  }, {
    value: 'WRITE_ATTRIBUTES',
    label: '修改设备属性'
  }, {
    value: 'READ_TELEMETRY',
    label: '查看设备数据'
  }, {
    value: 'WRITE_TELEMETRY',
    label: '写入设备数据'
  }, {
    value: 'WRITE_ACCESS_RULE',
    label: '写入设备规则'
  }, {
    value: 'READ_ACCESS_RULE',
    label: '读取设备规则'
  }]
}
