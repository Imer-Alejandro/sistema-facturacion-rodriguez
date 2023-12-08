import './assets/main.css'



import { createApp } from 'vue'
import { createPinia } from 'pinia'


import io from 'socket.io-client';



import App from './App.vue'
import router from './router'

const app = createApp(App)



const socket = io('https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/');

// Puedes hacer que el socket esté disponible globalmente en toda la aplicación si es necesario
app.config.globalProperties.$socket = socket;

app.use(createPinia())
app.use(router)

app.mount('#app')
