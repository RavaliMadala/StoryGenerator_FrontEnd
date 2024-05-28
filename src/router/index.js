import LoginSignup from '@/components/LoginSignup.vue'
import SignupPage from '@/components/SignupPage.vue'
import StoryPage from '@/components/StoryPage.vue'
import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/login',
        component: LoginSignup
    },
    {
        path: '/signup',
        component: SignupPage
    },
    {
        path: '/story',
        component: StoryPage
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  })

export default router