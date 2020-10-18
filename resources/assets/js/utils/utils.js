import i18n from '../plugins/i18n'
import * as types from '../store/mutation-types'
import {isPast, format} from 'date-fns'
import {store} from '../store'

const localesDateFns = {
  en: require('date-fns/locale/en'),
  es: require('date-fns/locale/es')
}

export const getFormat = (date, formatStr) => {
  return format(date, formatStr, {
    locale: localesDateFns[window.__localeId__]
  })
}

export const formatErrorMessages = (translationParent, msg) => {
  const errorArray = []
  // Check for error msgs
  if (msg !== null) {
    const json = JSON.parse(JSON.stringify(msg))
    // If error message is an array, then we have mutiple errors
    if (Array.isArray(json)) {
      json.map(error => {
        errorArray.push(i18n.t(`${translationParent}.${error.message}`))
      })
    } else {
      // Single error
      errorArray.push(i18n.t(`${translationParent}.${msg}`))
    }
    return errorArray
  }
  // all good, return null
  return null
}

export const buildPayloadPagination = (pagination, search) => {
  const {sortBy, page, rowsPerPage} = pagination
  let {descending} = pagination
  // Gets order
  descending = descending ? -1 : 1

  let query = {}

  // If search and fields are defined
  if (search) {
    query = {
      sort: sortBy,
      order: descending,
      page,
      limit: rowsPerPage,
      filter: search.query,
      fields: search.fields
    }
  } else {
    // Pagination with no filters
    query = {
      sort: sortBy,
      order: descending,
      page,
      limit: rowsPerPage
    }
  }
  return query
}


// Catches error connection or any other error (checks if error.response exists)
export const handleError = (error, commit, reject) => {
  let errMsg = ''
  // Resets errors in store
  commit(types.SHOW_LOADING, false , {root: true})
  commit(types.ERROR, null , {root: true})

  // if response is not defined in axios then connection failed
  if (!error.response) {
    errMsg = 'SERVER_TIMEOUT_CONNECTION_ERROR' ;
  } else {
    // Checks if unauthorized
    if (error.response.status === 401) {
      if (error.response.data.type === 'WRONG_USER_PASS') {
        errMsg = error.response.data.message;
      } else {
        store.dispatch('userLogout')
      }
    } else  { // normal error

      // validation error
      if (error.response.status === 406) {
        errMsg = error.response.data.message[0].message ;
      } else {
        errMsg = error.response.data.message ;
      }
    }
  }

  if (errMsg) {
    setTimeout(() => {
      commit(types.ERROR, errMsg , {root: true}) ;
      commit(types.SHOW_ERROR, false , {root: true});
    }, 0)
  }

  reject(error)
}


export const buildSuccess = (
  msg,
  commit,
  resolve,
  resolveParam = undefined
) => {
  commit(types.SHOW_LOADING, false , {root: true})
  commit(types.SUCCESS, null , {root: true})
  setTimeout(() => {
    return msg ? commit(types.SUCCESS, msg , {root: true}) :
      commit(types.SHOW_SUCCESS, false , {root: true})
  }, 0)
  commit(types.ERROR, null , {root: true})
  resolve(resolveParam)
}

// Checks if tokenExpiration in localstorage date is past, if so then trigger an update
export const checkIfTokenNeedsRefresh = () => {
  // Checks if time set in localstorage is past to check for refresh token
  if (
    window.localStorage.getItem('token') !== null &&
    window.localStorage.getItem('tokenExpiration') !== null
  ) {
    if (
      isPast(
        new Date(
          JSON.parse(window.localStorage.getItem('tokenExpiration')) * 1000
        )
      )
    ) {
      store.dispatch('refreshToken')
    }
  }
}
