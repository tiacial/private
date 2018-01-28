<template>
  <v-dialog max-width="75%" v-model="addActivityDialog">
    <v-btn icon slot="activator">
      <v-icon color="info">add</v-icon>
    </v-btn>
    <form @submit.prevent="onAddActivity">
      <v-card>
        <v-card-title dark class="blue">Add New Activity</v-card-title>
        <v-card-text>
          <v-container>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field
                  name="title"
                  label="Title"
                  id="title"
                  v-model="title"
                  type="text"
                  :rules='[rules.required]'
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field append-icon="attach_file" single-line
                  v-model="fileName"
                  @click.native="onFocus"
                  ref="fileTextField"></v-text-field>
                <input type="file" v-show="false" accept="image/*" :multiple="false" ref="fileInput" @change="onFileChange">
              </v-flex>
              <v-flex xs12>
                <v-card class="elevation-0">
                  <img style="max-width:100%;max-height:100%;" :src="imageUrl"></img>
                </v-card>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  name="comment"
                  label="Comment"
                  id="comment"
                  v-model="comment"
                  type="text"
                  multi-line
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="info" type="submit" :loading="loading">Add Activity</v-btn>
        </v-card-actions>
      </v-card>
    </form>
  </v-dialog>  
</template>

<script>
  import _ from 'underscore'

  export default {
    data () {
      return {
        addActivityDialog: false,
        title: '',
        comment: '',
        fileName: '',
        imageUrl: '',
        imageFile: '',
        rules: {
          required: (value) => !!value || 'Required.'
        }
      }
    },
    computed: {
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
      onFocus () {
        this.$refs.fileInput.click()
      },
      onFileChange ($event) {
        const file = $event.target.files[0]
        this.fileName = file.name
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.imageUrl = fileReader.result
        })
        fileReader.readAsDataURL(file)
        console.log($event.target.files)
        this.imageFile = file
      },
      onAddActivity () {
        const activity = {
          title: this.title,
          comment: this.comment,
          imageFile: this.imageFile
        }
        this.$store.dispatch('addActivity', activity)
      }
    }
  }
</script>