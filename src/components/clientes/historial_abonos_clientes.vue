<script>

import card_deudas_pendientes from "./card_deuda_cliente.vue";

import historial_abonos_deudas from "./historial_abono_deuda_pendiente.vue";



import detalles_venta_crendito from "../inicio/detalles_ventas.vue";

//importar el modulo de eventos globales  
import { emitter } from '@/eventBus';

import axios from 'axios';
 


export default {
    props:['id_cliente_operacione'],

    mounted(){
        this.buscar_cliente_id()

        //cargargar el historial de los abonos del cliente
        this.buscar_historial_abono_cliente()

        //evento para actualizar luego de un abono
        emitter.on('actualizar_historial_deudas_cliente',()=>{
            this.buscar_cliente_id()
            this.buscar_historial_abono_cliente()
        })

        //ventana de detalles de venta a credito del cliente
        emitter.on('detalles_venta_credito_cliente',(datos_venta)=>{
            this.datos_venta_operacion=datos_venta;
            this.visibilidad_detalle_venta_credito=true

        })

        //abirir el historial de abonos de deuda de la venta a credito
        emitter.on('historial_abonos_deuda_pendiente',(datos_venta)=>{
            this.datos_venta_operacion=datos_venta;
            this.visibilidad_historial_abonos=true
        })

        emitter.on('cerrar_historial_abonos_deuda_pendiente',()=>{
            this.visibilidad_historial_abonos=false
        })

        emitter.on('cerrar_detalle_historial_deuda',()=>{
            this.visibilidad_detalle_venta_credito=false
        })

        emitter.on('actualizar_historial_abonos_clientes',()=>{
            this.buscar_cliente_id()

            //cargargar el historial de los abonos del cliente
            this.buscar_historial_abono_cliente()
        })


       
 
        
    },
    data(){
        return{
            clienteEncontrado:[],
            historialAbonosDelCliente:[],
            datos_venta_operacion:'',

            visibilidad_detalle_venta_credito:false,
            visibilidad_historial_abonos:false
        }
    },
    components:{
        card_deudas_pendientes,
        detalles_venta_crendito,
        historial_abonos_deudas
    },
    methods:{
        buscar_cliente_id(){
            emitter.emit('abrir_loader_carga_vista_cliente')

               // Realizar la solicitud GET a la ruta /buscar-cliente/:idCliente
                axios.get(`${import.meta.env.VITE_API_SERVER}buscar-cliente/${this.id_cliente_operacione}`)
                    .then((response) => {
                    this.clienteEncontrado = response.data;
                    })
                    .catch((error) => {
                    console.error('Error al buscar el cliente', error);
                    this.clienteEncontrado = [];
                    })
                    .finally(()=>{
                        //cerrar la carga luego de crear el cliente
                        emitter.emit('cerrar_loader_carga_vista_cliente')
                    })
            },
            buscar_historial_abono_cliente(){
                emitter.emit('abrir_loader_carga_vista_cliente')

                // buscar las ventas a credito pendiente del cliente
                axios.get(`${import.meta.env.VITE_API_SERVER}ventas-cliente-deudas/${this.id_cliente_operacione}`)
                    .then((response) => {
                    this.historialAbonosDelCliente = response.data;
                    console.log("id "+ this.id_cliente_operacione)

                    console.log(this.historialAbonosDelCliente)
                    })
                    .catch((error) => {
                    console.error('Error al buscar el cliente', error);
                    this.historialAbonosDelCliente = [];
                    })
                    .finally(()=>{
                        //cerrar la carga luego de crear el cliente
                        emitter.emit('cerrar_loader_carga_vista_cliente')
                    }) 
            },

            cerrar_modal_historial_abono_cliente(){
                emitter.emit('cerrar_historial_abono_cliente')
                //actualizar la vista cliente
                emitter.emit('actualizar_objetos_cliente_vista_cliente')
            },

            actualizar(){
         
                emitter.emit('abrir_loader_carga_vista_cliente')

                // buscar el registro de ventas a credito pendiente del cliente
                axios.get(`${import.meta.env.VITE_API_SERVER}ventas-cliente-deudas/${this.id_cliente_operacione}`)
                    .then((response) => {
                    this.historialAbonosDelCliente = response.data;
                    
                    })
                    .catch((error) => {
                    console.error('Error al buscar el cliente', error);
                    this.historialAbonosDelCliente = [];
                    })
                    .finally(()=>{
                        //cerrar la carga luego de crear el cliente
                        emitter.emit('cerrar_loader_carga_vista_cliente')
                    }) 

                    //buscar el cliente
                    //buscar los datos del cliente
                    axios.get(`${import.meta.env.VITE_API_SERVER}buscar-cliente/${this.id_cliente_operacione}`)
                        .then((response) => {
                        this.clienteEncontrado = response.data;
                        })
                        .catch((error) => {
                        console.error('Error al buscar el cliente', error);
                        this.clienteEncontrado = [];
                        })
                    
                emitter.emit('cerrar_loader_carga_vista_cliente')
                    
            }


    } 

} 
</script>



<template>
    <section  class="  w-full h-[100vh] bg-white fixed  z-50 ">


        <detalles_venta_crendito :ventaOperacion="datos_venta_operacion" v-if="visibilidad_detalle_venta_credito"/>

        <historial_abonos_deudas :ventas_credito="datos_venta_operacion"  v-if="visibilidad_historial_abonos"/>


    <header class="w-full p-3 inline-flex border-b-[1.5px] border-b-[#DFDFDF]">
        <img @click="cerrar_modal_historial_abono_cliente" class="w-[35px] mr-[25px]  order-1 cursor-pointer" src="/src/assets/iconos/interfaz/regresar.png" >
        <h2 class="text-[1.7rem] ml-[30px] order-2">Realizar abono </h2>
    </header>
    <div class="p-2 pt-[20px]">
        <h3 class="text-[1.3rem] mb-[10px]">Cliente</h3>
        <div class=" p-2 w-full h-[100px] justify-center  items-center rounded flex shadow-md shadow-[#0000001f]">
                    <img class="order-1 w-[60px] h-[60px] mr-[30px] " src="/src/assets/iconos/interfaz/tienda.png" alt="" srcset="">
                    <div class="order-2">
                        <h3>{{clienteEncontrado.nombre_cliente}}</h3>
                        <h3 class="text-[#9F9F9F]">Total de la deuda: <span class="text-[#E55226]">{{ clienteEncontrado.deuda }}</span></h3>
                    </div>
                </div>
    </div> 
    <div class="p-2">
        <h3 class="text-[1.3rem] mb-[10px]">Historial de deudas pendientes</h3>
        <div class="w-full h-[450px] pb-[40px]  p-1 overflow-hidden overflow-y-scroll">

            <div v-if="historialAbonosDelCliente.length >  0">
                <div v-for="ventas_credito in historialAbonosDelCliente" :key="ventas_credito.id_ventas">
                    <card_deudas_pendientes :ventas_credito="ventas_credito" />
                </div>
            </div>
            <div v-else>
                <h3 class="text-[1.1rem] mt-[20px] text-center"> no se encontraron deudas pendientes...</h3>
            </div>

        </div>
    </div>
</section>
</template>