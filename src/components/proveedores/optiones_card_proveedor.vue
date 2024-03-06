<script>
//importar el modulo de eventos globales 
import { emitter } from '@/eventBus';
 
export default {

    props:['proveedor'],

 
   methods:{
        abrir_eliminar_proveedor(){
            //emitir un evento para eliminar clientes
            emitter.emit('abrir_modal_eliminar_proveedor',this.proveedor)
        },
        abrir_editar_proveedor(){
            emitter.emit('abrir_editar_proveedor',this.proveedor.id_proveedores)
        },
        abrir_abono_deuda_proveedor(){
            emitter.emit('abrir_abono_deuda_proveedor',this.proveedor.id_proveedores)
        },
        abrir_registro_deuda(){
            emitter.emit('abrir_registro_deuda_proveedor',this.proveedor.id_proveedores)
        },
        abrir_historial_abonos_proveedor(){
            emitter.emit('abrir_historial_deuda_proveedor',this.proveedor.id_proveedores)
        }
   }
}
</script>


<template>
           <div class=" optiones_ventas  overflow-hidden  w-[140px] z-0 h-[205px] bg-[#f7f8ff] flex-none absolute rounded shadow-md shadow-[#00000031] -ml-[8%] mt-[40px]">
            <ul>
                <li @click="abrir_abono_deuda_proveedor"   class=" p-2 cursor-pointer border-b-[#DFDFDF]  border-b-[2px] ">
                    <button >
                        <span class="text-[1rem]">Abonar deuda</span>
                    </button>
                    
                </li>

                <li @click="abrir_historial_abonos_proveedor"   class=" p-2 cursor-pointer border-b-[#DFDFDF]  border-b-[2px] ">
                    <button >
                        <span class="text-[1rem]">Historial abonos</span>
                    </button>
                     
                </li>

                <li  @click="abrir_registro_deuda()"  class="border-b-[#DFDFDF]  border-b-[2px] p-2 cursor-pointer">
                    <button>
                        <span class="text-[1rem]">Ingresar deuda</span>
                    </button>
                </li>

                <li  @click="abrir_editar_proveedor"  class="border-b-[#DFDFDF]  border-b-[2px] p-2 cursor-pointer">
                    <button>
                        <span class="text-[1rem]">Editar</span>
                    </button>
                </li>

                <li @click="abrir_eliminar_proveedor" class=" p-2 cursor-pointer">
                 <button >
                    <span class="text-[1rem]">Eliminar</span>
                 </button>
                </li>
            </ul>
          </div>
</template>