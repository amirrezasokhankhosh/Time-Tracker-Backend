import * as types from '../mutation-types';
import api from '../../services/api/group' ;
import {buildSuccess, handleError} from '../../utils/utils';

const getters = {
  getAll: state => state.allGroups,
}

const actions = {

  fetch({commit , getters} , payload) {

    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING , true , {root: true});
      api
        .getList(state.pageInfo.page)
        .then(response => {
          commit(types.SUCCESS, null , {root: true})
          commit(types.ERROR, null , {root: true})
          let groups_response = response.data.data ;
          commit("SAVE_GROUPS" , groups_response.data) ;
          commit("SAVE_PAGE_INFO" , {
            page:  groups_response.page ,
            lastPage: groups_response.lastPage ,
            perPage: groups_response.perPage ,
            total: groups_response.total ,
          }) ;
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

  fetchAll({commit , getters} , payload) {
    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING , true , {root: true});
      api
        .getAll()
        .then(response => {
          commit(types.SUCCESS, null , {root: true})
          commit(types.ERROR, null , {root: true})
          commit("SAVE_ALL" ,response.data.data ) ;
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
  delete({commit , dispatch} , product_id) {

    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING, true, {root: true});
      api
        .delete(product_id)
        .then(response => {
          dispatch('fetch')
            .then(() => {
              commit(types.SUCCESS, null, {root: true})
              commit(types.ERROR, null, {root: true})
              resolve();
            })
        })
        .catch(error => {
          handleError(error, commit, reject);
        })
        .then(() => {
          commit(types.SHOW_LOADING, false, {root: true});
        })
    }) ;
  } ,
  add({commit , dispatch} , payload) {

    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING, true, {root: true});
      api
        .create(payload)
        .then(response => {
          dispatch('fetch')
            .then(() => {
              commit(types.SUCCESS, null, {root: true})
              commit(types.ERROR, null, {root: true})
              resolve();
            })
        })
        .catch(error => {
          handleError(error, commit, reject);
        })
        .then(() => {
          commit(types.SHOW_LOADING, false, {root: true});
        })
    }) ;
  } ,
  edit({commit , dispatch} , payload) {
    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING, true, {root: true});
      api
        .edit(payload.id , payload.data)
        .then(response => {
          dispatch('fetch')
            .then(() => {
              commit(types.SUCCESS, null, {root: true})
              commit(types.ERROR, null, {root: true})
              resolve();
            })
        })
        .catch(error => {
          handleError(error, commit, reject);
        })
        .then(() => {
          commit(types.SHOW_LOADING, false, {root: true});
        })
    }) ;
  } ,
}

const mutations = {
  SAVE_GROUPS(state , payload) {
    state.groups = payload ;
  } ,
  SAVE_PAGE_INFO(state , payload) {
    state.pageInfo = payload ;
  } ,
  UPDATE_PAGE(state , payload) {
    state.pageInfo.page = payload ;
  } ,
  SAVE_ALL(state , payload) {
   state.allGroups = payload ;
  }

}

const state = {
  groups: [],
  allGroups: [] ,
  pageInfo: {
    page: 1 ,
  } ,
}

export default {
  namespaced: true ,
  state,
  getters,
  mutations,
  actions
}
