import createAuth0Client from '@auth0/auth0-spa-js'
import router from '../../router'

const REDIRECT_CACHE_KEY = 'redirect_cache_key'

export default ({
                    redirectUri = window.location.origin,
                    ...options
                }) => {

    return {
        async loginWithPopup (o) {
            this.popupOpen = true

            try {
                await this.auth0Client.loginWithPopup(o)
            } catch (e) {
                console.error(e)
            } finally {
                this.popupOpen = false
            }

            this.user = await this.auth0Client.getUser()
            this.isAuthenticated = true
        },
        async handleRedirectCallback () {
            this.loading = true
            try {
                await this.auth0Client.handleRedirectCallback()
                this.user = await this.auth0Client.getUser()
                this.isAuthenticated = true
            } catch (e) {
                this.error = e
            } finally {
                this.loading = false
            }
        },
        async getUser () {
            return {
                profile: await this.auth0Client.getUser(),
                access_token: await this.auth0Client.getTokenSilently(),
            }
        },
        loginWithRedirect (o) {
            return this.auth0Client.loginWithRedirect(o)
        },
        getIdTokenClaims (o) {
            return this.auth0Client.getIdTokenClaims(o)
        },
        getTokenSilently (o) {
            return this.auth0Client.getTokenSilently(o)
        },
        getTokenWithPopup (o) {
            return this.auth0Client.getTokenWithPopup(o)
        },
        logout (o) {
            return this.auth0Client.logout(o)
        },
        async authenticate () {
            this.auth0Client = await createAuth0Client({
                response_type: 'token',
                domain: options.domain,
                client_id: options.clientId,
                //audience: options.audience,
                redirect_uri: redirectUri,
                scope: 'openid profile id_token access_token',
            })

            try {
                if (
                    window.location.search.includes('code=') &&
                    window.location.search.includes('state=')
                ) {
                    const { appState } = await this.auth0Client.handleRedirectCallback()
                    if (document.location.pathname !== localStorage.getItem(REDIRECT_CACHE_KEY)) {
                        router.push(localStorage.getItem(REDIRECT_CACHE_KEY))
                    }
                }
            } catch (e) {
                this.error = e
            }



            if (await this.auth0Client.isAuthenticated() === false) {
                localStorage.setItem(REDIRECT_CACHE_KEY, document.location.pathname)
                return this.loginWithRedirect()
            }
        },
    }
}
