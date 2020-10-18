import * as types from '../mutation-types';
import api from '../../services/api/usersTable';
import {buildSuccess, handleError} from '../../utils/utils';

const getters = {
  getUser: state => state.users,
  getUserPageCount: state => state.userPageCount,
  getUserRole: state => state.userroles,
  getAllUsers: state => state.allUsers ,
}

const actions = {
  /**
   *
   * @param commit
   * @param payload
   * @returns {Promise<unknown>}
   */
  /** get User **/

  getUserFunction({commit}, payload) {
    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING, true);
      api
        .getUser(payload , {
          with_groups: true ,
          with_projects: true ,
        })
        .then(response => {
          if (response.status === 200) {
            let users = response.data.data.data;
            commit('SAVE_USERS' , users);
            state.userPageCount = response.data.data.lastPage;
            resolve(response.data.data.data);
          }
          commit(types.SHOW_LOADING, false);
        })
        .catch(error => {
          handleError(error, commit, reject);
        })
    });
  },



  fetchAllUsers({commit}, payload) {
    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING, true);
      api
        .getAllUsers(payload)
        .then(response => {
          if (response.status === 200) {
            let all_users = response.data.data ;
            commit("SAVE_ALL_USERS" , all_users) ;
            resolve();
          }
          commit(types.SHOW_LOADING, false);
        })
        .catch(error => {
          handleError(error, commit, reject);
        })
    });
  },

  /**
   *
   * @param commit
   * @param payload
   * @returns {Promise<unknown>}
   *
   *  post User
   */

  postUserFunction({commit}, payload) {
    return new Promise((resolve, reject) => {
      api
        .postUser(payload)
        .then(response => {
          if (response.status === 200) {
            commit(types.SUCCESS, null)
            // commit(types.USERS, payload)
            buildSuccess({
                msg: "common.SAVED_SUCCESSFULLY"
              },
              commit,
              resolve,
              commit(types.SHOW_LOADING, false));
          }
          commit(types.ERROR, null)
        })
        .catch(error => {
          handleError(error, commit, reject);
        })
    });
  },

  /**
   *
   *
   * edit User
   */

  editUserFunction({commit}, payload) {
    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING, true);
      api
        .editUser(payload)
        .then(response => {
          if (response.status === 200) {
            commit(types.SUCCESS, null)
            // commit(types.USERS, payload)
            buildSuccess({
                msg: "common.SAVED_SUCCESSFULLY"
              },
              commit,
              resolve,
              commit(types.SHOW_LOADING, false)
            );
          }
          commit(types.ERROR, null)
        })
        .catch(error => {
          handleError(error, commit, reject);
        })
    });
  },

  /**
   *
   * delete User
   */

  deleteUserFunction({commit}, payload) {
    return new Promise((resolve, reject) => {
      api
        .deleteUser(payload)
        .then(response => {
          if (response.status === 200) {
            buildSuccess({
                msg: "common.DELETE"
              },
              commit,
              resolve);
          }
        })
        .catch(error => {
          handleError(error, commit, reject);
        })
    });
  },
  getUserRolesFunction({commit}, payload) {
    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING, true);
      api
        .getUserRoles(payload)
        .then(response => {
          if (response.status === 200) {
            state.userroles = response.data.message;

            resolve(response.data);
          }
          commit(types.SHOW_LOADING, false);
        })
        .catch(error => {
          handleError(error, commit, reject);
        })
    });
  },
  UpdateUserRolesFunction({commit}, payload) {
    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING, true);
      api
        .updateUserRoles(payload)
        .then(response => {
          if (response.status === 200) {
            commit(types.SUCCESS, null)

            buildSuccess({
                msg: "common.SAVED_SUCCESSFULLY"
              },
              commit,
              resolve,
              commit(types.SHOW_LOADING, false)
            );
          }
          commit(types.ERROR, null)
        })
        .catch(error => {
          handleError(error, commit, reject);
        })
    });
  },
  updateUsersGroups({commit}, payload) {
    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING, true);
      api
        .updateGroups(payload.user_id , payload.groups)
        .then(data => {
          // update user
          commit('UPDATE_USERS_GROUPS', {
            user_id: payload.user_id ,
            groups: data ,
          });
          resolve() ;
        })
        .catch(error => {
          handleError(error, commit, reject);
        })
        .then(() => {
          commit(types.SHOW_LOADING, false);
        })
    });
  },

  updateUsersProjects({commit}, payload) {
    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING, true);
      api
        .updateProjects(payload.user_id , payload.projects)
        .then(data => {
          // update user
          commit('UPDATE_USERS_PROJECTS', {
            user_id: payload.user_id ,
            project: data ,
          });
          resolve() ;
        })
        .catch(error => {
          handleError(error, commit, reject);
        })
        .then(() => {
          commit(types.SHOW_LOADING, false);
        })
    });
  },
}

const mutations = {
  SAVE_ALL_USERS(state , payload) {
    state.allUsers = payload ;
  } ,
  SAVE_USERS(state, payload) {
    state.users = payload ;
  } ,
  UPDATE_USERS_GROUPS(state, payload) {
    state.users.forEach((user) => {
      if (user.id === payload.user_id) {
        user.groups = payload.groups ;
      }
    })
  } ,
  UPDATE_USERS_PROJECTS(state, payload) {
    state.users.forEach((user) => {
      if (user.id === payload.user_id) {
        user.projects = payload.projects ;
      }
    })
  }
}

const state = {
  users: [],
  userroles:[],
  userPageCount: 1,
  allUsers: [] , // this store all users without pagination
}

export default {
  state,
  getters,
  mutations,
  actions
}
