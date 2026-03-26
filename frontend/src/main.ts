import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { i18n } from './lib/i18n'
import { useColorMode } from '@vueuse/core'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)

const mode = useColorMode({
    initialValue: 'auto',
    storageKey: 'theme',
})

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.provide('mode', mode)
app.use(pinia)
app.use(router)
app.use(i18n)
app.mount('#app')






