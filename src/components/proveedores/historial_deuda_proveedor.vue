<script>

import CardHistAbonoProveedor from './card_historial_abono_proveedores.vue'
import AnularAbonoDeudaProveedor from './anular_abono_proveedor.vue'
import DetallesAbonoProveedor from './detalles_abono_proveedores.vue'
import EditarAbonoProveedor from './editar_abono_proveedor.vue'
//importar el modulo de eventos globales 
import { emitter } from '@/eventBus'; 

import axios from 'axios';

export default {

    mounted(){
        //ventana editar abono
        emitter.on('abrir_editar_abono_proveedor',(data)=>{
            this.id_registro_operacion=data
            this.estados.visibilidad_editar_abono_proveedor=true
        })

        emitter.on('cerrar_editar_abono_proveedor',()=>{
            this.estados.visibilidad_editar_abono_proveedor=false
        })


        //ventana detalles del abono del proveedor
        emitter.on('cerrar_detalle_abono_proveedor',()=>{
            this.estados.visibilidad_detalles_abono_proveedor=false
        })

        emitter.on('abrir_detalle_abono_proveedor',(data)=>{
            this.id_registro_operacion=data
            this.estados.visibilidad_detalles_abono_proveedor=true
        })

        //ventana de anular abono de deuda 
        emitter.on('abrir_eliminar_abono_proveedor',(data)=>{
            this.id_registro_operacion=data

            this.estados.visibilidad_anular_abono_proveedor=true
        })

        emitter.on('cerrar_anular_abono_proveedor',()=>{
            this.estados.visibilidad_anular_abono_proveedor=false
        })
 
        //actualizar luego de una operacion 
        emitter.on('actualizar_historial_abonos_proveedores',()=>{
            //buscar proveedor del registro
            this.buscar_proveedor()

            //buscar todos los registros del proveedor
            this.buscar_historial_abono_proveedor()
        })

        
        //buscar proveedor del registro
        this.buscar_proveedor()

        //buscar todos los registros del proveedor
        this.buscar_historial_abono_proveedor()
    },

    props:['idProveedor'],

    components:{
        'card-historial-abono':CardHistAbonoProveedor,
        'anular-abono':AnularAbonoDeudaProveedor,
        'detalle-abono':DetallesAbonoProveedor,
        'editar-abono':EditarAbonoProveedor

    },

    data(){
        return{
            proveedorEncontrado:[],
            historialAbonosProveedor:[],
            id_registro_operacion:'',

            estados:{
                visibilidad_anular_abono_proveedor:false,
                visibilidad_detalles_abono_proveedor:false,
                visibilidad_editar_abono_proveedor:false
            }
        }
    },  
    methods:{

        cerrar_historial_abono(){
            emitter.emit('cerrar_historial_abono_proveedor')
        },
        buscar_proveedor(){
            emitter.emit('abrir_loader_carga_vista_proveedor')

            axios.get(`https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/buscar-proveedores/${this.idProveedor}`)
            .then((response)=>{
                this.proveedorEncontrado=response.data;
            })
            .catch((err)=>{
                console.log(err)
            })
            .finally(()=>{
                //cerrar la carga luego de crear el cliente
                emitter.emit('cerrar_loader_carga_vista_proveedor')
            })
        },

        buscar_historial_abono_proveedor(){
                emitter.emit('abrir_loader_carga_vista_proveedor')

                // Realizar la solicitud GET a la ruta /buscar-cliente/:idCliente
                axios.get(`https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/abonos-por-proveedor/${this.idProveedor}`)
                    .then((response) => {
                    this.historialAbonosProveedor = response.data;
                    console.log(response.data)
                    })
                    .catch((error) => {
                    console.error('Error al buscar el cliente', error);
                    this.historialAbonosProveedor = [];
                    })
                    .finally(()=>{
                        //cerrar la carga luego de crear el cliente
                        emitter.emit('cerrar_loader_carga_vista_proveedor')
                    }) 
            }, 
    }
}
</script>

<template>
    <section class="  w-full h-[100vh] bg-white fixed  z-50 ">

        <anular-abono :id_registro_operacion="id_registro_operacion"  :proveedorEncontrado="proveedorEncontrado" 
        v-if="estados.visibilidad_anular_abono_proveedor"/>

        <editar-abono :proveedorEncontrado="proveedorEncontrado" :id_registro_operacion="id_registro_operacion" v-if="estados.visibilidad_editar_abono_proveedor"/>

        <detalle-abono :id_registro_operacion="id_registro_operacion" v-if="estados.visibilidad_detalles_abono_proveedor" />
 
    <header class="w-full p-3 inline-flex border-b-[1.5px] border-b-[#DFDFDF]">
        <img @click="cerrar_historial_abono" class="w-[35px] mr-[25px]  order-1 cursor-pointer" src="/src/assets/iconos/interfaz/regresar.png" >
        <h2 class="text-[1.7rem] ml-[15px] order-2">Historial de abonos </h2>
    </header> 
    <div class="p-2 pt-[20px]">
        <h3 class="text-[1.3rem] mb-[10px]">Proveedor</h3>
        <div class=" p-2 w-full h-[100px] justify-center  items-center rounded flex shadow-md shadow-[#0000001f]">
                    <img class="order-1 w-[60px] h-[60px] mr-[30px] " src="/src/assets/iconos/interfaz/furgoneta-de-reparto.png" alt="" srcset="">
                    <div class="order-2">
                        <h3>{{proveedorEncontrado.nombre_proveedor}}</h3>
                        <h3 class="text-[#9F9F9F]">Total de la deuda: <span class="text-[#E55226]">{{ proveedorEncontrado.deuda_a_proveedor }}</span></h3>
                    </div>
                </div>
    </div>
    <div class="p-2">
        <h3 class="text-[1.3rem] mb-[10px]">Historial de abonos</h3>
        <div class="w-full h-[450px] pb-[40px]  p-1 overflow-hidden overflow-y-scroll">

            <div v-if=" historialAbonosProveedor.length > 0">
                <div v-for="abono in historialAbonosProveedor" :key="abono.id_abono_deuda_del_cliente">
                     <card-historial-abono :abono="abono"/>
                </div>
            </div>
            <div v-else>
                <h3 class="text-[1.1rem] text-center"> no se encontraron registros de abono...</h3>
            </div>
           

        </div>
    </div>
</section>
</template>