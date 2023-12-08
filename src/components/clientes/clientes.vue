<script>
import OptionesClientes from './optiones_card_cliente.vue'
//importar el modulo de eventos globales 
import { emitter } from '@/eventBus';

export default {
    mounted() {

        // Escuchar el evento para cerrar todos los menús que no sean el que se presiono 
        emitter.on('cerrar-menu-optiones-clientes', (emisor) => {
                if (emisor !== this) {
                    this.estado_visibilidad_optiones = false;
                }
            });

        // Agregar un detector de clics fuera del componente llamando a la funcion correspondiente
        document.addEventListener('click', this.closeMenuOnClickOutside);

},
    beforeUnmount() {
            // Limpia el detector de clics fuera del componente al desmontar
            document.removeEventListener('click', this.closeMenuOnClickOutside);
        },
        props:['cliente'],

   components:{
    'optiones-clients':OptionesClientes

   },
   data(){
        return{
            estado_visibilidad_optiones:false

        }
   },
   methods:{
        abrir_optiones_clientes(){
            this.estado_visibilidad_optiones=!this.estado_visibilidad_optiones

            if (this.estado_visibilidad_optiones) {
                // Emitir un evento para cerrar otros menús
                emitter.emit('cerrar-menu-optiones-clientes', this);
            }
        },
        closeMenuOnClickOutside(event) {
                if (this.$refs.menu && !this.$refs.menu.contains(event.target)) {
                    this.estado_visibilidad_optiones = false;
                }
         },
   }
}
</script>
 

<template>

    <div class="inline-block mb-[20px] mr-[20px]">
        <div class="flex-col flex text-center justify-center items-center   bg-white p-2  w-[160px] h-[190px]
                  shadow-md shadow-[#0000001f]">
                 <img @click="abrir_optiones_clientes" class="w-[35px] absolute ml-[33%] cursor-pointer -mt-[130px] h-[35px]" src="/src/assets/iconos/interfaz/navegacion.png" alt="" srcset="">
                <img class="w-[80px] h-[80px] mb-[5px]" src="/src/assets/iconos/interfaz/tienda.png" alt="" srcset="">
                   <h3 class="mb-[10px]">{{cliente.nombre_cliente}}</h3>
                   <h3 class="text-[0.9rem]">total deuda: <span class="text-[#E55226]">{{ cliente.deuda }}</span></h3>
           
                <optiones-clients v-show="estado_visibilidad_optiones" :cliente="cliente" ref="menu"/>
        </div>
    </div>


</template>