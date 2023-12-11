<script>
import ProductoCarritoVenta from "./producto_carrito_venta.vue";
import ComentarioVenta from "./agregar_comentario_venta.vue"
import AgregarCliente from './agregar_cliente.vue';
import EliminarProductoCarrito from './eliminar_prod_carrito_modal.vue';
import EditarCantidadProducto from './editar_catidad_prod_carrito.vue'

import LoaderCarga from '../carga_loader.vue'

import ConfirmacionVenta from './registrar_venta.vue'
//modulo de bus de eventos globales 

import { emitter } from '@/eventBus';

//importamos el carrito global
import { useGlobalCarritoVenta } from '/src/stores/carrito';
const carritoStore = useGlobalCarritoVenta();

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import axios from 'axios';


export default {
    mounted(){

        //ventana de carga 
        emitter.on('abrir_carga_loader_ventas',()=>{
            this.visibilidad_carga_loader=true
        })

        emitter.on('cerrar_carga_loader_ventas',()=>{
            this.visibilidad_carga_loader=false
        })
        //ventana confirmar venta
        emitter.on('cerrar_confirmacion_venta',()=>{
            
            this.visibilidad_confirmacion_venta=false

            emitter.emit('cerrar_carrito_ventas')

        })

        //ventana editar la cantidad del producto del carrito
        emitter.on('abrir_actualizar_cantidad_producto',(data)=>{
            //pasar el id y la cantidad actual del producto
            this.DatosEditarCantidad=data

            this.visibilidad_editar_cantidad_producto=true
        })

        emitter.on('cerrar_editar_cantidad_producto_carrito',()=>{
            this.visibilidad_editar_cantidad_producto=false
        })
        //actualizacion del carrito luego de operacion
        emitter.on('actualizar_listado_producto_venta',()=>{
            //actualizar carrito 
            this.datosProducto=carritoStore.carrito_compras.detalles_productos
            //actualizar total vent
            this.datosCarrito=carritoStore.carrito_compras

        })

        //cerrar el modal de agregar comentario 
        emitter.on('cerrar_comentario_venta',()=>{
            this.visibilidad_modal_comentario_Venta=false
        })

        // ventana indicar cliente
        emitter.on('cerrar_modal_asignar_cliente',()=>{
            this.cliente=carritoStore.carrito_compras.nombre_cliente
            this.visibilidad_modal_asignar_cliente=false
        })
 
        //abrir modal eliminar producto del carrito
        emitter.on('abrir_modal_eliminar_prod_carrito',(data)=>{
            this.idProductoOperacion= data;
            this.visibilidad_modal_eliminar_producto=true
        })

        emitter.on('cerrar_modal_eliminar_producto_carrito',()=>{
            this.visibilidad_modal_eliminar_producto=false
        })
    },
    data(){
        return{



            metodoPago:'',
            
            DatosEditarCantidad:'',

            idProductoOperacion:'',

            cliente:'ninguno...',

            datosCarrito:carritoStore.carrito_compras,
            datosProducto:carritoStore.carrito_compras.detalles_productos,

            visibilidad_modal_comentario_Venta:false,
            visibilidad_modal_asignar_cliente:false,
            visibilidad_modal_eliminar_producto:false,
            visibilidad_editar_cantidad_producto:false,
            visibilidad_confirmacion_venta:false,
            visibilidad_carga_loader:false,



        }
    },
    components:{
            'producto-carrito':ProductoCarritoVenta,
            'comentarios-venta':ComentarioVenta,
            'agregar-clientes':AgregarCliente,
            'eliminar-producto-carrito':EliminarProductoCarrito,
            'editar-cantidad-producto':EditarCantidadProducto,
            'confirmar_venta':ConfirmacionVenta,
            'carga-loader':LoaderCarga


        },
    methods:{
        cerrar_carrito_ventas(){
            emitter.emit('cerrar_carrito_ventas')
        },
        abrir_modal_comentario_venta(){
            this.visibilidad_modal_comentario_Venta=true
        },
        abrir_modal_asignar_cliente(){
            this.visibilidad_modal_asignar_cliente=true
        },
        registrar_venta(){

            //indicar el metodo de pago
            this.metodoPago=document.getElementById('tipo_venta').value

            if (carritoStore.carrito_compras.detalles_productos.length == 0) {
                toast.warn("agrege productos para finalizar la venta!");   
            }
            else if (this.metodoPago === 'credito' && carritoStore.carrito_compras.nombre_cliente == '') {
                toast.warn("para ventas a credito debe indicar un cliente!");           
            }
            else{
                this.visibilidad_carga_loader=true
                //asignar datos al objeto del registro de la venta
                carritoStore.carrito_compras.fecha_compra=this.convertir_formato_hora_actual()
                carritoStore.carrito_compras.tipo_venta=this.metodoPago
                
                //convertir el array del listado de producto a texto
                //asignar el array convertido como el nuevo valor del listado de producto

                axios.post('https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/registro-ventas',carritoStore.carrito_compras)
                    .then((response)=>{
                        console.log(response.data) 


                        //abirir ventana de finalizar proceso de ventas
                        this.visibilidad_confirmacion_venta=true
                        //limpiar el carrito para una nueva venta
                        carritoStore.carrito_compras.fecha_compra='',
                        carritoStore.carrito_compras.tipo_venta='',
                        carritoStore.carrito_compras.comentario='',
                        carritoStore.carrito_compras.nombre_cliente='',
                        carritoStore.carrito_compras.id_cliente='',
                        carritoStore.carrito_compras.total_venta=0,
                        carritoStore.carrito_compras.detalles_productos=[]
                        carritoStore.carrito_compras.antigua_deuda_cliente=''

                        this.cliente='ninguno...'

                        emitter.emit('incrementar_contador_carrito')


                    })
                    .catch((err)=>{
                        console.log(err)
                        toast.error("ocurrio un error al registrar la venta!");           
                    })
                    .finally(()=>{
                        this.visibilidad_carga_loader=false
                    })

                //enviar datos de venta al servidor y activar la confirmacion de la venta
            }
        },
        convertir_formato_hora_actual(){
                const fechaHoraActual = new Date();

                const meses = [
                'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
                'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
                ];

                const mes = meses[fechaHoraActual.getMonth()];
                const día = fechaHoraActual.getDate();
                const año = fechaHoraActual.getFullYear();
                const hora = fechaHoraActual.getHours();
                const minutos = fechaHoraActual.getMinutes();
                const amPm = hora >= 12 ? 'pm' : 'am';
                const hora12 = hora % 12 || 12; // Convertir a formato de 12 horas

                const fechaFormateada = `${mes} ${día} ${año} - ${hora12}:${minutos} ${amPm}`;

                return fechaFormateada
            } 
        
    }
}
</script>

 
<template>
    <section class="  w-full h-[100vh] bg-white fixed  z-40 ">
        <!-- modal -->
        <confirmar_venta v-if="visibilidad_confirmacion_venta" />

        <carga-loader v-show="visibilidad_carga_loader"/>

        <eliminar-producto-carrito :idProductoOperacion="idProductoOperacion" v-show="visibilidad_modal_eliminar_producto"/>
        <agregar-clientes v-if="visibilidad_modal_asignar_cliente" />
        <comentarios-venta v-show="visibilidad_modal_comentario_Venta"/>
        <editar-cantidad-producto :DatosEditarCantidad="DatosEditarCantidad" v-if="visibilidad_editar_cantidad_producto"/>

        <header class="w-full p-3 inline-flex border-b-[1.5px] border-b-[#DFDFDF]">
            <img @click="cerrar_carrito_ventas"   class="w-[35px] mr-[25px]  order-1 cursor-pointer" src="/src/assets/iconos/interfaz/regresar.png" >
            <h2 class="text-[1.7rem] ml-[30px] order-2">Carrito de ventas</h2>
        </header>

        <div class="w-full flex mb-[10px] mt-[10px] p-2">
        <select id="tipo_venta" class="order-1 w-[45%]  mr-[5%] rounded h-[40px] outline-none border-2 pl-2 bg-transparent" name="" >
            <option value="efectivo">efectivo</option>
            <option value="tarjeta">tarjeta</option>
            <option value="transferencia">transferencia</option>
            <option value="credito">credito</option>
        </select>

        <button @click="abrir_modal_asignar_cliente" class="order-2 w-[46%] rounded h-[40px] outline-none text-white  bg-[#FFB984] ">
            <span class="text-[1.2rem] -ml-[20px]">añadir cliente</span>
            <img class="w-[30px] ml-[35%] -mt-[30px] h-[30px] absolute" src="/src/assets/iconos/interfaz/agregar.png" alt="" srcset="">
        </button>
    </div>
    <h3 class="pl-2 text-[1.3rem] mb-[10px]">Cliente: <span class="text-[#E55226] ml-[40%]">{{cliente}}</span></h3>


    <hr>
        <div class="w-full h-[60px] flex p-2">
            <h3 class="order-1 text-[1.3rem]">Total venta:</h3>
            <h3 class="order-2 text-[1.3rem] text-[#E55226] ml-[50%]">{{datosCarrito.total_venta}}</h3>
        </div>

        <div class="p-2 bg-[#F8FBFF]">
            <h3 class="text-[1.3rem] mb-[10px] ">Productos</h3>

           <div class="w-full pb-2 pt-[20px] h-[300px] overflow-y-scroll overflow-hidden">

            <div v-if="datosProducto.length > 0">
                <div v-for="productos in datosProducto" :key="productos.id_producto">
                    <producto-carrito :productos="productos"/>
                </div>
            </div>
            <div v-else>
                <h3 class="text-[1rem] text-center"> no se indico ningun producto para la venta...</h3>
            </div>

           </div>            
       
        </div>

        <div class="w-full mt-[20px] h-[50px] shadow-md border-t-[1.5px] border-t-[#0000001f] shadow-[#0000001f]">
            <button @click="abrir_modal_comentario_venta" class="w-full h-full outline-none">
                <img class="absolute w-[25px] ml-[80px]  h-[25px]" src="/src/assets/iconos/interfaz/mas.png" alt="">
                <h3>Agregar un comentario</h3>
            </button>
        </div>

        <div class="w-full p-2 mt-[20px]">
            <button @click="registrar_venta" class="w-full rounted h-[70px]  text-[1.5rem] bg-[#FFB984] text-white ">
            Registrar venta 
            </button>
        </div>
      
        
    </section>
</template>