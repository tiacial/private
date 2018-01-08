// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

import App from './App'
import * as Firebase from 'firebase'
import router from './router'
import { store } from './store'
import Alert from './components/shared/Alert.vue'
import EditUserProfile from './components/user/profile/EditUserProfile.vue'
import AddActivity from './components/activity/personal/AddActivity.vue'

Vue.use(Vuetify)
Vue.component('app-alert', Alert)
Vue.component('edit-profile', EditUserProfile)
Vue.component('add-activity', AddActivity)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created () {
    Firebase.initializeApp({
      apiKey: 'AIzaSyAOCebjyKYNoWsmfEVQJTSYR48qru1DMTI',
      authDomain: 'fido-85a2c.firebaseapp.com',
      databaseURL: 'https://fido-85a2c.firebaseio.com',
      projectId: 'fido-85a2c',
      storageBucket: 'fido-85a2c.appspot.com',
      messagingSenderId: '998765963495'
    })
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadActivities')
  }
})
