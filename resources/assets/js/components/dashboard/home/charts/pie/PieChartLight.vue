<template>
    <div class="ma-5" v-if="!$vuetify.theme.dark">
        <highcharts :options="chartOptions" dir="ltr"></highcharts>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                chartOptions: {
                    chart: {
                        type: 'pie'
                    },
                    title: {
                        text: 'Stacked bar chart'
                    },
                    xAxis: {
                        categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Total fruit consumption'
                        }
                    },
                    legend: {
                        reversed: true
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: false
                            },
                            showInLegend: true
                        }
                    },
                    series: [{
                        name: 'Brands',
                        colorByPoint: true,
                        data: [{
                            name: 'Chrome',
                            y: 61.41,
                            sliced: true,
                            selected: true
                        }, {
                            name: 'Internet Explorer',
                            y: 11.84
                        }, {
                            name: 'Firefox',
                            y: 10.85
                        }, {
                            name: 'Edge',
                            y: 4.67
                        }, {
                            name: 'Safari',
                            y: 4.18
                        }, {
                            name: 'Other',
                            y: 7.05
                        }]
                    }]
                }
            }
        }
    }
</script>

<style></style>
