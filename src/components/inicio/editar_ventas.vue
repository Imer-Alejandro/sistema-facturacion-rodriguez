<script>
import agregarProductoEditarVentas from "../ventas/agregar_producto_editar_ventas.vue"
import EliminarProductoDeVenta from './eliminar_producto_venta.vue'

//modulo de bus de eventos globales
import { emitter } from '@/eventBus';

import axios from 'axios';

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


export default {
    props:['ventaOperacion'],
    components:{
        'agregar-producto': agregarProductoEditarVentas,
        'eliminar-producto': EliminarProductoDeVenta
    },

    mounted(){
            //evento para actualizar al eliminar productos en la venta
            emitter.on('actualizar_listado_producto_registro_venta',(listado)=>{
                //actualizar el listando de venta
                this.ventaOperacion.detalles_producto =listado

                //notificar la accion 
                toast.success('se elimino un producto del registro de la venta!')
            })
                //agregar el producto eliminado al registro 

            emitter.on('asignar_producto_eliminado_registro_venta',(data)=>{
                    this.registroEditado.productos_eliminado.push(data)
                })

            //ventana eliminar producto del registro
            emitter.on('cerrar_eliminar_producto_registro_venta',()=>{
                this.visibilidad_eliminar_producto_venta=false
            })

            //ventana agregar producto venta 
            emitter.on('cerrar_agregar_producto_registro_venta',()=>{
                this.visibilidad_agregar_productos_a_venta=false
            })
    },
    
    methods:{
        //cerrar la ventana principal de editar venta
        close_editar_ventas() {
            emitter.emit('cerrar_editar_venta')
        },

        obtener_cliente(){
            emitter.emit('abrir_loader_carga_incio')

            axios.get(`${import.meta.env.VITE_API_SERVER}obtener-clientes`)
                .then((response) => {
                    let datosRespuestas = response.data;
                    this.dataCliente =datosRespuestas
                })
                .catch((error) => {
                    console.error('Error al obtener la lista de clientes', error);
                })

                .finally(() => {
                    // Desactiva el spinner una vez que la solicitud se completa (éxito o error)
                   
                emitter.emit('cerrar_loader_carga_incio')

                });
        },


        open_eliminar_producto_de_venta(data){
            this.idProductoOperacion=data
            this.visibilidad_eliminar_producto_venta=true
        },
        abrir_agregar_producto(){
            this.visibilidad_agregar_productos_a_venta=true
        },
        //funcion para cerrar el la ventana modal de agregar productos al registro de venta
        close_modal_agregar_producto(newData){
            this.data=newData
        },

    },
    data(){
        return{

            dataCliente:'',

            idProductoOperacion:'',

            visibilidad_eliminar_producto_venta:false,


            visibilidad_agregar_productos_a_venta:false,


            registroEditado:{
                fecha:'',
                id_venta:'',
                comentario:'',
                tipo_venta_editado:'',
                tipo_venta_original:'',
                nombre_cliente:'',
                id_cliente:'',
                total_venta:'',
                detalles_producto:[],
                productos_editados:[],
                productos_eliminado:[]

            }
        }
    },
}
</script>

<template>

    <section  class="   w-full h-[100vh] bg-white fixed -mt-[80px] z-40 ">

       <eliminar-producto :idProductoOperacion="idProductoOperacion" :dataListaProducto="this.ventaOperacion.detalles_producto"  v-if="visibilidad_eliminar_producto_venta"/>

        <!-- este es el componente de agregar mas producto al registro de la venta -->
        <agregar-producto  v-if="visibilidad_agregar_productos_a_venta" />


        <header class="w-full p-3 inline-flex border-b-[1.5px] border-b-[#DFDFDF]">
            <img @click="close_editar_ventas" class="w-[35px] mr-[25px]  order-1 cursor-pointer" src="/src/assets/iconos/interfaz/regresar.png" >
            <h2 class="text-[1.7rem] ml-[15%] order-2">Editar venta</h2>
        </header>
        <form class="w-full p-3 mt-[5px]" action="">

            <label for="">
                <span class="text-[#9F9F9F] ml-[10px]">Fecha de la venta: {{ ventaOperacion.fecha }}</span>
                <input class="w-[95%] focus:border-[#FFB984] focus:border-[1.5px] h-[45px] border-[1px] outline-none pl-[5px] 
                    box-border rounded-md mb-[15px] border-[#9F9F9F] bg-transparent ml-[2.5%]" type="datetime-local" >
            </label>

           

            <label for="">
                <span class="text-[#9F9F9F] ml-[10px]">Tipo de venta</span>
                <select v-model="ventaOperacion.tipo_venta" class="w-[95%] focus:border-[#FFB984] focus:border-[1.5px] h-[40px] border-[1px] bg-transparent outline-none pl-[5px] 
                        box-border rounded-md mb-[15px] border-[#9F9F9F]  ml-[2.5%]" name="" id="">
                            <option value="efectivo">efectivo</option>
                            <option value="tarjeta">tarjeta</option>
                            <option value="transferencia">transferencia</option>
                            <option value="credito">credito</option>
                </select>
            </label>
            
            <label for="">
                <span class="text-[#9F9F9F] ml-[10px]">Comentario de venta</span>
                <input v-model="ventaOperacion.comentario" class="w-[95%] focus:border-[#FFB984] focus:border-[1.5px] h-[50px] border-[1px] outline-none pl-[5px] 
                    box-border rounded-md mb-[15px] border-[#9F9F9F] bg-transparent ml-[2.5%]" type="text" >
            </label>
        
        </form>
        <div class="p-1 w-full h-[350px]  overflow-hidden ">
           <header class=" p-2 flex pb-2">
                <h3 class="order-1 text-[1.2rem]">Detalle de productos</h3>
                <button @click="abrir_agregar_producto" class="order-2 p-1 -mt-[5px] ml-[35%] w-[50px]  rounded h-[40px] bg-[#A6F988]">
                    <img  class="w-[30px] h-[30px] ml-[15%]" src="/src/assets/iconos/interfaz/agregar.png" alt="" srcset="">
                </button>
           </header>

           <div class="w-full h-full overflow-scroll pb-[20px]">
            <table class=" styled-table  "> 
                <thead> 
                    <tr> 
                        <th>Eliminar</th>
                        <th>Iconos</th> 
                        <th>Nombre</th> 
                        <th>Precio</th> 
                        <th>Cantidad</th> 
                        <th>Total</th> 
                    </tr> 
                </thead> 
                <tbody> 


                    <!-- optener el objeto del registro de los productos vendidos mediante el id de la venta
                    para renderizarlo mediante el v-for siguiendo este patron de contenedor, esto al 
                    cargar la vista del componente -->
                    <tr v-for="producto in JSON.parse(ventaOperacion.detalles_producto)" :key="producto.id_producto"> 
                        <td>
                            <!-- debe pasar el id del producto registrado en la venta para poder eliminarlo del 
                            registro, este id se indicara al iteral cada producto  -->
                            <button @click="open_eliminar_producto_de_venta(producto.id_producto)" class="w-[50px] order-1 mt-[5px] h-[50px] rounded shadow-md shadow-[#0000001f] p-2">
                                <img class="w-[35px]  ml-[3px] h-[35px]" src="/src/assets/iconos/interfaz/eliminar.png" alt="" srcset="">
                            </button>
                        </td> 
                        <td>
                            <img :src="producto.icono" alt="" srcset="">
                        </td> 

                        <td class="w-[400px]">
                            {{producto.nombre_producto}}
                        </td> 

                        <td>
                            {{ producto.precio_venta }}
                            <span v-if="producto.vender_por == 'libras'">/lb</span>
                            <span v-else>/und</span>
                        </td> 

                        <td class="">
                            <input :value="producto.cantidad_venta"  disabled class=" text-center  h-[40px] box-border pl-3 w-[80px] outline-none border-2 rounded bg-transparent" type="number" >
                        </td> 
                        <td >
                            {{  producto.precio_venta * producto.cantidad_venta }}
                        </td>
                    </tr> 


                </tbody>
            </table>

           </div>
        </div>

        <!-- luego de editar cada campo y de actualizar las cantidades de los productos 
        re envia a la API los nuevos datos del registro de ventas, en caso de eliminar un producto
        del registro de ventas se debe incrementar la cantidad bendida a su existencia en inventario
        y eliminar del registro, en caso de agregar un producto al registro de la venta, se debe restar
        la existencia en la cantidad indicadad en la venta y sumar la multiplicacion del precio por la cantidad
        a la venta total -->
        <div class="w-full p-2">
            <button  class="w-full h-[60px] mt-[5px] text-[1.5rem] bg-[#FFB984] text-white ">Guardar </button>
        </div>
    </section>
</template> 


<style scoped>
.styled-table{
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 1.1em;
    font-family: sans-serif;
    min-width: 450px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);    
}
.styled-table thead tr{
    background-color: #6a92ff; 
    color: #ffffff; 
    text-align: middle;
}

.styled-table th, .styled-table td {
    padding: 12px 15px;
}

.styled-table tbody tr{
    border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr:nth-of-type(even){
    background-color: #f3f3f3;
}

.styled-table tbody tr:last-of-type {
    border-bottom: 2px solid #009879; 
}

</style>