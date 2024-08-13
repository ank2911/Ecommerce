import { createApp } from 'vue'
import './style.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import Footer from './components/Footer.vue'
import router from './router/router'
import App from './App.vue'
const app = createApp(App);
const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
    },
  })
app.use(router)
app.component('Footer', Footer)
app.use(vuetify).mount('#app')

