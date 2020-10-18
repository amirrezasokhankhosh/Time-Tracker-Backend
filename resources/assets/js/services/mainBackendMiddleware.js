import * as types from "../store/mutation-types";
import {store} from "../store" ;


export default async function mainBackendMiddleware(
  serviceFunction , payload ,
  options)
{

  if (!options.loading) { options.loading = 'FULL_PAGE' } ;
  if (!options.handle_error) { options.handle_erorr = true } ;

  if (options.loading === 'FULL_PAGE') {
    store.commit(types.SHOW_LOADING, true , {root: true})
  }

  try {
    let res = await serviceFunction(payload) ;
    return res ;
  } catch (e) {

    // hide loading
    store.commit(types.SHOW_LOADING, false , {root: true})

    if (options.handle_error) {
      handleError(e) ;
    } else {
      throw e ;
    }
  }
}



/**
 * handle error from axios response
 * @param error - axios error object
 */
function handleError(error) {

  let errMsg =  ''

  // if response is not defined then connection failed
  if (!error.response) {
    errMsg = 'SERVER_TIMEOUT_CONNECTION_ERROR' ;
  } else {
    errMsg = getErrorMessage(error.response) ;
  }


  // Checks if unauthorized and logout of account
  // todo - add custom error type for token expire
  if (error.response.status === 401 &&
    error.response.data.type !== 'WRONG_USER_PASS') {
    console.log(error.response.data.type) ;
    console.log('401') ;
    store.dispatch('userLogout')
  }

  throw Error(errMsg) ;

}


/**
 * @param error_response - axios error response
 * @returns {string} return erorr response to show to user
 */
function getErrorMessage(error_response) {
  let errMsg = '' ;

  if (error_response.status === 406) {
    errMsg = error_response.data.message[0].message ;
  } else {
    errMsg = error_response.data.message ;
  }

  return errMsg ;
}
