// import { createApp } from 'vue'
// // import './style.css'
// import 'vuetify/styles'
// import { createVuetify } from 'vuetify'
// import * as components from 'vuetify/components'
// import * as directives from 'vuetify/directives'
// import App from './App.vue'
 
// const vuetify = createVuetify({
//   components,
//   directives
// })
// createApp(App).use(vuetify).mount('#app')
 
 import { createApp } from 'vue'
// import './style.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import App from './App.vue'
import Footer from './components/Footer.vue' // Import the Footer component

const vuetify = createVuetify({
  components,
  directives
})

const app = createApp(App)
app.use(vuetify)

// Register the Footer component globally
app.component('Footer', Footer)

app.mount('#app')