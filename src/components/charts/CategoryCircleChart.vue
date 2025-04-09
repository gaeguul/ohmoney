<template>
  <div class="example">
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
        },
        title: {
          text: this.title,
          align: 'left',
          style: {
            fontSize: '40px',
            fontWeight: 'bold',
          },
        },
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                total: {
                  show: true,
                  fooClick: () => (this.show = !this.show),
                  label: '총 소비금액',
                  fontSize: '50px',
                  fontWeight: 'bold',
                  color: 'black',
                },
              },
            },
          },
        },
        colors: ['#8979AE', '#B49BEA', '#e2e2e2', '#6A30EA'],
        noData: {
          text: this.loading ? 'Loading...' : 'No Data',
        },
        labels: this.labels,
        data: this.data,
      }
    },
  },
}
</script>
