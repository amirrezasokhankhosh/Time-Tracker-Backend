import * as types from '../mutation-types';
import api from '../../services/api/productCategory' ;
import {buildSuccess, handleError} from '../../utils/utils';

const getters = {
  getList: state => state.data ,
  getPageInfo: state => state.pageInfo ,
}

const actions = {

  fetchProductCategories({commit , getters} , payload) {

    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING, true , {root: true});
      api
        .getList(getters.getPageInfo.page)
        .then(response => {
          commit(types.SUCCESS, null , {root: true})
          commit(types.ERROR, null , {root: true})
          let products_response = response.data.data ;
          commit("SAVE_LIST" , products_response.data) ;
          commit("SAVE_PAGE_INFO" , {
            page:  products_response.page ,
            lastPage: products_response.lastPage ,
            perPage: products_response.perPage ,
            total: products_response.total ,
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
  deleteProductCategory({commit , getters} , payload) {

    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING, true , {root: true});
      api
        .delete(payload)
        .then(response => {
          commit(types.SUCCESS, null , {root: true})
          commit(types.ERROR, null , {root: true})
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
  addProductCategory({commit , getters} , payload) {

    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING, true , {root: true});
      api
        .create(payload)
        .then(response => {
          commit(types.SUCCESS, null , {root: true})
          commit(types.ERROR, null , {root: true})
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
  editProductCategory({commit , getters} , payload) {

    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING, true , {root: true});
      api
        .edit(payload.id , payload.data)
        .then(response => {
          commit(types.SUCCESS, null , {root: true})
          commit(types.ERROR, null , {root: true})
          resolve() ;
        })
        .catch(error => {
          handleError(error, commit, reject);
        })
        .then(() => {
          commit(types.SHOW_LOADING, false , {root: true});
        })
    });
  }
}

const mutations = {
  SAVE_LIST(state , payload) {
    state.data = payload ;
  } ,
  SAVE_PAGE_INFO(state , payload) {
    state.pageInfo = payload ;
  } ,
  UPDATE_PAGE(state , payload) {
    state.pageInfo.page = payload ;
  }

}

const state = {
  data: [],
  pageInfo: {} ,
}

export default {
  namespaced: true ,
  state,
  getters,
  mutations,
  actions
}
