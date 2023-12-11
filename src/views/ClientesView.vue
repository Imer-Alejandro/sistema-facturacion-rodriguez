<script>
import Header from "../components/Header.vue";
import MenuInferior from "../components/Menu_inferiro.vue";
import BtnRegistrarClientes from "../components/clientes/btn_crear_cliente.vue";
import CardCliente from "../components/clientes/clientes.vue"
import EliminarCliente from "../components/clientes/eliminar_cliente.vue"
import EditarCliente from "../components/clientes/editar_cliente.vue"
import AbonarDeudaCliente from "../components/clientes/abonar_deuda_cliente.vue"
import FormCrearCliente from '../components/clientes/form_crear_cliente.vue';
import BusquedaCliente from "../components/clientes/buscar_cliente.vue";
import HistorialAbonosCliente from "../components/clientes/historial_abonos_clientes.vue";

import CargaLoader from '../components/carga_loader.vue';

//importar el modulo de eventos globales 
import { emitter } from '@/eventBus'; 
import axios from 'axios';

//libreria de notificacion 
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
 
  


export default { 
    mounted(){
        //evento de tiempo real para actualizar el registro luego de un cambio 
        // actualizacion_registro_cliente
        this.$socket.on('actualizacion_registro_cliente',()=>{
            toast.success("actualizando el registro luego de modificacion!");
            //actualizar el componente 
            this.optener_clientes() 
        })


        //escuchar evento para abirir el modal de carga
        emitter.on('abrir_loader_carga_vista_cliente',()=>{
            this.estado_activacion_loader_Carga=true;
        })

        emitter.on('cerrar_loader_carga_vista_cliente',()=>{
            this.estado_activacion_loader_Carga=false;
        })

        //busqueda cliente
        emitter.on('cerrar_modal_busqueda_cliente',()=>{
            this.estado_visibilidad_buscar_cliente=false
        })

        //actualizar el registro de cliente luego de crear uno 
        emitter.on('actualizar_objetos_cliente_vista_cliente',()=>{
            this.estado_activacion_loader_Carga=true;

            axios.get('https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/obtener-clientes')
            .then((response) => {
                let result_data =response.data
                this.dataCliente =result_data ;
            })
            .catch((error) => {
                console.error('Error al obtener la lista de clientes', error);
            })
            .finally(() => {
                //actualizar el contador total de deudas pendientes
                this.sumarDeuda(this.dataCliente)
                // Desactiva el spinner una vez que la solicitud se completa (éxito o error)
                 this.estado_activacion_loader_Carga=false;
            });
        })

        // Realizar una solicitud GET al servidor para obtener la lista de clientes
        
        this.optener_clientes() 

        

        //ventana registrar cliente

        emitter.on('cerrar_modal_registrar_cliente',()=>{
            this.estado_visibilidad_registrar_cliente=false
        })

        //ventana para registrar abono de deuda cliente
        emitter.on('abrir_modal_abono_deuda_cliente',(data)=>{
            this.id_cliente_operacione=data
            this.estado_visibilidad_abono_deuda_cliente=true
        })
        emitter.on('cerrar_modal_abono_deuda_cliente',()=>{
            this.estado_visibilidad_abono_deuda_cliente=false
        })

       //ventana para editar cliente

       emitter.on('abrir_modal_editar_cliente',(data)=>{
        this.id_cliente_operacione=data
        this.estado_visibilidad_editar_cliente=true
        
       })

       emitter.on('cerrar_modal_editar_cliente',()=>{
            this.estado_visibilidad_editar_cliente=false
       })
       
        //ventana para eliminar cliente

        emitter.on('abrir_modal_eliminar_cliente',(data)=>{
            this.id_cliente_operacione=data
            this.estado_visisbilidad_eliminar_cliente=true
        })
        
        emitter.on('cerrar_eliminar_cliente',()=>{
            this.estado_visisbilidad_eliminar_cliente=false
        })

        //ventana del historial de abonos de deudas
        emitter.on('abrir_modal_historial_deuda_cliente',(data)=>{
            this.id_cliente_operacione=data
            this.estado_visibilidad_historial_abonos=true
        })

        emitter.on('cerrar_historial_abono_cliente',()=>{
            this.estado_visibilidad_historial_abonos=false
        })
    },
    components:{
        'menu-header': Header,
        'menu-footer': MenuInferior,
        'btn-registrar-clients':BtnRegistrarClientes,
        'card-cliente':CardCliente,
        'eliminar-cliente':EliminarCliente,
        'editar-cliente':EditarCliente,
        'abonar-deuda-cliente':AbonarDeudaCliente,
        'form-crear-cliente':FormCrearCliente,
        'buscar-cliente':BusquedaCliente,
        'carga-loader':CargaLoader,
        'historial-abonos':HistorialAbonosCliente

        
        
    },
    data() {
        return {
            title: "Clientes",
            estado_visisbilidad_eliminar_cliente:false,
            estado_visibilidad_editar_cliente:false,
            estado_visibilidad_abono_deuda_cliente:false,
            estado_visibilidad_registrar_cliente:false,
            estado_visibilidad_buscar_cliente:false,
            estado_visibilidad_historial_abonos:false,

            estado_activacion_loader_Carga:false,

            //datos del servidor
            dataCliente:[],

            //deuda por cobrar
            deudasPorCobrar:0,

            //datos para buscar un cliente
            datosBusquedaCliente:[],
            termino_busqueda_cliente:'',
            id_cliente_operacione:0,
        }
    },
    methods:{
        abrir_modal_registro_cliente(){
            this.estado_visibilidad_registrar_cliente=true
        },
        buscar_cliente(){
            const datoInput = document.getElementById('buscar_clientes')
            if (datoInput.value == '') {
                alert('ingrese los datos del cliente a buscar')
            }
            else{
                this.estado_activacion_loader_Carga=true;
                 // Realizar la solicitud GET a la ruta /buscar-clientes-por-nombre con el nombre como parámetro
                axios.get('https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/buscar-clientes-por-nombre', {
                    params: {
                        nombre: datoInput.value,
                    },
                    })
                    .then((response) => {
                        //designar los clientes encontrados al objetos
                    this.datosBusquedaCliente  = response.data;
                    //pasar el termino de busqueda
                    this.termino_busqueda_cliente= datoInput.value
                    //abrir ventana de resultado y pasarle los datos
                    this.estado_visibilidad_buscar_cliente=true

                    //dejar el input vacio para la siguiente busqueda
                    datoInput.value=''
                    })
                    .catch((error) => {
                    alert('ocurrio un error al buscar el cliente vuelva a intentarlo')
                    console.error('Error al buscar clientes', error);
                    })
                    .finally(() => {
                    // Desactiva el spinner una vez que la solicitud se completa (éxito o error)
                    this.estado_activacion_loader_Carga=false;

                    });
                
            }
           
        },
            optener_clientes() {
                this.estado_activacion_loader_Carga=true;

                axios.get('https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/obtener-clientes')
                .then((response) => {
                    let datosRespuestas = response.data;
                    this.dataCliente =datosRespuestas
                })
                .catch((error) => {
                    console.error('Error al obtener la lista de clientes', error);
                })

                .finally(() => {
                    // Desactiva el spinner una vez que la solicitud se completa (éxito o error)
                    this.estado_activacion_loader_Carga=false;

                    //renderizar la deuda total por cobrar
                    this.sumarDeuda(this.dataCliente)

                    });
            },
         sumarDeuda(objetoJSON) {
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
                }
 
    }

}
</script>
 
<template>
    <transition name="fade">
        <section class="w-full h-[100%] mb-[200px] bg-[#FEFEE5]">
        <menu-footer/>

        <carga-loader :id_cliente_operacione="id_cliente_operacione" v-if="estado_activacion_loader_Carga"/>

        <historial-abonos :id_cliente_operacione="id_cliente_operacione" v-if="estado_visibilidad_historial_abonos"/>

        <buscar-cliente :termino_busqueda_cliente="termino_busqueda_cliente" :datosBusquedaCliente="datosBusquedaCliente"  v-show="estado_visibilidad_buscar_cliente"/>

        <form-crear-cliente v-show="estado_visibilidad_registrar_cliente"/>

        <abonar-deuda-cliente  :id_cliente_operacione="id_cliente_operacione"  v-if="estado_visibilidad_abono_deuda_cliente"/>

        <editar-cliente  :id_cliente_operacione="id_cliente_operacione" v-if="estado_visibilidad_editar_cliente"/>

        <eliminar-cliente :id_cliente_operacione="id_cliente_operacione" v-show="estado_visisbilidad_eliminar_cliente" />

        <btn-registrar-clients @click="abrir_modal_registro_cliente"/>

        <menu-header :nameSession="title"/>
       

        <div class=" p-3 w-[95%] ml-[2.5%] h-[80px] rounded shadow-md shadow-[#00000031] mb-[20px] bg-[#FF7850]">
            <span class="text-[#F9F9F9]">Total por cobrar</span>
            <h3 class="text-[1.6rem] text-white font-bold">{{deudasPorCobrar}}</h3>
            <img src="" >
        </div>

        <div class="p-3 w-full">
            <input id="buscar_clientes"  class="w-[100%] h-[60px] rounded outline-0 pl-2  shadow-md shadow-[#0000001f] placeholder:text-[0.8rem]
            placeholder:italic" type="text"   placeholder="Buscar cliente por nombre..." >
            <img @click="buscar_cliente" class="w-[40px] -mt-[50px] cursor-pointer border-l-[2px]  border-[#DFDFDF] 
            ml-[80%] absolute" src="../assets/iconos/interfaz/icono_buscador.png" >
        </div>

        <article class="w-full p-2">
            <h2 class="text-[2rem] mt-[10px]  mb-[30px]">Clientes</h2>
            <div class="w-full pl-[5px] p-2 pb-[200px]   inline-block">

                <div class="inline-block" v-for="cliente in  dataCliente" :key="cliente.id_cliente">
                    <card-cliente :cliente="cliente" />
                </div>
               

            </div>
        </article>
    </section>
    </transition>
    
    
</template>