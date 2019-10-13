import Oidc from 'oidc-client'
import router from '../../router'

const REDIRECT_CACHE_KEY = 'redirect_cache_key'

var mgr

Oidc.Log.logger = console
Oidc.Log.level = Oidc.Log.INFO

const DEFAULT_REDIRECT_CALLBACK = () =>
    window.history.replaceState({}, document.title, window.location.pathname)

export default ({
                    redirectUri = window.location.origin,
                    ...options
                }) => {

    return {
        options: {},

        // Renew the token manually
        renewToken () {
            let self = this
            return new Promise((resolve, reject) => {
                mgr.signinSilent().then(function (user) {
                    if (user == null) {
                        self.signIn(null)
                    } else {
                        return resolve(user)
                    }
                }).catch(function (err) {
                    console.log(err)
                    return reject(err)
                })
            })
        },

        // Get the user who is logged in
        getUser () {
            let self = this
            return new Promise((resolve, reject) => {
                mgr.getUser().then(function (user) {
                    if (user == null) {
                        self.signIn()
                        return resolve(null)
                    } else {
                        // TODO InMemoryWebStorage https://github.com/IdentityModel/oidc-client-js/issues/888
                        // userStore: new WebStorageStateStore({ store: new InMemoryWebStorage() }),
                        sessionStorage.clear()
                        return resolve(user)
                    }
                }).catch(function (err) {
                    console.log(err)
                    return reject(err)
                })
            })
        },

        // Check if there is any user logged in
        getSignedIn () {
            let self = this
            return new Promise((resolve, reject) => {
                mgr.getUser().then(function (user) {
                    if (user == null) {
                        self.signIn()
                        return resolve(false)
                    } else {
                        return resolve(true)
                    }
                }).catch(function (err) {
                    console.log(err)
                    return reject(err)
                })
            })
        },

        // Redirect of the current window to the authorization endpoint.
        signIn () {
            if (window.location.href.indexOf('#id_token') >= 0) {
                return mgr.signinRedirectCallback()
                    .catch(function (err) {
                        console.log(err)
                    })
                    .finally((user) => {
                        if (document.location.pathname !== localStorage.getItem(REDIRECT_CACHE_KEY)) {
                            router.push(localStorage.getItem(REDIRECT_CACHE_KEY))
                        }
                    })
            }

            localStorage.setItem(REDIRECT_CACHE_KEY, document.location.pathname)
            return mgr.signinRedirect().catch(function (err) {
                console.log(err)
            })
        },

        // Redirect of the current window to the end session endpoint
        signOut () {
            mgr.signoutRedirect().then(function (resp) {
                console.log('signed out', resp)
            }).catch(function (err) {
                console.log(err)
            })
        },

        // Get the profile of the user logged in
        getProfile () {
            let self = this
            return new Promise((resolve, reject) => {
                mgr.getUser().then(function (user) {
                    if (user == null) {
                        self.signIn()
                        return resolve(null)
                    } else {
                        return resolve(user.profile)
                    }
                }).catch(function (err) {
                    console.log(err)
                    return reject(err)
                })
            })
        },

        // Get the token id
        getIdToken () {
            let self = this
            return new Promise((resolve, reject) => {
                mgr.getUser().then(function (user) {
                    if (user == null) {
                        self.signIn()
                        return resolve(null)
                    } else {
                        return resolve(user.id_token)
                    }
                }).catch(function (err) {
                    console.log(err)
                    return reject(err)
                })
            })
        },

        // Get the session state
        getSessionState () {
            let self = this
            return new Promise((resolve, reject) => {
                mgr.getUser().then(function (user) {
                    if (user == null) {
                        self.signIn()
                        return resolve(null)
                    } else {
                        return resolve(user.session_state)
                    }
                }).catch(function (err) {
                    console.log(err)
                    return reject(err)
                })
            })
        },

        // Get the access token of the logged in user
        getAcessToken () {
            let self = this
            return new Promise((resolve, reject) => {
                mgr.getUser().then(function (user) {
                    if (user == null) {
                        self.signIn()
                        return resolve(null)
                    } else {
                        return resolve(user.access_token)
                    }
                }).catch(function (err) {
                    console.log(err)
                    return reject(err)
                })
            })
        },

        // Takes the scopes of the logged in user
        getScopes () {
            let self = this
            return new Promise((resolve, reject) => {
                mgr.getUser().then(function (user) {
                    if (user == null) {
                        self.signIn()
                        return resolve(null)
                    } else {
                        return resolve(user.scopes)
                    }
                }).catch(function (err) {
                    console.log(err)
                    return reject(err)
                })
            })
        },

        // Get the user roles logged in
        getRole () {
            let self = this
            return new Promise((resolve, reject) => {
                mgr.getUser().then(function (user) {
                    if (user == null) {
                        self.signIn()
                        return resolve(null)
                    } else {
                        return resolve(user.profile.role)
                    }
                }).catch(function (err) {
                    console.log(err)
                    return reject(err)
                })
            })
        },

        authenticate (options) {
            this.options = options
            this.init()
            return this.signIn()
        },

        init () {
            mgr = new Oidc.UserManager({
                authority: 'https://' + this.options.domain + '/oidc',
                client_id: this.options.clientId,
                redirect_uri: window.location.origin,
                response_type: 'id_token token',
                scope: 'openid profile',
                post_logout_redirect_uri: window.location.origin,
                silent_redirect_uri: window.location.origin,
                accessTokenExpiringNotificationTime: 10,
                automaticSilentRenew: true,
                filterProtocolClaims: true,
                loadUserInfo: true,
            })
            mgr.events.addUserLoaded(function (user) {
                console.log('New User Loaded：', arguments)
                console.log('Acess_token: ', user.access_token)
            })

            mgr.events.addAccessTokenExpiring(function () {
                console.log('AccessToken Expiring：', arguments)
            })

            mgr.events.addAccessTokenExpired(function () {
                console.log('AccessToken Expired：', arguments)
                alert('Session expired. Going out!')
                mgr.signoutRedirect().then(function (resp) {
                    console.log('signed out', resp)
                }).catch(function (err) {
                    console.log(err)
                })
            })

            mgr.events.addSilentRenewError(function () {
                console.error('Silent Renew Error：', arguments)
            })

            mgr.events.addUserSignedOut(function () {
                alert('Going out!')
                console.log('UserSignedOut：', arguments)
                mgr.signoutRedirect().then(function (resp) {
                    console.log('signed out', resp)
                }).catch(function (err) {
                    console.log(err)
                })
            })
        },
    }
}
