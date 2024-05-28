<template>
      <div>
      <v-app-bar
          color="#711429"
          density="compact"
          elevation="5"
        >
          <v-app-bar-title>Teller AI</v-app-bar-title>
  
          <template v-slot:prepend>
            <v-btn
              color="white"
              icon="mdi-home"
              variant="text"
              to="/"
            ></v-btn>
          </template>
          
          <template v-slot:append>
            <div class="text-center">
              <v-btn
                prepend-icon="mdi-typewriter"
                @click="story"
                v-show="this.$store.state.isUserLoggedIn"
              >
                <template v-slot:prepend>
                  <v-icon color="#fff"></v-icon>
                </template>
                Story
              </v-btn>
              <v-btn
                prepend-icon="mdi-account"
                v-show="this.$store.state.isUserLoggedIn"
              >
                <template v-slot:prepend>
                  <v-icon color="#fff"></v-icon>
                </template>
                {{this.$store.state.username}}
              </v-btn>
              <v-btn
                prepend-icon="mdi-logout"
                @click="logout"
                v-show="this.$store.state.isUserLoggedIn"
              >
                <template v-slot:prepend>
                  <v-icon color="#fff"></v-icon>
                </template>
                LogOut
              </v-btn>

              <v-btn
                prepend-icon="mdi-login"
                @click="login"
                v-show="!this.$store.state.isUserLoggedIn"
              >
                <template v-slot:prepend>
                  <v-icon color="#fff"></v-icon>
                </template>
                Log IN
              </v-btn>

              <v-btn
                prepend-icon="mdi-login"
                @click="signup"
                v-show="!this.$store.state.isUserLoggedIn"
              >
                <template v-slot:prepend>
                  <v-icon color="#fff"></v-icon>
                </template>
                sign up
              </v-btn>
            </div>
        </template>

        </v-app-bar>
        </div>
  </template>
  
<script>
  import router from '../router'
  export default {
    data: () => ({
      isUserLoggedIn: false,
      userName: "",
      logoutUser: false,
    }),

    methods: {
      onLoad(){
        
        console.log(sessionStorage.getItem('UserName'))
        console.log(sessionStorage.getItem('UserPermission'))
        console.log(sessionStorage.getItem('IsUserLoggedIn'))

        console.log(this.$store.state.username)
        console.log(this.$store.state.permission)
        console.log(this.$store.state.isUserLoggedIn)

        if(sessionStorage.getItem("IsUserLoggedIn") != null && sessionStorage.getItem("IsUserLoggedIn") != this.$store.state.isUserLoggedIn){
          this.$store.state.isUserLoggedIn = sessionStorage.getItem("IsUserLoggedIn")
        }
        if(sessionStorage.getItem("UserName") !=  null && sessionStorage.getItem("UserName") != this.$store.state.username){
          this.$store.state.username = sessionStorage.getItem("UserName")
        }
        if(sessionStorage.getItem("UserPermission") != null && sessionStorage.getItem("UserPermission") != this.$store.state.permission){
          this.$store.state.permission = sessionStorage.getItem("UserPermission")
        }
      },
        login(){
          router.push("/login")
        },
        signup(){
          router.push("/signup")
        },
        story(){
          router.push("/story")
        },
        logout(){
          this.$store.commit('setUserName', "NA")
          this.$store.commit('setPermission', "NA")
          this.$store.commit('setIsUserLoggedIn', false)

          sessionStorage.clear();
          router.push("/login")
        }
    },
    beforeMount() {
      this.onLoad()
    }
  }
</script>