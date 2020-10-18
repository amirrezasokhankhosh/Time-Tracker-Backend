/* eslint-disable prettier/prettier */
import Vue from 'vue'
import Vuetify , {
  VCard,
  VTextField,
  VCheckbox,
  VBtn,
  VList,
  VListGroup,
  VListItem,
  VListItemAction,
  VDialog,
  VIcon,
  VNavigationDrawer,
  VDivider,
  VImg,
  VAppBar,
  VToolbar,
  VToolbarItems,
  VToolbarTitle,
  VListItemTitle,
  VListItemAvatar,
  VListItemIcon,
  VAppBarNavIcon,
  VSpacer,
  VMenu,
  VContent,

}from 'vuetify/lib'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/es5/util/colors'
import VuetifyConfirm from 'vuetify-confirm'
import '@mdi/font/css/materialdesignicons.css'


Vue.use(Vuetify, {
  components:{
    VCard,
    VTextField,
    VCheckbox,
    VBtn,
    VList,
    VListGroup,
    VListItem,
    VListItemAction,
    VDialog,
    VIcon,
    VNavigationDrawer,
    VDivider,
    VImg,
    VAppBar,
    VToolbar,
    VToolbarItems,
    VToolbarTitle,
    VListItemTitle,
    VListItemAvatar,
    VListItemIcon,
    VAppBarNavIcon,
    VSpacer,
    VMenu,
    VContent
  }
})

export default new Vuetify({
    rtl:false,
    theme: {
        dark: false,
        themes: {
            light: {
                primary: '#2962ff',
                secondary: '#4fc3f7',
                danger: '#f62d51',
                info: '#ffbc34',
                success: '#36bea6',
                anchor: '#8c9eff',
                background: '#b50f00', // Not automatically applied
            },
            dark: {
                primary: '#2962ff',
                secondary: '#4fc3f7',
                danger: '#f62d51',
                info: '#ffbc34',
                success: '#36bea6',
                anchor: '#8c9eff',
                background: colors.shades.black // If not using lighten/darken, use base to return hex
            },
        },
    },
    // rtl: true,
    iconfont: 'mdi'
})
Vue.use(VuetifyConfirm)
