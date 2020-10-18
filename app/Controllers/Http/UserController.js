"use strict";

const Hash = use("Hash");
const User = use("App/Models/User");
const Role = use("Role");
const { validate } = use("Validator");
const { HttpException } = require("node-exceptions");

/**
 * class User Controller
 */
class UserController {
  async index({ request, response, params }) {

    let query = User.query();

    if (request.input('with_groups')) {
      query.with('groups') ;
    }

    if (request.input('with_projects')) {
      query.with('projects') ;

    }

    let users = request.input('all') ?
      (await query.fetch()) :
      (await query.paginate(request.page)) ;

    return response.ok({
      status: true,
      data: users.toJSON()
    });
  }

  /**
   * create an user
   *
   * @param auth
   * @param response
   * @returns {Promise<*|Promise<any>>}
   */
  async store({ request, auth, response }) {
    const rules = {
      name: "required|string",
      username: "required|alpha_numeric|unique:users,username",
      email: "required|email|unique:users,email",
      phone_number: "required|unique:users,phone_number|starts_with:0|min:6",
      password: "required|confirmed",
      national_code: "required|integer",
      bio: "string|min:0|max:250"
    };

    const user_data = request.only([
      "name",
      "username",
      "email",
      "phone_number",
      "password",
      "national_code",
      "bio",
      "password_confirmation"
    ]);

    const validation = await validate(user_data, rules);
    if (validation.fails()) {
      return response.notAcceptable({
        status: "Failed",
        message: validation.messages()
      });
    }

    delete user_data.password_confirmation;

    const user = await User.create(user_data);
    return response.ok({
      status: true,
      data: user.toJSON()
    });
  }
  /**
   * show all users
   * @param prams
   * @param auth
   * @param response
   * @returns {Promise<*|Promise<any>>}
   */
  async show({ request, auth, response, params }) {
    const user = await User.query()
      .where("id", parseInt(params.id))
      .first();

    if (!user) {
      throw new HttpException("user not found" , 404);
    }

    return response.ok({
      status: true,
      data: user.toJSON()
    });
  }

  /**
   * update an user
   * @param prams
   * @param auth
   * @param response
   * @returns {Promise<*|Promise<any>>}
   */
  async update({ request, auth, response, params }) {

    let username = request.input("username");
    let phone_number = request.input("phone_number");
    let email = request.input("email");

    const rules = {
      name: "required|string",
      username: `required|alpha_numeric|unique:users,username,username,${username}`,
      email: `required|email|unique:users,email,email,${email}`,
      phone_number: `required|unique:users,phone_number,phone_number,${phone_number}|starts_with:0|min:6`,
      national_code: "required|integer",
      bio: "string|min:0|max:250"
    };

    const user_data = request.only([
      "name",
      "username",
      "email",
      "phone_number",
      "national_code",
      "bio"
    ]);

    const validation = await validate(user_data, rules);
    if (validation.fails()) {
      return response.notAcceptable({
        status: "Failed",
        message: validation.messages()
      });
    }


    const user = await User.query()
      .where("id", parseInt(params.id))
      .first();

    if (!user) {
      throw new HttpException("user not found", 404);
    }


    user.name = user_data.name;
    user.username = user_data.username;
    user.email = user_data.email;
    user.phone_number = user_data.phone_number;
    user.national_code = user_data.national_code;
    user.bio = user_data.bio;

    // check if password field exist and add to data
    if (request.input("password")) {
      let password = request.input("password");
      let password_confirm = request.input("password_confirmation");

      if (password != password_confirm) {
        return response.notAcceptable({
          status: "failed",
          message: "password confirmation does not match"
        });
      }

      // everything ok . add new password for user
      user.password = password;
    }

    await user.save();

    return response.ok({
      status: "success",
      message: "User updated!!!"
    });
  }

  async destroy({ request, auth, response, params }) {
    const user = await User.query()
      .where("id", parseInt(params.id))
      .first();

    if (!user) {
      throw new HttpException("user not found" , 404);
    }

    await user.delete();
    response.ok({
      status: "success",
      message: "User deleted!!!"
    });
  }

  /**
   * assign a role to a user
   * @param prams
   * @param auth
   * @param response
   * @returns {Promise<*|Promise<any>>}
   */
  async role({ request, auth, response, params }) {
    const rules = {
      role: "required"
    };
    const data = request.only(["role"]);

    const validation = await validate(data, rules);
    if (validation.fails()) {
      return response.notAcceptable({
        status: "Failed",
        message: validation.messages()
      });
    }

    const user = await User.query()
      .where("id", parseInt(params.id))
      .firstOrFail();
    await user.roles().sync(data.role);
    await user.load("roles");
    await response.ok({
      status: "success",
      data: user.toJSON()
    });
  }

  /**
   * get all the roles for a user
   * @returns {Promise<void>}
   */
  async roles({ request, response, params }) {
    let user_id = params.id;
    let mapped = request.get()["mapped"];
    let user = await User.find(user_id);

    if (!user) {
      throw new HttpException("User not found" , 404);
    }

    let user_roles_final;

    // if parameter mapped is send get all roles and map with the one that user have
    if (mapped) {
      let roles = (await Role.all()).toJSON();
      let user_roles = (await user.roles().fetch()).toJSON();

      for (let i = 0; i < roles.length; i++) {
        let role_found = user_roles.find(role => {
          return roles[i].slug == role.slug;
        });
        // if role is in users role add flag
        if (role_found) {
          roles[i].belong_to_user = true;
        } else {
          roles[i].belong_to_user = false;
        }
      }
      user_roles_final = roles;
    } else {
      user_roles_final = (await user.roles().fetch()).toJSON();
    }

    return response.ok({
      status: "success",
      message: user_roles_final
    });
  }

  /**
   * update a users roles
   * {array}request.roles - array if roles that should be synced with user
   * @param request
   * @param response
   * @param params
   * @returns {Promise<void>}
   */
  async updateRoles({ request, response, params }) {

    const rules = {
      roles: "required|array"
    };

    const data = request.only(["roles"]);

    const validation = await validate(data, rules);

    if (validation.fails()) {
      return response.notAcceptable({
        status: "Failed",
        message: validation.messages()
      });
    }

    let user = await User.find(params.id);
    await user.roles().sync(data.roles);

    return response.ok({
      status: "success",
      message: "Roles Updated Successfully"
    });

  }

  /**
   * get all permissions that current useer have
   * @param request
   * @param response
   * @param pararms
   * @param auth
   * @returns {Promise<void>}
   */
  async currentPermissions({ request, response, auth }) {
    // for now just permissions for roles that user have is enough ,
    // later directly getting permissions for user might be necessary

    let user = await User.find(auth.user.id) ;
    let permissions = await user.getPermissions() ;

    return response.ok({
      status: "success",
      data: permissions,
    });
  }

  async getGroups({request , response , params}) {

    let user = await User.findOrFail(params.id) ;

    let query = user.projects() ;

    let projects = request.input('all') ?
      (await query.fetch()) :
      (await query.paginate(request.page))

    return response.ok({
      status: true,
      data: projects.toJSON()
    });

  }


  async getProjects({request , response , params}) {

    let user = await User.findOrFail(params.id) ;

    let query = user.projects() ;

    let projects = request.input('all') ?
      (await query.fetch()) :
    (await query.paginate(request.page))

    return response.ok({
      status: true,
      data: projects.toJSON()
    });

  }


  async updateGroups({params , request , response}) {

    let user = await User.findOrFail(params.id);

    let rules = {
      groups: 'required',
    }

    let data = request.only(['groups']);

    const validation = await validate(data, rules);
    if (validation.fails()) {
      return response.notAcceptable({
        status: 'Failed',
        message: validation.messages()
      });
    }

    await user.groups().sync(data.groups);
    let groups = await user.groups().fetch() ;

    return response.ok({
      status: true,
      message: 'Groups Updated Successfully' ,
      data: {
        groups: groups.toJSON() ,
      }
    });
  }

  async updateProjects({params , request , response}) {

    let user = await User.findOrFail(params.id);

    let rules = {
      projects: 'required',
    }

    let data = request.only(['projects']);

    const validation = await validate(data, rules);
    if (validation.fails()) {
      return response.notAcceptable({
        status: 'Failed',
        message: validation.messages()
      });
    }

    await user.projects().sync(data.projects);
    let projects = await user.projects().fetch() ;

    return response.ok({
      status: true,
      message: 'Projects Updated Successfully' ,
      data: {projects}
    });

  }

}

module.exports = UserController;
