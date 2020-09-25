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
