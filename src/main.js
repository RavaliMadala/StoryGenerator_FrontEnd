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
        username: "",
        permission: "",
        isUserLoggedIn: false
      }
    },
    mutations: {
      setUserName (state, username){
        state.username = username
      },
      setPermission (state, permission){
        state.permission = permission
      },
      setIsUserLoggedIn (state, isUserLoggedIn){
        state.isUserLoggedIn = isUserLoggedIn
      }
    }
  })

const app = createApp(App).use(router).use(store)

registerPlugins(app)

app.mount('#app')
