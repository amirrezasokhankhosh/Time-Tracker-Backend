import axios from "axios";


export default {
  /**
   *
   * post role
   */
    postRole (payload) {
      return axios.post('/role', payload);
  },

  /**
   *
   * get roles
   */
    getRole (pagecount) {
      return axios.get('/role?page='+ pagecount);
  },
  /**
   *
   * get permissions
   */
  getPermission(itemid) {
    return axios.get('/role/'+itemid+'/permissions/'+'?mapped='+itemid);
  },
  /**
   *
   * update permission
   */
  updatePermission(payload) {
    let newPayload = {
      permissions:payload.permissions
    }
    return axios.put('/role/'+payload.id+'/updatePermissions/',newPayload);
  },
  /**
   *
   * edit role
   */

    editRole (payload) {
      let newPayload = {
        id: payload.id,
        name: payload.name,
        slug: payload.slug,
        description: payload.description,
      }
      return axios.put('/role/'+payload.id,newPayload);
  },

  /**
   *
   * delete User
   */
    deleteRole(itemid) {
      return axios.delete('/role/'+itemid);
  },

 
}
