<script>
//modulo de bus de eventos globales
import { emitter } from '@/eventBus';

import axios from 'axios';

export default {
    //recibe el id del producto y el listado en texto plano para iterar y eliminar
    props:['idProductoOperacion','dataListaProducto'],

    data(){
        return{
            productoEliminado:{
                id:'',
                cantidad_venta:''
            }
        }
    },

    methods:{
        cerrar_eliminar_producto_registro_venta(){
            emitter.emit('cerrar_eliminar_producto_registro_venta')
        },
        eliminar_producto(){
            const Listado = JSON.parse(this.dataListaProducto)

            Listado.forEach(element => {
                    if(element.id_producto == this.idProductoOperacion){
                        //cacturar los datos del producto
                        this.productoEliminado.id=element.id_producto
                        this.productoEliminado.cantidad_venta=element.cantidad_venta
                    }
                });

            //iteral nueva lista sin el elemento a eliminar
            let nuevoListado = Listado.filter(producto => producto.id_producto !== this.idProductoOperacion);  
            //activar el evento para actualizar el listado de producto del componete principal
            //pasar el listado y el producto que se elimino para operacion del backend
            
            emitter.emit('asignar_producto_eliminado_registro_venta',this.productoEliminado)
            emitter.emit('actualizar_listado_producto_registro_venta',JSON.stringify(nuevoListado))
            //cerrar ventana luego de terminar el proceso 
            this.cerrar_eliminar_producto_registro_venta()
        }
    }
}
</script>

<template>
     <!-- este es el componente del modal para confirmar la eliminacion de un producto del registro de 
        la venta -->

        <div  class=" w-full h-[100vh] bg-[#444d639c]  fixed z-50  ">
            <div class="w-[90%] ml-[5%] h-[300px] bg-white mt-[40%]">
                <header class="w-full p-3 inline-flex border-b-[1.5px] border-b-[#DFDFDF]">
                    <img  @click="cerrar_eliminar_producto_registro_venta" class="w-[35px] mr-[25px]  order-1 cursor-pointer" src="/src/assets/iconos/interfaz/regresar.png" >
                    <h2 class="text-[1.7rem] order-2">Eliminar producto</h2>
                </header>

                <div class="p-3">
                    <h3 class="text-center text-[#9F9F9F]">Esta seguro que desea eliminar este producto del registro de la venta?</h3>
                    <button @click="eliminar_producto" class="w-[90%] ml-[5%] mt-[50px] text-[1.2rem] h-[60px] rounded text-white bg-[#CC0B09]">Eliminar</button>
                </div>
            </div>
        </div>
</template>