<template>
    <div class='container'>
        <div class="medium-6 columns">
            <div class="primary callout">
                <form @submit.prevent="register()">
                    <div class="row">
                        <label>Name:
                            <input type="text" name="name" id="name" required v-model="name">
                        </label>
                        <label>Email:
                            <input type="email" name="email" id="email" required v-model="email">
                        </label>
                        <label>Password:
                            <input type="password" name="password" id="password" required v-model="password">
                        </label>
                        <label>Confirm Password:
                            <p v-if="password!=password1">Should be the same as the password</p>
                            <input type="password" name="password1" id="password1" required v-model="password1">
                        </label>
                        <button type="submit" class="button">Submit</button>
                        <a href="#" class="button clear">Cancel</a>
                    </div>
                </form>
                <div class="row">
                    Already have account? <router-link :to="{ name: 'Login' }">Login</router-link> here.
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'register',
        data() {
            return{
                name: '',
                email: '',
                password: '',
                password1: ''
            }
        },
        methods: {
            register () {
                this.$store.dispatch('register', {
                    user: {
                        name: this.name,
                        email: this.email,
                        password: this.password
                    }
                }).then(() => {
                    this.$router.push('/login')
                })
            },
            authenticate (provider) {
                this.$store.dispatch('authenticate', { provider }).then(() => {
                    this.$router.push('/login')
                })
            }
        }
    }
</script>
<style lang="scss"></style>