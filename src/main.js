// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'script-loader!jquery/dist/jquery.min';
import 'script-loader!what-input/dist/what-input.min';
import 'script-loader!foundation-sites/dist/js/foundation.min';
import Vue from 'vue'
import App from './App'
import router from './router'
import Navigation from './components/Navigation.vue'
Vue.component('navigation', Navigation)

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
  template: '<App/>',
  components: { App}
})
