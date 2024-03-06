<script>
import optiones_historal_deudas from "./optiones_card_deudas_pendiente.vue";
//importar el modulo de eventos globales 
import { emitter } from '@/eventBus';

export default {
    props:['ventas_credito'],
    mounted(){ 
                // Escuchar el evento para cerrar todos los menús que no sean el que se presiono 
        emitter.on('cerrar-menu-optiones-hitorial-deudas-cliente', (emisor) => {
                if (emisor !== this) {
                    this.visivilidad_menu = false;
                }
            });

        // Agregar un detector de clics fuera del componente llamando a la funcion correspondiente
        document.addEventListener('click', this.closeMenuOnClickOutside);


   
    },

    beforeUnmount() {
            // Limpia el detector de clics fuera del componente al desmontar
            document.removeEventListener('click', this.closeMenuOnClickOutside);
        },
    
    data(){
        return{
            visivilidad_menu: false
            
        }
    },
    components:{
        optiones_historal_deudas 
    },
    methods:{
        abrir_y_cerrar_optiones_abonos(){
            this.visivilidad_menu=!this.visivilidad_menu

            if (this.visivilidad_menu) {
                // Emitir un evento para cerrar otros menús
                emitter.emit('cerrar-menu-optiones-hitorial-deudas-cliente', this);
            }
        },
        closeMenuOnClickOutside(event) {
                if (this.$refs.menu && !this.$refs.menu.contains(event.target)) {
                    this.visivilidad_menu = false;
                }
         },
         realizar_abono(){
            emitter.emit('abrir_modal_abono_deuda_cliente',this.ventas_credito)
         }
    }
   
}
</script> 

<template>
    <div class="w-full h-[80px]  mb-[20px] relative rounted p-2 rounded  flex shadow-md shadow-[#0000001f]">
        <div class="order-1 flex mr-[10px] items-center">
            <button @click="realizar_abono()" class=" flex justify-center items-center bg-[#A6F988] rounded w-[80px] h-[50px]">
                <img class="w-[35px] h-[35px]" src="/src/assets/iconos/interfaz/boton-agregar.png" alt="">
            </button>
        </div> 

        <div class="order-2 h-full pt-[10px] w-[300px] border-l-2 pl-[10px] flex  flex-col ">
            <h3 class="mb-[3px]">total deuda: <span class="text-[#E91513] ">{{ventas_credito.balance_pendiente.toLocaleString('en-US', { style: 'decimal', useGrouping: true, maximumFractionDigits: 2 })}}</span></h3>
            <h4 class="text-[#515151]">Fecha credito: <span class="text-[#9F9F9F] text-[0.9rem]">{{ventas_credito.fecha.split(" - ")[0]}}</span></h4>
        </div>

        <button @click="abrir_y_cerrar_optiones_abonos"  class="order-3  flex justify-center items-center   ml-[10px] h-full w-[50px] ">
            <img  class="w-[40px] h-[40px]" src="/src/assets/iconos/interfaz/navegacion.png" alt="" srcset="">
        </button>
               
        <optiones_historal_deudas v-if="visivilidad_menu"  :datos_venta="ventas_credito" ref="menu"/>
    </div>

</template>

<style  scoped>

</style>