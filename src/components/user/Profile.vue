<template>
  <v-container>
    <v-card>
      <v-card-title>
        {{ title }}
      </v-card-title>
    </v-card>
  </v-container>  
</template>

<script>
export default {
  data () {
    return {
      title: 'Profile Details'
    }
  }
}
</script>