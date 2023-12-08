<script>
import card_hist_abono_cliente from './card_hist_abono_cliente.vue';

import EliminarAbonoCliente from './eliminar_abono_cliente.vue'
import EditarAbonoCliente from './editar_abono_cliente.vue'
import DetalleAbonoCliente from './detalle_abono_cliente.vue'

//importar el modulo de eventos globales 
import { emitter } from '@/eventBus';

import axios from 'axios';



export default {
    props:['id_cliente_operacione'],

    mounted(){
        this.buscar_cliente_id()

        //cargargar el historial de los abonos del cliente
        this.buscar_historial_abono_cliente()


        emitter.on('actualizar_historial_abonos_clientes',()=>{
            this.buscar_cliente_id()

            //cargargar el historial de los abonos del cliente
            this.buscar_historial_abono_cliente()
        })

        //ventana eliminar registro de abono
        emitter.on('abrir_eliminar_abono_cliente',(data)=>{
            this.id_abono_Operacion=data
            this.visibilidad_eliminar_abono_cliente=true
        })
        emitter.on('cerrar_eliminar_abono_cliente',()=>{
            this.visibilidad_eliminar_abono_cliente=false
          
        })

        //ventana editar abono
        emitter.on('cerrar_editar_abono_cliente',()=>{
            this.visibilidad_editar_abono_cliente=false
            //luego de modificar el abono actualizar los datos del historial
           this.actualizar()

        })
        emitter.on('abrir_editar_abono_cliente',(data)=>{
            this.id_abono_Operacion=data
            this.visibilidad_editar_abono_cliente=true
        })

        //ventana detalles del abono
        emitter.on('cerrar_detalle_abono_cliente',()=>{
            this.visibilidad_detalle_abono_cliente=false
        })

        emitter.on('abrir_detalle_abono_cliente',(data)=>{
            this.id_abono_Operacion=data
            this.visibilidad_detalle_abono_cliente=true
        })
    },
    data(){
        return{
            clienteEncontrado:[],
            historialAbonosDelCliente:[],
            id_abono_Operacion:'',

            visibilidad_eliminar_abono_cliente:false,
            visibilidad_editar_abono_cliente:false,
            visibilidad_detalle_abono_cliente:false
        }
    },
    components:{
        card_hist_abono_cliente,
        EliminarAbonoCliente,
        EditarAbonoCliente,
        DetalleAbonoCliente

        
    },
    methods:{
        buscar_cliente_id(){
            emitter.emit('abrir_loader_carga_vista_cliente')

               // Realizar la solicitud GET a la ruta /buscar-cliente/:idCliente
                axios.get(`https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/buscar-cliente/${this.id_cliente_operacione}`)
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

                // Realizar la solicitud GET a la ruta /buscar-cliente/:idCliente
                axios.get(`https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/abonos-por-cliente/${this.id_cliente_operacione}`)
                    .then((response) => {
                    this.historialAbonosDelCliente = response.data;
                    console.log(response.data)
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

                // buscar el registro de abono
                axios.get(`https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/abonos-por-cliente/${this.id_cliente_operacione}`)
                    .then((response) => {
                    this.historialAbonosDelCliente = response.data;
                    })
                    .catch((error) => {
                    console.error('Error al buscar el cliente', error);
                    this.historialAbonosDelCliente = [];
                    })

                    //buscar el cliente
                    //buscar los datos del cliente
                    axios.get(`https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/buscar-cliente/${this.id_cliente_operacione}`)
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

        <DetalleAbonoCliente :id_abono_Operacion="id_abono_Operacion" v-if="visibilidad_detalle_abono_cliente"/>

        <EditarAbonoCliente :clienteEncontrado="clienteEncontrado" :id_abono_Operacion="id_abono_Operacion" v-if="visibilidad_editar_abono_cliente"/>

        <EliminarAbonoCliente :clienteEncontrado="clienteEncontrado" :id_abono_Operacion="id_abono_Operacion" v-if="visibilidad_eliminar_abono_cliente"/>

    <header class="w-full p-3 inline-flex border-b-[1.5px] border-b-[#DFDFDF]">
        <img @click="cerrar_modal_historial_abono_cliente" class="w-[35px] mr-[25px]  order-1 cursor-pointer" src="/src/assets/iconos/interfaz/regresar.png" >
        <h2 class="text-[1.7rem] ml-[15px] order-2">Historial de abonos </h2>
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
        <h3 class="text-[1.3rem] mb-[10px]">Historial de abonos</h3>
        <div class="w-full h-[450px] pb-[40px]  p-1 overflow-hidden overflow-y-scroll">

            <div v-for="abono in historialAbonosDelCliente" :key="abono.id_abono_deuda_del_cliente">
                <card_hist_abono_cliente :abono="abono"/>
            </div>

        </div>
    </div>
</section>
</template>