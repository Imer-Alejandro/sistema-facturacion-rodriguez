<script >
import './assets/animate/transition.css';
import { RouterLink, RouterView } from 'vue-router'
// import SocketioService from "@/socket";

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

//protocolo para manejar error de red o vistas sin conexion a internet
export default{
  mounted() {
  window.addEventListener('online', this.handleConnectionChange);
  window.addEventListener('offline', this.handleConnectionChange);

  //conectar el socket
  // SocketioService.setupSocketConnection(); 

     // Manejar el evento 'disconnect' del servidor
     this.$socket.on('disconnect', () => {
      // Reconectar al servidor si la conexión se pierde
      this.$socket.connect();
    });



},

destroyed() {
  window.removeEventListener('online', this.handleConnectionChange);
  window.removeEventListener('offline', this.handleConnectionChange);

},


methods: {
    handleConnectionChange() {
      if (navigator.onLine) {
        toast.success('vuelve a Estar en línea!')
        // Estás en línea, puedes redirigir a la página principal u otra lógica
        this.$router.go('/');
      } 
      else if(!navigator.onLine) {
        toast.error('No hay conexión a internet!')
        // No hay conexión, puedes redirigir a la vista de error u otra lógica
        this.$router.go('/error-red');
      }
    },

    handleBeforeInstallPrompt(event) {
    // Mostrar el mensaje de instalación
    event.preventDefault(); // Evitar que se muestre automáticamente
    this.$nextTick(() => {
      this.showInstallPrompt(event);
    });
  },

  showInstallPrompt(event) {
    // Puedes personalizar el mensaje según tus necesidades
    const installPrompt = confirm('¿Quieres instalar esta aplicación en tu dispositivo?');

    if (installPrompt) {
      // Mostrar el banner de instalación
      event.prompt();
      // Capturar el resultado de la instalación
      event.userChoice.then(choiceResult => {
        if (choiceResult.outcome === 'accepted') {
          console.log('El usuario aceptó instalar la aplicación');
        } else {
          console.log('El usuario rechazó la instalación de la aplicación');
        }
      });
    
      // Evento para manejar la instalación después de que el usuario acepta
      window.addEventListener('appinstalled', (event) => {
        console.log('La aplicación se ha instalado con éxito');
      });


    }
  },


  }

}


</script>

<template>
<div>
  <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">

     <!-- Agrega un botón para iniciar la instalación -->
    

  <RouterView />
</div>
</template>

<style scoped>

</style>
