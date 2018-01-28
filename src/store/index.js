import Vue from 'vue'
import Vuex from 'vuex'
import * as Firebase from 'firebase'
import _ from 'underscore'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: {},
    userProfile: {},
    activities: [],
    loading: false,
    error: ''
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
    },
    getActivities (state) {
      return state.activities
    }
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
    },
    setUserProfile (state, payload) {
      state.userProfile = payload
    },
    setActivities (state, payload) {
      state.activities = payload
    }
  },
  actions: {
    loadProfile ({commit}, payload) {
      Firebase.database().ref('profiles')
          .child(payload)
          .on('value', (snapshot) => {
            commit('setUserProfile', snapshot.val())
          })
    },
    loadActivities ({commit}) {
      Firebase.database().ref('activities')
          .on('value', (snapshot) => {
            commit('setActivities', _.values(snapshot.val()))
          })
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
    signInUser ({commit, dispatch}, payload) {
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
            dispatch('loadProfile', user.uid)
          }
        ).catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
          }
        )
    },
    autoSignIn ({commit, dispatch}, payload) {
      commit('setUser', {id: payload.uid})
      dispatch('loadProfile', payload.uid)
    },
    logout ({commit}, payload) {
      Firebase.auth().signOut()
      commit('setUser', null)
    },
    clearError ({commit}, payload) {
      commit('clearError')
    },
    saveUserProfile ({commit, getters}, payload) {
      const userId = getters.getUser.id
      const profile = {
        userId: userId,
        firstName: payload.firstName,
        lastName: payload.lastName,
        birthday: payload.birthday
      }
      let imageUrl
      Firebase.database().ref('profiles/' + userId)
          .update(profile)
          .then(() => {
            const fileName = payload.profileImage.name
            const ext = fileName.slice(fileName.lastIndexOf('.'))
            return Firebase.storage().ref('profiles/' + userId + '.' + ext)
                .put(payload.profileImage)
          }).then(fileData => {
            imageUrl = fileData.metadata.downloadURLs[0]
            return Firebase.database().ref('profiles')
                .child(userId)
                .update({imageUrl: imageUrl})
          }).then(() => {
            commit('setUserProfile', {
              ...profile,
              imageUrl: imageUrl
            })
          }).catch(error => {
            console.log(error)
          })
    },
    addActivity ({commit, getters}, payload) {
      const userId = getters.getUser.id
      const activity = {
        userId: userId,
        title: payload.title,
        comment: payload.comment,
        date: new Date().toISOString()
      }
      let fileUrl
      let key
      console.log(payload.imageFile)
      Firebase.database().ref('activities').push(activity)
          .then(data => {
            key = data.key
            const fileName = payload.imageFile.name
            const ext = fileName.slice(fileName.lastIndexOf('.'))
            console.log(payload.imageFile)
            return Firebase.storage().ref('activities/' + key + '.' + ext)
                .put(payload.imageFile)
          }).then(fileData => {
            fileUrl = fileData.metadata.downloadURLs[0]
            return Firebase.database().ref('activities')
                .child(key)
                .update({fileUrl: fileUrl})
          }).catch(error => {
            console.log(error)
          })
    }
  }
})
