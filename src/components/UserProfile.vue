<template>
    <br/>
    <v-sheet
      class="pa-4 text-center mx-auto"
      elevation="12"
      max-width="600"
      rounded="lg"
      width="100%"
    >
      <h1 class="text-center">Profile</h1>
  
      <v-container>
        <v-card class="mx-auto" max-width="500" elevation="0">
          <v-form
            v-model="form"
            @submit.prevent="onSubmit"
          >
            <v-row>
              <v-col cols="12">
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
            </v-row>
  
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="firstName"
                  :readonly="loading"
                  :rules="[required]"
                  class="mb-1"
                  clearable
                  label="First Name"
                ></v-text-field>
              </v-col>
  
              <v-col cols="6">
                <v-text-field
                  v-model="lastName"
                  :readonly="loading"
                  :rules="[required]"
                  class="mb-1"
                  clearable
                  label="Last Name"
                ></v-text-field>
              </v-col>
            </v-row>
  
            

            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="phoneNumber"
                  :readonly="loading"
                  :rules="phoneNumberRules"
                  class="mb-2"
                  clearable
                  label="Phone Number"
                ></v-text-field>
              </v-col>
            </v-row>
  
            <v-row>
              <v-col cols="12">
                <v-select
                  v-model="gender"
                  :items="genderItem"
                  :rules="[v => !!v || 'Item is required']"
                  label="Gender"
                  required
                ></v-select>
              </v-col>
            </v-row>
  
            <v-row>
              <v-col cols="12">
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
            </v-row>

            <v-row>
                <v-col cols="12">
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
            </v-row>

            <v-alert
              variant="outlined"
              type="warning"
              prominent
              border="top"
              value="passwordAlert"
              v-show="showAlert"
            >
              {{alertMessage}}
            </v-alert>
              
            <br/>
  
            <v-btn
              color="#711429"
              size="large"
              type="submit"
              variant="elevated"
              rounded="xl"
              @click = "updateUser"
            >
              Update profile
            </v-btn>
            <br/>
          </v-form>
        </v-card>
  
      </v-container>
    </v-sheet>

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
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
    >
      {{ snackbarMSG }}
    </v-snackbar>
  </template>
  
  <script>
  import router from '../router'
  import AuthenticationService from '@/services/UserAuthenticationService'
  
    export default {
      data: () => ({
        form: false,
        email: null,
        firstName: null,
        lastName: null,
        password: null,
        passwordConfirm: null,
        phoneNumber: null,
        gender: null,
        genderItem: ['Male','Female','Other'],
        loading: false,
        showAlert: false,
        alertMessage: "",
        snackbar: false,
        snackbarMSG: "",
        timeout: 2000,
        show1: false,
        show2: false,
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

        loadingMSG: "",
        loadingOverlay: false
      }),
  
      methods: {
        onSubmit () {
          if (!this.form) return
  
          this.loading = true
  
          setTimeout(() => (this.loading = false), 2000)
        },
        required (v) {
          return !!v || 'Field is required'
        },
        showError(errorText){
          this.alertMessage = errorText;
          this.showAlert = true;
        },
        async updateUser(){
          console.log("update User.")
          this.setLoadingOverLay(true, "Please wait updating details")
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
                  this.showSnackBar("User updated Successfully.")
                }
              this.setLoadingOverLay(false, "")
          })
        },
        async getUser(){
          console.log("get User.")
          this.setLoadingOverLay(true, "Please wait fetching details")
          try{
            await AuthenticationService.getUser(sessionStorage.getItem('UserId')).then((response)=> {
                console.log(response.statusText)
                if(response.statusText == "OK"){
                  this.email = response.data.email
                  this.firstName = response.data.firstName
                  this.lastName = response.data.lastName
                  this.phoneNumber = response.data.phoneNumber
                  this.gender = response.data.gender
                }
                this.setLoadingOverLay(false, "")
              }
            )
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
        },
        showSnackBar(msg){
            this.snackbar = true
            this.snackbarMSG = msg
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
      },
      beforeMount(){
        this.getUser()
      }
    }
  </script>