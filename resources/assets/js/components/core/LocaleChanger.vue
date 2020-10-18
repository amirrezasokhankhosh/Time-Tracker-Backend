<template>
  <v-menu>
    <template v-slot:activator="{ on }">
      <v-btn text v-on="on">
        <v-icon v-if="$vuetify.rtl" class="ml-3">mdi-earth</v-icon>
        <v-icon v-else class="mr-3">mdi-earth</v-icon>
        <span style="color: white !important;">{{
          $store.getters.locale
        }}</span>
      </v-btn>
    </template>
    <v-list dir="ltr">
      <v-list-item
        active-class="danger"
        v-for="(item, i) in langs"
        :key="`Lang${i}`"
        :value="selectedLang"
        @change="switchLocale(item.lang)"
        class="localeChengerList"
      >
        <country-flag :country="item.flag" size="small" class="pl-5" />
        <v-list-item-title class="ml-3"
          >{{ item.lang.toUpperCase() }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import CountryFlag from 'vue-country-flag'

export default {
  data() {
    return {
      showMenu: false,
      selectedLang: {
        lang: 'en',
        flag: 'gb',
        class: 'btnEN'
      },
      langs: [
        {
          lang: 'en',
          flag: 'gb',
          class: 'btnEN'
        },
        {
          lang: 'es',
          flag: 'es',
          class: 'btnES'
        },
        {
          lang: 'cn',
          flag: 'cn',
          class: 'btnCN'
        },
        {
          lang: 'fa',
          flag: 'ir',
          class: 'btnFA'
        }
      ]
    }
  },
  components: {
    CountryFlag
  },
  mounted() {
    this.selectedLang = this.langs.find(item => {
      return item.lang === this.$store.getters.locale
    })
    // change rtl when language is fa
    this.$vuetify.rtl = this.$store.getters.locale === 'fa'
  },
  methods: {
    switchLocale(lang) {
      console.log(lang)
      console.log(this.selectedLang)
      this.$store.dispatch('setLocale', lang)

      // change rtl when language is fa
      this.$vuetify.rtl = this.$store.getters.locale === 'fa'
    }
  },
  computed: {
    displayLocale() {
      return this.$i18n.locale
    }
  }
}
</script>

<style>
.localeChengerList:hover {
  background: #838383;
  cursor: pointer;
}
</style>
