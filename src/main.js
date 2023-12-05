import './assets/main.css'
import 'vue-toastification/dist/index.css'

import { createApp } from 'vue'
import App from './App.vue'
import Toast from 'vue-toastification'

createApp(App).use(Toast, {
  transition: "Vue-Toastification__fade",
  maxToasts: 2,
  newestOnTop: true,
    filterBeforeCreate: (toast, toasts) => {
    if (toasts.filter(
      t => t.type === toast.type
    ).length !== 0) {
      return false;
    }
    return toast;
  }
}).mount('#app')
