import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Items from '@/components/Items/Items'
import Orders from '@/components/Orders/Orders'

import vueAuthInstance from '@/services/auth.js'

Vue.use(Router)

const router = new Router({
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
            component: Items,
            meta: {auth: true}
        },
        {
            path: '/orders',
            name: 'Orders',
            component: Orders,
            meta: {auth: true}
        },
    ]
})

router.beforeEach(function (to, from, next) {
    if (to.meta && to.meta.auth !== undefined) {
        if (to.meta.auth) {
            if (vueAuthInstance.isAuthenticated()) {
                next()
            } else {
                router.push({ name: 'Login' })
            }
        } else {
            if (vueAuthInstance.isAuthenticated()) {
                router.push({ name: 'Items' })
            } else {
                next()
            }
        }
    } else {
        next()
    }
})

export default router
