import axios from "axios";

export default {
  /**
   *
   * post User
   */
  postUser(payload) {
    return axios.post("/user", payload);
  },

  /**
   *
   * get User
   */
  getUser(page, filters) {
    return axios.get("/user", {
      params: {
        page: page,
        ...filters
      }
    });
  },

  getAllUsers(filters) {
    return axios.get("/user", {
      params: {
        all: 1,
        ...filters
      }
    });
  },

  /**
   *
   * edit User
   */

  editUser(payload) {
    let newPayload = {
      id: payload.id,
      name: payload.name,
      username: payload.username,
      password: payload.password,
      email: payload.email,
      phone_number: payload.phone_number,
      password_confirmation: payload.password_confirmation,
      national_code: payload.national_code
    };
    return axios.put("/user/" + payload.id, newPayload);
  },

  /**
   *
   * delete User
   */
  deleteUser(itemId) {
    return axios.delete("/user/" + itemId);
  },

  currentPermissions() {
    return axios.get("/user/currentPermissions");
  },
  /**
   *
   * Get user Roles
   */
  getUserRoles(itemId) {
    return axios.get("/user/" + itemId + "/roles/" + "?mapped=" + itemId);
  },
  /**
   *
   * Update user Roles
   */
  updateUserRoles(payload) {
    let newPayload = {
      id: payload.id,
      roles: payload.roles
    };
    return axios.put("/user/" + payload.id + "/updateRoles/", newPayload);
  },
  getCurrentPermissions() {
    return axios.get("user/currentPermissions");
  } ,

  /**
   * @param  {array} groups -
   * @return - updated groups list for user
   */
  async updateGroups(user_id ,groups) {
    let res = await axios.put(`/user/${user_id}/group` , {groups}) ;
    return res.data.data.groups ;
  } ,
  /**
   * @param  {array} projects -
   * @return - updated projects list for user
   */
  async updateProjects(user_id , projects) {
    let res = await axios.put(`/user/${user_id}/project` , {projects}) ;
    return res.data.data.projects ;
  }
};
