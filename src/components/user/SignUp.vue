<template>
  <v-container>
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <form @submit.prevent="onSignUp">
          <v-card>
            <v-card-title dark class="blue">User Sign Up</v-card-title>
            <v-card-text>
              <v-container>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="Mail"
                      id="email"
                      v-model="email"
                      type="email"
                      :rules='[rules.required, rules.email]'
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="password"
                      label="Password"
                      id="password"
                      v-model="password"
                      type="password"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="confirmPassword"
                      label="Confirm Password"
                      id="confirmPassword"
                      v-model="confirmPassword"
                      type="password"
                      :rules="[comparePassword]"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="info" type="submit" :loading="loading">Sign Up</v-btn>
            </v-card-actions>
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
        email: '',
        password: '',
        confirmPassword: '',
        rules: {
          required: (value) => !!value || 'Required.',
          email: (value) => {
            const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          }
        }
      }
    },
    computed: {
      comparePassword () {
        return this.password === this.confirmPassword ? true : 'Passwords do not match'
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
      onSignUp () {
        this.$store.dispatch('signUpUser', {email: this.email, password: this.password})
      },
      onDismissed () {
        this.$store.dispatch('clearError', {})
      }
    }
  }
</script>