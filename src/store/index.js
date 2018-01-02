import Vue from 'vue'
import Vuex from 'vuex'
import * as Firebase from 'firebase'
// import _ from 'underscore'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: null,
    userProfile: null,
    loading: false,
    error: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    addActivity ({commit}, payload) {
      Firebase.auth().ref('activities').push()
    },
    signUpUser ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      Firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              activities: []
            }
            commit('setUser', newUser)
          }
        ).catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
          }
        )
    },
    signInUser ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      Firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              activities: []
            }
            commit('setUser', newUser)
          }
        ).catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
          }
        )
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {id: payload.uid})
    },
    logout ({commit}, payload) {
      Firebase.auth().signOut()
      commit('setUser', null)
    },
    clearError ({commit}, payload) {
      commit('clearError')
    }
  },
  getters: {
    getUser (state) {
      return state.user
    },
    getUserProfile (state) {
      return state.userProfile
    },
    getError (state) {
      return state.error
    },
    getLoading (state) {
      return state.loading
    }
  }
})