<script>
import Header from "../components/Header.vue";
import MenuInferior from "../components/Menu_inferiro.vue";
import BtnCrearProveedor from "../components/proveedores/btn_registro_proveedor.vue";
import CardProveedor from "../components/proveedores/proveedores.vue"
import FormRegistroProveedor from "../components/proveedores/form_registro_proveedores.vue"
import EliminarProveedor from '../components/proveedores/eliminar_proveedores.vue'
import AbonarDeudaProveedor from '../components/proveedores/abono_deuda_proveedor.vue'
import BuscarProveedor from "../components/proveedores/result_busqueda_proveedor.vue"
import EditarProveedor from '../components/proveedores/editar_proveedor.vue'
import registro_deuda_proveedor from '../components/proveedores/registro_deuda_proveedor.vue'

import HistorialAbonoProveedor from '../components/proveedores/historial_deuda_proveedor.vue'

import CargaLoader from '../components/carga_loader.vue';
 
//importar el modulo de eventos globales 
import { emitter } from '@/eventBus'; 

//libreria de notificacion 
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
  
import axios from 'axios';
import { data } from "autoprefixer";

export default {
    mounted(){

        //eventos de modificacion de proveedores en tiempo real
        this.$socket.on('actualizacion_registro_proveedores',()=>{
            toast.success("actualizando el registro luego de modificacion!");
            //actualizar el registro
            this.obtener_proveedores()
        })

        //registrar nueva deuda del proveedor 
        emitter.on('abrir_registro_deuda_proveedor',(data)=>{
            this.idProveedor=data
            this.estados.visibilidad_registro_deuda=true
        })

        emitter.on('cerrar_registro_deuda_proveedor',()=>{
            this.estados.visibilidad_registro_deuda=false
            this.obtener_proveedores()
        })

        //editar proveedores

        emitter.on('abrir_editar_proveedor',(data)=>{
            //indicar el id del proveedor a ejecutar operacion
            this.idProveedor=data

            this.estados.visibilidad_editar_proveedores=true
        })

        emitter.on('cerrar_editar_proveedor',()=>{
            this.estados.visibilidad_editar_proveedores=false
        })
        //ventana historial abonos

        emitter.on('abrir_historial_deuda_proveedor',(data)=>{
            //indicar el id del proveedor a ejecutar operacion
            this.idProveedor=data

            this.estados.visibilidad_historial_abono_proveedor=true

        })

        emitter.on('cerrar_historial_abono_proveedor',()=>{
            this.obtener_proveedores()
            this.estados.visibilidad_historial_abono_proveedor=false
        })

        //ventana de busqueda de proveedores

        emitter.on('cerrar_busqueda_proveedores',()=>{
            this.estados.visibilidad_result_busqueda_proveedores=false
        })



        //ventana abono de deuda proveedor
        emitter.on('abrir_abono_deuda_proveedor',(data)=>{
            //indicar el id del proveedor a ejecutar operacion
            this.idProveedor=data

            this.estados.visibilidad_abono_deuda_proveedor=true

        }) 
        emitter.on('cerrar_abonar_deuda_proveedor',()=>{
            this.estados.visibilidad_abono_deuda_proveedor=false
        })

        //obtener el listado de proveedores al inicar la vista 
        this.obtener_proveedores()

        //actualizar luego de operaciones
        emitter.on('actualizar_vista_proveedores',()=>{
                
            this.obtener_proveedores()
            
        })

        //ventana de eliminar proveedor
        emitter.on('abrir_modal_eliminar_proveedor',(data)=>{
            //indicar el id del proveedor a ejecutar operacion
            this.proveedor_operacion=data
            //abrir ventana
            this.estados.visibilidad_eliminar_proveedor=true
        })

        emitter.on('cerrar_eliminar_proveedores',()=>{
            this.estados.visibilidad_eliminar_proveedor=false
        })

        //ventana de carga 
        emitter.on('abrir_loader_carga_vista_proveedor',()=>{
            this.estados.visibilidad_carga_loader_proveedor=true
        })

        emitter.on('cerrar_loader_carga_vista_proveedor',()=>{
            this.estados.visibilidad_carga_loader_proveedor=false
        })

        //ventana formulario crear proveedor
        emitter.on('cerrar_form_registro_proveedor',()=>{
            this.estados.visibilidad_form_registro_proveedor=false
        })
    },
    components:{
        'menu-header': Header,
        'crear-proveedor':BtnCrearProveedor,
        'menu-footer': MenuInferior,
        'card-proveedor':CardProveedor,
        'form-registro-proveedor':FormRegistroProveedor,
        'carga-loader':CargaLoader,
        'eliminar-proveedor':EliminarProveedor,
        'abonar-deuda':AbonarDeudaProveedor,
        'result_busqueda_proveedor':BuscarProveedor,
        'historial-abono-proveedor':HistorialAbonoProveedor,
        'editar-proveedor':EditarProveedor,
        registro_deuda_proveedor
        
    },
   
    data() { 
        return {
            title: "Proveedores",
            DatosProveedores:[],
            idProveedor:'',
            proveedor_operacion:'',
            deudasPorPagar:'',

            termino_busqueda_proveedor:'',
            datosBusquedaProveedor:[],

            estados:{
                visibilidad_form_registro_proveedor:false,
                visibilidad_carga_loader_proveedor:false,
                visibilidad_eliminar_proveedor:false,
                visibilidad_abono_deuda_proveedor:false,
                visibilidad_result_busqueda_proveedores:false,
                visibilidad_historial_abono_proveedor:false,
                visibilidad_editar_proveedores:false,
                visibilidad_registro_deuda:false
            }

        } 
    },
    methods:{
        abrir_form_registro_proveedor(){
            this.estados.visibilidad_form_registro_proveedor=true
        },
        buscar_proveedor(){
            const datoInput = document.getElementById('buscar_proveedor')
            if (datoInput.value == '') {
                toast.warn("ingrese los datos del proveedor a buscar!");

            }
            else{
                this.estados.visibilidad_carga_loader_proveedor=true;
                 // Realizar la solicitud GET a la ruta /buscar-clientes-por-nombre con el nombre como parámetro
                axios.get(`${import.meta.env.VITE_API_SERVER}buscar-proveedor-por-nombre`, {
                    params: {
                        nombre: datoInput.value,
                    }, 
                    })
                    .then((response) => {
                        //designar los clientes encontrados al objetos
                    this.datosBusquedaProveedor = response.data;
                    //pasar el termino de busqueda
                    this.termino_busqueda_proveedor= datoInput.value
                    //abrir ventana de resultado y pasarle los datos
                    this.estados.visibilidad_result_busqueda_proveedores=true

                    //dejar el input vacio para la siguiente busqueda
                    datoInput.value=''
                    })
                    .catch((error) => {
                    toast.error("ocurrio un error al buscar el proveedor!");
                    console.error('Error al buscar proveedor', error);
                    })
                    .finally(() => {
                    // Desactiva el spinner una vez que la solicitud se completa (éxito o error)
                    this.estados.visibilidad_carga_loader_proveedor=false;

                    });
                
                }
            },
        obtener_proveedores(){
            this.estados.visibilidad_carga_loader_proveedor=true

            axios.get(`${import.meta.env.VITE_API_SERVER}obtener-proveedores`)
                .then((response) => {
                    let datosRespuestas = response.data;
                    this.DatosProveedores =datosRespuestas
                    
                })
                .catch((error) => {
                    console.error('Error al obtener la lista de proveedores', error);
                })

                .finally(() => {
                        //renderizar la deuda total por cobrar
                        this.sumarDeuda(this.DatosProveedores)

                      //cerrar la carga luego de crear el cliente
                      emitter.emit('cerrar_loader_carga_vista_proveedor')

                  

                    });
        },
        sumarDeuda(objetoJSON){
            let sumaDeuda = 0;
            objetoJSON.forEach(element => {
                sumaDeuda += element.deuda_a_proveedor
            });
            
            this.deudasPorPagar = sumaDeuda;
        },
        
    }
}  
</script>

<template>
    <section class="w-full h-[100%] bg-[#FEFEE5] pb-[200px]">
        <menu-footer/>

        <carga-loader v-if="estados.visibilidad_carga_loader_proveedor" />

        <abonar-deuda :idProveedor="idProveedor"  v-if="estados.visibilidad_abono_deuda_proveedor"/>

        <historial-abono-proveedor  :idProveedor="idProveedor" v-if="estados.visibilidad_historial_abono_proveedor"/>

        <editar-proveedor  :idProveedor="idProveedor"  v-if="estados.visibilidad_editar_proveedores" />

        <eliminar-proveedor :proveedor_operacion="proveedor_operacion" v-if="estados.visibilidad_eliminar_proveedor"/>

        <result_busqueda_proveedor :termino_busqueda_proveedor="termino_busqueda_proveedor"
        :datosBusquedaProveedor="datosBusquedaProveedor" v-if="estados.visibilidad_result_busqueda_proveedores" />

        <form-registro-proveedor v-show="estados.visibilidad_form_registro_proveedor"/>

        <crear-proveedor @click="abrir_form_registro_proveedor"/>

        <registro_deuda_proveedor :idProveedor="idProveedor" v-if="estados.visibilidad_registro_deuda"/>

        <menu-header :nameSession="title"/>


        <div class=" p-3 w-[95%] ml-[2.5%] h-[80px] rounded shadow-md shadow-[#00000031]  mb-[20px] bg-[#FFB984]">
            <span class="text-[#F9F9F9]">Total por pagar</span>
            <h3 class="text-[1.6rem] text-white font-bold">{{ deudasPorPagar.toLocaleString('en-US', { style: 'decimal', useGrouping: true, maximumFractionDigits: 2 }) }}</h3>
            <img src="" >
        </div>

        <div class="p-3 w-full">
            <input id="buscar_proveedor"  class="w-[100%] h-[60px] rounded outline-0 pl-2  shadow-md shadow-[#0000001f] placeholder:text-[0.8rem]
            placeholder:italic" type="text"   placeholder="Buscar proveedor por nombre..." >
            <img @click="buscar_proveedor" class="w-[40px] -mt-[50px] cursor-pointer border-l-[2px]  border-[#DFDFDF] 
            ml-[80%] absolute" src="../assets/iconos/interfaz/icono_buscador.png" >
        </div>

        <article class="w-full p-2">
            <h2 class="text-[2rem] mt-[10px]  mb-[30px]">Proveedores</h2>
            <div class="w-full pl-[5px] p-2 pb-[200px] inline-block" >

                <div v-if="DatosProveedores.length > 0 ">
                    <div class="inline-block" v-for="proveedor in DatosProveedores" :key="proveedor.id_proveedores">
                        <card-proveedor :proveedor="proveedor"/>
                    </div>
                </div>
                <div v-else>
                    <h3 class="text-[1.4rem] text-center"> no se encontraron proveedores...</h3>
                </div>

             </div>
        </article>
    </section>
    
</template>