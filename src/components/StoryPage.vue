<template>
    <v-card class="mt-n200">
      <v-tabs
        v-model="tab"
        color="#ffffff"
        align-tabs="start"
        class="mt-n200"
        bg-color="transparent"
      >
        <v-tab :value="1">Create Story</v-tab>
        <v-tab :value="2">All Stories</v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item
          :key="1"
          :value="1"
        >
          <StoryPrompt/>
        </v-window-item>
        <v-window-item
          :key="2"
          :value="2"
        >
          <StoryList/>
        </v-window-item>
      </v-window>
    </v-card>
  </template>
  
  <script>
    //import { CohereClient } from "cohere-ai";
    import StoryList from './StoryList.vue'
    import StoryPrompt from './StoryPrompt.vue'
    export default {
    components: { StoryList, StoryPrompt},
      data: () => ({
        tab: null,
      }),
      methods: {
        
      },
    }
  </script>

<style>
</style>
  