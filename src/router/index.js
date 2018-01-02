import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import ActivityDashboard from '@/components/activity/Dashboard'
import NewActivity from '@/components/activity/AddActivity'
import Profile from '@/components/user/Profile'
import SignIn from '@/components/user/SignIn'
import SignUp from '@/components/user/SignUp'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'index', component: Index, beforeEnter: AuthGuard },
    { path: '/activities', name: 'dashboard', component: ActivityDashboard },
    { path: '/new', name: 'new', component: NewActivity, beforeEnter: AuthGuard },
    { path: '/profile', name: 'profile', component: Profile, beforeEnter: AuthGuard },
    { path: '/signin', name: 'signin', component: SignIn },
    { path: '/signup', name: 'signup', component: SignUp }
  ],
  mode: 'history'
})
