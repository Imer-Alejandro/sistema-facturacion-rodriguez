<script>
import Header from "../components/Header.vue";
import producto from "../components/inventario/producto.vue";
import MenuInferior from "../components/Menu_inferiro.vue";
import BtnCrearProducto from "../components/inventario/btn_crear_producto.vue";
import formCrearProducto from "../components/inventario/form_crear_producto.vue";
import detallesProductos from "../components/inventario/detalle_producto.vue";
import Editar_producto from "../components/inventario/editar_producto.vue"
import eliminarProducto from "../components/inventario/eliminar_producto.vue";
import categoriaProducto from "../components/inventario/categorias.vue";
import resultadoBusqueda from "../components/inventario/result_search_product.vue";
import EditarCantidadProducto from '../components/inventario/actualizar_cantidad_producto_inventario.vue'

import cargaLoader from '../components/carga_loader.vue'

 
//modulo de bus de eventos globales
import { emitter } from '@/eventBus';

import axios from 'axios';

 
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

  
export default {
    mounted() {
        //eventos de modificacion de proveedores en tiempo real
        this.$socket.on('actualizacion_registro_inventario',()=>{
                toast.success("actualizando el registro!");
                //actualizar el registro
                this.pedir_Data();
            })


        //funciones de clasificacion de productos por categoria
        emitter.on('categoria_inventario',(data)=>{
            this.DatosProductos=data
        })

        

        //ventana busqueda
        emitter.on('cerrar_busqueda_inventario',()=>{
            this.data.open_and_close_busqueda_producto=false,
            this.dato_busqueda=''
        })

        //ventana detalle del producto

        emitter.on('cerrar_detalle_producto_inventario',()=>{
            this.data.open_and_close_detalle_producto=false
        })

        //evento para abrir detalle 
        emitter.on('abrir_detalle_productos', (data) => {
            //realizar una peticion de los datos del producto con el id indicado en el parametro data
                this.producto_indicado= data
        // Realizar acciones en respuesta al evento
            this.data.open_and_close_detalle_producto=true
         });

        //actualizar el inventario al crear producto
        emitter.on('actualizar_inventario',()=>{
            this.pedir_Data();
            
        })


        //estados ventana de carga 
        emitter.on('abrir_ventana_carga_inventario',()=>{
            this.data.estado_activacion_loader_Carga=true
        })

        emitter.on('cerrar_ventana_carga_inventario',()=>{
            this.data.estado_activacion_loader_Carga=false
        })

        //cargar datos producto
        this.pedir_Data();

        //ventana actualizar cantidad del producto
        emitter.on('abrir_editar_cantidad_producto_inventario',(data)=>{
            this.datosActualizarCantidad=data

            this.data.visibilidad_actualizar_cantidad=true
        })
         
        emitter.on('cerrar_actualizar_cantidad_producto',()=>{
            this.data.visibilidad_actualizar_cantidad=false;
        })

         //ventana  editar producto
         emitter.on('cerrar_editar_producto_inventario',()=>{
            this.data.open_and_close_editar_producto=false
         });

         emitter.on('abrir_editar_productos',(data)=>{
            this.producto_indicado= data
            this.data.open_and_close_editar_producto=true

         })

         //ventana eliminar producto
         emitter.on('abrir_eliminar-producto_inventario',(data)=>{
            this.id_producto_indicado= data
            this.data.open_and_close_eliminar_producto=true

         })
         emitter.on('cerrar_eliminar_producto_inventario',()=>{
            this.data.open_and_close_eliminar_producto=false
         })
    },
 
    computed:{
       
        

    },
    components:{
        'menu-header': Header,
        'productos': producto,
        'menu-inferior' : MenuInferior, 
        'btn-crear-producto' :BtnCrearProducto,
        'formulario-crear-producto':formCrearProducto,
        'detalles-productos':detallesProductos,
        'editar-producto':Editar_producto,
        'eliminar-producto':eliminarProducto,
        'categoria-producto':categoriaProducto,
        'resultado-busqueda':resultadoBusqueda,
        'ventana-carga':cargaLoader,
        'editar-cantidad':EditarCantidadProducto,
    },
    
    data() {
        return {

            title: "Inventario",
            producto_indicado:'',
            id_producto_indicado:0,
            DatosProductos:[],
            dato_categoria:'',
            total_suma_costo:0,
            total_producto_inventario:0,
            dato_busqueda:'',
            datosActualizarCantidad:'',
            
            //datos de promp para componente hijo como id o estados del componente
            data:{
                //estado de formulario de operacion con productos

                //componente detalle producto
                open_and_close_detalle_producto:false,

                //componente editar producto
                open_and_close_editar_producto:false,

                //formulario crear producto
                open_and_close_form_new_product:false,

                open_and_close_eliminar_producto:false,

                //componente para los resultados de busqueda
                open_and_close_busqueda_producto:false,


                estado_activacion_loader_Carga:false,

                visibilidad_actualizar_cantidad:false


            },


            
        }
    },
    methods:{
        form_new_product(){
            this.data.open_and_close_form_new_product=!this.data.open_and_close_form_new_product
        },
        updateData(newData) {
             this.data = newData;
        },

        open_busqueda_producto(){
            if(!this.dato_busqueda) {
                toast.warn("ingrese un dato a buscar !", {
                                    autoClose: 3000,
                                    backgroundColor:'#CC0B09',
                                    close: false,
                                    color: '#ffffff',
                                });
            }else{
                this.data.open_and_close_busqueda_producto=true
            }
        }, 

        pedir_Data(){

                emitter.emit('abrir_ventana_carga_inventario')
            
                axios.get('https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/productos')
                .then(response =>{
                    this.DatosProductos=response.data;

                })
                .catch(error=>{
                    console.log("Error", error);
                })
                .finally(()=>[
                    emitter.emit('cerrar_ventana_carga_inventario'),

                    //cargar el costo total del inventario
                    this.suma_precio_costo_producto = this.DatosProductos.reduce((acumulador, DatosProductos) => 
                            acumulador + DatosProductos.costo * DatosProductos.cantidad_existente , 0),

                    //calcular los productos en inventario
                    this.total_producto_inventario= this.calcular_inventrio()
                ]);


            },
            suma_precio_costo_producto(){
                 // Calcular la suma del precio de venta de los productos
                    return this.DatosProductos.reduce((acumulador, DatosProductos) => acumulador + DatosProductos.costo * DatosProductos.cantidad_existente , 0);
            },
            calcular_inventrio(){
                return this.DatosProductos.reduce((acumulador, DatosProductos) => acumulador + DatosProductos.cantidad_existente , 0);

            }
    }
}
</script> 

<template> 
    <section class=" w-full h-[100%]  bg-[#FEFEE5] ">
        <btn-crear-producto @click="form_new_product" />
        <menu-inferior/>
         <!-- ventana de carga  -->
         <ventana-carga v-if="data.estado_activacion_loader_Carga"/>
       
         <editar-cantidad :datosActualizarCantidad="datosActualizarCantidad" v-if="data.visibilidad_actualizar_cantidad"/>

        <menu-header :nameSession="title"/>

         
        
        <!-- componente para mostrar los resultados de busqueda -->
        <resultado-busqueda   :dato_busqueda="dato_busqueda"  v-if="data.open_and_close_busqueda_producto"/> 

        <!-- componente eliminar producto -->
        <eliminar-producto :id_producto_indicado="id_producto_indicado"
       v-if="data.open_and_close_eliminar_producto"/>

         <!-- componente editar producto -->
        <editar-producto :producto_indicado="producto_indicado"
        v-if="data.open_and_close_editar_producto"  />

         <!-- componente para ver los datos del  producto -->
        <detalles-productos :producto_indicado="producto_indicado"
         v-if="data.open_and_close_detalle_producto"/>

        <!-- componente para crear productos -->
        <formulario-crear-producto :parentData="data" @updateParentData="updateData" 
        v-if="data.open_and_close_form_new_product" />
         

        <div class=" flex">
            <div class=" p-2 w-[45%] enline-flex ml-[2.5%] h-[80px] rounded shadow-md shadow-[#0000002a] mb-[20px] bg-[#FF7850]">
                <span class="text-[#F9F9F9]">costo del inventario</span>
                <h3 class="text-[1.6rem] text-white font-bold">{{ suma_precio_costo_producto }}</h3>
                <img src="" >
            </div>

            <div class=" p-2 w-[45%] enline-flex ml-[2.5%] h-[80px] rounded shadow-md shadow-[#00000031] bg-[#FFB984]">
                <span class="text-[#F9F9F9]">Articulos en inventario</span>
                <h3 class="text-[1.6rem] text-white font-bold">{{ total_producto_inventario }}</h3>
                <img src="" >
            </div>
        </div>
        
        <div class="p-3 w-full">
            <input  v-model="dato_busqueda" class="w-[100%] h-[60px] rounded outline-0 pl-2  shadow-md shadow-[#0000001f] placeholder:text-[0.8rem]
            placeholder:italic"
             type="text"  placeholder="Buscar producto por: nombre..." >
            <img  @click="open_busqueda_producto" class="w-[40px] -mt-[50px] cursor-pointer border-l-[2px]  border-[#DFDFDF] ml-[80%] absolute" src="../assets/iconos/interfaz/icono_buscador.png" >
        </div>

        
        <categoria-producto  :DatosProductos="DatosProductos"/>

        <article class="w-full   mt-[50px] p-2 ">
            <h3 class="text-[1.5rem] mb-1">Productos</h3>
        </article>

        <div class="w-full p-3 pb-[220px]">
            
            <div v-if="DatosProductos.length > 0">
                <div v-for="producto in DatosProductos" :key="producto.id">
                <!-- Renderizar componentes de productos pasando datos -->
                <productos :producto="producto" />
                </div>
            </div>
            <div v-else>
                <h3 class="text-[1.4rem] text-center"> no se encontraron productos...</h3>
            </div>
            
        
        </div>
        
        
            
        
           
  
    </section>
</template>