<script>
import Menu_optiones from "../optiones_venta.vue";
//importar el modulo de eventos globales 
import { emitter } from '@/eventBus';

export default {
        props:['ventas'], 
        mounted() {

            

            // Escuchar el evento para cerrar todos los menús que no sean el que se presiono 
            emitter.on('cerrar-menu-ventas', (emisor) => {
                    if (emisor !== this) {
                        this.mostrar_optiones = false;
                    }
                });

            // Agregar un detector de clics fuera del componente llamando a la funcion correspondiente
            document.addEventListener('click', this.closeMenuOnClickOutside);
            
    },



    beforeUnmount() {
            // Limpia el detector de clics fuera del componente al desmontar
            document.removeEventListener('click', this.closeMenuOnClickOutside);
        },
    components:{
        'menu-options':Menu_optiones
    },
    data(){
        return{
            mostrar_detalle: false,
            mostrar_optiones:false,
            opciones :{ style: 'decimal', useGrouping: true, maximumFractionDigits: 0 },
            horaVenta:this.ventas.fecha.substring(13)
        }
    },
    methods:{
        activar_Optiones_Ventas() {
            this.mostrar_optiones=!this.mostrar_optiones
            if (this.mostrar_optiones) {
                // Emitir un evento para cerrar otros menús
                emitter.emit('cerrar-menu-ventas', this);
            }
        },
         //evalua si se hizo click fuera del menu para cerrarlo y evitar abrir mas de uno
         closeMenuOnClickOutside(event) {
                if (this.$refs.menu && !this.$refs.menu.contains(event.target)) {
                    this.mostrar_optiones = false;
                }
         },
        
       
    }
}
</script>



<template>
   
        <div  class=" z-[1] bg-white w-[95%] ml-[2.5%]  pr-0 p-3 inline-flex rounded 
         mb-[20px] shadow-md shadow-[#00000031]">
          
            <figure class="h-[95%] p-2 rounded bg-[#E55226] mr-[5px]">
                <img class="w-[40px]" src="/icons/productos/donacion-de-alimentos.png">
            </figure>
           
            <div v-if="ventas.tipo_venta === 'credito' && ventas.balance_pendiente != 0 ">
                <div class="h-[95%] flex items-center mt-[2px] p-2 rounded bg-[#FF6161]  pt-[5px] mr-1">
                    <h3 class=" text-[1rem] ">{{ventas.tipo_venta}}</h3>
                </div>
            </div>
            <div v-else-if="ventas.tipo_venta === 'credito' && ventas.balance_pendiente === 0 || ventas.balance_pendiente == ''">
                <div class="h-[95%] flex items-center mt-[2px] p-2 rounded bg-[#f9ee88] pt-[5px] mr-1">
                    <h3 class=" text-[1rem] ">pagada</h3>
                </div>
            </div>
            <div v-else>
                <div class="h-[95%] flex items-center mt-[2px] p-2 rounded bg-[#A6F988]  mr-1">
                    <h3 class=" text-[1rem] ">{{ventas.tipo_venta}}</h3>
                </div>
            </div>

           
            <h3 class="font-bold mt-[18px] mr-[8px] ">Total: <span class="font-medium">{{ventas.total_venta.toLocaleString('en-US',opciones)}}</span></h3>
           
            <div class="border-l-[1.5px] pt-[17px]  pl-[4px] border-l-[#DFDFDF]">
                <span class="mt-[15px] ">{{horaVenta}}</span>
            </div>
            <img @click="activar_Optiones_Ventas" class=" w-[40px] cursor-pointer h-[40px] ml-[10px] mt-[10px] block " src="/src/assets/iconos/interfaz/navegacion.png">
            <!---->
            <menu-options v-show="mostrar_optiones" :ventas="this.ventas"  ref="menu" />
       
        </div> 
 
    
</template>

