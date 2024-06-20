<template>
    <div>
        <v-list>
            <v-list-item
                    v-for="user in users"
                    :key="user.id"
                    :title= "user.email"
                    prepend-icon="mdi-arrow-right"
                >
                    <template v-slot:append>
                    <v-btn size="small" variant="tonal" @click="openUser(user)">
                        <v-icon color="#711429" > mdi-book-open  </v-icon>&nbsp;
                        Open
                    </v-btn>
                    &nbsp;
                    </template>
                    <v-divider color="#fff"></v-divider>
                </v-list-item>
        </v-list>
    </div>
    
    <v-overlay
      :model-value="loadingOverlay"
      class="align-center justify-center"
      persistent
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
      :model-value="userOverlay"
      class="align-center justify-center"
      persistent
    >
        <v-card class="mx-auto px-10 py-2" width="850px" height="50px" color="#711429">
            <v-row >
                    <v-col col="1">
                        <v-btn
                            @click="updateUser"
                            color="#121212"
                        >
                            Update
                        </v-btn>
                    </v-col>
                    <v-col col="1">
                        <v-btn
                            @click="deleteUser"
                            color="#121212"
                        >
                            Delete
                        </v-btn>
                    </v-col>
                    <v-col col="9">
                        <div width="400"></div>
                    </v-col>
                    <v-col col="1" align="right">
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
        <v-card class="mx-auto" width="850px">
            <v-form v-model="form" >
                <br/>
                <v-row>
                    <v-col cols="1"></v-col>
                    
                    <v-col cols="10">
                        <v-text-field
                        v-model="email"
                        :readonly="loading"
                        :rules="emailRules"
                        class="mb-2"
                        clearable
                        label="Email"
                        hide-details
                        disabled="true"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="1"></v-col>
                </v-row>
  
                <v-row>
                    <v-col cols="1"></v-col>
                    <v-col cols="5">
                        <v-text-field
                        v-model="firstName"
                        :readonly="loading"
                        :rules="[required]"
                        class="mb-1"
                        clearable
                        label="First Name"
                        ></v-text-field>
                    </v-col>
        
                    <v-col cols="5">
                        <v-text-field
                        v-model="lastName"
                        :readonly="loading"
                        :rules="[required]"
                        class="mb-1"
                        clearable
                        label="Last Name"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="1"></v-col>
                </v-row>

                <v-row>
                    <v-col cols="1"></v-col>
                    <v-col cols="5">
                        <v-text-field
                        v-model="phoneNumber"
                        :readonly="loading"
                        :rules="phoneNumberRules"
                        class="mb-2"
                        clearable
                        label="Phone Number"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="5">
                        <v-select
                        v-model="gender"
                        :items="genderItem"
                        :rules="[v => !!v || 'Item is required']"
                        label="Gender"
                        required
                        ></v-select>
                    </v-col>
                    <v-col cols="1"></v-col>
                </v-row>
  
                <v-row>
                    <v-col cols="1"></v-col>
                    <v-col cols="10">
                        <v-text-field
                        v-model="password"
                        :readonly="loading"
                        :rules="[required]"
                        clearable
                        label="New Password"
                        placeholder="Enter your password"
                        onch
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'"
                        @click:append="show1 = !show1"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="1"></v-col>
                </v-row>

                <v-row>
                    <v-col cols="1"></v-col>
                    <v-col cols="10">
                        <v-text-field
                            v-model="passwordConfirm"
                            :readonly="loading"
                            :rules="[required]"
                            clearable
                            label="Confirm New Password"
                            placeholder="Confirm password"
                            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show2 ? 'text' : 'password'"
                            @click:append="show2 = !show2"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="1"></v-col>
                </v-row>
              
            <br/>
  
          </v-form>
        </v-card>
      
    </v-overlay>
</template>
  
  <script>
  import AuthenticationService from '@/services/UserAuthenticationService'
  import router from '../router'

    export default {
        data: () => ({
            users: [],
            userOverlay: false,
            loadingOverlay: false,
            loadingMSG: "",
            refreshUser: false,

            email: null,
            firstName: null,
            lastName: null,
            password: null,
            passwordConfirm: null,
            phoneNumber: null,
            gender: null,
            genderItem: ['Male','Female','Other'],
        
            loading: false,
            form: false,
            emailRules: [
                value => {
                    if (value) return true
        
                    return 'E-mail is requred.'
                },
                value => {
                    if (/.+@.+\..+/.test(value)) return true
        
                    return 'E-mail must be valid.'
                },
            ],
            phoneNumberRules: [
                value => {
                    if (value) return true
        
                    return 'Phone Number is requred.'
                },
                value => {
                    if (value?.length == 9 && /[0-9-]+/.test(value)) return true
                    
                    return 'Phone Number must be valid.'
                },
            ],

            showAlert: false,
            alertMessage: "",
            snackbar: false,
            timeout: 2000,
            show1: false,
            show2: false,
        }),
  
        methods: {
            onLoad(){
                console.log("onload.")
                this.getUsers()
            },
            closeOverLay(){
                this.userOverlay = !this.userOverlay
                this.selectedParameter = ""
            },
            async getUsers(){
                this.setLoadingOverLay(true, "Please wait. While fetching data...")
                console.log("Get All Users.")

                await AuthenticationService.getAlUsers().then((response)=> {
                    console.log(response)
                    if(response.statusText == "OK"){
                        this.users = response.data
                    }
                    this.setLoadingOverLay(false, "")
                })
            },
            async CreateUser (){
                try{
                    await AuthenticationService.register({
                        email: this.email,
                        firstName: this.firstName,
                        lastName: this.lastName,
                        phoneNumber: this.phoneNumber,
                        gender: this.gender,
                        password: this.password,
                        permission: "User"
                    }).then((response)=> {
                            console.log(response)
                            if(response.statusText == "OK"){
                            this.clearFields()
                            this.snackbar = true
                            setTimeout(() => (router.push('/login')), 1000)
                            }
                        }
                    )
                }
                catch(err){
                    console.log(err)
                    this.showError(err)
                }
            },
            async deleteParameters (id){
                console.log(this.selectedParameter)
                this.setLoadingOverLay(true, "Please wait. While deleting data...")
                console.log("delete Role.")

                await AuthenticationService.getAlUsers().then((response)=> {
                    console.log(response)
                    if(response.statusText == "OK"){
                        this.addData = ""
                        this.userOverlay = !this.userOverlay
                        this.refreshParameter = !this.refreshParameter
                    }
                    this.setLoadingOverLay(false, "")
                })
            },
            openUser(currentUser){
                this.userOverlay = !this.userOverlay
                this.email = currentUser.email
                this.firstName = currentUser.firstName
                this.lastName = currentUser.lastName
                this.phoneNumber = currentUser.phoneNumber
                this.gender = currentUser.gender
            },
            required (v) {
                return !!v || 'Field is required'
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
            async updateUser(){
                console.log("update Role.")
                await AuthenticationService.updateUser({
                    email : this.email,
                    firstName : this.firstName,
                    lastName : this.lastName,
                    phoneNumber : this.phoneNumber,
                    gender : this.gender,
                    password : this.password
                }).then((response)=> {
                    console.log(response)
                    if(response.statusText == "OK"){
                        this.userOverlay = !this.userOverlay
                        this.refreshUser = !this.refreshUser
                    }
                    this.setLoadingOverLay(false, "")
                })
            },
            async deleteUser(){
                console.log("delete user.")
                await AuthenticationService.deleteUser(this.email).then((response)=> {
                    console.log(response)
                    if(response.statusText == "OK"){
                        this.userOverlay = !this.userOverlay
                        this.refreshUser = !this.refreshUser
                    }
                    this.setLoadingOverLay(false, "")
                })
            }
        },
        beforeMount() {
            console.log("beforemount.")
            this.onLoad()
        },
        watch: {
            refreshUser: function(){
                this.loadingOverlay = false
                this.users = []
                this.getUsers()
            }
        }
    }
  </script>