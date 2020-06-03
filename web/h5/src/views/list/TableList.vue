<template>
  <div class="page-header-index-wide">
    <a-card :loading="loading" :bordered="false" :body-style="{padding: '0'}">
      <div class="salesCard">
        <a-tabs
          default-active-key="1"
          size="large"
          :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}"
        >
          <div class="extra-wrapper" slot="tabBarExtraContent">
            <div class="extra-item">
              <a>Today</a>
              <a>This Week</a>
              <a>This Month</a>
              <a>This Year</a>
            </div>
            <a-range-picker :style="{width: '256px'}" />
          </div>
          <a-tab-pane loading="true" tab="Bot Picher" key="1">
            <a-row>
              <a-col :xl="16" :lg="12" :md="12" :sm="24" :xs="24">
                <div class="ant-table-wrapper">
                  <a-table
                    row-key="index"
                    size="small"
                    :columns="searchTableColumns"
                    :dataSource="searchData"
                    :pagination="{ pageSize: 5 }"
                  >
                    <span slot="range">
                      <a-radio-group defaultValue="a">
                        <a-radio-button value="a">add</a-radio-button>
                        <a-radio-button value="b">Remove</a-radio-button>
                      </a-radio-group>
                    </span>
                  </a-table>
                </div>
              </a-col>
              <a-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
                <rank-list :list="rankList" />
              </a-col>
            </a-row>
          </a-tab-pane>
          <a-tab-pane tab="Crytomarkees" key="2">
            <a-row>
              <a-col :xl="16" :lg="12" :md="12" :sm="24" :xs="24">
                <div class="ant-table-wrapper">
                  <a-table
                    row-key="index"
                    size="small"
                    :columns="searchTableColumns"
                    :dataSource="searchData"
                    :pagination="{ pageSize: 5 }"
                  >
                    <span slot="range">
                      <a-radio-group defaultValue="a">
                        <a-radio-button value="a">add</a-radio-button>
                        <a-radio-button value="b">Remove</a-radio-button>
                      </a-radio-group>
                    </span>
                  </a-table>
                </div>
              </a-col>
              <a-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
                <rank-list :list="rankList" />
              </a-col>
            </a-row>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-card>
  </div>
</template>

<script>
import moment from 'moment'
import {
  ChartCard,
  MiniArea,
  MiniBar,
  MiniProgress,
  RankList,
  Bar,
  Trend,
  NumberInfo,
  MiniSmoothArea
} from '@/components'
import { mixinDevice } from '@/utils/mixin'

const barData = []
const barData2 = []
for (let i = 0; i < 12; i += 1) {
  barData.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200
  })
  barData2.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200
  })
}

const rankList = []
for (let i = 0; i < 4; i++) {
  rankList.push({
    name: 'Rot ' + (i + 1),
    total: 1234.56 - i * 100
  })
}

const searchUserData = []
for (let i = 0; i < 7; i++) {
  searchUserData.push({
    x: moment()
      .add(i, 'days')
      .format('YYYY-MM-DD'),
    y: Math.ceil(Math.random() * 10)
  })
}
const searchUserScale = [
  {
    dataKey: 'x',
    alias: '时间'
  },
  {
    dataKey: 'y',
    alias: '用户数',
    min: 0,
    max: 10
  }
]

const searchTableColumns = [
  {
    dataIndex: 'index',
    title: 'Exchange',
    width: 90
  },
  {
    dataIndex: 'keyword',
    title: 'CCY'
  },
  {
    dataIndex: 'count',
    title: 'Asset'
  },
  {
    dataIndex: 'range',
    title: 'Actions',
    align: 'center',
    scopedSlots: { customRender: 'range' }
  }
]
const searchData = []
searchData.push({
  index: 'Kraken',
  keyword: `GBP`,
  count: 'XBT',
  range: Math.floor(Math.random() * 100),
  status: 0
})
searchData.push({
  index: 'Kraken',
  keyword: `GBP`,
  count: 'BTH',
  range: Math.floor(Math.random() * 100),
  status: 0
})
searchData.push({
  index: 'Bincusce',
  keyword: `USD`,
  count: 'BTC',
  range: Math.floor(Math.random() * 100),
  status: Math.floor((Math.random() * 10) % 2)
})

const DataSet = require('@antv/data-set')

const sourceData = [
  { item: '家用电器', count: 32.2 },
  { item: '食用酒水', count: 21 },
  { item: '个护健康', count: 17 },
  { item: '服饰箱包', count: 13 },
  { item: '母婴产品', count: 9 },
  { item: '其他', count: 7.8 }
]

const pieScale = [
  {
    dataKey: 'percent',
    min: 0,
    formatter: '.0%'
  }
]

const dv = new DataSet.View().source(sourceData)
dv.transform({
  type: 'percent',
  field: 'count',
  dimension: 'item',
  as: 'percent'
})
const pieData = dv.rows

export default {
  name: 'Analysis',
  mixins: [mixinDevice],
  components: {
    ChartCard,
    MiniArea,
    MiniBar,
    MiniProgress,
    RankList,
    Bar,
    Trend,
    NumberInfo,
    MiniSmoothArea
  },
  data() {
    return {
      loading: true,
      rankList,

      // 搜索用户数
      searchUserData,
      searchUserScale,
      searchTableColumns,
      searchData,

      barData,
      barData2,

      //
      pieScale,
      pieData,
      sourceData,
      pieStyle: {
        stroke: '#fff',
        lineWidth: 1
      }
    }
  },
  created() {
    setTimeout(() => {
      this.loading = !this.loading
    }, 1000)
  }
}
</script>

<style lang="less" scoped>
.extra-wrapper {
  line-height: 55px;
  padding-right: 24px;

  .extra-item {
    display: inline-block;
    margin-right: 24px;

    a {
      margin-left: 24px;
    }
  }
}

.antd-pro-pages-dashboard-analysis-twoColLayout {
  position: relative;
  display: flex;
  display: block;
  flex-flow: row wrap;
}

.antd-pro-pages-dashboard-analysis-salesCard {
  height: calc(100% - 24px);
  /deep/ .ant-card-head {
    position: relative;
  }
}

.dashboard-analysis-iconGroup {
  i {
    margin-left: 16px;
    color: rgba(0, 0, 0, 0.45);
    cursor: pointer;
    transition: color 0.32s;
    color: black;
  }
}
.analysis-salesTypeRadio {
  position: absolute;
  right: 54px;
  bottom: 12px;
}
</style>
