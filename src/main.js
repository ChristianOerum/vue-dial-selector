import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

import './assets/tailwind.css'
import './assets/css/custom-font.css';

library.add(fas)

createApp(App)
.use(router)
.use(autoAnimatePlugin)
.component("fa", FontAwesomeIcon)
.mount('#app')
