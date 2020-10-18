'use strict'

const Env = use('Env') ;
// json parse to turn string boolean to real boolean
let swagger_active = JSON.parse(Env.get('SWAGGER_ACTIVE')) ;

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | Swagger Information
  | Please use Swagger 2 Spesification Docs
  | https://swagger.io/docs/specification/2-0/basic-structure/
  |--------------------------------------------------------------------------
  */

  enable: !!swagger_active,
  specUrl: '/swagger.json',

    options: {
      swaggerDefinition: {
        info: {
          title: 'FS',
          version: '1.0.0',
        },

        basePath: '/api/',

        // Example security definitions.
        securityDefinitions: {
          Authorization : {
            description: 'token',
            type: 'apiKey' ,
            name: 'Authorization' ,
            in: 'header' ,
          },
        } ,
        security: [
          {
            "Authorization": [] ,
          } ,
        ] ,
        responses: {
          200: {
            description: "درخواست با موفقیت انجام شد"
          } ,
          401: {
            description: "برای دسترسی به این سرویس میبایست وارد حساب کاربری خود شوید"
          } ,
          403: {
            description: "دسترسی به سرویس مورد نظر برای کاربر وجود ندارد"
          } ,
          404: {
            description: "سرویس مورد نظر یافت نشد"
          } ,
          406: {
            description: "اطلاعات ارسال شده به سامانه دارای فرمت ناصحیح یا ناقص میباشند"
          }
        }

      },

      // doc path
      apis: [
        'app/*.js',
        'start/routes.js' ,
        'docs/*.yml'
      ] ,
  }
}
