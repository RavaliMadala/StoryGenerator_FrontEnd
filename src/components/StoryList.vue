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
                    v-for="ver in story.StoryVersionControls"
                    :key="ver.storyVersion"
                    :title= setVersion(ver.storyVersion)
                    prepend-icon="mdi-arrow-right"
                >
                    <v-list-item-title>{{ ver.storyPrompt }}</v-list-item-title>
                    <template v-slot:append>
                    <v-btn size="small" variant="tonal" @click="openStoryOverlay(ver)">
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

    <v-overlay
      :model-value="storyOverlay"
      class="align-center justify-center"
      persistent
    >
      <v-card class="mx-auto px-10 py-5" width="850px" height="50px" color="#711429">
        <v-row>
                <v-btn
                    @click="editStory"
                    color="#121212"
                >
                    Edit    
                </v-btn>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <v-btn
                    @click="exportToPDF"
                    color="#121212"
                >
                    Download
                </v-btn>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <v-btn
                    @click="deleteStoryVersion"
                    color="#121212"
                >
                    Delete
                </v-btn>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <v-btn
                    @click="this.storyOverlay = !this.storyOverlay"
                    color="#121212"
                >
                    close
                </v-btn>
        </v-row>
      <br/>
      </v-card>
      <v-card class="scroll" height="650px" color="#fff">
        <vue-html2pdf
            :show-layout="false"
            :preview-modal="true"
            :paginate-elements-by-height="10"
            :filename="test"
            :pdf-quality="2"
            :pdf-format="size"
            :ref="ref"
            id= "pdf"
            
          >
            <section>
                <v-infinite-scroll
                    height="700"
                    mode="manual"
                >
                    <section class="pdf-item">
                    <div>
                        <v-card class="mx-auto px-10 py-8 overflow-y-auto" color="#fff" width="800px">
                            <v-row><h4>Title: </h4>&nbsp;<p>{{ currentSelectedStory.storyTitle }}</p></v-row>
                            <v-row><h4>Prompt: </h4>&nbsp;<p>{{ currentSelectedStory.storyPrompt }}</p></v-row>
                            <v-row><h4>Version: </h4> &nbsp; <p>{{ currentSelectedStory.storyVersion }}</p></v-row>
                            <br/>
                            <v-row><v-divider color="#121212"></v-divider></v-row>
                            <v-card-text class="overflow-y-auto">
                                
                                    <span style="white-space: pre-line">
                                        {{ currentSelectedStory.StoryResponse }}
                                    </span>
                                
                            </v-card-text>
                        </v-card>
                    </div>
                    </section>
                </v-infinite-scroll>
            </section>
          </vue-html2pdf>
        </v-card>
    </v-overlay>
</template>
  
  <script>
  import StoryService from '@/services/StoryService'
  import html2pdf from "html2pdf.js";
  import router from '../router'

    export default {
        data: () => ({
            storys: [],
            isStories: false,
            loadingOverlay: false,
            loadingMSG: "",
            refreshStories: false,
            storyOverlay: false,
            currentSelectedStory: null,
            opt: {
                margin: 0,
                filename: 'myfile.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            },
            height: 500
        }),
  
        methods: {
            onLoad(){

            },
            setVersion(version){
                return "Version: " + version
            },
            openStoryOverlay(story){
                console.log(story)
                this.currentSelectedStory = story
                this.storyOverlay = !this.storyOverlay
            },
            async getStories() {
                //this.$store.state.isUserLoggedIn
                try{
                    this.setLoadingOverLay(true, "Please wait. While fetching your stories...")
                    console.log(sessionStorage.getItem("UserId"))
                    await StoryService.getStories(sessionStorage.getItem("UserId")).then((response)=> {
                        console.log(response)
                        if(response.statusText == "OK"){
                            this.storys = response.data
                            console.log("story length: "+response.data.length)
                        }
                        this.setLoadingOverLay(false, "")
                    })
                }
                catch(err){
                    console.log(err)
                    this.setLoadingOverLay(false, "")
                }
            },
            async deleteStoryVersion() {
                //this.$store.state.isUserLoggedIn
                try{
                    this.setLoadingOverLay(true, "Please wait. While Deleting story...")
                    await StoryService.deleteStoryVersion(this.currentSelectedStory.id).then((response)=> {
                        console.log(response)
                        if(response.statusText == "OK"){
                            this.storyOverlay = !this.storyOverlay
                            this.refreshStories = !this.refreshStories
                        }
                        this.setLoadingOverLay(false, "")
                    })
                }
                catch(err){
                    console.log(err)
                    this.setLoadingOverLay(false, "")
                }
            },
            exportToPDF() {
                this.opt.filename = this.currentSelectedStory.storyTitle + "_V" + this.currentSelectedStory.storyVersion + ".pdf"
                html2pdf().set(this.opt).from(document.getElementById('pdf')).save()
            },
            editStory(){
                this.$store.commit('setStoryDetails', this.currentSelectedStory )
                router.push('/editstory')
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