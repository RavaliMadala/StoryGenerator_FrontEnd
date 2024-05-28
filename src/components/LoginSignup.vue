<template>
  <v-sheet>
    <h1 class="text-center">Login</h1>
    <br/>
    <v-card class="mx-auto px-6 py-8" max-width="344">
      <v-form
        v-model="form"
        @submit.prevent="onSubmit"
      >
        <v-text-field
          v-model="username"
          :readonly="loading"
          :rules="[required]"
          class="mb-2"
          clearable
          label="Username"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :readonly="loading"
          :rules="[required]"
          clearable
          label="Password"
          placeholder="Enter your password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          @click:append="show1 = !show1"
        ></v-text-field>
        
        <br>
        
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
          @click="loginClick"
        >
          Login
        </v-btn>
        <br/>
      </v-form>
    </v-card>
    
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
    >
      Login Success. Please wait while redirecting...
    </v-snackbar>

  </v-sheet>
</template>

<script>
import router from '../router'
import AuthenticationService from '@/services/UserAuthenticationService'

  export default {
    data: () => ({
      form: false,
      username: null,
      password: null,
      passwordConfirm: null,
      loading: false,
      snackbar: false,
      timeout: 2000,
      show1: false,
      showAlert: false,
      alertMessage: "",
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
      async loginClick(){
        try{
          await AuthenticationService.login({
              username: this.username,
              password: this.password
          }).then((response)=> {
                console.log(response.statusText)
                if(response.statusText == "OK"){
                  this.$store.commit('setUserName', response.data.username)
                  this.$store.commit('setPermission', response.data.permission)
                  this.$store.commit('setIsUserLoggedIn', true)

                  sessionStorage.setItem('UserName', response.data.username)
                  sessionStorage.setItem('UserPermission', response.data.permission)
                  sessionStorage.setItem('IsUserLoggedIn', true)
                  console.log(sessionStorage.getItem('UserName'))
                  console.log(sessionStorage.getItem('UserPermission'))
                  console.log(sessionStorage.getItem('IsUserLoggedIn'))
                  //this.clearFields() 
                  this.snackbar = true
                  setTimeout(() => (router.push('/story')), 800)
                }
              }
          )
        }
        catch(err){
          console.log(err)
          this.showError("Login Failed. Please check username and Password.")
          this.clearFields()
        }
      },
      showError(errorText){
        this.alertMessage = errorText;
        this.showAlert = true;
      },
      clearFields(){
        this.password = ""
        this.username = ""
      },
    }
  }

</script>
