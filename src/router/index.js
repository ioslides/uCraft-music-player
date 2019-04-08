import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);
const routes = [
    {
        path: '/',
        redirect: '/music'
    }, {
        path: '/music',
        component: () => import('pages/music'),
        redirect: '/music/playlist',
        children: [
            {
                path: '/music/playlist',
                component: () => import('pages/playList/playList'),
                meta: {
                    keepAlive: true
                }
            }, {
                path: '/music/userlist',
                component: () => import('pages/userList/userList'),
                meta: {
                    title: '个人中心',
                    keepAlive: true
                }
            }, {
                path: '/music/toplist',
                component: () => import('pages/topList/topList'),
                meta: {
                    title: '排行榜',
                    keepAlive: true
                }
            }, {
                path: '/music/details/:id',
                component: () => import('pages/details/details')
            }, {
                path: '/music/historylist',
                component: () => import('pages/historyList/historyList'),
                meta: {
                    title: '听过'
                }
            }, {
                path: '/music/search',//搜索
                component: () => import('pages/search/search'),
                meta: {
                    title: '搜索',
                    keepAlive: true
                }
            }, 
            {
                path: '/music/category',//分类
                component: () => import('pages/category/category'),
                meta: {
                    title: '分类',
                    keepAlive: true
                }
            }, {
                path: '/music/comment/:id',
                component: () => import('pages/comment/comment'),
                meta: {
                    title: '评论详情'
                }
            }
            }
        ]
    }
];
export default new Router({
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
    routes,
})
