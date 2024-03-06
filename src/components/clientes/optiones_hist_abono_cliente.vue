<script>

//importar el modulo de eventos globales 
import { emitter } from '@/eventBus';

export default {
    props:['abono'],
    methods:{
        abrir_ventana_eliminar_abono_cliente(){
            emitter.emit('abrir_eliminar_abono_cliente',this.abono)
        },
        abrir_editar_abono_cliente(){
            emitter.emit('abrir_editar_abono_cliente',this.abono)
        },
        abrir_detalle_abono_cliente(){
            emitter.emit('abrir_detalle_abono_cliente',this.abono)
        }
    }
}
</script>

<template>
       <div class=" optiones_ventas  overflow-hidden  w-[140px] z-[2] h-[80px] bg-[#f7f8ff] flex-none absolute rounded shadow-md shadow-[#00000031] ml-[45%] mt-[20px]">
            <ul>

                <li  @click="abrir_detalle_abono_cliente"  class=" p-2 cursor-pointer border-b-[#DFDFDF]  border-b-[2px] ">
                    <button >
                        <span class="text-[1rem]">Ver mas</span>
                        <img class="w-[20px] ml-[70%] -mt-[23px] absolute" src="/src/assets/iconos/interfaz/detalle_venta.png" >
                    </button>
                    
                </li>

                <!-- <li  @click="abrir_editar_abono_cliente"  class=" p-2 cursor-pointer border-b-[#DFDFDF]  border-b-[2px] ">
                    <button >
                        <span class="text-[1rem]">Editar</span>
                        <img class="w-[20px] ml-[70%] -mt-[23px] absolute" src="/src/assets/iconos/interfaz/editar_venta.png" >
                    </button>
                    
                </li> -->

                <li @click="abrir_ventana_eliminar_abono_cliente"  class=" p-2 cursor-pointer border-b-[#DFDFDF]  border-b-[2px] ">
                    <button class="outline-none" >
                        <span class="text-[1rem]">Anular</span>
                        <img class="w-[20px] absolute ml-[70%] -mt-[23px]" src="/src/assets/iconos/interfaz/anular_venta.png" >
                    </button>
                    
                </li>

                
            </ul>
          </div>
</template>