import { axios } from '@/utils/request'

var mixin = {
  data: () => {
    return {
      datasets: [],
      datasetScanstate: 'idle',
      unscannableMakets: []
    }
  },
  methods: {
    scan: function () {
      this.datasetScanstate = 'scanning'
      axios({
        url: '/scansets',
        method: 'post',
        data: {}
      }).then(response => {
        this.datasetScanstate = 'scanned'

        this.unscannableMakets = response.errors

        let sets = []

        response.datasets.forEach(market => {
          market.ranges.forEach((range, i) => {
            sets.push({
              exchange: market.exchange,
              currency: market.currency,
              asset: market.asset,
              from: window.moment.unix(range.from).utc(),
              to: window.moment.unix(range.to).utc(),
              id: market.exchange + market.asset + market.currency + i
            })
          })
        })

        // for now, filter out sets smaller than 3 hours..
        sets = sets.filter(set => {
          if (set.to.diff(set.from, 'hours') > 2) {
            return true
          }
        })

        sets = sets.sort((a, b) => {
          const adiff = a.to.diff(a.from)
          const bdiff = b.to.diff(b.from)

          if (adiff < bdiff) {
            return -1
          }

          if (adiff > bdiff) {
            return 1
          }

          return 0
        }).reverse()

        this.datasets = sets
      })
    }
  }
}

export default mixin
