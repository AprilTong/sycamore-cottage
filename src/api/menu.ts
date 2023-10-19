import axios from './http'

export function loginApi(params: any): Promise<Response> {
  return axios.get('/api/user/login', params)
}
