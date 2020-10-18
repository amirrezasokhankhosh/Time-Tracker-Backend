<template>
    <div style="text-align: center" class="mt-3">
        <v-btn @click="switchLocale('fa')" text>فارسی</v-btn>
        <span>|</span>
        <v-btn @click="switchLocale('en')" text>English</v-btn>
    </div>
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
          console.log(this.langs)
            this.selectedLang = this.langs.find((item) => {
                return item.lang === this.$store.getters.locale
            })
            // change rtl when language is fa
            this.$vuetify.rtl = this.$store.getters.locale === 'fa';
        },
        methods: {
            switchLocale(lang) {
                console.log(lang)
                console.log(this.selectedLang)
                this.$store.dispatch('setLocale', lang);

                // change rtl when language is fa
                this.$vuetify.rtl = this.$store.getters.locale === 'fa';
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
