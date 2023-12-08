<script>
import Header from "../components/Header.vue";
import MenuInferior from "../components/Menu_inferiro.vue";
import cargaLoader from '../components/carga_loader.vue'
import Registroventas from "../components/informes/ventas_informes.vue"
import AnularVentas from '../components/informes/anular_ventas_informe.vue'
import ComprobanteVenta from '../components/inicio/comprovante_venta.vue'
import DetallesVentas from '../components/informes/detalles_ventas_informe.vue'

import axios from 'axios';

//modulo de bus de eventos globales
import { emitter } from '@/eventBus';

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';



export default {

    mounted(){

        //escuchar eventos en tiempo real 
        this.$socket.on('actualizar_registro_venta',(data)=>{
            //notificar actualizacion
            toast.success('actualizando registro de venta!')
            //actualizar el registro
            this.buscar_ventas()
        })

        //ventana de comprobante
        emitter.on('open_comprobante_informe',(data)=>{
            this.ventaOperacion=data
            this.estados.visibilidad_comprobante_venta=true
        })
        //cerrar ventana comprobante
        emitter.on('cerrer_comprobante_venta_inicio',()=>{
            this.estados.visibilidad_comprobante_venta=false
        })
        //cargar registro de venta al iniciar el componente
        this.buscar_ventas()
        
        //actualizar luego de operacion 
        emitter.on('actualizar_informe',()=>{
            this.buscar_ventas()    
        })

        //ventana de carga
        emitter.on('abrir_loader_carga_informe',()=>{
            this.estados.visibilidad_carga_loader=true

        })
        emitter.on('cerrar_loader_carga_informes',()=>{
            this.estados.visibilidad_carga_loader=false
        })

        //anular ventas 
        emitter.on('open_anular_venta_informe',(data)=>{
            this.ventaOperacion=data
            this.estados.visibilidad_anular_venta=true

        })
        emitter.on('cerrar_anular_venta_informe',()=>{
            this.estados.visibilidad_anular_venta=false

        })

        //ventana detalle venta
        emitter.on('open_detalle_ventas_informe',(data)=>{
            this.ventaOperacion=data
            this.estados.visibilidad_detalles_venta=true
        })

        emitter.on('cerrar_detalles_venta_informes',()=>{
            this.estados.visibilidad_detalles_venta=false
        })
         
    },
    components:{
        'menu-header': Header,
        'menu-inferior' : MenuInferior,
        'carga-loader' : cargaLoader,
        'ventas':Registroventas,
        'detalles-venta':DetallesVentas,
        'anular-venta':AnularVentas,
        'comprobante-venta': ComprobanteVenta
    },
    data() {
        return {
            title: "Informes",
            datosVentas:[],

            ventaOperacion:'',

            valorInventario:0,
            deudasPorCobrar:0, 
            deudasPorPagar:0,

            indicadorDeregistro:'todas',

            ingresosVentas:0,
            indicadoIngreso:'general',

            busquedaPorFecha:'',
            busquedaPorRango:'indicar rango',

            terminoBusqudaCliente:'',
            estados:{
                visibilidad_carga_loader:false,
                visibilidad_detalles_venta:false,
                visibilidad_anular_venta:false,
                visibilidad_comprobante_venta:false
            }
        }
    },
    watch:{
        busquedaPorFecha(){
            const fecha = this.convertirFormatoFechaHora(this.busquedaPorFecha)
            this.estados.visibilidad_carga_loader = true;
            axios.get(`https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/busqueda-registro-venta-por-fecha/${fecha}`)
                .then((response)=>{
                    this.datosVentas = response.data;

                })
                .catch((err)=>{
                    console.log(err)
                    toast.error("error al obtener la venta por fecha!");
                })
                .finally(()=>{
                    this.indicadorDeregistro= fecha
                    this.estados.visibilidad_carga_loader = false;
                    
                })
        },

        busquedaPorRango(){
            if (this.busquedaPorRango=='todas') {
                this.estados.visibilidad_carga_loader = true;
                 axios.get('https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/obtener-ventas')
                    .then((response)=>{
                        this.datosVentas = response.data;
                        //ingresos de ventas general
                        if (this.datosVentas.length > 0) {
                            toast.success("se obtuvieron todas las ventas !");
                        }
                        this.ingresosDeVentas(this.datosVentas)

                    })
                    .catch((error)=>{
                        console.log(error);
                    })
                    .finally(()=>{
                        this.indicadorDeregistro='todas'
                        this.indicadoIngreso=' todas'
                        //cerrar ventana de carga
                        this.estados.visibilidad_carga_loader= false;
                    })
            }
            else if (this.busquedaPorRango=='hoy') {
                this.estados.visibilidad_carga_loader = true;
                 axios.get('https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/ventas-dia-actual')
                    .then((response)=>{
                        this.datosVentas = response.data;
                        //ingresos de ventas de hoy
                        if(this.datosVentas.length > 0){
                            toast.success("se obtuvieron las ventas de hoy!");
                        }
                        this.ingresosDeVentas(this.datosVentas)
                    })
                    .catch((error)=>{
                        console.log(error);
                    })
                    .finally(()=>{
                        this.indicadorDeregistro='hoy'
                        this.indicadoIngreso='hoy'
                        //cerrar ventana de carga
                        this.estados.visibilidad_carga_loader= false;
                    })
            }

            else if (this.busquedaPorRango=='este mes') {
                this.estados.visibilidad_carga_loader = true;
                axios.get('https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/buscar-venta-mensual')
                    .then((response)=>{
                        this.datosVentas = response.data;
                        //ingresos de ventas mensuales
                        if(this.datosVentas.length > 0){
                            toast.success("se obtuvieron las ventas mensuales!");
                        }
                        this.ingresosDeVentas(this.datosVentas)

                    })
                    .catch((error)=>{
                        console.log(error);
                    })
                    .finally(()=>{
                        this.indicadorDeregistro='este mes'
                        this.indicadoIngreso='este mes'

                        //cerrar ventana de carga
                        this.estados.visibilidad_carga_loader= false;
                    })

            }
            else if(this.busquedaPorRango=='del año'){
                this.estados.visibilidad_carga_loader = true;
                axios.get('https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/ventas-anuales')
                    .then((response)=>{
                        this.datosVentas = response.data;
                        //ingresos de ventas anuales
                        if(this.datosVentas.length > 0){
                            toast.success("se obtuvieron las ventas anuales!");
                        }
                        this.ingresosDeVentas(this.datosVentas)
                    })
                    .catch((error)=>{
                        console.log(error);
                    })
                    .finally(()=>{
                        this.indicadorDeregistro='este año'
                        this.indicadoIngreso='este año'
                        //cerrar ventana de carga
                        this.estados.visibilidad_carga_loader= false;
                    })
            }
        }
    },
    methods: {
        
        
        buscar_ventas(){
            this.estados.visibilidad_carga_loader = true;
            axios.get('https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/obtener-ventas')
                .then((response)=>{
                    this.datosVentas = response.data;
                })
                .catch((error)=>{
                    console.log(error);
                })
                .finally(()=>{
                    //calcular reportes generales
                    this.buscar_valor_inventario()
                    this.total_deuda_clientes()
                    this.total_deuda_proveedores()

                    //ingresos de ventas
                    this.ingresosDeVentas(this.datosVentas)
                    //cerrar ventana de carga
                    this.estados.visibilidad_carga_loader= false;
                })
        },

        ingresosDeVentas(objetoJSON){
            let sumaDeuda = 0;

                    for (let key in objetoJSON) {
                            if (objetoJSON.hasOwnProperty(key)) {
                            let elemento = objetoJSON[key];

                            if (elemento.hasOwnProperty('total_venta')) {
                                sumaDeuda += elemento.total_venta;
                            }
                        }
                    }
                    this.ingresosVentas = sumaDeuda;
        },
        total_deuda_clientes() {
            axios.get('https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/obtener-clientes')
                .then((response) => {
                    let objetoJSON = response.data;

                    let sumaDeuda = 0;

                    for (let key in objetoJSON) {
                            if (objetoJSON.hasOwnProperty(key)) {
                            let elemento = objetoJSON[key];

                            if (elemento.hasOwnProperty('deuda')) {
                                sumaDeuda += elemento.deuda;
                            }
                        }
                    }
                    this.deudasPorCobrar = sumaDeuda;
                })
                .catch((error) => {
                    console.error('Error al obtener la lista de clientes', error);
                })

            },

            //buscar la deuda a proveedores

        total_deuda_proveedores(){
            axios.get('https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/obtener-proveedores')
                .then((response) => {
                    let objetoJSON = response.data;
                    let sumaDeuda = 0;
                    objetoJSON.forEach(element => {
                        sumaDeuda += element.deuda_a_proveedor
                    });
                    
                    this.deudasPorPagar = sumaDeuda;
                })
                .catch((error) => {
                    console.error('Error al obtener la lista de proveedores', error);
                })
        },

            //buscar el total del inventario
        buscar_valor_inventario(){
            axios.get('https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/productos')
                .then(response =>{
                    const inventario=response.data

                    this.valorInventario=inventario.reduce((acumulador, inventario) => 
                            acumulador + inventario.costo * inventario.cantidad_existente , 0)
                })
                .catch((err)=>{
                    console.log(err);
                    toast.error("error al calcular el total del invetario!");   
                })
        },
        buscar_venta_cliente(){
            if (this.terminoBusqudaCliente != '') {
                this.estados.visibilidad_carga_loader = true;
                axios.get(`https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/busqueda-registro-venta-cliente/${this.terminoBusqudaCliente}`)
                    .then((response)=>{
                        this.datosVentas = response.data;
                        toast.success("se obtuvieron las ventas del cliente!");
                        //indicar el termino del cliente que se busco
                        this.indicadorDeregistro=this.terminoBusqudaCliente
                    })
                    .catch((err)=>{
                        console.log(err);
                        toast.warn("error al buscar las ventas del cliente!");
                    })
                    .finally(()=>{
                        this.terminoBusqudaCliente =''
                        this.estados.visibilidad_carga_loader = false;
                    })
            }else{
                toast.warn("ingrese un dato para buscar las ventas del cliente!");
            }

        },
        //convertir formato de fecha
        convertirFormatoFechaHora(inputDatetimeLocal) {
                const fechaHora = new Date(inputDatetimeLocal);
                
                const opcionesFecha = { month: 'short', day: 'numeric', year: 'numeric' };
                const opcionesHora = { hour: 'numeric', minute: 'numeric', hour12: true };
                
                const fechaFormateada = fechaHora.toLocaleString('en-US', opcionesFecha).replace(',', '');
                const horaFormateada = fechaHora.toLocaleString('en-US', opcionesHora);
                
                return `${fechaFormateada} - ${horaFormateada}`;
                }
    }
}
</script>

<template>
    <section class="bg-[#FEFEE5] pb-[220px] w-full h-[100%]">
        <menu-inferior />

        <carga-loader v-show="estados.visibilidad_carga_loader"/>

        <menu-header :nameSession="title"/>

        <comprobante-venta :ventaOperacion="ventaOperacion" v-if="estados.visibilidad_comprobante_venta"/>

        <anular-venta :ventaOperacion="ventaOperacion" v-if="estados.visibilidad_anular_venta"/>

        <detalles-venta :ventaOperacion="ventaOperacion" v-if="estados.visibilidad_detalles_venta"/>

        <div class="w-full mt-[20px] h-400px p-2 overflow-hidden ">
            <h3 class="text-[1.4rem] mb-[20px]">Reportes general</h3>
            <div class=" w-full h-[100%] overflow-x-scroll ">
               
            <div class="w-[280%] inline-flex">
                <div class=" p-3 w-[320px] mr-[10px]  h-[120px] rounded shadow-md shadow-[#00000031] mb-[20px] bg-[#FF7850]">
                    <span class="text-[#F9F9F9]">Ingresos por ventas / {{indicadoIngreso }}</span>
                    <h3 class="text-[1.6rem] mb-[10px] text-white font-bold">{{ingresosVentas}}</h3>
                    
                </div>
                   
                <div class=" p-3 w-[320px] mr-[10px]  h-[120px] rounded shadow-md shadow-[#00000031] mb-[20px] bg-[#FFB984]">
                    <span class="text-[#F9F9F9]">Valor total del inventario</span>
                     <h3 class="text-[1.6rem] mb-[10px] text-white font-bold">{{ valorInventario }}</h3>
                </div>

                <div class=" p-3 w-[320px] mr-[10px]  h-[120px] rounded shadow-md shadow-[#00000031] mb-[20px] bg-[#f07e5c]">
                    <span class="text-[#F9F9F9]">Total de la deuda por cobrar</span>
                    <h3 class="text-[1.6rem] mb-[10px] text-white font-bold">{{deudasPorCobrar}}</h3>
                </div>

                <div class=" p-3 w-[320px] mr-[10px]  h-[120px] rounded shadow-md shadow-[#00000031] mb-[20px] bg-[#FFB984]">
                    <span class="text-[#F9F9F9]">Total de la deuda a proveedores</span>
                    <h3 class="text-[1.6rem] mb-[10px] text-white font-bold">{{deudasPorPagar}}</h3>
                </div>
            </div>
                
            </div>
        </div>

        <div class="mt-[20px] p-2">
            <h3 class="text-[1.4rem] mb-[10px]">Registro de ventas</h3>
            <div>
                <select v-model="busquedaPorRango" class="w-[100px] outline-none text-[0.8rem] mr-[5px] rounded bg-white shadow-md shadow-[#0000002a] h-[45px]" name="" id="">
                    <option>indicar rango</option>
                    <option value="todas">todas</option>
                    <option value="hoy">hoy</option>
                    <option value="este mes">este mes</option>
                    <option value="del año">del año</option>
                </select>

                <input v-model="busquedaPorFecha" placeholder="indicar fecha" class="w-[105px] mr-[5px] outline-none text-[0.9rem]   rounded bg-white shadow-md shadow-[#0000002a] h-[45px]" type="datetime-local" name="" id="">
                <input @keyup.enter="buscar_venta_cliente" v-model="terminoBusqudaCliente" placeholder="buscar por cliente..." class="w-[140px] pl-2 placeholder:text-[0.8rem]   mr-[5px] outline-none rounded bg-white shadow-md shadow-[#0000002a] h-[45px]" type="text" name="" id="">   
            </div>
            <div class="w-full pb-[60px]  mt-[20px]">
                <h3 class="text-[1.2rem] mb-[10px]">Ventas/ <span class="text-[#444444] text-[1.1rem]">{{indicadorDeregistro}}</span></h3>
                <div v-if="datosVentas.length > 0">
                <div v-for="ventas in datosVentas" :key="ventas.id_ventas">
                    <ventas :ventas="ventas"/>
                </div>
            </div>
            <div v-else>
                <h3 class="text-[1.4rem] text-center"> no se encontraron ventas...</h3>
            </div>
            </div>
        </div>
    </section>
    
</template>