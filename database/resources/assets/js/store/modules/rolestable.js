import * as types from '../mutation-types';
import api from '../../services/api/rolesTable';
import {buildSuccess, handleError} from '../../utils/utils';

const getters = {
  getRole: state => state.roles,
  getRolePageCount: state => state.rolePageCount,
  getPermission: state => state.perms,
  getPermissionnames: state => state.permnames,
  getPermissionModel:state => state.permsmodel,
  getpremblongtorole:state => state.premsblong,
  updatePermission:state => state.permupdate,
  permissionidobj:state => state.permidobj,
  permissionid:state => state.permid
}

const actions = {
  /**
   *
   * @param commit
   * @param payload
   * @returns {Promise<unknown>}
   */
  /** get Role **/

  getRoleFunction({commit}, payload) {
    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING, true);
      api
        .getRole(payload)
        .then(response => {
          if (response.status === 200) {
            state.roles = response.data.data;
            state.rolePageCount = response.data.lastPage;
            resolve(response.data.data.data);
          }
          commit(types.SHOW_LOADING, false);
        })
        .catch(error => {
          handleError(error, commit, reject);
        })
    });
  },
  getPermissionFunction({commit}, payload) {
    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING, true);
      api
        .getPermission(payload)
        .then(response => {
          if (response.status === 200) {
            state.perms = response.data.message
            state.permnames = response.data.message.map(function(a){return a["name"];})
            state.premsblong = response.data.message.map(function(a){return a["belongs_to_role"];})
            state.permsmodel = []
           for(var i = 0 ; i<=15 ; i++){
              if(state.premsblong[i]){
                state.permsmodel.push(state.permnames[i])

              }else{
                var check = state.permsmodel.includes(state.permnames[i])
                if(check){
                var index = state.permsmodel.indexOf(state.permnames[i]);
                state.permsmodel.splice(index, 1);
                }
              }

            }
            resolve(response.data);
          }
          commit(types.SHOW_LOADING, false);
        })
        .catch(error => {
          handleError(error, commit, reject);
        })
    });
  },
  editPermissionFunction({commit}, payload) {
    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING, true);
      api
        .updatePermission(payload)
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
  /**
   *
   * @param commit
   * @param payload
   * @returns {Promise<unknown>}
   *
   *  post ROLE
   */

  postRoleFunction({commit}, payload) {
    return new Promise((resolve, reject) => {
      api
        .postRole(payload)
        .then(response => {
          if (response.status === 200) {
            commit(types.SUCCESS, null)

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
   * edit Role
   */

  editRoleFunction({commit}, payload) {
    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING, true);
      api
        .editRole(payload)
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

  /**
   *
   * delete ROLE
   */

  deleteRoleFunction({commit}, payload) {
    return new Promise((resolve, reject) => {
      api
        .deleteRole(payload)
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
  }
}

const mutations = {}

const state = {
  roles: [],
  perms:[],
  permnames:[],
  rolepageCount: 1,
  permsmodel:[],
  premsblong:[],
  permid:[],
  permissionid:[]
}

export default {
  state,
  getters,
  mutations,
  actions
}
