<script>

//modulo de bus de eventos globales
import { emitter } from '@/eventBus';

import axios from 'axios';


export default {

    mounted(){
        console.log(this.producto_indicado)
    },
    props:['producto_indicado'],
    data(){
        return{
            DatosProductos:[]
        } 
    },
    methods:{
        close_detalle_producto() {
            emitter.emit('cerrar_detalle_producto_inventario')
        },

        
    } 
}
</script>

<template>
    <section  class="  w-full h-[100vh] bg-white fixed -mt-[80px] z-40 ">
        <header class="w-full p-3 inline-flex border-b-[1.5px] border-b-[#DFDFDF]">
            <img  @click="close_detalle_producto"  class="w-[35px] mr-[25px]  order-1 cursor-pointer" src="/src/assets/iconos/interfaz/regresar.png" >
            <h2 class="text-[1.7rem] order-2">Detalles del producto</h2>
        </header>
            <div class="w-full inline-flex p-2 h-[130px] bg-[#EBEBEB]">
                <div class=" bg-[#D2D1D1] order-1 w-[110px] flex items-center justify-center mt-[5px] h-[90%]  rounded">
                    <img class="w-[60px] h-[60px]" :src="producto_indicado && producto_indicado.icono" alt="" srcset="">
                </div>
 
                <div class="order-2 p-2">
                    <h3 class="text-[#E55226] mb-[15px] font-medium  text-[1.3rem]">{{ producto_indicado && producto_indicado.nombre_producto}}</h3>
                    
                </div>
            </div> 

            <article class="p-2 mt-[10px]">
                <div class="w-full pb-2 border-b-[1.5px] border-b-[#DFDFDF]">
                    <h3 class="text-[1.3rem] font-medium mb-[10px]">descripticion</h3>
                    <p class="text-[#9F9F9F]">
                        {{ producto_indicado && producto_indicado.description}}
                    </p>
                </div>
                <div class="w-full pb-2 border-b-[1.5px] pt-2 border-b-[#DFDFDF]">
                    <h3 class="text-[1.3rem] font-medium mb-[10px]">Categoria: <span class="font-normal text-[#9F9F9F]">{{ producto_indicado && producto_indicado.categoria}}</span></h3>
                </div>

                <div class="w-full pb-2 border-b-[1.5px] pt-2 border-b-[#DFDFDF]">
                    <h3 class="text-[1.3rem] font-medium mb-[10px]">Proveedor: <span class="font-normal text-[#9F9F9F]">{{producto_indicado &&  producto_indicado.proveedor }}</span></h3>
                </div>

                <div class="w-full pb-2 border-b-[1.5px] pt-2 border-b-[#DFDFDF]">
                    <h3 class="text-[1.3rem] font-medium mb-[10px]">Vender por: <span class="font-normal text-[#9F9F9F]">{{ producto_indicado && producto_indicado.vender_por}}</span></h3>
                </div>

                <div class="w-full pb-2 border-b-[1.5px] pt-2 border-b-[#DFDFDF]">
                    <h3 class="text-[1.3rem] font-medium mb-[10px]">Costo: <span class="font-normal text-[#9F9F9F]">{{ producto_indicado && producto_indicado.costo}}</span></h3>
                </div>

                <div class="w-full pb-2 border-b-[1.5px] pt-2 border-b-[#DFDFDF]">
                    <h3 class="text-[1.3rem] font-medium mb-[10px]">Precio de venta: <span class="font-normal text-[#9F9F9F]">{{ producto_indicado && producto_indicado.precio_venta}}</span></h3>
                </div>

                <div class="w-full pb-2 border-b-[1.5px] pt-2 border-b-[#DFDFDF]">
                    <h3 class="text-[1.3rem] font-medium mb-[10px]">Existencias en stock: <span class="font-normal text-[#9F9F9F]">{{ producto_indicado && producto_indicado.cantidad_existente}}/{{producto_indicado && producto_indicado.vender_por}}</span></h3>
                </div>

                <div class="w-full pb-2 border-b-[1.5px] pt-2 border-b-[#DFDFDF]">
                    <h3 class="text-[1.3rem] font-medium mb-[10px]">Codigo: <span class="font-normal text-[#9F9F9F]">{{producto_indicado && producto_indicado.codigo}}</span></h3>
                </div>
            </article>
    </section>
</template>