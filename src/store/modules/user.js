import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token.token
    state.refreshToken = token.refreshToken
  },
  SET_LOGIN_USER_INFO: (state, info) => {
    // {
    //   "id": {
    //     "entityType": "USER",
    //     "id": "c2433840-6f30-11ea-ae19-0f6b71de8ab6"
    //   },
    //   "createdTime": 1585206579652,
    //   "additionalInfo": {
    //     "userPasswordHistory": {
    //       "1585206579763": "$2a$10$UvLn8Qk87Kk4RGKZiBkY0OIXVkx9TYvm2DbXh0MDXGe2NDyItRfTa"
    //     },
    //     "lastLoginTs": 1592448352333,
    //     "failedLoginAttempts": 0,
    //     "lang": "zh_CN"
    //   },
    //   "tenantId": {
    //     "entityType": "TENANT",
    //     "id": "c1a12be0-6f30-11ea-ae19-0f6b71de8ab6"
    //   },
    //   "customerId": {
    //     "entityType": "CUSTOMER",
    //     "id": "13814000-1dd2-11b2-8080-808080808080"
    //   },
    //   "email": "tenant@thingsboard.org",
    //   "authority": "TENANT_ADMIN",
    //   "firstName": null,
    //   "lastName": null,
    //   "name": "tenant@thingsboard.org"
    // }
    state.name = info.name
    state.email = info.email
    state.roles = info.authority
    state.id = info.id.id
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        commit('SET_TOKEN', response)
        setToken(response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        commit('SET_LOGIN_USER_INFO', response)
        commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

