<template>
  <v-sheet>
    <h1 class="text-center">Register</h1>
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
          onch
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          @click:append="show1 = !show1"
        ></v-text-field>

        <v-text-field
          v-model="passwordConfirm"
          :readonly="loading"
          :rules="[required]"
          clearable
          label="Confirm Password"
          placeholder="Confirm password"
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show2 ? 'text' : 'password'"
          @click:append="show2 = !show2"
        ></v-text-field>

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
          @click="registerClick"
        >
          Register
        </v-btn>
        <br/>
      </v-form>
    </v-card>

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
      username: null,
      password: null,
      passwordConfirm: null,
      loading: false,
      showAlert: false,
      alertMessage: "",
      snackbar: false,
      timeout: 2000,
      show1: false,
      show2: false,
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
              username: this.username,
              password: this.password,
              permission: "user"
          }).then((response)=> {
                console.log(response)
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
                  this.clearFields()
                  this.snackbar = true
                  setTimeout(() => (router.push('/')), 2000)
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
        this.username = ""
        this.passwordConfirm = ""
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