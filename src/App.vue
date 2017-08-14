<template>
    <div id="app">
        <navigation></navigation>
        <!--<img src="./assets/logo.png">-->
        <router-view></router-view>
    </div>
</template>

<script>
    import miniToastr from 'mini-toastr'
    export default {
        name: 'app',
        mounted () {
            miniToastr.init()
        },
    }
</script>

<style lang="scss">
    @import './styles/global.scss';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
