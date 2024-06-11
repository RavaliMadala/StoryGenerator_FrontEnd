<template>
    <v-card class="mt-n200">
      <v-tabs
        v-model="tab"
        color="#ffffff"
        align-tabs="start"
        class="mt-n200"
        bg-color="transparent"
      >
        <v-tab :value="1">Parameters</v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item
          :key="1"
          :value="1"
        >
          <AllParameters/>
        </v-window-item>
      </v-window>
    </v-card>
  </template>
  
  <script>
    //import { CohereClient } from "cohere-ai";
    import AllParameters from './AllParameters.vue'
import router from '../router'
    export default {
    components: { AllParameters},
      data: () => ({
        tab: null,
      }),
      methods: {
        
      },
      beforeMount() {
        if(sessionStorage.getItem('UserPermission') == "Admin"){
        }
        else{
          if(sessionStorage.getItem('IsUserLoggedIn')){
            router.push('/story')
          }
          else{
            router.push('/login')
          }
        }
      }
    }
  </script>

<style>
</style>