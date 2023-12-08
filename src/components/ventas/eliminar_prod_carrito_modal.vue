<script>
//modulo de bus de eventos globales
import { emitter } from '@/eventBus';

//importamos el carrito global
import { useGlobalCarritoVenta } from '/src/stores/carrito.js';
const carritoStore = useGlobalCarritoVenta();

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    props:['idProductoOperacion'],
    methods:{
        cerrar_modal_eliminar_producto(){
            emitter.emit('cerrar_modal_eliminar_producto_carrito')
        },
        eliminar_producto_carrito(){
            carritoStore.eliminarProducto(this.idProductoOperacion)
            console.log(carritoStore.carrito_compras.detalles_productos)
            
            emitter.emit('actualizar_listado_producto_venta')

            toast.success("se elimino un producto de la venta!");

            emitter.emit('incrementar_contador_carrito')

            emitter.emit('cerrar_modal_eliminar_producto_carrito')
        }
    }
}
</script>
<template>
     <section  class="  w-full h-[100vh] bg-[#444d639c] fixed  z-40 ">
        <div class="w-[90%] ml-[5%] h-[300px] bg-white mt-[50%]">
            <header class="w-full p-3 inline-flex border-b-[1.5px] border-b-[#DFDFDF]">
                <img  @click="cerrar_modal_eliminar_producto" class="w-[35px] mr-[25px]  order-1 cursor-pointer" src="/src/assets/iconos/interfaz/regresar.png" >
                <h2 class="text-[1.5rem] ml-[10px] order-2">eliminar del carrito</h2>
            </header>
            <div class="p-3">
                <h3 class="text-center text-[#9F9F9F]">Esta seguro que desea eliminar este producto del carrito?</h3>
                <button @click="eliminar_producto_carrito" class="w-[90%] ml-[5%] mt-[50px] text-[1.2rem] h-[60px] rounded text-white bg-[#CC0B09]">Eliminar</button>
            </div>
        </div>
        
    </section>
</template>