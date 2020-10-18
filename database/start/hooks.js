const {hooks} = require('@adonisjs/ignitor')
const Helpers = use('Helpers')

hooks.after.providersBooted(async () => {


  const Validator = use('Validator')
  const nationalCodeFn = async (data, field, message, args, get) => {
    const value = get(data, field)
    if (!value) {
      /**
       * skip validation if value is not defined. `required` rule
       * should take care of it.
       */
      return
    }
    if (!/^\d{10}$/.test(value)
      || value === '0000000000'
      || value === '1111111111'
      || value === '2222222222'
      || value === '3333333333'
      || value === '4444444444'
      || value === '5555555555'
      || value === '6666666666'
      || value === '7777777777'
      || value === '8888888888'
      || value === '9999999999') {
      throw message
    }
    let check = parseInt(value[9]);
    let sum = 0;
    let i;
    for (i = 0; i < 9; ++i) {
      sum += parseInt(value[i]) * (10 - i);
    }
    sum %= 11;
    if (!((sum < 2 && check === sum) || (sum >= 2 && check + sum === 11))) {
      throw message
    }
  }

  const Env = use('Env')
  Validator.extend('nationalCode', nationalCodeFn)

  let front_deactivate = Env.get('FRONTEND_DEACTIVATE') ;

  if (front_deactivate === 'false') {
    loadFront() ;
  }

})


function loadFront() {

  const Env = use('Env')
  const View = use('View')

  const mixManifest = require(Helpers.publicPath('mix-manifest.json'))

  View.global('app_name', () => {
    return Env.get('APP_NAME') ;
  })

  View.global('versionjs', (filename) => {
    filename = `/js/${filename}.js`
    if (!mixManifest.hasOwnProperty(filename)) {
      throw new Error('Could not find asset for versioning' + filename)
    }

    return mixManifest[filename]
  })

  View.global('versioncss', (filename) => {
    filename = `/css/${filename}.css`
    if (!mixManifest.hasOwnProperty(filename)) {
      throw new Error('Could not find asset for versioning' + filename)
    }

    return mixManifest[filename]
  })
  // set global url
  View.global('app_url', function () {
    return Env.get('APP_URL')
  })


  View.global('versionjs', (filename) => {
    filename = `/js/${filename}.js`
    if (!mixManifest.hasOwnProperty(filename)) {
      throw new Error('Could not find asset for versioning' + filename)
    }

    return mixManifest[filename]
  })

}
