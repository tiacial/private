<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm8 offset-sm2>
        <v-card>
          <v-card-title class="teal lighten-4">
            Activities
          </v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12>
                <v-card class="mb-3 elevation-10" v-for="activity in activities" :key="activity.date">
                  <v-card-media class="elevation-5" :src="activity.fileUrl" height="300px" style="max-width:100%;max-height:100"></v-card-media>
                  <v-card-title primary-title>
                    <v-layout row wrap>
                      <v-flex xs6 class="subheading text-xs-left">
                        {{activity.title}}
                      </v-flex>
                      <v-flex xs6 class="caption text-xs-right">  
                        {{activity.date}}
                      </v-flex>
                    </v-layout>
                  </v-card-title>
                  <v-card-text>
                    {{activity.comment}}
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>      
          </v-card-text>
        </v-card>
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
      user () {
        return this.$store.getters.getUser
      },
      activities () {
        return _.chain(this.$store.getters.getActivities)
            .sortBy('date')
            .value()
      }
    }
  }
</script>