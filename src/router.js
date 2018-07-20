/**
 * Created by xp on 2018/7/4.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import Index from './views/sf_index.vue'
import Login from './views/sf_login.vue'
import TestIndex from './views/sf_test_index.vue'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: Index,
        // meta: {
        //     requireAuth: true,
        // }
    },
    {
        path: '/test',
        component: TestIndex
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/testIndex',
        component: TestIndex
    }
];


// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
    store.commit('login', window.localStorage.getItem('token'))
}

const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(r => r.meta.requireAuth)) {
        if (store.state.token) {
            next();
        }
        else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}
            })
        }
    }
    else {
        next();
    }
})

export default router;