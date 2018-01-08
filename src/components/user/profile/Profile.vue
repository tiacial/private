<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-list>
            <v-list-tile class="grey lighten-3">
              <v-list-tile-avatar>
                <img :src="profile.imageUrl"/>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>User Profile</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <edit-profile :profile="profile"></edit-profile>
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
                  <small>{{profile.firstName}}</small>
                </v-flex>
                <v-flex xs6 class="text-xs-right">
                  Last Name:
                </v-flex>
                <v-flex xs6>
                  <small>{{profile.lastName}}</small>
                </v-flex>
                <v-flex xs6 class="text-xs-right">
                  Birthday:
                </v-flex>
                <v-flex xs6>
                  <small>{{profile.birthday}}</small>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>    
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      profile () {
        return this.$store.getters.getUserProfile
      }
    }
  }
</script>