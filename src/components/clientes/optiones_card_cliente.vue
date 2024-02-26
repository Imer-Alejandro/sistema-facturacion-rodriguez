<script>
//importar el modulo de eventos globales 
import { emitter } from '@/eventBus';
 
export default {

    props:['cliente'],

    data(){
        return{
            idCliente:this.cliente.id_cliente
        }
    },
 
   methods:{
        abrir_eliminar_cliente(){
            //emitir un evento para eliminar clientes
            emitter.emit('abrir_modal_eliminar_cliente',this.cliente)
        },
        abrir_editar_cliente(){
            emitter.emit('abrir_modal_editar_cliente',this.idCliente)
        },
        abrir_abono_deuda_cliente(){
            emitter.emit('abrir_modal_abono_deuda_cliente',this.idCliente)
        },
        abrir_historial_abonos(){
            emitter.emit('abrir_modal_historial_deuda_cliente',this.idCliente)
        },
        
   }
}
</script>


<template>
           <div class=" optiones_ventas  overflow-hidden  w-[140px] z-0 h-[140px] bg-[#f7f8ff] flex-none absolute rounded shadow-md shadow-[#00000031] -ml-[8%] mt-[40px]">
            <ul>
                <li @click="abrir_abono_deuda_cliente"   class=" p-2 cursor-pointer border-b-[#DFDFDF]  border-b-[2px] ">
                    <button >
                        <span class="text-[1rem]">Abonar deuda</span>
                    </button>
                    
                </li> 

                <!-- <li @click="abrir_historial_abonos"   class=" p-2 cursor-pointer border-b-[#DFDFDF]  border-b-[2px] ">
                    <button >
                        <span class="text-[1rem]">Historial abonos</span>
                    </button>
                    
                </li> -->


                <li  @click="abrir_editar_cliente"  class="border-b-[#DFDFDF]  border-b-[2px] p-2 cursor-pointer">
                    <button>
                        <span class="text-[1rem]">Editar</span>
                    </button>
                </li>

                <li @click="abrir_eliminar_cliente" class=" p-2 cursor-pointer">
                 <button >
                    <span class="text-[1rem]">Eliminar</span>
                 </button>
                </li>
            </ul>
          </div>
</template>