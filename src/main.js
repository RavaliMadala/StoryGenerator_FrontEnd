/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import router from '@/router'
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import { createStore } from 'vuex'

const store = createStore({
    state () {
      return {
        userId: "",
        username: "",
        permission: "",
        isUserLoggedIn: false,
        storyDetails: null,
      }
    },
    mutations: {
      setUserId (state, userId){
        state.userId = userId
      },
      setUserName (state, username){
        state.username = username
      },
      setPermission (state, permission){
        state.permission = permission
      },
      setIsUserLoggedIn (state, isUserLoggedIn){
        state.isUserLoggedIn = isUserLoggedIn
      },
      setStoryDetails (state, storyDetails){
        state.storyDetails = storyDetails
      },
      getStoryDetails (state){
        return state.storyDetails
      }
    }
  })

const app = createApp(App).use(router).use(store)

registerPlugins(app)

app.mount('#app')
