<template>
    <br/>
    <v-sheet
      class="pa-4 text-center mx-auto"
      elevation="12"
      rounded="lg"
      width="95%"
      border="lg opacity-12"
    >
    <v-container fluid variant="outlined">
        <v-row class="py-0">
            <v-col cols="1">
            </v-col>
            <v-col cols="10" class="px-0">
                <v-text-field
                    v-model="title"
                    label="Story Title"
                    hide-details
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row class="py-0">
            <v-col cols="1" class="px-0 py-7">
                <p>Character Name: </p>
            </v-col>
            <v-col cols="2" class="px-0">
                <v-text-field
                    v-model="characterName"
                    variant="underlined"
                    max-width="90%"
                    hide-details
                ></v-text-field>
            </v-col>

            <v-col cols="1" class="px-0 py-7">
                <p>Word Length: </p>
            </v-col>
            <v-col cols="2" class="px-0">
                <v-select
                    v-model="wordCount"
                    :items="wordItems"
                    variant="underlined"
                    label="Select"
                    hide-details
                    max-width="90%"
                ></v-select>
            </v-col>

            <v-col cols="1" class="px-0 py-7">
                <p>Story Backdrop: </p>
            </v-col>
            <v-col cols="2" class="px-0">
                <v-select
                    v-model="setting"
                    :items="settingItems"
                    variant="underlined"
                    label="Select"
                    max-width="90%"
                    hide-details
                ></v-select>
            </v-col>

            <v-col cols="1" class="px-0 py-7">
                <p>Genre: </p>
            </v-col>
            <v-col cols="2" class="px-0">
                <v-select
                    v-model="genre"
                    :items="genreItems"
                    variant="underlined"
                    label="Select"
                    max-width="90%"
                    hide-details
                ></v-select>
            </v-col>

        </v-row>

        <v-row class="py-0">
            <v-col cols="1" class="px-0 py-7">
                <p>Character Role: </p>
            </v-col>
            <v-col cols="1" class="px-0">
                <v-select
                    v-model="characterRole"
                    :items="characterRoleItems"
                    variant="underlined"
                    label="Select"
                    hide-details
                ></v-select>
            </v-col>
            <v-col cols="1" class="px-0 py-7">
                OR
            </v-col>
            <v-col cols="1" class="px-1">
                <v-text-field
                    v-model="characterRole"
                    variant="underlined"
                    label="Type Role"
                    hide-details
                ></v-text-field>
            </v-col>

            <v-col cols="1" class="px-0 py-7">
                <p>Country: </p>
            </v-col>
            <v-col cols="2" class="px-0">
                <v-select
                    v-model="country"
                    :items="countryItems"
                    label="Select"
                    variant="underlined"
                    max-width="90%"
                    hide-details
                ></v-select>
            </v-col>

            <v-col cols="1" class="px-0 py-7">
                <p>Language: </p>
            </v-col>
            <v-col cols="2" class="px-0">
                <v-select
                    v-model="language"
                    :items="languageItems"
                    variant="underlined"
                    label="Select"
                    max-width="90%"
                    hide-details
                ></v-select>
            </v-col>

        </v-row>
        <v-row class="py-0">
            <v-col cols="5" class="px-0">
            </v-col>
            <v-col cols="2" class="px-0">
                <v-btn
                    color="#711429"
                    variant="elevated"
                    rounded="xl"
                >
                    Generate Story
                </v-btn>                   
            </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <br/>

    <v-card class="mx-auto" max-width="90%">
        <v-textarea
            v-model="storyText"
            label="Story"
            placeholder="Story"
            rows="13"
        ></v-textarea>
        
        <v-divider></v-divider>

        <v-card-actions>
        <v-btn
            color="#711429"
            variant="flat"
            @click="continueOnClick"
        >
            Continue
        </v-btn>

        <v-spacer></v-spacer>
        
        <v-btn
            color="#711429"
            variant="flat"
            @click="saveOnClick"
        >
            Save
        </v-btn>
        </v-card-actions>
  </v-card>
  <br/>
  </template>
  
  <script>
  import router from '../router'
  import AuthenticationService from '@/services/UserAuthenticationService'
  
    export default {
      data: () => ({
        title: null,
        characterName: null,
        characterRole: null,
        characterRoleItems: ['Hero', 'Villian','Sidekick','Leader'],
        setting: null,
        settingItems: ['City','Outer Space','Beach','Haunted House','Country','Battlefield'],
        country: null,
        countryItems: ['Australia','US','India','China','Russia'],
        language: null,
        languageItems: ['English','Hindi','Spanish','Russian','mandarin'],
        genre: null,
        genreItems: ['Horror','Sci-fi','Fantasy','Drama','Romance','Historic','War'],
        wordCount: null,
        wordItems: ['100','200','300'],
        step: null,
        currentStep: null,
        storyText: null
      }),
  
      methods: {
        continueOnClick: function () {
            //call api again
        },
        saveOnClick: function () {

        },
        generateStory: function () {
            // call api with parameters
        }
      },
      watch: {
      password: function () {
        if(this.password != this.passwordConfirm){
          this.showError("Password and confirm password must be same")
        }
        else{
          this.showAlert = false;
        }
      },
      passwordConfirm: function () {
        if(this.password != this.passwordConfirm){
          this.showError("Password and Confirm Password must be same")
        }
        else{
          this.showAlert = false;
        }
      }
    }
    }
  </script>