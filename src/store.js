/**
 * Created by xp on 2018/7/4.
 */
/**
 * Created by superman on 17/2/16.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {
            userid: '',
            username: 'yhpei',
            roleid: '组长',
            deptid: '',
            operate: ['2', '3', '4', '5', '6', '7', '8']
        },
        token: null,
        title: ''
    },
    mutations: {
        'login': (state, data) => {
            localStorage.token = data;
            state.token = data;
        },
        'logout': (state) => {
            localStorage.removeItem('token');
            state.token = null
        },
        'title': (state, data) => {
            state.title = data;
        }
    }
})