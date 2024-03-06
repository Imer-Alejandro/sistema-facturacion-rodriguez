<script>
//importar el modulo de eventos globales 
import { emitter } from '@/eventBus';

export default {
    props:['datos_venta'],

    methods:{
        ver_detalles_venta_credito(){
            emitter.emit('detalles_venta_credito_cliente',this.datos_venta);
        },
        ver_historial_abonos(){
            emitter.emit('historial_abonos_deuda_pendiente',this.datos_venta);
        }
    }
}
</script>


<template>
    <div  class=" optiones_ventas  overflow-hidden  w-[140px] z-[2] h-[80px] bg-[#f7f8ff] flex-none absolute rounded shadow-md shadow-[#00000031] ml-[45%] mt-[20px]">
            <ul>

                <li @click="ver_detalles_venta_credito()" class=" p-2 cursor-pointer border-b-[#DFDFDF]  border-b-[2px] ">
                    <button >
                        <span class="text-[1rem]">Ver detalles</span>
                    </button>
                     
                </li>

                <li @click="ver_historial_abonos()"  class=" p-2 cursor-pointer border-b-[#DFDFDF]  border-b-[2px] ">
                    <button >
                        <span class="text-[1rem]">historial abonos</span>
                    </button>
                    
                </li>

                
            </ul>
          </div>
</template>