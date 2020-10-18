import axios from 'axios'

export default {
  getList(page) {
    return axios.get('/group/' , {
      params: {
        page: page ,
      }
    }) ;
  } ,
  getAll() {
    return axios.get('/group/', {
      params: {
        all: true ,
      }
    });
  }
   ,
  getById(id) {
    return axios.get(`/group/${id}`) ;
  } ,
  create(data) {
    return axios.post(`/group/` , data) ;
  } ,
  edit(id , data) {
    return axios.put(`/group/${id}` , data) ;
  } ,
  delete(id) {
    return axios.delete(`/group/${id}`) ;
  } ,

}
