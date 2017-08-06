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
            <!--<div class="title-bar" data-responsive-toggle="top-menu">-->
                <!--<button class="menu-icon" type="button" data-toggle="top-menu"></button>-->
                <!--<div class="title-bar-title">Menu</div>-->
            <!--</div>-->
            <!--<div class="top-bar" id="top-menu" style="display: none;">-->
                <!--<div class="top-bar-left">-->
                    <!--<ul class="dropdown vertical medium-horizontal menu">-->
                        <!--<li>-->
                            <!--<router-link v-bind:to="'/'" class='button clear'>Home</router-link>-->
                        <!--</li>-->
                    <!--</ul>-->
                <!--</div>-->
                <!--<div class="top-bar-right">-->
                    <!--<ul class="dropdown menu" data-dropdown-menu>-->
                        <!--<li>-->
                            <!--<router-link v-bind:to="'/login'" class='button clear'>Login</router-link>-->
                        <!--</li>-->
                        <!--<li>-->
                            <!--<router-link v-bind:to="'/login'" class='button clear'>Register</router-link>-->
                        <!--</li>-->
                        <!--<li role="menuitem" class="is-dropdown-submenu-parent" aria-haspopup="true" aria-selected="false" aria-expanded="false">-->
                            <!--<a href="#">Name</a>-->
                            <!--<ul class="menu is-dropdown-submenu" data-submenu role="menu">-->
                                <!--<a href="'/'">-->
                                    <!--Logout-->
                                <!--</a>-->
                            <!--</ul>-->
                        <!--</li>-->
                    <!--</ul>-->
                <!--</div>-->
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