// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import store from './store'
import router from './router'
import App from './App'
import fastclick from 'fastclick'
import mmToast from 'base/mm-toast'
import VueLazyload from 'vue-lazyload'
import './registerServiceWorker'
import {VERSION} from './config'
import '@/assets/css/index.less'

const redirectList = ['/music/details', '/music/comment'];

new Vue({
    el: '#mmPlayer',
    store,
    router,
    render: h => h(App)
})
