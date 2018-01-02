<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <form @submit.prevent="onSignIn">
          <v-card>
            <v-list>
              <v-list-tile class="grey lighten-3">
                <v-list-tile-avatar>
                  <img :src="userProfile.imageUrl"/>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>User Profile</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <edit-profile :profile="userProfile"></edit-profile>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout row wrap>
                  <v-flex xs6 class="text-xs-right">
                    First Name:
                  </v-flex>
                  <v-flex xs6>
                    <small>{{ userProfile.first_name }}</small>
                  </v-flex>
                  <v-flex xs6 class="text-xs-right">
                    Last Name:
                  </v-flex>
                  <v-flex xs6>
                    <small>{{ userProfile.last_name }}</small>
                  </v-flex>
                  <v-flex xs6 class="text-xs-right">
                    Birthday:
                  </v-flex>
                  <v-flex xs6>
                    <small>{{ userProfile.birthday }}</small>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>    
          </v-card>
        </form>  
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import _ from 'underscore'

  export default {
    data () {
      return {
      }
    },
    computed: {
      userProfile () {
        return this.$store.getters.getUserProfile || {
          imageUrl: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
          first_name: 'Tianxu',
          last_name: 'ZHANG',
          birthday: '1989-01-14'
        }
      },
      user () {
        return this.$store.getters.getUser
      },
      error () {
        return this.$store.getters.getError
      },
      loading () {
        return this.$store.getters.getLoading
      }
    },
    watch: {
      user (val) {
        if (!_.isEmpty(val)) {
          this.$router.push('/')
        }
      }
    },
    methods: {
      onSignIn () {
        this.$store.dispatch('signInUser', {email: this.email, password: this.password})
      },
      onDismissed () {
        this.$store.dispatch('clearError', {})
      }
    }
  }
</script>