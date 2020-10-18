<template>
  <div>
    <div :style="style" ref="container"></div>
  </div>
</template>

<script>
  import Lottie from "lottie-web";

  export default {
    name: 'LottieAnimation',
    props: {
      options: {
        type: Object,
        require: true
      },
      height: Number,
      width: Number,
    },
    data() {
      return {
        style: {
          width: this.width ? `${this.width}px` : '100%',
          height: this.height ? `${this.height}px` : '100%',
          overflow: 'hidden',
          margin: '0 auto'
        },
        anim: null
      }
    },
    methods: {
      loadAnimation() {
        this.anim = Lottie.loadAnimation({
            container: this.$refs.container,
            renderer: 'svg',
            loop: this.options.loop !== false,
            autoplay: this.options.autoplay !== false,
            animationData: this.options.animationData.default,
            rendererSettings: this.options.rendererSettings
          }
        );
        this.$emit('animCreated', this.anim)
      }
    },
    mounted() {
      this.loadAnimation();
    },
    watch: {
      options: {
        handler(val) {
          this.anim.destroy();
          this.loadAnimation();
        },
        deep: true
      }
    }
  }
</script>
