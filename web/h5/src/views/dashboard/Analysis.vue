<template>
  <div class="page-header-index-wide">
    <a-row :gutter="24">
      <a-col :sm="24" :md="12" :xl="12" :style="{ marginBottom: '24px' }">
        <chart-card :loading="loading" title="Estimated Value(CNY)" total="￥3,323,312.12">
          <a-tooltip title="Daliy profit" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <trend flag="up" style="margin-right: 16px;">
              <span slot="term">Earings</span>
              4.11%
            </trend>
          </div>
          <template slot="footer">
            <span>￥ 248.12</span>
          </template>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="12" :style="{ marginBottom: '24px' }">
        <chart-card :loading="loading" title="Overview">
          <div>
            <a-row>
              <a-col :sm="24" :md="8" :xl="8">
                <trend flag="up" style="margin-right: 16px;">
                  <span slot="term">Large cap</span>
                  5,000
                </trend>
              </a-col>
              <a-col :sm="24" :md="8" :xl="8">
                <trend flag="up" style="margin-right: 16px;">
                  <span slot="term">Mid cap</span>
                  2,000
                </trend>
              </a-col>
              <a-col :sm="24" :md="8" :xl="8">
                <trend flag="up" style="margin-right: 16px;">
                  <span slot="term">Small cap</span>
                  2,000
                </trend>
              </a-col>
            </a-row>
            <a-row>
              <a-col :sm="24" :md="8" :xl="8">
                <trend flag="up" style="margin-right: 16px;">
                  <span slot="term">Digital assets</span>
                  1,000
                </trend>
              </a-col>
              <a-col :sm="24" :md="12" :xl="12">
                <trend flag="up" style="margin-right: 16px;">
                  <span slot="term">Diffensive fund</span>
                  1,000
                </trend>
              </a-col>
              <a-col :sm="24" :md="8" :xl="8"></a-col>
            </a-row>
          </div>
          <template slot="footer">
            <span>-</span>
          </template>
        </chart-card>
      </a-col>
    </a-row>

    <div
      class="antd-pro-pages-dashboard-analysis-twoColLayout"
      :class="isDesktop() ? 'desktop' : ''"
    >
      <a-row :gutter="24" type="flex" :style="{ marginTop: '24px' }">
        <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card
            class="antd-pro-pages-dashboard-analysis-salesCard"
            :loading="loading"
            :bordered="false"
            title="Overview"
            :style="{ height: '100%' }"
          >
            <div>
              <!-- style="width: calc(100% - 240px);" -->
              <div>
                <v-chart :force-fit="true" :height="405" :data="pieData" :scale="pieScale">
                  <v-tooltip :showTitle="false" data-key="item*percent" />
                  <v-axis />
                  <!-- position="right" :offsetX="-140" -->
                  <v-legend data-key="item" />
                  <v-pie position="percent" color="item" :vStyle="pieStyle" :label="pielabel" />
                  <v-coord type="theta" :radius="0.75" :innerRadius="0.6" />
                </v-chart>
              </div>
            </div>
          </a-card>
        </a-col>
        <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card
            :loading="loading"
            :bordered="false"
            title="Robo Advisor"
            :style="{ height: '100%' }"
          >
            <a-switch defaultChecked @change="onChange" :checked="managed==='managed'" />

            <span>{{ managed }}</span>
            <div class="salesCard" style="margin-top:5px">
              <v-chart :force-fit="true" :height="325" renderer="svg" :padding="['90', '50']">
                <v-tooltip></v-tooltip>
                <v-axis></v-axis>
                <v-legend></v-legend>
                <v-view :data="barData">
                  <v-stack-bar :position="'x*y'" :color="'z'" :v-style="pieStyle" :label="label"></v-stack-bar>
                </v-view>
              </v-chart>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>
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
    x: `2019-${i + 1}`,
    y: Math.floor(Math.random() * 1000) + 200,
    z: 'large-cap'
  })
  barData.push({
    x: `2019-${i + 1}`,
    y: Math.floor(Math.random() * 1000) + 200,
    z: 'mid-cap'
  })
  barData.push({
    x: `2019-${i + 1}`,
    y: Math.floor(Math.random() * 1000) + 200,
    z: 'small-cap'
  })
  barData.push({
    x: `2019-${i + 1}`,
    y: Math.floor(Math.random() * 1000) + 200,
    z: 'digital-asset'
  })
  barData2.push({
    x: `2019-${i + 1}`,
    y: Math.floor(Math.random() * 1000) + 200
  })
}

const rankList = []
for (let i = 0; i < 7; i++) {
  rankList.push({
    name: '白鹭岛 ' + (i + 1) + ' 号店',
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
    title: '排名',
    width: 90
  },
  {
    dataIndex: 'keyword',
    title: '搜索关键词'
  },
  {
    dataIndex: 'count',
    title: '用户数'
  },
  {
    dataIndex: 'range',
    title: '周涨幅',
    align: 'right',
    sorter: (a, b) => a.range - b.range,
    scopedSlots: { customRender: 'range' }
  }
]
const searchData = []
for (let i = 0; i < 50; i += 1) {
  searchData.push({
    index: i + 1,
    keyword: `搜索关键词-${i}`,
    count: Math.floor(Math.random() * 1000),
    range: Math.floor(Math.random() * 100),
    status: Math.floor((Math.random() * 10) % 2)
  })
}

const DataSet = require('@antv/data-set')

const sourceData = [
  { item: 'Large-cap', count: 50 },
  { item: 'Mid-cap', count: 20 },
  { item: 'Small-cap', count: 20 },
  { item: 'Digital asset', count: 10 }
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
      managed: 'managed',
      loading: true,
      rankList,

      // 搜索用户数
      searchUserData,
      searchUserScale,
      searchTableColumns,
      searchData,

      barData,
      barData2,
      label: [
        'y',
        {
          density: 0.4,
          formatter: '$'
        }
      ],
      pielabel: [
        'count',
        {
          density: 0.4
        }
      ],
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
  methods: {
    onChange() {
      if (this.managed === 'unmanaged') {
        this.managed = 'managed'
      } else {
        this.managed = 'unmanaged'
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
