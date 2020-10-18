<template>
  <div class="ma-7" v-if="$vuetify.theme.dark">
    <highcharts :options="chartOptions" dir="ltr"></highcharts>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartOptions: {
        chart: {
          type: 'bar',
          backgroundColor: {
            linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
            stops: [
              [0, '#252c3e'],
              [1, '#3e3e40']
            ]
          },
          plotBorderColor: '#606063'
        },
        title: {
          text: 'Stacked bar chart',
          style: {
            color: '#E0E0E3',
          }
        },
        xAxis: {
          categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas'],
          labels: {
            style: {
              color: '#E0E0E3'
            }
          },
          lineColor: '#707073',
          minorGridLineColor: '#505053',
          tickColor: '#707073',
          title: {
            style: {
              color: '#A0A0A3'
            }
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Total fruit consumption'
          },
          labels: {
            style: {
              color: '#E0E0E3'
            }
          },
          lineColor: '#707073',
          minorGridLineColor: '#505053',
          tickColor: '#707073',
          tickWidth: 1,
          title: {
            style: {
              color: '#A0A0A3'
            }
          }
        },
        legend: {
          reversed: true,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          itemStyle: {
            color: '#E0E0E3'
          },
          itemHoverStyle: {
            color: '#FFF'
          },
          itemHiddenStyle: {
            color: '#606063'
          },
          title: {
            style: {
              color: '#C0C0C0'
            }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          style: {
            color: '#F0F0F0'
          }
        },
        plotOptions: {
          series: {
            stacking: 'normal',
            dataLabels: {
              color: '#F0F0F3',
              style: {
                fontSize: '13px'
              }
            },
            marker: {
              lineColor: '#333'
            }
          }
        },
        series: [
          {
            name: 'John',
            data: [5, 3, 4, 7, 2]
          },
          {
            name: 'Jane',
            data: [2, 2, 3, 2, 1]
          },
          {
            name: 'Joe',
            data: [3, 4, 4, 2, 5]
          }
        ],
        colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
          '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
      }
    }
  }
}
</script>

<style></style>
