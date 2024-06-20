import LoginSignup from '@/components/LoginSignup.vue'
import SignupPage from '@/components/SignupPage.vue'
import StoryPage from '@/components/StoryPage.vue'
import UserProfile from '@/components/UserProfile.vue'
import StoryEdit from '@/components/StoryEdit.vue'
import AdminPage from '@/components/AdminPage.vue'
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
    },
    {
        path: '/profile',
        component: UserProfile
    },
    {
        path: '/editstory',
        component: StoryEdit,
        props: true
    },
    {
        path: '/admin',
        component: AdminPage
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  })

export default router