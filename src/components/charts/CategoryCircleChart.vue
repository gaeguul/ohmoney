<template>
  <div class="example">
    <div class="chart-title" v-if="title">{{ title }}</div>
    <apexchart :width="width" :height="height" :options="options" :series="data"></apexchart>
  </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts'

export default {
  props: {
    title: {
      type: String,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    loading: {
      type: Boolean,
    },
    labels: {
      type: Array,
    },
    data: {
      type: Array,
    },
  },
  components: {
    apexchart: VueApexCharts,
  },
  computed: {
    options() {
      return {
        chart: {
          type: 'donut',
          fontFamily: 'inherit',
        },
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                total: {
                  show: true,
                  label: '총 금액',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: 'black',
                  formatter: (w) => {
                    const total = w.globals.seriesTotals.reduce((a, b) => a + b, 0)
                    return `${total.toLocaleString()}원`
                  },
                },
              },
            },
          },
        },
        colors: ['#FF8E88', '#FEC144', '#1BBF83', '#7A9AFB', '#9B80E9'],
        tooltip: {
          y: {
            formatter: (value) => `${value.toLocaleString()}원`,
          },
        },
        noData: {
          text: this.loading ? 'Loading...' : '가계 데이터가 존재하지 않아요!',
        },
        labels: this.labels,
        data: this.data.map((value) => `${value.toLocaleString()}원`),
      }
    },
  },
}
</script>

<style scoped>
.chart-title {
  font-size: 24px;
  margin: 0 0 30px 0;
  text-align: left;
  color: var(--color-gray-600);
}
</style>
