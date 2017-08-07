<template>
    <div>
        <div class="small-12 medium-12 large-12">
            <ul class="vertical medium-horizontal menu">
                <router-link v-bind:to="'/register'" v-if="!isAuthenticated" class='button clear'><i class="fi-list"></i><span>Register</span></router-link>
                <router-link v-bind:to="'/login'" v-if="!isAuthenticated" class='button clear'><i class="fi-list"></i><span>Login</span></router-link>
                <router-link v-bind:to="'/'" class='button clear'><i class="fi-list"></i><span>Home</span></router-link>
                <router-link v-bind:to="'/items'" v-if="isAuthenticated" class='button clear'><i class="fi-list"></i><span>Items</span></router-link>
                <router-link v-bind:to="'/orders'" v-if="isAuthenticated" class='button clear'><i class="fi-list"></i><span>Orders</span></router-link>
                <button class="button clear" v-if="isAuthenticated" @click="logout()">Logout</button>
            </ul>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'navigation',
        methods: {
            logout () {
                this.$store.dispatch('logout', {
                    user: {
                        email: this.email,
                        password: this.password
                    }
                }).then(() => {
                    this.$router.push('/')
                })
            }
        },
        computed: {
            isAuthenticated() {
                return this.$store.getters.isAuthenticated;
            }
        }
    }
</script>
<style lang="scss" scoped>

</style>