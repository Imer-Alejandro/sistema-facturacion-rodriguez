<script>
import ClienteVenta from './card_cliente_venta.vue';
import RegistrarCliente from './crear_cliente_desde_venta.vue'
//modulo de bus de eventos globales
import { emitter } from '@/eventBus';

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


//importamos el carrito global
import { useGlobalCarritoVenta } from '/src/stores/carrito';
const carritoStore = useGlobalCarritoVenta();


import axios from 'axios';

export default {

    mounted(){
        //eventos de vista crear clientes
        emitter.on('cerrar_modal_registrar_cliente_ventas',()=>{
            this.visibilidad_crear_clientes=false
            //actualizar listado
            this.buscar_cliente()
        })

        //cargar datos del listado
        this.buscar_cliente()

        emitter.on('cliente_asignado_venta',(data)=>{
            this.DatosClienteAsignado=data
        })
    },

    data(){
        return{
            DatosCliente:[],
            DatosClienteAsignado:'',
            DatosBusqueda:'',
            visibilidad_crear_clientes:false,
            DatosVaciosRemoverCliente:{
                id_cliente:'',
                nombre:'ninguno...',
                deuda:''
            }
        }
    },

    components:{
        'ClienteVenta':ClienteVenta,
        'crearCliente':RegistrarCliente
    },
    methods:{
        cerrar_asignar_cliente(){
            emitter.emit('cerrar_modal_asignar_cliente')
        },
        buscar_cliente(){
            emitter.emit('abrir_carga_loader_ventas')

            axios.get(`${import.meta.env.VITE_API_SERVER}obtener-clientes`)
                .then((response)=>{
                    this.DatosCliente=response.data
                })
                .catch((err)=>{
                    console.log(err)
                    toast.error("ocurrio un error buscar los clientes!");           
                })
                .finally(()=>{
                    emitter.emit('cerrar_carga_loader_ventas');
                })
        },
        registrar_cliente_venta(){
            if (this.DatosClienteAsignado =='') {
                toast.warn("primero debe indicar un clientes!");              
            }
            else{
                carritoStore.asignar_cliente(this.DatosClienteAsignado.id_cliente,this.DatosClienteAsignado.nombre,
                                            this.DatosClienteAsignado.deuda)

                toast.success("se asigno un clientes a la venta!"); 

                emitter.emit('cerrar_modal_asignar_cliente')

                console.log(carritoStore.carrito_compras)
                
            }
              
        },
        abrir_registro_cliente(){
            this.visibilidad_crear_clientes=true
        },

        eliminar_cliente_registro(){
            carritoStore.asignar_cliente(this.DatosVaciosRemoverCliente.id_cliente,this.DatosVaciosRemoverCliente.nombre,this.DatosVaciosRemoverCliente.deuda)
            
            emitter.emit('cliente_removido_venta')
            this.cerrar_asignar_cliente()
        }
      
    }
} 
</script>

<template>
    <div>
        <crearCliente :DatosCliente="DatosCliente" v-if="visibilidad_crear_clientes"/>

        <section  class="  w-full h-[100vh] bg-[#444d639c] fixed  z-40 ">
        <div class="w-full  h-[510px] bg-white mt-[70%] ">
            <header class="w-full p-3 inline-flex border-b-[1.5px] border-b-[#DFDFDF]">
                <img @click="cerrar_asignar_cliente"  class="w-[35px] mr-[25px]  order-1 cursor-pointer" src="/src/assets/iconos/interfaz/regresar.png" >
                <h2 class="text-[1.7rem] ml-[30px] order-2">Agregar cliente</h2>
            </header>

        <div class="flex flex-row">
            <h3 class="text-[1.3rem] mb-[10px] pl-2 order-1">Clientes</h3>
            <button @click="abrir_registro_cliente" class="ml-[50%] mt-[3px] order-2 bg-[#A6F988] rounded w-[70px] h-[35px] flex justify-center text-center items-center">
                <img class="w-[30px] h-[30px]" src="/src/assets/iconos/interfaz/agregar.png" alt="">
            </button>
        </div> 

        <div class="w-full mt-[10px] h-[280px]  p-2 pb-[20px]   overflow-y-scroll  overflow-hidden">
            <div class="h-[175px] p-2   inline-flex  pr-[20px]  ">
                
                <div v-if="DatosCliente.length > 0">
                    <!-- primera card para eliminat clientes -->
                <div class=" inline-flex  w-[150px] mb-[20px] mr-[20px] shadow-md shadow-[#0000001f]">
                   <button @click="eliminar_cliente_registro" class="outline-none w-full p-2 focus:border-[#2CF95C] focus:border-2 flex-col  
                    h-full flex text-center justify-center items-center">
                        <img class="w-[70px] mb-[5px] h-[70px]" src="/src/assets/iconos/interfaz/prohibido.png" alt="">
                        <h3 class="text-[0.7rem]">Eliminar cliente </h3>
                   </button> 
                </div>
                    <div class="inline-flex" v-for="clientes in DatosCliente" :key="clientes.id_cliente">
                        <ClienteVenta  :clientes="clientes"/>
                    </div>
                </div>
                <div v-else>
                    <h3 class="text-[1rem] text-center"> no se encontro ningun cliente...</h3>
                </div>
            </div>
        </div>
            
        </div>      
    </section>
    </div>

</template>