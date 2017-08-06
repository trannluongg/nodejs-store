import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/Login'
import Register from '@/components/Register'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Hello',
            component: Hello,
            meta: {auth: false}
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            meta: {auth: false}
        },
        {
            path: '/register',
            name: 'Register',
            component: Register,
            meta: {auth: false}
        },
        {
            path: '/items',
            name: 'Items',
            component: Login
        },
        {
            path: '/orders',
            name: 'Orders',
            component: Login
        },
    ]
})
