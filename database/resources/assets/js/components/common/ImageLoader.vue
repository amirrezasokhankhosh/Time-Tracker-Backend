<template>
  <img v-if="imageUrl" :src="imageUrl" alt="image" />
</template>

<script>

  import file_api from '@/services/api/file' ;

  export default {

    data: function() {
      return {
        imageUrl: null ,
      }

    } ,
    watch: {
      filename: function(val, oldVal) {
        this.$forceUpdate();
      },
    } ,
    methods: {
      loadImage() {
        file_api.getFile(this.filename)
          .then((response) => {
            this.imageUrl = response ;
          })
      }
    },
    props: {
      'filename': String
    } ,
    created() {
      console.log(this.filename) ;
      this.loadImage() ;
    }
  }
</script>

