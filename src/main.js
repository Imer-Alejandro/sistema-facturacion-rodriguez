import './assets/main.css'



import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Vue3Toasity from 'vue3-toastify';

import io from 'socket.io-client';



import App from './App.vue'
import router from './router'

const app = createApp(App)

//limitar el numero de notificaciones en pantalla

app.use(Vue3Toasity,{limit: 2,})

const socket = io(`${import.meta.env.VITE_API_SERVER}`);



// Puedes hacer que el socket esté disponible globalmente en toda la aplicación si es necesario
app.config.globalProperties.$socket = socket;

app.use(createPinia())
app.use(router)

app.mount('#app')
