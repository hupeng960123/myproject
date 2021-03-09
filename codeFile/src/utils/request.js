import axios from 'axios'
import qs from 'qs'
const rootPath = '/api/';

// axios.defaults.timeout = 60000
export function request({method = 'get', url, params = null, header = 'application/x-www-form-urlencoded'}) {
  let path = process.env.NODE_ENV === 'production' ? url : rootPath + url;
  let headers = {};
  let data = {};
  return new Promise((resolve, reject) => {
    if (method === 'get') {
      let http = axios.create(headers);
      http.get(path, {params: params}).then(response => {
        data = response.data;
        resolve(data)
      }).catch(e => {
        reject(e);
      })
    } else if (method === 'post') {
      let http = axios.create({
        headers: {
          'Content-Type': header
        }
      });
      let submitParams = qs.stringify(params)
      if (header === 'multipart/form-data') {  //表单上传
        submitParams = params
      }
      http.post(path, submitParams).then(response => {
        data = response.data;
        resolve(data)
      }).catch(e => {
        reject(e);
      })
    }
  })
}
