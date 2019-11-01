import axios from 'axios'
import VueToast from 'vue-toast-notification'
import Vue from 'vue'
import NProgress from 'nprogress'
import {getInstance} from '../auth/authWrapper'

const baseDomain = 'http://localhost:3000';
const baseUrl = `${baseDomain}/`;

Vue.use(VueToast);

const Repsoitory = axios.create({
    baseURL: baseUrl,
    headers: {
        Authorization: `Bearer ${getInstance().accessToken}`,
    },
});

Repsoitory.interceptors.request.use(config => {
    NProgress.start();
    return config;
});

Repsoitory.interceptors.response.use(response => {
    if (response.request.method !== 'GET') {
        Vue.$toast.open({
            message: `${response.request.method} Successful`,
            type: 'sucess',
            position: 'top-right',
        })
    }
    NProgress.done();
    return response;
}, error => {
    Vue.$toast.open({
        message: error.toString(),
        type: 'error',
        position: 'top-right',
    });
    NProgress.done();
    return Promise.reject(error);
});

export default Repsoitory
