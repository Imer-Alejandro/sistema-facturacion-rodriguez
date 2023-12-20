<script>
//importar el modulo de eventos globales 
import { emitter } from '@/eventBus';

import axios from 'axios';

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';



export default {
        props:['cliente_operacion'],

        data(){
            return{
            }
        },
        methods:{
            cerrar_eliminar_cliente(){
                emitter.emit('cerrar_eliminar_cliente')
            },  
            eliminar_cliente(){
                //validar que no se elimine un cliente con deduda pendiente
                if (this.cliente_operacion.deuda > 0) {
                    toast.warn('no se puede eliminar un cliente con deuda pendiente!')
                }else if(this.cliente_operacion.deuda == 0 || this.cliente_operacion.deuda < 0){
                emitter.emit('abrir_loader_carga_vista_cliente')
                 // Realizar la solicitud DELETE a la ruta /eliminar-cliente/:idCliente
                axios.delete(`https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/eliminar-cliente/${this.cliente_operacion.id_cliente}`)
                    .then((response) => {

                        toast.success("se elimino el cliente!", {
                                    autoClose: 3000,
                                    backgroundColor:'#CC0B09',
                                    close: false,
                                    color: '#ffffff',
                                });

                    //cerrar ventana luego de eliminar
                    emitter.emit('cerrar_eliminar_cliente')

                    //actualizar el listado de clientes
                    emitter.emit('actualizar_objetos_cliente_vista_cliente')
                    
                    })
                    .catch((error) => {
                        toast.error("error al eliminar el cliente!", {
                                    autoClose: 3000,
                                    backgroundColor:'#CC0B09',
                                    close: false,
                                    color: '#ffffff',
                                });

                    console.error('Error al eliminar el cliente', error);
                    })

                    .finally(()=>{
                     emitter.emit('cerrar_loader_carga_vista_cliente')

                    });
                }
             }
        }  
}
</script>




<template>
     <section  class="  w-full h-[100vh] bg-[#444d639c] fixed  z-50 ">
        <div class="w-[90%] ml-[5%] h-[300px] bg-white mt-[50%]">
            <header class="w-full p-3 inline-flex border-b-[1.5px] border-b-[#DFDFDF]">
                <img @click="cerrar_eliminar_cliente"   class="w-[35px] mr-[25px]  order-1 cursor-pointer" src="/src/assets/iconos/interfaz/regresar.png" >
                <h2 class="text-[1.7rem] ml-[20px] order-2">Eliminar cliente</h2>
            </header>
            <div class="p-3">
                <h3 class="text-center text-[#9F9F9F]">Esta seguro que desea eliminar el registro de este cliente?</h3>
                <button @click="eliminar_cliente" class="w-[90%] ml-[5%] mt-[50px] text-[1.2rem] h-[60px] rounded text-white bg-[#CC0B09]">Eliminar</button>
            </div>
        </div>
        
    </section>
</template>