
<script>
import Header from "../components/Header.vue";
import MenuInferior from "../components/Menu_inferiro.vue";
import Registroventas from "../components/inicio/registro_entas.vue"
import DetalleVentas from '../components/inicio/detalles_ventas.vue'
import EditarVentas from '../components/inicio/editar_ventas.vue'
import AnularVenta from '../components/inicio/anular_ventas.vue'
import comprobanteVenta from '../components/inicio/comprovante_venta.vue'

import LoaderCarga from '../components/carga_loader.vue'

//modulo de bus de eventos globales
import { emitter } from '@/eventBus';

import axios from 'axios';

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


export default { 

    mounted(){
        //escuchar eventos en tiempo real 
        this.$socket.on('actualizar_registro_venta',(data)=>{
            //notificar actualizacion
            toast.success('actualizando registro de venta!')
            this.obtener_ventas_del_dia()
        })

        //actualizar luego de operacion 
        emitter.on('actualizar_inicio',()=>{
            this.obtener_ventas_del_dia()
        })
        //obtener las ventas diarias

        this.obtener_ventas_del_dia()

        //ventana de editar venta
        emitter.on('cerrar_editar_venta',()=>{
            this.data.open_and_close_editar_venta=false
        })

        emitter.on('open_editar_ventas_inicio',(data)=>{
            this.ventaOperacion=data
            this.data.open_and_close_editar_venta=true

        })
        //ventana de carga 
        emitter.on('abrir_loader_carga_incio',()=>{
            this.data.visibilidad_carga_loader=true
        })

        emitter.on('cerrar_loader_carga_incio',()=>{
            this.data.visibilidad_carga_loader=false
        })

        //venta detalle de la venta

        emitter.on('open_detalle_ventas_inicio',(data)=>{
            this.ventaOperacion=data
            this.data.open_and_close_detalle_venta=true
        })

        emitter.on('cerrar_detalles_venta_inicio',()=>{
            this.data.open_and_close_detalle_venta=false
        })



        emitter.on('open_anular_venta_inicio',(data)=>{
            this.ventaOperacion=data
            this.data.open_and_close_anular_venta=true
        })

        emitter.on('cerrar_anular_venta_inicio',()=>{
            this.data.open_and_close_anular_venta=false
        })
        
        //vista comprobante venta
        emitter.on('open_comprobante_venta_inicio',(data)=>{
            this.ventaOperacion=data
            this.data.open_and_close_comprobante_venta=true
        })
        emitter.on('cerrer_comprobante_venta_inf_inicio',()=>{
            this.data.open_and_close_comprobante_venta=false
        })

    },

    components:{
        'menu-header': Header,
        'menu-inferior' : MenuInferior,
        'ventas-hoy':Registroventas,
        'detalle-ventas':DetalleVentas,
        'editar-ventas':EditarVentas,
        'anular-venta':AnularVenta,
        'comprobante-venta':comprobanteVenta,
        'loaders':LoaderCarga

    },
    data() {
        return {
            title: "Inicio",
            datosVentasDelDia:[],

            //recibe el registro pasado de las optiones 
            ventaOperacion:'',

            ingresosDiario:0,
            data:{
                open_and_close_detalle_venta:false,

                open_and_close_editar_venta:false,

                open_and_close_anular_venta:false,

                open_and_close_comprobante_venta:false,

                visibilidad_carga_loader:false
            },
        }
    },
    methods:{

        obtener_ventas_del_dia(){
            this.data.visibilidad_carga_loader=true

            axios.get('https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/ventas-dia-actual')
                .then((response)=>{
                    this.datosVentasDelDia=response.data
                })
                .catch((err)=>{
                    console.log(err)
                })
                .finally(()=>{
                    this.data.visibilidad_carga_loader=false
                    this.ingresosDiario= this.suma_ingresos_ventas_diaria()
                })
        },
        suma_ingresos_ventas_diaria(){
                 // Calcular la suma del precio de venta de los productos
                    return this.datosVentasDelDia.reduce((acumulador, datosVentasDelDia) => acumulador += datosVentasDelDia.total_venta  , 0);
            },

    }
}
</script>
<template>
    <transition name="fade">
        <section id="section" class="  w-full h-[100%]">
        <loaders v-show="data.visibilidad_carga_loader"/>

        <menu-inferior/>
        <menu-header :nameSession="title"/>


        <detalle-ventas :ventaOperacion="ventaOperacion"  v-if="data.open_and_close_detalle_venta"/>

        <editar-ventas   :ventaOperacion="ventaOperacion"   v-if="data.open_and_close_editar_venta"/>
        

        <anular-venta  :ventaOperacion="ventaOperacion" v-if="data.open_and_close_anular_venta" />

        <comprobante-venta :ventaOperacion="ventaOperacion" v-if="data.open_and_close_comprobante_venta" />

        <div class=" p-3 w-[95%] ml-[2.5%] h-[80px] rounded shadow-md shadow-[#00000031] mb-[20px] bg-[#FF7850]">
            <span class="text-[#F9F9F9]">Ingresos por ventas hoy</span>
            <h3 class="text-[1.6rem] text-white font-bold">{{ingresosDiario}}</h3>
            <img src="" >
        </div>

  

        <h3 class=" pl-2 text-[2rem] mt-[50px]">Ventas de hoy</h3>
        
        <article id="listado_ventas" class="w-full  mt-[50px] pb-[405px] ">
            <div v-if="datosVentasDelDia.length > 0">
                <div v-for="ventas in datosVentasDelDia" :key="ventas.id_ventas">
                    <ventas-hoy :ventas="ventas"/>
                </div>
            </div>
            <div v-else>
                <h3 class="text-[1.4rem] text-center"> no se encontraron ventas...</h3>
            </div>

        </article>
        

    </section>
    </transition>

</template>

<style scoped>
    #section{
        background: #FEFEE5;
    }
</style>