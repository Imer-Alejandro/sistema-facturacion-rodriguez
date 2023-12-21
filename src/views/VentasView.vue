<script>
import CategoriaProductos from '../components/ventas/categoria_productos_venta.vue';
import productoVenta from '../components/ventas/producto_ventas.vue';
import FormAsignarCantidad from '../components/ventas/asignar_cantidad.vue';
import BtnCarritoCompra from '../components/ventas/btn_componente_carrito_compra.vue';
import CarritoCompra from "../components/ventas/carrito_compra.vue";
import CerrarVenta from '../components/ventas/cerrar_venta.vue'
import ResultadoBusquedaProductos from '../components/ventas/rsult_busqueda_producto_venta.vue'

import LoaderCarga from '../components/carga_loader.vue'

import axios from 'axios';

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

//importamos el carrito global
import { useGlobalCarritoVenta } from '../stores/carrito';
const carritoStore = useGlobalCarritoVenta();



//modulo de bus de eventos globales
import { emitter } from '@/eventBus';

export default {
    mounted(){

        //buscar productos
        this.cargar_productos()

        emitter.on('actualizar_ventas',()=>{
            this.cargar_productos()

        })

        /*
          evento emitido en el objeto carrito para indicar que no se puede registrar la cantidad
          por que supera la cantidad disponible del producto
        */
       emitter.on('alerta_de_cantidad_supera_existencia',()=>{
            toast.warn("no se puede agregar mas cantidad de las disponibles del producto!");
       })

       /*evento para notificar si se registro o no el producto y actualizar 
       la card del producto con la cantidad descontada*/
       emitter.on('evento_registro_nuevo_producto',(id,cantidad)=>{
            toast.success("nuevo producto agregado a la venta!");
            //actualizar el listado
            this.actualizar_listado_productos(id,cantidad)
            this.DatosProductos=carritoStore.listadoLocarDeProductos

       })

        //recibir el nuevo producto para la venta
        emitter.on('nuevo_producto_al_carrito',()=>{
            //asignar el nuevo producto al listado 

            /*descontar la cantidad existente de ese producto de forma local 
              hasta confimar la venta, luego si se eliminara la cantidad
            */
        //    this.modificar_listado_producto(producto.id)

           //actualizar el contador del carrito
           emitter.emit('incrementar_contador_carrito')

        })

        //cambiar los productos por categoria 
        emitter.on('categoria_ventas',(data)=>{
            this.DatosProductos=data
        })

        //ventanas de carga 
        emitter.on('abrir_ventana_carga_ventas',()=>{
            this.visibilidad_ventana_carga_venta=true

        })

        emitter.on('cerrar_ventana_carga_ventas',()=>{
            this.visibilidad_ventana_carga_venta=false
        })

        //ventana de busqueda 
        emitter.on('cerrar_busqueda_producto_venta',()=>{
            this.visibilidad_result_busqueda_producto=false
            this.dato_busqueda=''
        })
 
        //ventana para confirmar salir del carrito
        emitter.on('cerrar_modal_cierre_venta',()=>{
            this.visibilidad_cierre_venta=false
        })

        //abrir el formulario para asignar la cantidad a vender del producto
        emitter.on('abrir_form_cantidad_producto_venta',(data)=>{
            //pasando el producto selecionado para agregarlo al carrito
            this.producto_asignado_carrito =data

            this.visibilidad_form_asignar_cantidad=true
        })

        //cerrar el formulario para asignar la cantidad a vender del producto
        emitter.on('cerrar_form_asignar_cantidad_venta',()=>{
            this.visibilidad_form_asignar_cantidad=false
        })

        //abrir carrito de ventas
        emitter.on('abrir_carrito_ventas',()=>{
            this.visibilidad_carrito_ventas=true
        })

        //cerrar carrito de ventas
        emitter.on('cerrar_carrito_ventas',()=>{
            this.visibilidad_carrito_ventas=false
        })

    },
    components:{
        'categorias-producto':CategoriaProductos,
        'producto-venta':productoVenta,
        'formulario-asignar-cantidad':FormAsignarCantidad,
        'boton-carrito-compra':BtnCarritoCompra,
        'carrito-de-compra':CarritoCompra,
        'cerrar-venta':CerrarVenta,
        'carga-loader-ventas':LoaderCarga,
        'resultado-busqueda':ResultadoBusquedaProductos
    },
    data(){
        return{
            title: 'Nueva venta',

            datosCarrito:carritoStore.carrito_compras,

            dato_busqueda:'',

            producto_asignado_carrito:'',

            DatosProductos:[],

            visibilidad_form_asignar_cantidad:false,
            visibilidad_carrito_ventas:false,
            visibilidad_cierre_venta:false,
            visibilidad_ventana_carga_venta:false,
            visibilidad_result_busqueda_producto:false,

           
        }
    },
computed:{ 
         
        },
    methods:{
        abrir_cierre_venta(){
            this.visibilidad_cierre_venta=true
        },
        cargar_productos(){
            this.visibilidad_ventana_carga_venta=true

            axios.get('https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/productos')
                .then(response =>{
                    this.DatosProductos=response.data;
                    /*registrar un listado del carrito de forma local para editar la cantidad en cada registro 
                     de un producto para venta
                    */
                    carritoStore.listadoLocarDeProductos=response.data;

                })
                .catch((error)=>{
                    console.log(error)
                    toast.error("error al solicitar los productos!");
                })
                .finally(()=>{
                    this.visibilidad_ventana_carga_venta=false
                })


        },
        buscar_producto_por_nombre(){
            if(!this.dato_busqueda) {
                toast.warn("ingrese un dato a buscar !");
            }else{
                this.visibilidad_result_busqueda_producto=true
            }
        },
        actualizar_listado_productos(id,cantidad){
            // Iterar sobre el array de productos
            for (let i = 0; i < carritoStore.listadoLocarDeProductos.length; i++) {
                    // Verificar si el id coincide
                    if (carritoStore.listadoLocarDeProductos[i].id === id) {
                        // Restar el valor recibido a la cantidad_disponible
                        carritoStore.listadoLocarDeProductos[i].cantidad_disponible -= cantidad;
                        break; // Salir del bucle una vez que se ha actualizado el producto
                    }
                }

        }
        
   
    }
}
</script>
 
<template>
    <section class="w-full h-[100%] bg-[#FCF0D7]  pb-[200px]">

        <resultado-busqueda :dato_busqueda="dato_busqueda"  v-if="visibilidad_result_busqueda_producto"/>


        <carrito-de-compra v-if="visibilidad_carrito_ventas"/>



        <boton-carrito-compra/>


        <carga-loader-ventas v-show="visibilidad_ventana_carga_venta"/>

        <cerrar-venta v-show="visibilidad_cierre_venta"/>

        <formulario-asignar-cantidad :producto_asignado_carrito="producto_asignado_carrito" v-if="visibilidad_form_asignar_cantidad" />

        <nav class="w-full h-20 p-2 bg-[#FF7850]  relative ">
            <img @click="abrir_cierre_venta" class="w-[35px] mr-[25px] absolute mt-[15px]  order-1 cursor-pointer" src="/src/assets/iconos/interfaz/regresar.png" >

        <h1 class="text-[2.3rem] text-center text-white">Nueva venta</h1>    
        </nav>

        <div class="w-full h-[60px] flex p-2 border-t-2 border-t-[#DFDFDF] ">
            <h3 class="order-1 text-[1.3rem]">Total venta:</h3>
            <h3 class="order-2 text-[1.3rem] text-[#E55226] ml-[50%]">{{datosCarrito.total_venta}}</h3>
        </div>

        <div class="p-3 w-full">
            <input v-model="dato_busqueda"  class="w-[100%] h-[60px] rounded outline-0 pl-2  shadow-md shadow-[#0000001f] placeholder:text-[0.8rem]
            placeholder:italic"
             type="text"  placeholder="Buscar producto por: nombre..." >
            <img @click="buscar_producto_por_nombre" class="w-[40px] -mt-[50px] cursor-pointer border-l-[2px]  border-[#DFDFDF] ml-[80%] absolute" src="../assets/iconos/interfaz/icono_buscador.png" >
        </div>

        <categorias-producto/>

        <section class="w-full mt-[40px] p-3 pb-[220px]">
            <h3 class="text-[1.3rem] mb-[10px]">Productos</h3>

            <div v-if=" DatosProductos.length > 0 ">
                <div v-for="productos in DatosProductos" :key="productos.id">
                    <producto-venta :productos="productos"/>
                </div>
            </div>
            <div v-else>
                <h3 class="text-[1.4rem] text-center"> no se encontraron productos...</h3>
            </div>

        </section>

    </section>
</template>