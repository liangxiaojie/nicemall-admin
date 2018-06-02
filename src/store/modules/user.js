import { login, logout, getInfo } from '@/api/login';
import { getToken, setToken, removeToken } from '@/utils/auth';

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      /* eslint no-unused-vars: 0 */
      return new Promise((resolve, reject) => {
        login(userInfo.username.trim(), userInfo.password).then((res) => {
          const { username } = res.data;
          setToken(username);
          commit('SET_TOKEN', username);
          resolve();
        }).catch((error) => {
          reject(error)
        });
      });
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then((response) => {
          const { roles, username, avatar } = response.data;
          if (roles && roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', roles);
          } else {
            /* eslint prefer-promise-reject-errors: 0 */
            reject('getInfo: roles must be a non-null array !');
          }
          commit('SET_NAME', username);
          commit('SET_AVATAR', avatar);
          resolve(response);
        }).catch((error) => {
          reject(error)
        });
      });
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('SET_TOKEN', '');
          commit('SET_ROLES', []);
          removeToken();
          resolve();
        }).catch((error) => {
          // reject(error)
          commit('SET_TOKEN', '');
          commit('SET_ROLES', []);
          removeToken();
          resolve();
        });
      });
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '');
        removeToken();
        resolve();
      });
    },
  },
};

export default user;
