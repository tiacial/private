<template>
  <v-dialog max-width="60%" v-model="editProfileDialog">
    <v-btn icon slot="activator">
      <v-icon color="info">edit</v-icon>
    </v-btn>
    <form @submit.prevent="onSaveProfile">
      <v-card>
        <v-card-title class="title grey lighten-3">
          Editing User Profile
        </v-card-title>
        <v-card-text>
          <v-container grid-list-sm>
            <v-layout row wrap>
              <v-flex xs4>
                <v-subheader>First Name:</v-subheader>
              </v-flex>
              <v-flex xs8>
                <v-text-field label="Enter First Name" v-model="userProfile.firstName"></v-text-field>
              </v-flex>
              <v-flex xs4>
                <v-subheader>Last Name:</v-subheader>
              </v-flex>
              <v-flex xs8>
                <v-text-field label="Enter Last Name" v-model="userProfile.lastName"></v-text-field>
              </v-flex>
              <v-flex xs4>
                <v-subheader>Birthday:</v-subheader>
              </v-flex>
              <v-flex xs8>
                <v-text-field type="date" label="Pick Date of Birth" v-model="userProfile.birthday"></v-text-field>
              </v-flex>
              <v-flex xs4>
                <v-subheader>Upload Profile Photo:</v-subheader>
              </v-flex>
              <v-flex xs7>
                <v-text-field append-icon="attach_file" single-line
                  v-model="filename"
                  @click.native="onFocus"
                  ref="fileTextField"></v-text-field>
                <input type="file" v-show="false" accept="image/*" :multiple="false" ref="fileInput" @change="onFileChange">
              </v-flex>
              <v-flex xs1>
                <v-avatar class="grey lighten-4">
                  <img :src="userProfile.imageUrl" alt="avatar" v-if="userProfile.imageUrl">
                  <v-icon v-else>not_interested</v-icon>
                </v-avatar>
              </v-flex>
            </v-layout>  
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click.native="editProfileDialog = false">Cancel</v-btn>
          <v-btn flat type="submit" color="success">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </form>
  </v-dialog>
</template>

<script>
  export default {
    data () {
      return {
        filename: null,
        userProfile: {},
        editProfileDialog: false
      }
    },
    mounted () {
      this.userProfile = JSON.parse(JSON.stringify(this.$store.getters.getUserProfile))
    },
    methods: {
      onFocus () {
        this.$refs.fileInput.click()
      },
      onFileChange ($event) {
        const file = $event.target.files[0]
        this.filename = file.name
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.userProfile.imageUrl = fileReader.result
        })
        fileReader.readAsDataURL(file)
        this.userProfile.profileImage = file
      },
      onSaveProfile () {
        this.$store.dispatch('saveUserProfile', this.userProfile)
      }
    }
  }
</script>