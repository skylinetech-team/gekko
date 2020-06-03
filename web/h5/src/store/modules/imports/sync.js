import { axios } from '@/utils/request'
import store from '../../'
import { bus } from '../../../components/global/ws'

const init = () => {
  axios({
    url: '/imports',
    method: 'get'
  }).then((resp) => {
    store.commit('syncImports', resp)
  })
}

const sync = () => {
  bus.$on('import_update', data => {
    store.commit('updateImport', data)
  })
}

export default function () {
  init()
  sync()
}
