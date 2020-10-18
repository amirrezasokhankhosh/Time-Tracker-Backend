'use strict'
const Helpers = use( 'Helpers' );

class FileController {
  /**
   * store an image file.
   * @param prams
   * @param auth
   * @param response
   * @returns {Promise<*|Promise<any>>}
   */
  async store ({ request, auth, response }){

    const rules = {
      type: ['image'],
      size: '25mb'
    }
    const file = request.file( 'file', rules )

    let file_code =  `${new Date().getTime()}.${file.subtype}` ;

    await file.move( Helpers.tmpPath( 'uploads' ), {
      name: file_code ,
      overwrite: true
    }) ;

    if ( !file.moved() ) {
      response.internalServerError( {
        status: 'Failed',
        message: 'There is an internal error!!!'
      } )
    } else {
      response.ok({
        status: 'Success',
        data: {
          clientName: file.clientName ,
          fileName: file.fileName ,
          type: file.type ,
          size: file.size ,
        } ,
      })
    }
  }
  /**
   * retrieve an image
   * @param prams
   * @param auth
   * @param response
   * @returns {Promise<*|Promise<any>>}
   */
  async retrieve ({ request, auth, response, params }){

    try{
      const file = await Helpers.tmpPath( `uploads/${params.filename}` )
      console.log(file) ;
      response.status(200).attachment(
        file
      )
    } catch ( e ){
      response.notFound( {
        status: 'Failed',
        message: 'File not found'
      } )
    }

  }
}

module.exports = FileController;
