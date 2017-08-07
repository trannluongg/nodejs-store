<template>
    <div>
        <div class="small-12 medium-12 large-12">
            <ul class="vertical medium-horizontal menu">
                <router-link v-bind:to="'/register'" class='button clear'><i class="fi-list"></i><span>Register</span></router-link>
                <router-link v-bind:to="'/login'" class='button clear'><i class="fi-list"></i><span>Login</span></router-link>
                <router-link v-bind:to="'/'" class='button clear'><i class="fi-list"></i><span>Home</span></router-link>
                <!--<li><a href="#0"><i class="fi-list"></i> <span>Two</span></a></li>-->
                <!--<li><a href="#0"><i class="fi-list"></i> <span>Three</span></a></li>-->
                <!--<li><a href="#0"><i class="fi-list"></i> <span>Four</span></a></li>-->
            </ul>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'navigation'
    }
</script>
<style lang="scss" scoped>

</style>