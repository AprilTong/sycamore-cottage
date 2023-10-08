import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import menu from './mock/menu'
import user from './mock/user'

export function setupProdMockServer() {
  createProdMockServer([...menu, ...user])
}
