<script>
//importar el modulo de eventos globales 
import { emitter } from '@/eventBus';

import axios from 'axios';

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';



export default {
        props:['id_abono_Operacion','clienteEncontrado'],

        mounted(){
            this.buscar_registro_abono()
        },

        data(){ 
            return{
                datosRegistroAbono:[],
                
            }
        },

        methods:{
            cerrar_ventana_eliminar_abono_cliente(){
                emitter.emit('cerrar_eliminar_abono_cliente')
            },
            async  eliminar_abono_cliente(){
                emitter.emit('abrir_loader_carga_vista_cliente')
               
                    const idAbono = this.id_abono_Operacion; // Reemplaza con el ID del abono que deseas eliminar
                    const idCliente = this.clienteEncontrado.id_cliente; // Reemplaza con el ID del cliente
                    const nuevaDeuda = this.clienteEncontrado.deuda + this.datosRegistroAbono.monto_abonado; // Reemplaza con la nueva deuda

                    try {
                        const response = await axios.delete(`https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/eliminar-abono-cliente/${idAbono}`, {
                        data: { idCliente, nuevaDeuda },
                        });

                        toast.success("se elimino el registro del abono !");  

                        console.log(response.data);
                        // Maneja la respuesta según tus necesidades
                    } catch (error) {

                        toast.error("ocurrio un error al eliminar el registro del abono !", {
                                    autoClose: 3000,
                                    backgroundColor:'#CC0B09',
                                    close: false,
                                    color: '#ffffff',
                                }); 
                        console.error('Error al enviar la solicitud DELETE:', error);
                        // Maneja el error según tus necesidades
                    } finally{
                        //cerrar la ventana de eliminar abono
                    emitter.emit('cerrar_eliminar_abono_cliente')
                        
                    //cerrar la ventana de carga de proceso
                     emitter.emit('cerrar_loader_carga_vista_cliente')

                    //actualizar el historial de abonos
                    emitter.emit('actualizar_historial_abonos_clientes')

                    }
                    
   
            },

           
            buscar_registro_abono(){
                emitter.emit('abrir_loader_carga_vista_cliente')


                 // Realiza la solicitud GET al servidor para obtener el registro de abono por id
                axios.get(`https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/abono-cliente/${this.id_abono_Operacion}`)
                    .then((response) => {
                    // El registro de abono se encuentra en response.data
                    this.datosRegistroAbono = response.data;

                    })

                    .catch((error) => {
                    console.error('Error al obtener el registro de abono por id', error);
                    })
                    .finally(()=>{
                        //cerrar la carga luego de crear el cliente
                        emitter.emit('cerrar_loader_carga_vista_cliente')
                    });
            }

        }
}
</script>

<template>
    <section  class="  w-full h-[100vh] bg-[#444d639c] fixed  z-50 ">
        <div class="w-[90%] ml-[5%] h-[300px] bg-white mt-[50%]">
            <header class="w-full p-3 inline-flex border-b-[1.5px] border-b-[#DFDFDF]">
                <img  @click="cerrar_ventana_eliminar_abono_cliente"  class="w-[35px] mr-[25px]  order-1 cursor-pointer" src="/src/assets/iconos/interfaz/regresar.png" >
                <h2 class="text-[1.7rem] ml-[20px] order-2">Anular abono</h2>
            </header>
            <div class="p-3">
                <h3 class="text-center text-[#9F9F9F]">Esta seguro que desea eliminar el registro de este abono de deuda?</h3>
                <button @click="eliminar_abono_cliente"  class="w-[90%] ml-[5%] mt-[50px] text-[1.2rem] h-[60px] rounded text-white bg-[#CC0B09]">Eliminar</button>
            </div>
        </div>
        
    </section>
</template>