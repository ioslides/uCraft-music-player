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

//懒加载
Vue.use(VueLazyload, {
    preLoad: 1,
    loading: require('assets/img/default.png')
});

const redirectList = ['/music/details', '/music/comment'];
router.beforeEach((to, from, next) => {
    window._hmt && to.path && window._hmt.push(['_trackPageview', '/#' + to.fullPath]);
    if (redirectList.includes(to.path)) {
        next()
    } else {
        document.title = to.meta.title && `${to.meta.title} - 在线音乐播放器` || '在线音乐播放器';
        next()
    }
});

const debug = process.env.NODE_ENV !== 'production';
Vue.config.silent = debug;
Vue.config.debug = debug;
Vue.config.devtools = debug;
Vue.config.productionTip = debug;

// 版权信息
window.ucraftPlayer = window.ucraftPlayer = `欢迎使用!
当前版本为：V${VERSION}
歌曲来源于网易云音乐 (http://music.163.com)`;
console.info(`%c${ucraftPlayer}`, `color:blue`);

/* eslint-disable no-new */
new Vue({
    el: '#uPlayer',
    store,
    router,
    render: h => h(App)
})
