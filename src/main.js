// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'script-loader!jquery/dist/jquery.min';
import 'script-loader!what-input/dist/what-input.min';
import 'script-loader!foundation-sites/dist/js/foundation.min';
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Tabs from 'vue-tabs-component'
import VueNotifications from 'vue-notifications'
import miniToastr from 'mini-toastr'
require('./components-page')

const toastTypes = {
    success: 'success',
    error: 'error',
    info: 'info',
    warn: 'warn'
}
miniToastr.init({types: toastTypes})

function toast ({title, message, type, timeout, cb}) {
    return miniToastr[type](message, title, timeout, cb)
}
const options = {
    success: toast,
    error: toast,
    info: toast,
    warn: toast
}
VueNotifications.config.timeout = 4000

Vue.use(Tabs)
Vue.use(VueNotifications, options)



// window.jQuery = jQuery;
// window.$ = jQuery;
//
// require('motion-ui');
// require('what-input');
// require('foundation-sites');

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
