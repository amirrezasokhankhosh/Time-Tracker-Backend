<template>
  <v-footer
    height="60"
    style="bottom: 0 ; position: absolute ; width: 100%"
    class="justify-center"
  >
    <div class="mt-2">v{{ appVersion }} |</div>
    <div class="mt-2 ml-1">
      {{ $t('footer.MADE_WITH') }}
      <v-icon small class="red--text mx-0 px-0">mdi-cards-heart</v-icon>
      &nbsp;{{ $t('footer.BY') }}:
      <a href="https://sadr-group.net">{{ $t('footer.CREATOR') }}</a>
    </div>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    appVersion() {
      return this.$store.getters.appVersion
    }
  }
}
</script>
