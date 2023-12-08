<script>
import ClienteVenta from './card_cliente_venta.vue';
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

        this.buscar_cliente()

        emitter.on('cliente_asignado_venta',(data)=>{
            this.DatosClienteAsignado=data
        })
    },

    data(){
        return{
            DatosCliente:[],
            DatosClienteAsignado:'',
            DatosBusqueda:''
        }
    },

    components:{
        'ClienteVenta':ClienteVenta,
    },
    methods:{
        cerrar_asignar_cliente(){
            emitter.emit('cerrar_modal_asignar_cliente')
        },
        buscar_cliente(){
            emitter.emit('abrir_carga_loader_ventas')

            axios.get('https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/obtener-clientes')
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
      
    }
}
</script>

<template>
     <section  class="  w-full h-[100vh] bg-[#444d639c] fixed  z-40 ">
        <div class="w-full  h-[510px] bg-white mt-[70%] ">
            <header class="w-full p-3 inline-flex border-b-[1.5px] border-b-[#DFDFDF]">
                <img @click="cerrar_asignar_cliente"  class="w-[35px] mr-[25px]  order-1 cursor-pointer" src="/src/assets/iconos/interfaz/regresar.png" >
                <h2 class="text-[1.7rem] ml-[30px] order-2">Agregar cliente</h2>
            </header>

        
        <h3 class="text-[1.3rem] mb-[10px] pl-2 ">Clientes</h3>

        <div class="w-full mt-[10px] h-[200px] p-2 pb-[20px]   overflow-y-scroll  overflow-hidden">
            <div class="h-[175px] p-2   inline-flex  pr-[20px]  ">

                <div v-if="DatosCliente.length >0">
                    <div class="inline-flex" v-for="clientes in DatosCliente" :key="clientes.id_cliente">
                        <ClienteVenta  :clientes="clientes"/>
                    </div>
                </div>
                <div v-else>
                    <h3 class="text-[1rem] text-center"> no se encontro ningun cliente...</h3>
                </div>
            </div>
        </div>
            <div class="p-3">
                <button @click="registrar_cliente_venta" class="w-[90%] ml-[5%] mt-[10px] text-[1.2rem] h-[60px] rounded text-white bg-[#FFB984]">Asignar cliente</button>
            </div>
        </div>      
    </section>
</template>