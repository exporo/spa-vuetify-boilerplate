import oidcClient from './provider/oidc-client'
import auth0 from './provider/auth0'
import Vue from 'vue'

let instance

export const getInstance = () => instance

const providers = {
    oidcClient: oidcClient,
    auth0: auth0,
}

function getProvider (options) {
    return providers[options.provider](options)
}

const DEFAULT_REDIRECT_CALLBACK = () =>
    window.history.replaceState({}, document.title, window.location.pathname)

const useAuth = ({
                     onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
                     redirectUri = window.location.origin,
                     ...options
                 }) => {

    if (instance) return instance

    instance = new Vue({
        provider: {},
        data () {
            return {
                loading: true,
                isAuthenticated: false,
                user: {},
                idToken: {},
                accessToken: {},
                auth0Client: null,
                popupOpen: false,
                error: null,
            }
        },
        methods: {},
        async created () {
            this.provider = getProvider(options)
            this.provider.authenticate(options).then(() => {
                this.provider.getUser().then((user) => {
                    console.log(user);
                    if (!user) {
                        return
                    }
                    this.loading = false
                    this.user = user.profile
                    this.accessToken = user.access_token
                    this.idToken = user.id_token
                    this.isAuthenticated = true
                })
            })
        },
    })

    return instance
}

export const Auth = {
    install (Vue, options) {
        Vue.prototype.$auth = useAuth(options)
    },
}
