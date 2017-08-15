import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Items from '@/components/Items/Items'


import vueAuthInstance from '@/services/auth.js'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
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
            path: '/items#new-item',
            name: 'NewItems',
            component: Items,
            meta: {auth: true}
        }
    ]
})

router.beforeEach(function (to, from, next) {
    if (to.meta && to.meta.auth !== undefined) {
        if (to.meta.auth) {
            if (vueAuthInstance.isAuthenticated()) {
                next()
            } else {
                router.push({ path: '/' })
            }
        } else {
            if (vueAuthInstance.isAuthenticated()) {
                router.push({ path: '/items' })
            } else {
                next()
            }
        }
    } else {
        next()
    }
})

export default router
