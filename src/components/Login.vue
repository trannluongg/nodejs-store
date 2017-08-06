<template>
    <div class='container'>
        <div class="row">
            <div class="medium-6 columns">
                <div class="primary callout">
                    <form @submit.prevent="login()">
                        <div class="row">
                            <label>Name:
                                <input type="text" name="name" id="name" required>
                            </label>
                            <label>Password:
                                <input type="password" name="password" id="password" required>
                            </label>
                            <button type="submit" class="button">Login</button>
                            <a href="#" class="button clear">Cancel</a>
                        </div>
                    </form>
                    <div class="row">
                        Don't have account? <router-link :to="{ name: 'Register' }">Register</router-link> one now!
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'login',
        data(){
            return {
                name: '',
                password: ''
            }
        },
        methods: {
            login () {
                this.$store.dispatch('login', {
                    user: {
                        email: this.email,
                        password: this.password
                    }
                }).then(() => {
                    this.$router.push('Hallo')
                })
            },
            authenticate (provider) {
                this.$store.dispatch('authenticate', { provider }).then(() => {
                    this.$router.push('Hallo')
                })
            }
        }
    }
</script>
<style lang="scss"></style>