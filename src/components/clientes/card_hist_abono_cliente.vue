<script>
import OptionesHistorialAbono from './optiones_hist_abono_cliente.vue'

//importar el modulo de eventos globales 
import { emitter } from '@/eventBus';

export default {

    props:['abono'],

    mounted(){
                // Escuchar el evento para cerrar todos los menús que no sean el que se presiono 
        emitter.on('cerrar-menu-optiones-abono-cliente', (emisor) => {
                if (emisor !== this) {
                    this.visibilidadOptiones = false;
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
            visibilidadOptiones:false,
            idRegistroAbono:this.abono.id_abono_deuda_del_cliente

        }
    },
    components:{

        'opciones-historial':OptionesHistorialAbono,
    },
    methods:{
        abrir_y_cerrar_optiones_abonos(){
            this.visibilidadOptiones=!this.visibilidadOptiones

            if (this.visibilidadOptiones) {
                // Emitir un evento para cerrar otros menús
                emitter.emit('cerrar-menu-optiones-abono-cliente', this);
            }
        },
        closeMenuOnClickOutside(event) {
                if (this.$refs.menu && !this.$refs.menu.contains(event.target)) {
                    this.visibilidadOptiones = false;
                }
         },
    }
}
</script>


<template>
     <div class="w-full h-[80px]  mb-[20px] relative rounted p-2 rounded  flex shadow-md shadow-[#0000001f]">
                <div class=" order-1 flex-col text-center w-[180px] border-r-2 flex justify-center">
                    <h2>Monto abonado</h2>
                    <span class="text-[#FFB984] text-[0.9rem]">{{ abono.monto_abonado }}</span>
                </div>

                <div class="order-2 w-[180px] text-center flex-col flex justify-center ">
                    <h3>Fecha del abono</h3>
                    <span class="text-[#FFB984] text-[0.9rem]">{{ abono.fecha_abono }}</span>
                </div>


                <button class="order-3 h-full w-[50px] ">
                    <img @click="abrir_y_cerrar_optiones_abonos" class="w-[40px] h-[40px]" src="/src/assets/iconos/interfaz/navegacion.png" alt="" srcset="">
                </button>

                
                <opciones-historial v-if="visibilidadOptiones" :idRegistroAbono="idRegistroAbono" ref="menu"/>
            </div>
</template>