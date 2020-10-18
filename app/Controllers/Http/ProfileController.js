'use strict'
const User = use('App/Models/User')
const {validate} = use('Validator')

class ProfileController {
  /**
   * get user profile
   *
   * @param auth
   * @param response
   * @returns {Promise<*|Promise<any>>}
   */
  async getProfile({auth, response}) {

    const user = await User.query()
      .where('id', auth.current.user.id)
      .firstOrFail();

    return response.json({
      status: 'success',
      data: user
    })
  }
  /**
   * update user profile
   *
   * @param request
   * @param auth
   * @param response
   * @returns {Promise<*>}
   */
  async updateProfile({request, auth, response}) {

    const rules = {
      email: 'required|email',
      name: 'required|string',
      username: 'required|alpha_numeric',
      phone_number: 'required|starts_with:+98|min:6',
      national_code: 'required|integer|starts_with:0',
      bio: 'string|min:0|max:250'
    };

    // get user data from signup form
    const userData = request.only(['name', 'username', 'email', 'phone_number', 'national_code', 'bio']);

    const validation = await validate( userData, rules );
    if ( validation.fails() ) {
      return response.notAcceptable({
        status: 'Failed',
        message: validation.messages()
      });
    }

    // get currently authenticated user
    const user = auth.current.user;

    // update with new data entered
    user.name = userData.name;
    user.username = userData.username;
    user.email = userData.email;
    user.location = userData.location;
    user.bio = userData.bio;
    user.website_url = userData.website_url;

    await user.save();

    return response.ok({
      status: 'success',
      message: 'Profile updated!',
      data: user
    })

  }
  /**
   * function to change password
   *
   * @param request
   * @param auth
   * @param response
   * @returns {Promise<*|Promise<any>>}
   */
  async changePassword({request, auth, response}) {

    const rules = {
      password: 'required',
      newPassword: 'required|confirmed'
    };
    /*
    * Requests for password changing should have newPassword_confirmation field.
    * */
    // get user data from signup form
    const userData = request.only(['newPassword', 'password', "newPassword_confirmation"]);

    const validation = await validate( userData, rules );
    if ( validation.fails() ) {
      return response.notAcceptable({
        status: 'Failed',
        message: validation.messages()
      });
    }

    // get currently authenticated user
    const user = auth.current.user

    // verify if current password matches
    const verifyPassword = await Hash.verify(
      userData.password,
      user.password
    )

    // display appropriate message
    if (!verifyPassword) {
      return response.unauthorized({
        status: 'error',
        message: 'Current password could not be verified! Please try again.'
      })
    }

    // hash and save new password
    user.password = await Hash.make(userData.newPassword);
    await user.save();

    return response.ok({
      status: 'success',
      message: 'Password updated!'
    })
  }
}

module.exports = ProfileController
