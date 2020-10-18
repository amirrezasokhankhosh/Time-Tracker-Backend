import axios from 'axios'

export default {
  getList(page) {
    return axios.get('/product/' , {
      params: {
        page: page ,
      }
    }) ;
  } ,
  getById(id) {
    return axios.get(`/product/${id}`) ;
  } ,
  create(data) {
    return axios.post(`/product/` , data) ;
  } ,
  edit(id , data) {
    return axios.put(`/product/${id}` , data) ;
  } ,
  delete(id) {
    return axios.delete(`/product/${id}`) ;
  }
}
