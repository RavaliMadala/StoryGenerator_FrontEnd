<template>
    <div>
        <v-row class="text-right"> 
            <v-col col="12" mb="2">
                <v-btn
                prepend-icon="mdi-account-circle"
                @click="refreshStories = !refreshStories"
                >
                <template v-slot:prepend>
                    <v-icon color="#711429">mdi-refresh</v-icon>
                </template>
                    Refresh
                </v-btn>
            </v-col>
        </v-row>
        <v-list v-show="this.storys.length > 0">
            <v-list-group no-action v-for='story in storys' :key="story.id">
                <template v-slot:activator="{ props }">
                    <v-list-item slot='activator' v-bind="props">
                        <v-list-item-title>{{ story.storyTitle }}</v-list-item-title>
                    </v-list-item>
                </template>

                <v-list-item
                    v-for="ver in story.versions"
                    :key="ver.storyVersion"
                    :title= setVersion(ver.storyVersion)
                    prepend-icon="mdi-arrow-right"
                >
                    <v-list-item-title>{{ ver.storyPrompt }}</v-list-item-title>
                    <template v-slot:append>
                    <v-btn size="small" variant="tonal">
                        <v-icon color="#711429" > mdi-book-open  </v-icon>&nbsp;
                        Open
                    </v-btn>
                    &nbsp;
                    </template>
                    <v-divider color="#fff"></v-divider>
                </v-list-item>
            </v-list-group>
        </v-list>
        <h1 v-show="this.storys.length < 1">No Storyies to show.</h1>
    </div>
    
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
</template>
  
  <script>
  import StoryService from '@/services/StoryService'

    export default {
        data: () => ({
            storys: [],
            isStories: false,
            loadingOverlay: false,
            loadingMSG: "",
            refreshStories: false
        }),
  
        methods: {
            onLoad(){

            },
            setVersion(version){
                return "Version: " + version
            },
            async getStories() {
                //this.$store.state.isUserLoggedIn
                try{
                    this.setLoadingOverLay(true, "Please wait. While fetching your stories...")
                    console.log(sessionStorage.getItem("UserId"))
                    await StoryService.getStories(sessionStorage.getItem("UserId")).then((response)=> {
                        console.log(response)
                        if(response.statusText == "OK"){
                            this.storys = response.data.response
                        }
                        this.setLoadingOverLay(false, "")
                    })
                }
                catch(err){
                    console.log(err)
                    this.setLoadingOverLay(false, "")
                }
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
            }
        },
        beforeMount() {
            this.loadingOverlay = true
            this.getStories()
        },
        watch: {
            refreshStories: function(){
                this.loadingOverlay = true
                this.storys = []
                this.getStories()
            }
        }
    }
  </script>