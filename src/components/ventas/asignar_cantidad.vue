<script>
//modulo de bus de eventos globales
import { emitter } from '@/eventBus';

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

//importamos el carrito global
import { useGlobalCarritoVenta } from '/src/stores/carrito.js';
const carritoStore = useGlobalCarritoVenta();


export default {
    props:['producto_asignado_carrito'],
 
    data(){
        return{

            cantidad_producto:'',

            objeto_producto:{
                id_producto:'',
                nombre_producto:'',
                precio_venta:'',
                cantidad_existente:'',
                cantidad_venta:'',
                icono:'',
                description:'',
                vender_por:'',
                precio_compra:'',
                total_producto:''
            }
        }
    },

    methods:{
        close_form_asignar_cantidad_venta(){
            emitter.emit('cerrar_form_asignar_cantidad_venta')
        },
        registrar_producto_al_carrito(){
            //verificar que sea un valor valido 
            if (this.cantidad_producto == 0 ) {
                toast.warn("ingrese un monto valido!");
            }
            else if (this.cantidad_producto > this.producto_asignado_carrito.cantidad_existente) {
                toast.warn("ingrese un monto menor o igual a la cantidad existente !");
            }
            else{
               
                                //crear el objeto del producto y registrarlo en el carrito de compra
                                this.objeto_producto.id_producto=this.producto_asignado_carrito.id
                                this.objeto_producto.nombre_producto=this.producto_asignado_carrito.nombre_producto
                                this.objeto_producto.cantidad_existente=this.producto_asignado_carrito.cantidad_existente
                                this.objeto_producto.precio_venta=this.producto_asignado_carrito.precio_venta
                                this.objeto_producto.icono=this.producto_asignado_carrito.icono
                                this.objeto_producto.cantidad_venta=this.cantidad_producto
                                this.objeto_producto.vender_por=this.producto_asignado_carrito.vender_por
                                this.objeto_producto.description=this.producto_asignado_carrito.descripcion
                                this.objeto_producto.total_producto=this.objeto_producto.precio_venta * this.objeto_producto.cantidad_venta
                                this.objeto_producto.precio_compra=this.producto_asignado_carrito.costo
                                //agregar al  carrito
                                this.agregarProductoAlCarrito(this.objeto_producto)


                                //cerrar ventana
                                emitter.emit('cerrar_form_asignar_cantidad_venta')
                                
                                console.log(carritoStore.carrito_compras.detalles_productos)
                                //actualizar el indicador de cantidad del carrito 
                                emitter.emit('incrementar_contador_carrito')
                

            }
            
        },
        agregarProductoAlCarrito(producto){
            carritoStore.agregarProducto(producto);
            }
    }
}
</script>


<template>
     <section  class="  w-full h-[100vh] bg-[#444d639c] fixed  z-40 ">
        <div class="w-full  h-[390px] bg-white mt-[100%] ">
            <header class="w-full p-3 inline-flex border-b-[1.5px] border-b-[#DFDFDF]">
                <img  @click="close_form_asignar_cantidad_venta"  class="w-[35px] mr-[25px]  order-1 cursor-pointer" src="/src/assets/iconos/interfaz/regresar.png" >
                <h2 class="text-[1.7rem] ml-[20px] order-2">Asignar cantidad</h2>
            </header>
            <div class="p-3">
                <h3 class="text-center text-[#9F9F9F]">Indique la cantidad a vender en: <span class="text-black">{{this.producto_asignado_carrito.vender_por}}</span></h3>
                <input v-model="cantidad_producto" class=" w-[90%] text-center ml-[5%] h-[70px] pl-2 mt-[30px] focus:border-[#FFB984] outline-none border-2 rounded"  type="number" placeholder="Ingrese la cantidad aqui..." name="" id="">
                <button @click="registrar_producto_al_carrito" class="w-[90%] ml-[5%] mt-[30px] text-[1.2rem] h-[60px] rounded text-white bg-[#FFB984]">Agregar a la venta</button>
            </div>
        </div>
        
    </section>
</template>