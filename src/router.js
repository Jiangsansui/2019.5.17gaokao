import Vue from 'vue'
import Router from 'vue-router'
import Loginone from './views/Loginone';
import Home from './views/Home';
import store from './store';
import register from './views/register';
Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect:"/login"
        },
        {
            path: '/login',
            name: "登陆",
            component: Loginone,
        },
        {
            path: '/register',
            name: "注册",
            component: register,
        },
       
        {
            path: "/Home",
            name: "内部核心",
            component: Home,
            children: [
                {
                    path: '/',
                    redirect:"/search",
                },
                {
                    path: '/search',
                    name: '待选志愿',
                    component: () => import(/* webpackChunkName: "search" */ './views/Search.vue'),
                },
                {
                    path: '/finish',
                    name: '已选志愿',
                    component: () => import(/* webpackChunkName: "search" */ './views/finish.vue')
                },
                {
                    path: '/explain',
                    name: '使用说明',
                    component: () => import(/* webpackChunkName: "search" */ './views/explain.vue')
                },
            ]
        },
       
    ],

})
// router.beforeEach((to, from, next) => {   //导航守卫
//     if (!store.state.User) {
//         if (to.path === "/login") {
//             next();
//         } else {
//             next('/login');
//         }
//     } else {
//         next();
//     }
// })
export default router
