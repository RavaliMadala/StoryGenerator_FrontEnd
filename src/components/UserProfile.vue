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
              :disabled="!form"
              :loading="loading"
              block
              color="#711429"
              size="large"
              type="submit"
              variant="elevated"
              rounded="xl"
            >
              Update profile
            </v-btn>
            <br/>
          </v-form>
        </v-card>
  
      </v-container>
  
      <v-snackbar
        v-model="snackbar"
        :timeout="timeout"
      >
        Registeration Success. Please wait while redirecting...
      </v-snackbar>
  
    </v-sheet>
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
        ]
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
        async registerClick(){
          try{
            await AuthenticationService.register({
                email: this.email,
                firstName: this.firstName,
                lastName: this.lastName,
                phoneNumber: this.phoneNumber,
                gender: this.gender,
                password: this.password,
                permission: "user"
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
        clearFields(){
          this.password = ""
          this.email = ""
          this.passwordConfirm = ""
          this.firstName = ""
          this.lastName = ""
          this.phoneNumber = ""
          this.gender = ""
        },
        showError(errorText){
          this.alertMessage = errorText;
          this.showAlert = true;
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