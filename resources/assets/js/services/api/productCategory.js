import axios from 'axios'

export default {
  getAll() {
    return axios.get(`/productCategory` , {
      params: {
        all: true ,
      }
    }) ;
  },
  getList(page) {
    return axios.get(`/productCategory` , {
      params: {
        page: page
      }
    }) ;
  } ,
  delete(id) {
    return axios.delete(`/productCategory/${id}`);
  } ,
  create(payload) {
    return axios.post(`/productCategory/` , payload);
  } ,
  edit(id ,payload) {
    return axios.put(`/productCategory/${id}` , payload);
  }

}
