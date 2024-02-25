
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
            datosVentas:'',
            ganaciasDiaria:0,
            estadoGanaciasDelFiltro:'hoy',
            ingresosDiario:0,
            datosAbonos:'',
            filtroGanaciasFecha:'',
            opciones :{ style: 'decimal', useGrouping: true, maximumFractionDigits: 0 },
            //recibe el registro pasado de las optiones 
            ventaOperacion:'',

            data:{
                open_and_close_detalle_venta:false,

                open_and_close_editar_venta:false,

                open_and_close_anular_venta:false,

                open_and_close_comprobante_venta:false,

                visibilidad_carga_loader:false
            },
        }
    },
    watch:{
        //filtrar ganacias por fecha especifica
        filtroGanaciasFecha(){
           const fecha = this.convertirFormatoFecha(this.filtroGanaciasFecha)

           this.visibilidad_carga_loader = true;
            axios.post(`${import.meta.env.VITE_API_SERVER}busqueda-registro-venta-por-fecha`,{fecha})
                .then((response)=>{
                    this.datosVentas = response.data;

                    if(this.datosVentas.length > 0){
                        toast.success(`se obtuvo las ganancias del ${fecha}!`);
                        }

                        this.estadoGanaciasDelFiltro = fecha
                    
                    this.ganaciasDiaria=this.SumaGanancias(this.datosVentas)

                })
                .catch((err)=>{
                    console.log(err)
                    toast.error(`error al obtener las ganacias del ${fecha}!`);
                })
                .finally(()=>{
                    this.estadoGanaciasDelFiltro = fecha
                    this.visibilidad_carga_loader = false;
                    
                })
            
       
        },

        //filtrar ganancias por rango de fechas
        estadoGanaciasDelFiltro(){
            if(this.estadoGanaciasDelFiltro== 'hoy'){
                this.obtener_ventas_del_dia()
            }
            else if(this.estadoGanaciasDelFiltro== 'mes'){
                this.data.visibilidad_carga_loader = true;
                axios.get(`${import.meta.env.VITE_API_SERVER}buscar-venta-mensual`)
                    .then((response)=>{
                        this.datosVentas = response.data;
                        //ingresos de ventas mensuales
                        if(this.datosVentas.length > 0){
                            toast.success("se obtuvieron las ganancias mensuales!");
                        }
                        this.estadoGanaciasDelFiltro='mes'
                        this.ganaciasDiaria=this.SumaGanancias(this.datosVentas)

                    })
                    .catch((error)=>{
                        console.log(error);
                    })
                    .finally(()=>{
                        this.estadoGanaciasDelFiltro='mes'
                        
                        //cerrar ventana de carga
                        this.data.visibilidad_carga_loader= false;
                    })
            }
            else if(this.estadoGanaciasDelFiltro== 'año'){
                this.data.visibilidad_carga_loader = true;
                axios.get(`${import.meta.env.VITE_API_SERVER}ventas-anuales`)
                    .then((response)=>{
                        this.datosVentas = response.data;
                        //ingresos de ventas anuales
                        if(this.datosVentas.length > 0){
                            toast.success("se obtuvieron las ganancias anuales!");
                        }
                        this.estadoGanaciasDelFiltro='año'
                        this.ganaciasDiaria=this.SumaGanancias(this.datosVentas)
                        
                    })
                    .catch((error)=>{
                        console.log(error);
                    })
                    .finally(()=>{
                        this.estadoGanaciasDelFiltro='año'
                        
                        //cerrar ventana de carga
                        this.data.visibilidad_carga_loader= false;
                    })
            }
            else if(this.estadoGanaciasDelFiltro== 'todas'){
                this.data.visibilidad_carga_loader= true;
                 axios.get(`${import.meta.env.VITE_API_SERVER}obtener-ventas`)
                    .then((response)=>{
                        this.datosVentas = response.data;
                        //ingresos de ventas general
                        if (this.datosVentas.length > 0) {
                            toast.success("se obtuvieron las ganancias en general!");
                        }
                        this.estadoGanaciasDelFiltro='todas'
                        this.ganaciasDiaria=this.SumaGanancias(this.datosVentas)

                    })
                    .catch((error)=>{
                        console.log(error);
                    })
                    .finally(()=>{
                        this.estadoGanaciasDelFiltro='todas'

                        this.data.visibilidad_carga_loader= false;
                    })
            }
        }
    },
    methods:{
        convertirFormatoFecha(fechaInput) {
        const mesesAbreviados = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

        const fecha = new Date(fechaInput);

        const opciones = { month: 'numeric', day: 'numeric', year: 'numeric' };
        const [mes, dia, anio] = fecha.toLocaleDateString('en-US', opciones).split('/');

        const mesAbreviado = mesesAbreviados[parseInt(mes, 10) - 1];

        const fechaFormateada = `${mesAbreviado} ${dia} ${anio}`;

        return fechaFormateada;
}, 

        obtener_ventas_del_dia(){
            this.data.visibilidad_carga_loader=true
            console.log(this.obtenerFechaActual())

            axios.post(`${import.meta.env.VITE_API_SERVER}ventas-dia-actual`,{fecha:this.obtenerFechaActual()})
                .then((response)=>{
                    this.datosVentasDelDia=response.data

                    this.ingresosDiario= this.suma_ingresos_ventas_diaria(this.datosVentasDelDia)
                    this.ganaciasDiaria=this.SumaGanancias(this.datosVentasDelDia)
                    this.estadoGanaciasDelFiltro='hoy'
                    
                })
                .catch((err)=>{
                    console.log(err)
                })
                .finally(()=>{
                    
                    this.data.visibilidad_carga_loader=false
                 
                })
        },
        
obtenerFechaActual() {
  const fechaHoraActual = new Date();

  const meses = [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
  ];

  const mes = meses[fechaHoraActual.getMonth()];
  const dia = fechaHoraActual.getDate();
  const anio = fechaHoraActual.getFullYear();

  const fechaFormateada = `${mes} ${dia} ${anio}`;

  return fechaFormateada;
},
       

        
suma_ingresos_ventas_diaria(datosVentas) {
    // Calcular la suma del precio de venta de los productos, omitiendo ventas a crédito
    return datosVentas.reduce((acumulador, datosVentasDelDia) => {
        // Verificar si el tipo de venta es diferente de 'credito' antes de sumar el total
        if (datosVentasDelDia.tipo_venta !== 'credito') {
            acumulador += datosVentasDelDia.total_venta;
        }
        return acumulador;
    }, 0);
},
SumaGanancias(datosVentas) {
    return datosVentas.reduce((ganancias,ventas)=>{
        if (ventas.tipo_venta !== 'credito') {
            //onvertir el listado de producto en json
            const detallesProductos = JSON.parse(ventas.detalles_producto);
            detallesProductos.forEach((producto)=>{
                ganancias += (producto.precio_venta - producto.precio_compra) * producto.cantidad_venta;
            })

        }
        return ganancias;
    },0)
  
}

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

        <div class=" p-3 w-[95%] ml-[2.5%] h-[80px] rounded shadow-md shadow-[#00000031] mb-[15px] bg-[#FF7850]">
            <span class="text-[#F9F9F9]">Ingresos por ventas hoy</span>
            <h3 class="text-[1.6rem] text-white font-bold">{{ingresosDiario.toLocaleString('en-US',opciones)}}</h3>
            <img src="" >
        </div>
        
        <div class="p-3 w-[95%]  box-border flex flex-row mb-[20px]">
            <div class=" order-1 w-[95%]  h-[80px] p-3 rounded shadow-md  shadow-[#00000031] mr-[10px] bg-[#FFB984]">
                <span class="text-[#F9F9F9] text-[1rem]">Ganancias / {{estadoGanaciasDelFiltro}}</span>
                <h3 class="text-[1.6rem] text-white font-bold">{{ganaciasDiaria.toLocaleString('en-US',opciones)}}</h3>
            </div>
            <select v-model="estadoGanaciasDelFiltro" class="order-2 p-2 w-[70px]  outline-none h-[80px] rounded shadow-md mr-[20px] shadow-[#00000031]  bg-[#FFB984] ">
                <option value="hoy">hoy</option>
                <option value="mes">mes</option>
                <option value="año">año</option>
                <option value="todas">todas</option>

            </select>
            <label class="order-3 ml-[5px] w-[15%] text-center justify-center items-center h-[80px] flex flex-row" for="fecha">
                <img class="w-[30px]  z-[2] h-[30px]" src="/icons/calendario.png" >
                <input id="fecha" v-model="filtroGanaciasFecha" type="date" class="text-[#FFB984] absolute z-[1]  outline-none p-2 w-[60px] h-[80px] rounded shadow-md shadow-[#00000031]  bg-[#FFB984] ">
            </label>
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