<template>
  <v-app>
    <v-navigation-drawer temporary fixed app v-model="drawer">
      <v-list>
        <v-list-tile
          v-for="(item, i) in menuItems"
          :key="i"
          router
          :to="item.link"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="isAuthorizedUser" @click="onLogOut">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Logout</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app class="primary" fixed dark>
      <v-toolbar-side-icon @click.native.stop="drawer = !drawer" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor:pointer">Fido</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          small
          flat 
          v-for="(item, i) in menuItems" 
          :key="i"
          router
          :to="item.link"
        >
          <v-icon left>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
        <v-btn
          small
          flat
          v-if="isAuthorizedUser"
          @click.native="onLogOut"
        >
          <v-icon left>exit_to_app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer fixed>
      <span class="text-xs-center">&copy; Tianxu, 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  import _ from 'underscore'

  export default {
    data () {
      return {
        drawer: false,
        title: 'Fido'
      }
    },
    computed: {
      menuItems () {
        let menuitems = [
          { icon: 'face', title: 'Sign Up', link: '/signup' },
          { icon: 'lock_open', title: 'Sign In', link: '/signin' }
        ]
        if (this.isAuthorizedUser) {
          menuitems = [
            { icon: 'supervisor_account', title: 'View Activities', link: '/activities' },
            { icon: 'add', title: 'New Activity', link: '/new' },
          ]
        }
        return menuitems;
      },
      isAuthorizedUser () {
        return !_.isEmpty(this.$store.getters.getUser);
      }
    },
    methods: {
      onLogOut () {
        this.$store.dispatch('logout');
      }
    }
  }
</script>
