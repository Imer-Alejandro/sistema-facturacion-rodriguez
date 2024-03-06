<script>
import card_abonos from './card_hist_abono_cliente.vue'


import EliminarAbonoCliente from './eliminar_abono_cliente.vue'
import EditarAbonoCliente from './editar_abono_cliente.vue'
import DetalleAbonoCliente from './detalle_abono_cliente.vue'

//importar el modulo de eventos globales  
import { emitter } from '@/eventBus';

import axios from 'axios';
 

export default {
    mounted(){
        //llamar los registros de abono de la deuda
        this.obtener_registros_abonos();

        //escuchar eventos de actualizacion

        emitter.on('actualizar_historial_abonos_clientes',()=>{
        this.obtener_registros_abonos();

        })

         //ventana editar abono
         emitter.on('cerrar_editar_abono_cliente',()=>{
            this.visibilidad_editar_abono_cliente=false
            //luego de modificar el abono actualizar los datos del historial
           this.actualizar()

        })
        emitter.on('abrir_editar_abono_cliente',(data)=>{
            this.abono_Operacion=data
            this.visibilidad_editar_abono_cliente=true
        })

        //ventana detalles del abono
        emitter.on('cerrar_detalle_abono_cliente',()=>{
            this.visibilidad_detalle_abono_cliente=false
        })

        emitter.on('abrir_detalle_abono_cliente',(data)=>{
            this.abono_Operacion=data
            this.visibilidad_detalle_abono_cliente=true
        })

        
        //ventana eliminar registro de abono
        emitter.on('abrir_eliminar_abono_cliente',(data)=>{
            this.abono_Operacion=data
            this.visibilidad_eliminar_abono_cliente=true
        })
        emitter.on('cerrar_eliminar_abono_cliente',()=>{
            this.visibilidad_eliminar_abono_cliente=false
            emitter.emit('cerrar_historial_abonos_deuda_pendiente')
 
            
        })
    },
    props:['ventas_credito'],
    components:{
        card_abonos,
        EliminarAbonoCliente,
        EditarAbonoCliente,
        DetalleAbonoCliente,
    },
    data() {
        return {
            abono_Operacion:'',
            abonos:[],
            visibilidad_eliminar_abono_cliente:false,
            visibilidad_editar_abono_cliente:false,
            visibilidad_detalle_abono_cliente:false,
            }
    },
    methods:{
        cerrar_historial(){
            emitter.emit('cerrar_historial_abonos_deuda_pendiente')
        },
        obtener_registros_abonos(){
            emitter.emit('abrir_loader_carga_vista_cliente')
            axios.get(`${import.meta.env.VITE_API_SERVER}abonos-por-ventas-pendiente/${this.ventas_credito.id_ventas}`)
                .then((response)=>{
                    this.abonos=response.data;
                    
                })
                .catch((err)=>{
                    console.error(err)
                })
                .finally(()=>{
                    emitter.emit('cerrar_loader_carga_vista_cliente')
                })
        },
       
    }
}
</script>
<template>
     <section  class="  w-full h-[100vh] bg-white fixed  z-50 ">

        <EliminarAbonoCliente :abono_Operacion="abono_Operacion" v-if="visibilidad_eliminar_abono_cliente"/>

        <EditarAbonoCliente :abono_Operacion="abono_Operacion" v-if="visibilidad_editar_abono_cliente"/>
        
        <DetalleAbonoCliente :abono_Operacion="abono_Operacion" v-if="visibilidad_detalle_abono_cliente"/>

        <header class="w-full p-3 inline-flex border-b-[1.5px] border-b-[#DFDFDF]">
        <img @click="cerrar_historial()" class="w-[35px] mr-[25px]  order-1 cursor-pointer" src="/src/assets/iconos/interfaz/regresar.png" >
        <h2 class="text-[1.7rem] ml-[20px] order-2">historial de abonos </h2>
    </header>

    <div class="p-2">
        <div class=" p-2 w-full h-[110px] justify-center mb-[20px] items-center rounded flex shadow-md shadow-[#0000001f]">
            <div class="order-1 bg-[#FF9A9A] rounded flex items-center justify-center w-[80px] h-[80px] mr-[20px] ">
                <img class="w-[50px] h-[50px]" src="/src/assets/iconos/interfaz/billete-de-banco.png" alt="" srcset="">
            </div>
            <div class="order-2">
                <h3 class="mb-[3px]">Total deuda: <span class="text-[#E55226]">{{ventas_credito.balance_pendiente.toLocaleString('en-US', { style: 'decimal', useGrouping: true, maximumFractionDigits: 2 })}}</span></h3>
                <h4 class="mb-[3px]">Cliente: <span class="text-[#9F9F9F] text-[0.9rem]" >{{ventas_credito.nombre_cliente}}</span></h4>
                <h4 >Fecha del credito: <span class="text-[#9F9F9F] text-[0.9rem]" >{{ventas_credito.fecha.split(" - ")[0]}}</span></h4>
            </div>
        </div>
        <h3 class="text-[1.3rem] mb-[30px]">Historial de abonos</h3>
        <div class="w-full h-[450px] pb-[40px]  p-1 overflow-hidden overflow-y-scroll">
            <div v-if="abonos.length > 0">
                <div v-for="abono in abonos" :key="abono.id_abono_deuda_del_cliente">
                    <card_abonos :abono="abono"/>
                </div>
            </div>
            <div v-else>
                <h3 class="text-[1.1rem] text-[#9F9F9F] mt-[20px] text-center"> no se encontraron abonos...</h3>
            </div>
        </div>

    </div>
    
     </section>
</template>