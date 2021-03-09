import {api_jsc_url_redirect} from '../services'

export default {
  changeDateType(date) {
    let d = new Date(date)
    let year = d.getFullYear()
    let month = d.getMonth() + 1
    let day = d.getDate()
    month = month > 10 ? month : '0' + month
    day = day > 10 ? day : '0' + day
    return year + '-' + month + '-' + day
  },
  redirect(url) {
    window.parent.open(url, '_self')
    // api_jsc_url_redirect({url: url}).then(() => {
    //
    // })
  }
}