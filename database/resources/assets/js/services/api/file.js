import axios from 'axios'

export default {
  getFile(filename) {
    return new Promise((resolve , reject) => {
      axios.get(`/file/${filename}` , {
        responseType:"blob" ,
      })
        .then((response) => {
          let blob = new Blob(
            [response.data],
            { type: response.headers['content-type'] }
          ) ;
          let file = URL.createObjectURL(blob) ;
          resolve(file) ;
        })
        .catch((error) => {
          reject(error) ;
        })
    });
  } ,
  uploadFile(file) {
    let formData = new FormData();
    formData.set('file' , file)
    return axios.post('/file' , formData) ;
  }
}
