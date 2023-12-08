<script>

//modulo de bus de eventos globales
import { emitter } from '@/eventBus';

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

//importamos el carrito global
import { useGlobalCarritoVenta } from '/src/stores/carrito.js';
const carritoStore = useGlobalCarritoVenta();


export default {
    props:['DatosEditarCantidad'],

    mounted(){
        this.cantidadProducto =carritoStore.carrito_compras.detalles_productos.filter(producto => producto.id_producto === this.DatosEditarCantidad.id)

    },

    data(){
        return{
            cantidadProducto:'',
        }
    }, 

    methods:{
        cerrar_editar_cantidad(){
            emitter.emit('cerrar_editar_cantidad_producto_carrito')
        },
        actualizar_cantidad(){
            if (this.cantidadProducto == '' ) {
                toast.warn("ingrese un monto valido!");
               
            }
            else if (this.cantidadProducto > this.DatosEditarCantidad.stok) {
                toast.warn("ingrese un monto menor o igual a la cantidad disponible del producto!");
                
            }
            else{
                //editar la cantidad del producto
                carritoStore.editar_cantidad_producto(this.DatosEditarCantidad.id,this.cantidadProducto)

                emitter.emit('cerrar_editar_cantidad_producto_carrito')

                emitter.emit('actualizar_listado_producto_venta')

                toast.success("se edito la cantidad del producto!");

                console.log(carritoStore.carrito_compras.detalles_productos)
            }
            
        }
    }
    
}
</script>

<template>
    <section  class="  w-full h-[100vh] bg-[#444d639c] fixed  z-40 ">
       <div class="w-[90%] ml-[5%] h-[300px] bg-white mt-[50%]">
           <header class="w-full p-3 inline-flex border-b-[1.5px] border-b-[#DFDFDF]">
               <img  @click="cerrar_editar_cantidad" class="w-[35px] mr-[25px]  order-1 cursor-pointer" src="/src/assets/iconos/interfaz/regresar.png" >
               <h2 class="text-[1.5rem] ml-[15px] order-2">Editar la cantidad </h2>
           </header>
           <div class="p-3">
            <input v-model="cantidadProducto" class=" text-center w-[90%] ml-[5%] h-[70px] pl-2 mt-[30px] focus:border-[#FFB984] outline-none border-2 rounded"  type="number" >
               <button  @click="actualizar_cantidad" class="w-[90%] ml-[5%] mt-[50px] text-[1.2rem] h-[60px] rounded text-white bg-[#FFB984]">Actualizar</button>
           </div>
       </div>
       
   </section>
</template>