<template>
  <v-app dark>
          <loading />
          <ErrorMessage />
          <SuccessMessage />
          <transition name="fade" mode="out-in">
              <router-view />
          </transition>
  </v-app>
</template>

<script>
import Loading from './components/core/Loading.vue' ;
import ErrorMessage from './components/common/ErrorMessage.vue' ;
import SuccessMessage from './components/common/SuccessMessage.vue' ;


export default {
  
  name: 'App',
  metaInfo() {
    return {
      goDark: false,
      title: this.appTitle,
      htmlAttrs: {
        lang: this.$i18n.locale
      },
      meta: [
        { name: 'msapplication-TileColor', content: '#ffc40d' },
        { name: 'theme-color', content: '#ffffff' },
        {
          name: 'apple-mobile-web-app-title',
          content: this.appTitle
        },
        { name: 'application-name', content: this.appTitle }
      ],
      link: [
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png'
        },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'mask-icon', color: '#5bbad5', href: '/safari-pinned-tab.svg' },
        { rel: 'favicon', href: '/favicon.ico' }
      ]
    }
  },

  components: {
    Loading ,
    ErrorMessage,
    SuccessMessage
  },
  computed: {
     
    appTitle() {
      return this.$store.getters.appTitle
    }
  } ,


}
</script>

<style>
/*dark theme*/
.theme--dark.v-application {
  background-color: #394156;
}
.v-toolbar__content, .v-toolbar__extension {
  background-color: #2962ff;
}
.theme--dark.v-navigation-drawer {
  background-color: #252c3e;
}
.theme--dark.v-card {
  background-color: #252c3e;
}
.theme--dark.v-data-table {
  background-color: #252c3e;
}

/*light theme*/
.theme--light.v-application {
  background-color: #f1f2f3;
}
.theme--light.v-toolbar {
  background-color: #2962ff;
}
.theme--light.v-navigation-drawer {
  background-color: #ffffff;
}
.theme--light.v-card {
  background-color: #ffffff;
}
.theme--light.v-btn > .v-btn__content .v-icon {
  color: #fff;
}
.theme--light.v-lable {
  color: #fff !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
