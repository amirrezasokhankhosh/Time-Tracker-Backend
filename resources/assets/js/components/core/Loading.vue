<template>
  <v-dialog fullscreen v-model="showLoading" persistent style="overflow: hidden">
    <v-layout justify-center fill-height align-center style="overflow: hidden;background-color: rgba(241,241,241,0.77)">
      <v-row
        align="center"
        justify="center"
        style="height: 300px;"
      >
        <LottieAnimation
          :options="defaultOptions"
          class="waiting"
        />
      </v-row>
    </v-layout>
  </v-dialog>
</template>

<script>
  import {mapGetters} from 'vuex';
  import * as loadingAnimationData from "../../assets/img/8359-loading-animation.json";

  export default {
    data() {
      return {
        defaultOptions: {
          animationData: loadingAnimationData
        }
      }

    },
    computed: mapGetters(['showLoading']),
    methods: {
      // animationCreated(anim){
      //   console.log('animation created')
      //   console.log(anim)
      // }
    }
  }
</script>
<style scoped>

  .waiting {
    height: 320px;
  }

</style>
