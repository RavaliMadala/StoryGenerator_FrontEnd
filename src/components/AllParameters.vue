<template>
    <div>
        <v-list v-show="this.parameters.length > 0">
            <v-list-item
                    v-for="param in parameters"
                    :key="param"
                    :title= "param"
                    prepend-icon="mdi-arrow-right"
                >
                    <template v-slot:append>
                    <v-btn size="small" variant="tonal" @click="getParameters(param)">
                        <v-icon color="#711429" > mdi-book-open  </v-icon>&nbsp;
                        Open
                    </v-btn>
                    &nbsp;
                    </template>
                    <v-divider color="#fff"></v-divider>
                </v-list-item>
        </v-list>
        <h1 v-show="this.parameters.length < 1">No Storyies to show.</h1>
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
      :model-value="parametersOverlay"
      class="align-center justify-center"
      persistent
    >
        <v-card class="mx-auto px-10 py-2" width="850px" height="50px" color="#711429">
            <v-row >
                    <v-col col="9" class="py-0" >
                        <v-text-field
                            v-model="addData"
                            variant="underlined"
                            label="Enter Data"
                            width="400"
                            hide-details
                        ></v-text-field>
                    </v-col>

                    <v-col col="1">
                        <v-btn
                            @click="CreateParameters"
                            color="#121212"
                        >
                            Create
                        </v-btn>
                    </v-col>
                    <v-col col="1">
                        <div width="400"></div>
                    </v-col>
                    <v-col col="1">
                        <v-spacer></v-spacer>
                        <v-btn
                            @click="closeOverLay"
                            color="#121212"
                        >
                            close
                        </v-btn>
                    </v-col>
            </v-row>
      </v-card>
        <v-card class="mx-auto" width="850px"  color="#711429">
        <v-list>
            <v-list-item
                    v-for="par in getParams"
                    :key="par.id"
                    :title= "par.name"
                >
                    <template v-slot:append>
                    <v-btn size="small" variant="tonal" @click="getParameters(par.id)">
                        <v-icon color="#711429" > mdi-book-open  </v-icon>&nbsp;
                        Delete
                    </v-btn>
                    &nbsp;
                    </template>
                    <v-divider color="#fff"></v-divider>
            </v-list-item>
        </v-list>


      </v-card>
      
    </v-overlay>
</template>
  
  <script>
  import ParameterService from '@/services/ParameterService'
  import router from '../router'

    export default {
        data: () => ({
            parameters: ['Character Roles','Genres','Settings', 'Countries', 'Languages'],
            getParams: null,
            isStories: false,
            loadingOverlay: false,
            loadingMSG: "",
            addData: "",
            refreshParameter: false,
            parametersOverlay: false,
            currentSelectedStory: null,
            selectedParameter: ""
        }),
  
        methods: {
            onLoad(){

            },
            closeOverLay(){
                this.parametersOverlay = !this.parametersOverlay
                this.selectedParameter = ""
            },
            async getParameters (parameter){
                this.selectedParameter = parameter
                switch(parameter){
                    case "Character Roles":
                        this.setLoadingOverLay(true, "Please wait. While fetching data...")
                        console.log("getAllRoles.")

                        await ParameterService.getAllRoles().then((response)=> {
                            console.log(response)
                            if(response.statusText == "OK"){
                                this.getParams = response.data
                                this.parametersOverlay = !this.parametersOverlay
                            }
                            this.setLoadingOverLay(false, "")
                        })

                        break
                    case "Genres": 
                        console.log("getAllGenres.")
                        this.setLoadingOverLay(true, "Please wait. While fetching data...")

                        await ParameterService.getAllGenres().then((response)=> {
                            console.log(response)
                            if(response.statusText == "OK"){
                                this.getParams = response.data
                                this.parametersOverlay = !this.parametersOverlay
                            }
                            this.setLoadingOverLay(false, "")
                        })

                        break
                    case "Settings" :  
                        console.log("getCountries.")
                        this.setLoadingOverLay(true, "Please wait. While fetching data...")
                        
                        await ParameterService.getAllSettings().then((response)=> {
                            console.log(response)
                            if(response.statusText == "OK"){
                                this.getParams = response.data
                                this.parametersOverlay = !this.parametersOverlay
                            }
                            this.setLoadingOverLay(false, "")
                        })

                        break
                    case "Countries" :  
                        console.log("getCountries.")
                        this.setLoadingOverLay(true, "Please wait. While fetching data...")
                        
                        await ParameterService.getAllCountries().then((response)=> {
                            console.log(response)
                            if(response.statusText == "OK"){
                                this.getParams = response.data
                                this.parametersOverlay = !this.parametersOverlay
                            }
                            this.setLoadingOverLay(false, "")
                        })

                        break
                    case "Languages" :  
                        console.log("getCountries.")
                        this.setLoadingOverLay(true, "Please wait. While fetching data...")
                        
                        await ParameterService.getAllLanguages().then((response)=> {
                            console.log(response)
                            if(response.statusText == "OK"){
                                this.getParams = response.data
                                this.parametersOverlay = !this.parametersOverlay
                            }
                            this.setLoadingOverLay(false, "")
                        })

                        break
                    default:
                        console.log("No match")
                        break
                }
            },
            async CreateParameters (){
                if(this.addData == null || this.addData == ""){
                    console.log("no data")
                    return
                }
                console.log(this.selectedParameter)
                switch(this.selectedParameter){
                    case "Character Roles":
                        this.setLoadingOverLay(true, "Please wait. While saving data...")
                        console.log("saveRole.")

                        await ParameterService.saveRole({
                            name: this.addData,
                            sessionId: sessionStorage.getItem('sessionId')
                        }).then((response)=> {
                            console.log(response)
                            if(response.statusText == "OK"){
                                this.addData = ""
                                this.parametersOverlay = !this.parametersOverlay
                                this.refreshParameter = !this.refreshParameter
                            }
                            this.setLoadingOverLay(false, "")
                        })

                        break
                    case "Genres": 
                        console.log("getAllGenres.")
                        this.setLoadingOverLay(true, "Please wait. While saving data...")

                        await ParameterService.saveGenre({
                            name: this.addData,
                            sessionId: sessionStorage.getItem('sessionId')
                        }).then((response)=> {
                            console.log(response)
                            if(response.statusText == "OK"){
                                this.addData = ""
                                this.parametersOverlay = !this.parametersOverlay
                                this.refreshParameter = !this.refreshParameter
                            }
                            this.setLoadingOverLay(false, "")
                        })

                        break
                    case "Settings" :  
                        console.log("getCountries.")
                        this.setLoadingOverLay(true, "Please wait. While saving data...")
                        
                        await ParameterService.saveSetting({
                            name: this.addData,
                            sessionId: sessionStorage.getItem('sessionId')
                        }).then((response)=> {
                            console.log(response)
                            if(response.statusText == "OK"){
                                this.addData = ""
                                this.parametersOverlay = !this.parametersOverlay
                                this.refreshParameter = !this.refreshParameter
                            }
                            this.setLoadingOverLay(false, "")
                        })

                        break
                    case "Countries" :  
                        console.log("getCountries.")
                        this.setLoadingOverLay(true, "Please wait. While saving data...")
                        
                        await ParameterService.saveCountry({
                            name: this.addData,
                            sessionId: sessionStorage.getItem('sessionId')
                        }).then((response)=> {
                            console.log(response)
                            if(response.statusText == "OK"){
                                this.addData = ""
                                this.parametersOverlay = !this.parametersOverlay
                                this.refreshParameter = !this.refreshParameter
                            }
                            this.setLoadingOverLay(false, "")
                        })

                        break
                    case "Languages" :  
                        console.log("getCountries.")
                        this.setLoadingOverLay(true, "Please wait. While saving data...")
                        
                        await ParameterService.saveLanguage({
                            name: this.addData,
                            sessionId: sessionStorage.getItem('sessionId')
                        }).then((response)=> {
                            console.log(response)
                            if(response.statusText == "OK"){
                                this.addData = ""
                                this.parametersOverlay = !this.parametersOverlay
                                this.refreshParameter = !this.refreshParameter
                            }
                            this.setLoadingOverLay(false, "")
                        })

                        break
                    default:
                        console.log("No match")
                        break
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
        },
        watch: {
            refreshParameter: function(){
                this.loadingOverlay = false
                this.getParams = []
                this.getParameters(this.selectedParameter)
            }
        }
    }
  </script>