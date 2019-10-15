import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins'
import vuetify from './plugins/vuetify'
import { sync } from 'vuex-router-sync'

sync(store, router)

Vue.config.productionTip = false

import { audience, domain, clientId, provider } from '../auth_config.json'
import { Auth } from './auth'

Vue.use(Auth, {
    provider,
    domain,
    clientId,
    audience,
    onRedirectCallback: appState => {
        router.push(
            appState && appState.targetUrl
                ? appState.targetUrl
                : window.location.pathname,
        )
    },
})

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App),
}).$mount('#app')
