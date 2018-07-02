// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import 'typographist-vue-devtools/devtools.css';
import Root from './Root';
import './assets/styles/main.css';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { Root },
  template: '<Root/>',
});
