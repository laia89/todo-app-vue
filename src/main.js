import './assets/main.css'
import 'vue-toastification/dist/index.css'

import { createApp } from 'vue'
import App from './App.vue'
import Toast from 'vue-toastification'

createApp(App).use(Toast).mount('#app')
