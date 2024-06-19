<template>
    <v-card class="mt-n200">
      <v-tabs
        v-model="tab"
        color="#ffffff"
        align-tabs="start"
        class="mt-n200"
        bg-color="transparent"
      >
        <v-tab :value="1">All Users</v-tab>
        <v-tab :value="2">Parameters</v-tab>
        <v-tab :value="3">Create Story</v-tab>
        <v-tab :value="4">All Stories</v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item
          :key="1"
          :value="1"
        >
          <AllUser/>
        </v-window-item>
        <v-window-item
          :key="2"
          :value="2"
        >
          <AllParameters/>
        </v-window-item>
        <v-window-item
          :key="3"
          :value="3"
        >
          <StoryPrompt/>
        </v-window-item>
        <v-window-item
          :key="4"
          :value="4"
        >
          <StoryList/>
        </v-window-item>
      </v-window>
    </v-card>
  </template>
  
  <script>
    //import { CohereClient } from "cohere-ai";
    import AllUser from './AllUser.vue'
    import AllParameters from './AllParameters.vue'
    import StoryList from './StoryList.vue'
    import StoryPrompt from './StoryPrompt.vue'
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