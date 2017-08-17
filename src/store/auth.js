import vueAuthInstance from '@/services/auth'

export default {
    state: {
        profile: null,
        isAuthenticated: vueAuthInstance.isAuthenticated(),
        disable: false
    },
    mutations: {
        isAuthenticated: function (state, payload) {
            state.isAuthenticated = payload.isAuthenticated
        },
        setProfile: function (state, payload) {
            state.profile = payload.profile
        },
        deactivate: function (state) {
            state.disable = true
        },
        activate: function (state) {
            state.disable = false
        }
    },
    actions: {
        login: function (context, payload) {
            payload = payload || {}
            return vueAuthInstance.login(payload.user, payload.requestOptions).then(function () {
                context.commit('isAuthenticated', {
                    isAuthenticated: vueAuthInstance.isAuthenticated()
                })
            })
        },
        register: function (context, payload) {
            payload = payload || {}
            return vueAuthInstance.register(payload.user, payload.requestOptions).then(function () {
                context.commit('isAuthenticated', {
                    isAuthenticated: vueAuthInstance.isAuthenticated()
                })
            })
        },
        logout: function (context, payload) {
            payload = payload || {}
            return vueAuthInstance.logout(payload.requestOptions).then(function () {
                context.commit('isAuthenticated', {
                    isAuthenticated: vueAuthInstance.isAuthenticated()
                })
            })
        },
        authenticate: function (context, payload) {
            payload = payload || {}
            return vueAuthInstance.authenticate(payload.provider, payload.userData, payload.requestOptions).then(function () {
                context.commit('isAuthenticated', {
                    isAuthenticated: vueAuthInstance.isAuthenticated()
                })
            })
        }
    },
    getters: {
        isAuthenticated: state => {
            return state.isAuthenticated
        },
        disable: state => {
            return state.disable
        }
    }
}