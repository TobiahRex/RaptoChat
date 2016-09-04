import { create } from 'apisauce'

const create = (baseURL = 'http://vaas.acapella-group.com') => {
  const api = create({ baseURL })

  const getAudioMsg = (msg, msgVoice) => {
    api.setHeaders({
      prot_vers: 2,
      cl_login: 'EVAL_VAAS',
      cl_app: 'EVAL_6615982',
      cl_pwd: 'ytjsg3bj',
      req_voice: `${msgVoice}`,
      req_text: `${msg}`
    })
    return api.get('/Services/UrlMaker?jsoncallback=?')
  }

  return {
    getAudioMsg
  }
}

export default {
  create
}
