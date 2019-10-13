import axios from 'axios'
import VueToast from 'vue-toast-notification'
import Vue from 'vue'
import NProgress from 'nprogress'
import { getInstance } from '../auth/authWrapper'

const baseDomain = 'https://yourbasedomain.com'
const baseUrl = `${baseDomain}}/`

Vue.use(VueToast)

const Repsoitory = axios.create({
    baseUrl,
    headers: {
        Authorization: `Bearer ${getInstance().accessToken}`,
    },
})



Repsoitory.interceptors.request.use(config => {
    NProgress.start()
    return config;
})

Repsoitory.interceptors.response.use(response => {
    console.log(response)
    if(response.request.method !== 'GET'){
        Vue.$toast.open({
            message: `${esponse.request.method} Successful`,
            type: 'sucess',
            position: 'top-right',
        })
    }
    NProgress.done()
}, error => {
    Vue.$toast.open({
        message: error.toString(),
        type: 'error',
        position: 'top-right',
    })
    NProgress.done()
})

export default Repsoitory
