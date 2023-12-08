<script>
//importar el modulo de eventos globales 
import { emitter } from '@/eventBus'; 

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import axios from 'axios';

export default {

    mounted(){
        this.buscar_registro_abono()
    },  

        props:['id_registro_operacion','proveedorEncontrado'],

        data(){
            return{
                datosRegistroAbono:[],
                
            }
        },

        methods:{
            cerrar_anular_abono_proveedor(){
                emitter.emit('cerrar_anular_abono_proveedor')
            }, 
            buscar_registro_abono(){
                emitter.emit('abrir_loader_carga_vista_proveedor')

                 // Realiza la solicitud GET al servidor para obtener el registro de abono por id
                axios.get(`https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/abono-proveedor/${this.id_registro_operacion}`)
                    .then((response) => {
                    // El registro de abono se encuentra en response.data
                    this.datosRegistroAbono = response.data; 
                        console.log('registro obtenido')
                    })

                    .catch((error) => {
                    console.error('Error al obtener el registro de abono por id', error);
                    })
                    .finally(()=>{
                        //cerrar la carga luego de crear el cliente
                        emitter.emit('cerrar_loader_carga_vista_proveedor')
                    });
            },

            async  eliminar_abono_proveedor(){
                emitter.emit('abrir_loader_carga_vista_proveedor')
               
                    const idProveedor = this.proveedorEncontrado.id_proveedores; // Reemplaza con el ID del proveedor
                    const nuevaDeuda = this.proveedorEncontrado.deuda_a_proveedor + this.datosRegistroAbono.monto_abonado; // Reemplaza con la nueva deuda

                    try {
                        const response = await axios.delete(`https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/eliminar-abono-proveedor/${this.id_registro_operacion}`, {
                        data: { idProveedor, nuevaDeuda },
                        });

                            toast("registro de abono de deuda eliminado !", {
                                    autoClose: 3000,
                                    backgroundColor:'#CC0B09',
                                    close: false,
                                    color: '#ffffff',
                                }); 

                        console.log(response.data);
                        // Maneja la respuesta según tus necesidades
                    } catch (error) {
                        toast("error al eliminar el abono !", {
                                    autoClose: 3000,
                                    backgroundColor:'#CC0B09',
                                    close: false,
                                    color: '#ffffff',
                                }); 

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