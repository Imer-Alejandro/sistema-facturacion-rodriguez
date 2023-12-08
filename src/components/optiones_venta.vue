<script>
    //modulo de bus de eventos globales
    import { emitter } from '@/eventBus';

export default {

    props:['ventas'],

    methods:{
        open_detalles_ventas(){
            emitter.emit('open_detalle_ventas_inicio',this.ventas)
        },
        open_editar_ventas(){
            emitter.emit('open_editar_ventas_inicio',this.ventas)
        },
        open_anular_ventas(){
            emitter.emit('open_anular_venta_inicio',this.ventas)
        },
        open_comprobante_ventas(){
            emitter.emit('open_comprobante_venta_inicio',this.ventas)
        }
    }

}
</script>



<template>
       <div class=" optiones_ventas  overflow-hidden w-[150px] z-[1] h-[120px] bg-[#f7f8ff] absolute rounded shadow-md shadow-[#00000031] ml-[35%] mt-[40px]">
            <ul>
                <li @click="open_detalles_ventas" class=" p-2 cursor-pointer border-b-[#DFDFDF]  border-b-[2px] ">
                    <button>
                        <span class="text-[1rem]">detalles</span>
                         <img  class="w-[20px] absolute ml-[70%] -mt-[23px]" src="../assets/iconos/interfaz/detalle_venta.png">
                    </button>
                    
                </li>

                <!-- <li @click="open_editar_ventas" class="border-b-[#DFDFDF]  border-b-[2px] p-2 cursor-pointer">
                    <button>
                        <span class="text-[1rem]">Editar</span>
                        <img class="w-[20px] ml-[70%] -mt-[23px] absolute" src="../assets/iconos/interfaz/editar_venta.png" >
                    </button>
                </li> -->

                <li @click="open_anular_ventas" class="border-b-[#DFDFDF]  border-b-[2px] p-2 cursor-pointer">
                 <button>
                    <span class="text-[1rem]">Anular</span>
                    <img class="w-[20px] absolute ml-[70%] -mt-[23px]" src="../assets/iconos/interfaz/anular_venta.png" >
                 </button>
                </li>

                <li @click="open_comprobante_ventas" class="border-b-[#DFDFDF]  border-b-[2px] p-2 cursor-pointer">
                 <button>
                    <span class="text-[1rem]">Factura</span>
                    <img class="w-[20px] absolute ml-[70%] -mt-[23px]" src="../assets/iconos/interfaz/comprobante_venta.png" >
                 </button>
                </li>


               
            </ul>
          </div>
</template>