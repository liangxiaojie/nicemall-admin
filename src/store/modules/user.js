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
      const username = userInfo.username.trim();
      /* eslint no-unused-vars: 0 */
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then((response) => {
          const { token } = response.data;
          setToken(token);
          commit('SET_TOKEN', token);
          resolve();
        }).catch((error) => {
          // reject(error)
          const data = {
            roles: ['admin'],
            token: 'admin',
            introduction: '我是超级管理员',
            avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
            name: 'Super Admin',
          };
          setToken(data.token);
          commit('SET_TOKEN', data.token);
          resolve();
        });
      });
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then((response) => {
          const { roles, name, avatar } = response.data;
          if (roles && roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', roles);
          } else {
            /* eslint prefer-promise-reject-errors: 0 */
            reject('getInfo: roles must be a non-null array !');
          }
          commit('SET_NAME', name);
          commit('SET_AVATAR', avatar);
          resolve(response);
        }).catch((error) => {
          // reject(error)
          const data = {
            roles: ['admin'],
            token: 'admin',
            introduction: '我是超级管理员',
            avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
            name: 'Super Admin',
          };
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles);
          } else {
            /* eslint prefer-promise-reject-errors: 0 */
            reject('getInfo: roles must be a non-null array !');
          }
          commit('SET_NAME', data.name);
          commit('SET_AVATAR', data.avatar);
          resolve(data);
        });
      });
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
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
