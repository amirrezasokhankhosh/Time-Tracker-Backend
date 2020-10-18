<template>
  <v-container fluid>
    <v-layout align-center justify-center row wrap>
     <lottie-animation :options="defaultOptions"/>
    </v-layout>
  </v-container>
</template>
<script>
  import * as loadingAnimationData from "../assets/img/4339-not-found.json";

  export default {
    data() {
      return {
        defaultOptions: {
          animationData: loadingAnimationData
        }
      }

    },
    methods: {
    }
  }
</script>
<style scoped>
</style>
