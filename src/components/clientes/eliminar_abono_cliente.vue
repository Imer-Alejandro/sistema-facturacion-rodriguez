<script>
//importar el modulo de eventos globales 
import { emitter } from '@/eventBus';

import axios from 'axios';

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

 

export default {
        props:['abono_Operacion'], 

        mounted(){
            this.buscar_registro_venta()
            this.buscar_registro_cliente()

        },

        data(){ 
            return{
                datos_venta_credito:[],
                datos_cliente:[],
                data:{
                    idAbono:'',
                    idCliente:'', 
                    id_venta:'',
                    nuevaDeuda_venta: 0,
                    nuevaDeuda_cliente: 0

                }
            }
        },

        methods:{
            cerrar_ventana_eliminar_abono_cliente(){
                emitter.emit('cerrar_eliminar_abono_cliente')
            },
            eliminar_abono_cliente(){
                // emitter.emit('abrir_loader_carga_vista_cliente')

                //asignar datos 
                this.data.idAbono=this.abono_Operacion.id_abono_deuda_del_cliente,
                this.data.idCliente=this.abono_Operacion.id_cliente, 
                this.data.id_venta=this.abono_Operacion.id_venta,
                this.data.nuevaDeuda_venta=this.datos_venta_credito.balance_pendiente + this.abono_Operacion.monto_abonado,
                this.data.nuevaDeuda_cliente=this.datos_cliente.deuda + this.abono_Operacion.monto_abonado
                console.log(this.data)
                        axios.post(`${import.meta.env.VITE_API_SERVER}eliminar-abono-cliente/${this.data.idAbono}`,this.data)
                        
                        .then((response)=>{
                            toast.success("se elimino el registro del abono !");  
                            console.log(response.data);
                        })
                        .catch((error)=>{
                            toast.error("ocurrio un error al eliminar el registro del abono !"); 
                            console.error('Error al enviar la solicitud DELETE:', error);
                        })
                        
                        .finally( ()=> {
                        
                        //cerrar la ventana de eliminar abono
                        emitter.emit('cerrar_eliminar_abono_cliente')

                        //cerrar la ventana de carga de proceso
                        emitter.emit('cerrar_loader_carga_vista_cliente')

                        //actualizar el historial de abonos
                        emitter.emit('actualizar_historial_abonos_clientes')
                        })

            },

           
            buscar_registro_venta(){
                emitter.emit('abrir_loader_carga_vista_cliente')


                 // Realiza la solicitud GET al servidor para obtener el registro de abono por id
                axios.get(`${import.meta.env.VITE_API_SERVER}buscar-ventas-id/${this.abono_Operacion.id_venta}`)
                    .then((response) => {
                    // El registro de abono se encuentra en response.data
                    this.datos_venta_credito = response.data;
                    
                    })

                    .catch((error) => {
                    console.error('Error al obtener el registro de abono por id', error);
                    })
                    .finally(()=>{
                        //cerrar la carga luego de crear el cliente
                        emitter.emit('cerrar_loader_carga_vista_cliente')
                    });
            },

            buscar_registro_cliente(){
                emitter.emit('abrir_loader_carga_vista_cliente')


                 // Realiza la solicitud GET al servidor para obtener el registro de abono por id
                axios.get(`${import.meta.env.VITE_API_SERVER}deuda-cliente/${this.abono_Operacion.id_cliente}`)
                    .then((response) => {
                    // El registro de abono se encuentra en response.data
                    this.datos_cliente = response.data;
                    })

                    .catch((error) => {
                    console.error('Error al obtener el registro del cliente', error);
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