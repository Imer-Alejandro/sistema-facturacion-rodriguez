<script>
import OptionesProveedor from './optiones_card_proveedor.vue'
//importar el modulo de eventos globales 
import { emitter } from '@/eventBus';

export default {
    mounted() {

        // Escuchar el evento para cerrar todos los menús que no sean el que se presiono 
        emitter.on('cerrar-menu-optiones-proveedor', (emisor) => {
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
        props:['proveedor'],

   components:{
    'optiones-proveedor':OptionesProveedor

   }, 
   data(){
        return{
            estado_visibilidad_optiones:false

        }
   },
   methods:{
        abrir_optiones_proveedor(){
            this.estado_visibilidad_optiones=!this.estado_visibilidad_optiones

            if (this.estado_visibilidad_optiones) {
                // Emitir un evento para cerrar otros menús
                emitter.emit('cerrar-menu-optiones-proveedor', this);
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
                 <img @click="abrir_optiones_proveedor" class="w-[35px] absolute ml-[33%] cursor-pointer -mt-[140px] h-[35px]" src="/src/assets/iconos/interfaz/navegacion.png" alt="" srcset="">
                <img class="w-[60px] h-[60px] mb-[5px]" src="/src/assets/iconos/interfaz/furgoneta-de-reparto.png" alt="" srcset="">
                   <h3 class="mb-[10px] text-[0.9rem]">{{proveedor.nombre_proveedor}}</h3>
                   <h3 class="text-[0.9rem]">total deuda: <span class="text-[#E55226]">{{proveedor.deuda_a_proveedor.toLocaleString('en-US', { style: 'decimal', useGrouping: true, maximumFractionDigits: 2 })}}</span></h3>
           
                <optiones-proveedor v-show="estado_visibilidad_optiones"  :proveedor="proveedor" ref="menu"/>
        </div>
    </div>


</template>