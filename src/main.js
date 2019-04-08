import 'babel-polyfill'
import Vue from 'vue'
import store from './store'
import router from './router'
import App from './App'
import fastclick from 'fastclick'
import uToast from 'base/utoast'
import VueLazyload from 'vue-lazyload'
import {VERSION} from './config'
import '@/assets/css/index.less'

fastclick.attach(document.body);
Vue.use(uToast);

Vue.use(VueLazyload, {
    preLoad: 1,
    loading: require('assets/img/default.png')
});

new Vue({
    el: '#uPlayer',
    store,
    router,
    render: h => h(App)
})
