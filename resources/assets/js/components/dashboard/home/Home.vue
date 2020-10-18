<template>
  <div>
    <v-row class="ma-5">
      <v-col cols="12" lg="4" class="mt-9">
        <v-card class="mx-auto" >
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="cyan"
            elevation="12"
            max-width="calc(100% - 32px)"
          >
            <v-sparkline
              auto-draw
              height="130"
              :labels="labels"
              :value="value"
              color="white"
              line-width="2"
              padding="16"
            ></v-sparkline>
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2">User Registrations</div>
            <div class="subheading font-weight-light grey--text">
              Last Campaign Performance
            </div>
            <v-divider class="my-2"></v-divider>
            <v-icon class="mr-2" small>
              mdi-clock
            </v-icon>
            <span class="caption grey--text font-weight-light"
            >last registration 26 minutes ago</span
            >
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" lg="4" class="mt-9">
        <v-card class="mx-auto" >
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="#e91e63"
            elevation="12"
            max-width="calc(100% - 32px)"
          >
            <v-sparkline
              auto-draw
              height="130"
              type="bar"
              auto-line-width
              :labels="labels2"
              :value="value2"
              color="white"
              line-width="2"
              padding="16"
            ></v-sparkline>
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2">User Registrations</div>
            <div class="subheading font-weight-light grey--text">
              Last Campaign Performance
            </div>
            <v-divider class="my-2"></v-divider>
            <v-icon class="mr-2" small>
              mdi-clock
            </v-icon>
            <span class="caption grey--text font-weight-light">
              last registration 26 minutes ago
            </span>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" lg="4" class="mt-9">
        <v-card class="mx-auto" >
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="#4cAf50"
            elevation="12"
            max-width="calc(100% - 32px)"
          >
            <v-sparkline
              auto-draw
              height="130"
              :labels="labels3"
              :value="value3"
              color="white"
              line-width="2"
              padding="16"
            ></v-sparkline>
          </v-sheet>
          <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2">User Registrations</div>
            <div class="subheading font-weight-light grey--text">
              Last Campaign Performance
            </div>
            <v-divider class="my-2"></v-divider>
            <v-icon class="mr-2" small>
              mdi-clock
            </v-icon>
            <span class="caption grey--text font-weight-light">
              last registration 26 minutes ago
            </span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <div class="ma-7">
      <v-card>
        <v-row>
          <v-col lg="5">
            <pie-chart-dark />
            <pie-chart-light />
          </v-col>
          <v-col lg="7">
            <div class="title font-weight-light mb-2">User Registrations</div>
            <div class="subheading font-weight-light grey--text">
              Last Campaign Performance
            </div>
            <v-divider class="my-2"></v-divider>
            <v-icon class="mr-2" small>
              mdi-clock
            </v-icon>
            <span class="caption grey--text font-weight-light"
            >last registration 26 minutes ago</span
            >
          </v-col>
        </v-row>
      </v-card>
    </div>


    <gantt-chart-dark />
    <gantt-chart-light />
  </div>
</template>

<script>
  import GanttChartDark from './charts/gantt/GanttChartDark'
  import GanttChartLight from './charts/gantt/GanttChartLight'

  import PieChartDark from './charts/pie/PieChartDark'
  import PieChartLight from './charts/pie/PieChartLight'

export default {
  components: {
    GanttChartDark,
    GanttChartLight,
    PieChartDark,
    PieChartLight
  },
  data() {
    return {
      labels: ['12am', '3am', '6am', '9am', '12pm', '3pm', '6pm', '9pm'],
      value: [675, 10, 900, 390, 310, 460, 250, 240],
      labels2: ['12am', '3am', '6am', '9am', '12pm', '3pm', '6pm', '9pm'],
      value2: [50, 675, 10, 90, 310, 460, 250, 40],
      labels3: ['12am', '3am', '6am', '9am', '12pm', '3pm', '6pm', '9pm'],
      value3: [200, 75, 10, 390, 910, 460, 850, 540]
    }
  }
}
</script>

<style>
  .v-sheet--offset {
    top: -24px;
    position: relative;
  }
</style>

