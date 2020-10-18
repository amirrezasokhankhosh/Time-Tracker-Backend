import * as types from '../mutation-types';
import api from '../../services/api/project' ;
import {buildSuccess, handleError} from '../../utils/utils';

const getters = {
  getAll: state => state.allProjects,
}

const actions = {

  fetchAll({commit , getters} , payload) {
    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING , true , {root: true});
      api
        .getAll()
        .then(response => {
          commit(types.SUCCESS, null , {root: true})
          commit(types.ERROR, null , {root: true})
          commit("SET_ALL" ,response.data.data ) ;
          resolve() ;
        })
        .catch(error => {
          handleError(error, commit, reject);
        })
        .then(() => {
          commit(types.SHOW_LOADING, false , {root: true});
        })
    });
  } ,

}

const mutations = {
  SET_ALL(state , payload) {
    state.allProjects = payload ;
  } ,

}

const state = {
  allProjects: [] ,
}

export default {
  namespaced: true ,
  state,
  getters,
  mutations,
  actions
}
