'use strict'
const User = use('App/Models/User')
const {validate} = use('Validator')

class AuthController {
  /**
   * sign up user
   *
   * @param request
   * @param auth
   * @param response
   * @returns {Promise<*>}
   */
  async signup({request, auth, response}) {

    const rules = {
        name: 'required|string',
        username: 'required|alpha_numeric|unique:users,username',
        email: 'required|email|unique:users,email',
        phone_number: 'required|unique:users,phone_number|starts_with:+98|min:6',
        password: 'required|confirmed',
        national_code: 'required|integer',
        bio: 'string|min:0|max:250'
      };
    // get user data from signup form
    const userData = request.only(['name', 'username', 'email',
      'phone_number', 'national_code', 'password', 'bio', "password_confirmation"]);

    const validation = await validate(userData, rules);
    if (validation.fails()) {
      return response.notAcceptable(validation.messages()) ;
    }

    // save user to database
    delete userData.password_confirmation ;
    const user = await User.create(userData);
    // generate JWT token for user
    const token = await auth.generate(user);

    return response.ok({
      status: 'success',
      data: token
    })
  }


  /**
   * login user
   *
   * @param request
   * @param auth
   * @param response
   * @returns {Promise<*|Promise<any>>}
   */
  async login({request, auth, response}) {

    const rules = {
      email: 'required|email',
      password: 'required'
    };

    // get user data from signup form
    const authData = request.only(['email', 'password']);

    const validation = await validate(authData, rules);

    if (validation.fails()) {
      return response.notAcceptable({
        status: "failed",
        message: validation.messages()
      }) ;
    }

    try {
      // validate the user credentials and generate a JWT token
      const token = await auth.attempt(
        authData.email,
        authData.password
      );

      return response.json({
        status: 'success',
        data: token
      })
    } catch (error) {
      response.unauthorized({
        type: 'WRONG_USER_PASS',
        message: 'Invalid email/password'
      })
    }
  }

  //TODO:: implement sendTokenForPasswordLessLogin method
  async sendTokenForPasswordLessLogin() {

  }

  //TODO:: implement passwordLessLogin method
  async passwordLessLogin() {

  }
}

module.exports = AuthController;
