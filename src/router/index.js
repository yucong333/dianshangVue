import Vue from 'vue'
import Router from 'vue-router'
import Login from '../view/login/Login.vue'
import Home from '../view/home/Home.vue'
import Welcome from '../view/welcome/Welcome.vue'
import Users from '../view/users/Users.vue'
import Roles from '../view/roles/Roles.vue'
import Rights from '../view/rights/Rights.vue'
import Categories from '../view/categories/Categories.vue'

Vue.use(Router)


const router = new Router({
    routes: [{
            path: '/',
            redirect: '/login'

        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/home',
            component: Home,
            redirect: '/welcome',
            children: [
                { path: '/welcome', component: Welcome },
                { path: '/users', component: Users },
                { path: '/roles', component: Roles },
                { path: '/rights', component: Rights },
                { path: '/categories', component: Categories }
            ]
        }
    ]
})
router.beforeEach((to, from, next) => {
    if (to.path === '/login') return next();

    const tokenurl = window.sessionStorage.getItem('token')
    if (!tokenurl) return next('/login')
    next()
})
export default router