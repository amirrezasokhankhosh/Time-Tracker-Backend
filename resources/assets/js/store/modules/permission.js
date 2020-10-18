import api from '../../services/api/usersTable'
import {buildSuccess, handleError} from '../../utils/utils.js'
import {addMinutes, format} from 'date-fns'
import * as types from "../mutation-types";
import Vue from 'vue' ;

const getters = {
  havePermission: (state) => {
    return (permission_slug) => {
      let permission_found = state.userCurrentPermissions.find((permission) => {
        return permission === permission_slug;
      });
      return !!permission_found ;
    }

  }
}

const actions = {

  loadCurrentPermissions({commit}) {
    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING, true) ;
      api
        .currentPermissions()
        .then((response) => {
          commit(types.SAVE_CURRENT_PERMISSIONS , response.data.data) ;
          resolve('permissions added') ;
        })
        .catch((error) => {
          handleError(error, commit, reject)
        })
        .then(() => {
          commit(types.SHOW_LOADING, false) ;
        })
    })
  },

}

const mutations = {
  [types.SAVE_CURRENT_PERMISSIONS](state , permissions) {
    Vue.set(state, 'userCurrentPermissions', [...permissions]);
  }
}

const state = {
  userCurrentPermissions: [] ,
}

export default {
  state,
  getters,
  actions,
  mutations
}
