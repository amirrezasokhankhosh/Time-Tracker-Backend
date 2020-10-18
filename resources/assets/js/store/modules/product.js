import * as types from '../mutation-types';
import product_api from '../../services/api/product' ;
import {buildSuccess, handleError} from '../../utils/utils';

const getters = {
  getList: state => state.products ,
  getPageInfo: state => state.pageInfo ,
}

const actions = {

  fetchProducts({commit , getters} , payload) {

    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING, true , {root: true});
      product_api
        .getList(getters.getPageInfo.page)
        .then(response => {
          commit(types.SUCCESS, null , {root: true})
          commit(types.ERROR, null , {root: true})
          let products_response = response.data.data ;
          commit("SAVE_PRODUCTS" , products_response.data) ;
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
  deleteProduct({commit} , product_id) {

    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING, true, {root: true});
      product_api
        .delete(product_id)
        .then(response => {
          commit(types.SUCCESS, null, {root: true})
          commit(types.ERROR, null, {root: true})
          resolve();
        })
        .catch(error => {
          handleError(error, commit, reject);
        })
        .then(() => {
          commit(types.SHOW_LOADING, false, {root: true});
        })
    }) ;
  } ,
  addProduct({commit} , payload) {

    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING, true, {root: true});
      product_api
        .create(payload)
        .then(response => {
          commit(types.SUCCESS, null, {root: true})
          commit(types.ERROR, null, {root: true})
          resolve();
        })
        .catch(error => {
          handleError(error, commit, reject);
        })
        .then(() => {
          commit(types.SHOW_LOADING, false, {root: true});
        })
    }) ;
  } ,
  editProduct({commit} , payload) {
    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING, true, {root: true});
      product_api
        .edit(payload.id , payload.data)
        .then(response => {
          commit(types.SUCCESS, null, {root: true})
          commit(types.ERROR, null, {root: true})
          resolve();
        })
        .catch(error => {
          handleError(error, commit, reject);
        })
        .then(() => {
          commit(types.SHOW_LOADING, false, {root: true});
        })
    }) ;
  }

}

const mutations = {
  SAVE_PRODUCTS(state , payload) {
    state.products = payload ;
  } ,
  SAVE_PAGE_INFO(state , payload) {
    state.pageInfo = payload ;
  } ,
  UPDATE_PAGE(state , payload) {
    state.pageInfo.page = payload ;
  }

}

const state = {
  products: [],
  pageInfo: {} ,
}

export default {
  namespaced: true ,
  state,
  getters,
  mutations,
  actions
}
