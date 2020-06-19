import { axios } from '@/utils/request'
import store from '../../'
import { bus } from '../../../components/global/ws'

const transformMarkets = backendData => {
  if (!backendData) {
    return {}
  }

  var exchangesRaw = backendData
  var exchangesTemp = {}

  exchangesRaw.forEach(e => {
    exchangesTemp[e.slug] = exchangesTemp[e.slug] || { markets: {} }

    e.markets.forEach(pair => {
      const [currency, asset] = pair['pair']
      exchangesTemp[e.slug].markets[currency] = exchangesTemp[e.slug].markets[currency] || []
      exchangesTemp[e.slug].markets[currency].push(asset)
    })

    if ('exchangeMaxHistoryAge' in e) {
      exchangesTemp[e.slug].exchangeMaxHistoryAge = e.exchangeMaxHistoryAge
    }

    exchangesTemp[e.slug].importable = e.providesFullHistory
    exchangesTemp[e.slug].tradable = e.tradable
    exchangesTemp[e.slug].requires = e.requires
  })

  return exchangesTemp
}

const init = () => {
  axios({
    url: '/apiKeys',
    method: 'get'
  }).then((resp) => {
    store.commit('syncApiKeys', resp)
  })

  axios({
    url: '/exchanges',
    method: 'get'
  }).then(resp => {
    store.commit('syncExchanges', transformMarkets(resp))
  })
}

const sync = () => {
  bus.$on('apiKeys', data => {
    store.commit('syncApiKeys', data.exchanges)
  })
}

export default function () {
  init()
  sync()
}
