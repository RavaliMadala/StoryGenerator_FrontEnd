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
                    :title="settingItems"
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
            <v-col cols="4" class="px-0">
            </v-col>
            <v-col cols="2" class="px-0">
                <v-btn
                    color="#711429"
                    variant="elevated"
                    rounded="xl"
                    @click="generateStory"
                >
                    Generate Story
                </v-btn>                   
            </v-col>
            <v-col cols="2" class="px-0">
                <v-btn
                    color="#711429"
                    variant="elevated"
                    rounded="xl"
                    @click="clearFields"
                >
                    Clear
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
            @click="continueStory"
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
    <v-overlay
      :model-value="loadingOverlay"
      class="align-center justify-center"
      :persistent="diableOverlay"
    >
        <v-progress-circular
            color="#711429"
            indeterminate
            size="64"
            class="align-center"
        ></v-progress-circular>
        <h3>{{loadingMSG}}</h3>
    </v-overlay>

    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
    >
      {{ snackbarMSG }}
    </v-snackbar>
  </template>
  
  <script>
  import { CohereClient } from "cohere-ai"
  import StoryService from '@/services/StoryService'
  import ParameterService from '@/services/ParameterService'

    export default {
      data: () => ({
        title: null,
        characterName: null,
        characterRole: null,
        characterRoleItems: [],
        characterRoleIds: [],
        setting: null,
        settingItems: [],
        settingIds: [],
        country: null,
        countryItems: [],
        countryIds: [],
        language: null,
        languageItems: [],
        languageIds: [],
        genre: null,
        genreItems: [],
        genreIds: [],
        wordCount: null,
        wordItems: ['100','200','300'],
        step: null,
        currentStep: null,
        storyText: null,
        storyGenResponse: null,
        loadingMSG: null,
        loadingOverlay: false,
        diableOverlay: false,
        timeout: 2000,
        snackbar: false,
        snackbarMSG: "",
      }),
  
      methods: {
        onLoad(){
            this.getRoles()
            this.getGenre()
            this.getSetings()
            this.getCountries()
            this.getLanguages()
        },
        async saveOnClick() {
            try{
                if(this.storyText != null){
                    this.setLoadingOverLay(true, "Please wait. Story is being saved...")
                    var storyPrompt = "Generate a " + this.genre +" genre story with title " + this.title + " and exactly " + this.wordCount + " words based on " + this.country + " country with character " + this.characterName + " as " + this.characterRole + " and backdrop as " + this.setting + " in " + this.language + " Language.";
                    await StoryService.saveStory({
                        title: this.title,
                        userID: this.$store.state.UserId,
                        storyPrompt: storyPrompt,
                        StoryResponse: this.storyText,
                        characterName: this.characterName,
                        characterRole: this.characterRole,
                        setting: this.setting,
                        country: this.country,
                        language: this.language,
                        genre: this.genre,
                        wordCount: this.wordCount,
                        CharacterRoleId: this.getParameterID(this.characterRole, this.characterRoleIds),
                        SettingId: this.getParameterID(this.setting, this.settingIds),
                        LanguageId: this.getParameterID(this.language, this.languageIds),
                        CountryId: this.getParameterID(this.country, this.countryIds),
                        GenreId : this.getParameterID(this.genre, this.genreIds),
                        sessionId: sessionStorage.getItem('sessionId')
                    }).then((response)=> {
                        console.log(response.statusText)
                        if(response.statusText == "OK"){
                            if(response.data.status == "OK"){
                                this.clearFields()
                                this.showSnackBar("Story Saved.")
                            }
                            else{
                                this.showSnackBar(response.data.error)
                            }
                        }
                        this.setLoadingOverLay(false, "")
                    })
                }   
            }
            catch(err){
                console.log(err)
                this.setLoadingOverLay(false, "")
            }
        },
        async generateStory(){
            console.log("gen story")
            
            if(this.genre != null && this.title != null && this.title != null && this.wordCount != null && this.country != null && this.characterName != null && this.characterRole != null && this.setting != null && this.language  != null){
                this.setLoadingOverLay(true, "Please wait. Story is being Generated...")
                
                var storyPrompt = "Generate a " + this.genre +" genre story with title " + this.title + " and exactly " + this.wordCount + " words based on " + this.country + " country with character " + this.characterName + " as " + this.characterRole + " and backdrop as " + this.setting + " in " + this.language + " Language. Do not include my prompt in your reply.";
                console.log(storyPrompt)
                try{
                    const cohere = new CohereClient({
                        token: "XtLnyRvwWZxsq2YXfHqIAsSXtdFlwvQwWSGC1BAz",
                    });
                    await cohere.chat({
                        chatHistory: [],
                        message: storyPrompt,
                        connectors: [{ id: 'web-search' }]
                    }).then((response)=> {
                            console.log(response)
                            this.storyGenResponse = response
                            if(response.text != null){
                                console.log(response.text)
                                this.storyText = response.text;
                            }
                            this.setLoadingOverLay(false, "")
                        }
                    )
                }
                catch(err){
                    console.log(err)
                    this.setLoadingOverLay(false, "")
                }   
            }
            else{
                alert("Please fill all story parameters.")
            }
        },
        async continueStory(){
            console.log("continue story story")
            if(this.storyGenResponse != null){
                this.setLoadingOverLay(true, "Please wait. Story is being Generated...")
                var chatHis = this.storyGenResponse.chatHistory
                chatHis.push({ role: "CHATBOT", message: this.storyGenResponse.text})
                try{
                    const cohere = new CohereClient({
                        token: "XtLnyRvwWZxsq2YXfHqIAsSXtdFlwvQwWSGC1BAz",
                    });
                    await cohere.chat({
                        chatHistory: chatHis,
                        message: "Continue story with extactly " + this.wordCount +" words.",
                        connectors: [{ id: 'web-search' }]
                    }).then((response)=> {
                            console.log(response)
                            this.storyGenResponse = response
                            if(response.text != null){
                                console.log(response.text)
                                this.storyText = this.storyText + "\n\n" + response.text;
                            }
                            this.setLoadingOverLay(false, "")
                        }
                    )
                }
                catch(err){
                    console.log(err)
                    this.setLoadingOverLay(false, "")
                }
            }
        },
        clearFields(){
            this.title= null 
            this.characterName= null 
            this.characterRole= null 
            this.setting= null 
            this.country= null 
            this.language= null 
            this.genre= null 
            this.wordCount= null 
            this.storyText= null 
            this.storyGenResponse= null 
        },
        setLoadingOverLay(isShow, message){
            if(isShow){
                this.loadingOverlay = true
                this.loadingMSG = message
            }
            else{
                this.loadingOverlay = false
                this.loadingMSG = null
            }
        },
        getParameterID(parameterName, parameterIDList){
            var returnID = null
            parameterIDList.forEach(element => {
                if(element.name == parameterName){
                    returnID = element.id
                }
            });
            return returnID
        },
        async getRoles(){
            this.setLoadingOverLay(true, "Please wait. While fetching data...")
            console.log("getAllRoles.")

            await ParameterService.getAllRoles().then((response)=> {
                console.log(response)
                if(response.statusText == "OK"){
                    response.data.forEach(element => {
                        console.log(element.name)
                        this.characterRoleItems.push(element.name)
                        this.characterRoleIds.push({name: element.name, id: element.id})
                    });
                    this.parametersOverlay = !this.parametersOverlay
                }
                console.log(this.characterRoleItems[0].name)
                this.setLoadingOverLay(false, "")
            })
        },
        async getGenre(){
            console.log("getAllGenres.")
            this.setLoadingOverLay(true, "Please wait. While fetching data...")

            await ParameterService.getAllGenres().then((response)=> {
                console.log(response)
                if(response.statusText == "OK"){
                    response.data.forEach(element => {
                        this.genreItems.push(element.name)
                        this.genreIds.push({name: element.name, id: element.id})
                    });
                    this.parametersOverlay = !this.parametersOverlay
                }
                this.setLoadingOverLay(false, "")
            })
        },
        async getSetings(){
            console.log("getCountries.")
            this.setLoadingOverLay(true, "Please wait. While fetching data...")
                        
            await ParameterService.getAllSettings().then((response)=> {
                console.log(response)
                if(response.statusText == "OK"){
                    response.data.forEach(element => {
                        this.settingItems.push(element.name)
                        this.settingIds.push({name: element.name, id: element.id})
                    });
                    this.parametersOverlay = !this.parametersOverlay
                }
                this.setLoadingOverLay(false, "")
            })
        },
        async getCountries(){
            console.log("getCountries.")
            this.setLoadingOverLay(true, "Please wait. While fetching data...")
                        
            await ParameterService.getAllCountries().then((response)=> {
                console.log(response)
                if(response.statusText == "OK"){
                    response.data.forEach(element => {
                        this.countryItems.push(element.name)
                        this.countryIds.push({name: element.name, id: element.id})
                    });
                    this.parametersOverlay = !this.parametersOverlay
                }

                this.setLoadingOverLay(false, "")
            })
        },
        async getLanguages(){
            console.log("getCountries.")
            this.setLoadingOverLay(true, "Please wait. While fetching data...")
                        
            await ParameterService.getAllLanguages().then((response)=> {
                console.log(response)
                if(response.statusText == "OK"){
                    response.data.forEach(element => {
                        this.languageItems.push(element.name)
                        this.languageIds.push({name: element.name, id: element.id})
                    });
                    this.parametersOverlay = !this.parametersOverlay
                }
                this.setLoadingOverLay(false, "")
            })
        },
        showSnackBar(msg){
            this.snackbar = true
            this.snackbarMSG = msg
        }
      },
      watch: {
      
      },
      beforeMount(){
        this.onLoad()
      }
    }
  </script>