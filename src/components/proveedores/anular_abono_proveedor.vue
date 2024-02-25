<script>
//importar el modulo de eventos globales 
import { emitter } from '@/eventBus'; 

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import axios from 'axios';

export default {

     

        props:['abono_registro_operacion','proveedorEncontrado'],


        methods:{
            cerrar_anular_abono_proveedor(){
                emitter.emit('cerrar_anular_abono_proveedor')
            }, 
           
            async  eliminar_abono_proveedor(){
                emitter.emit('abrir_loader_carga_vista_proveedor')
               
                    const idProveedor = this.proveedorEncontrado.id_proveedores; // Reemplaza con el ID del proveedor
                    const nuevaDeuda = this.proveedorEncontrado.deuda_a_proveedor + this.abono_registro_operacion.monto_abonado; // Reemplaza con la nueva deuda

                    try {
                        const response = await axios.delete(`${import.meta.env.VITE_API_SERVER}eliminar-abono-proveedor/${this.abono_registro_operacion.id_abono_deuda_a_proveedor}`, {
                        data: { idProveedor, nuevaDeuda },
                        });

                            toast.success("registro de abono de deuda eliminado !"); 

                        console.log(response.data);
                        // Maneja la respuesta según tus necesidades
                    } catch (error) {
                        toast.error("error al eliminar el abono !"); 

                        console.error('Error al enviar la solicitud DELETE:', error);
                        // Maneja el error según tus necesidades
                    } finally{
                        //cerrar la ventana de eliminar abono
                        emitter.emit('cerrar_anular_abono_proveedor')
                        
                        //cerrar la carga luego de crear el cliente
                        emitter.emit('cerrar_loader_carga_vista_proveedor')

                        //actualizar el objeto de los cliente
                        emitter.emit('actualizar_historial_abonos_proveedores')
                    }
                    
   
            },
        }
}
</script>


<template>
    <section  class="  w-full h-[100vh] bg-[#444d639c] fixed  z-50 ">
        <div class="w-[90%] ml-[5%] h-[300px] bg-white mt-[50%]">
            <header class="w-full p-3 inline-flex border-b-[1.5px] border-b-[#DFDFDF]">
                <img @click="cerrar_anular_abono_proveedor"   class="w-[35px] mr-[25px]  order-1 cursor-pointer" src="/src/assets/iconos/interfaz/regresar.png" >
                <h2 class="text-[1.7rem] ml-[20px] order-2">Anular abono</h2>
            </header>
            <div class="p-3">
                <h3 class="text-center text-[#9F9F9F]">Esta seguro que desea eliminar el registro de este abono de deuda?</h3>
                <button @click="eliminar_abono_proveedor" class="w-[90%] ml-[5%] mt-[50px] text-[1.2rem] h-[60px] rounded text-white bg-[#CC0B09]">Eliminar</button>
            </div>
        </div>
        
    </section>
</template>