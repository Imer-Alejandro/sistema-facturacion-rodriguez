<script>
//modulo de bus de eventos globales
import { emitter } from '@/eventBus';

export default {

    props:['productos'],

    methods:{
        abrir_form_asignar_cantidades(){
            emitter.emit('abrir_form_cantidad_producto_venta',this.productos)
        }
    }
    
}
</script>

<template>
     <div class="w-[100%] z-10 relative flex p-2 pt-3 h-[150px] rounded-md mb-[15px] bg-white shadow-md shadow-[#0000001f]">
        <div class="w-[65px] flex  justify-center items-center  rounded h-[95%] bg-[#FF7850]" >
            <img class=" order-1 w-[45px] h-[45px]" :src="productos.icono">
        </div>
        <div class="order-2 pl-2 w-[220px] mr-[3px]  mb-[3px]">
            <h3 class="font-medium text-[#E55226]">{{productos.nombre_producto}}</h3>
            <p class="text-[0.8rem] font-light mb-[8px]">
                {{ productos.description }}
            </p>

            <div class="inline-flex">
                <h3 class="text-[#858484] inline-flex text-[0.9rem] mr-[10px]">Precio:
                    <span class="text-[#FF7850] order-1">{{productos.precio_venta  }}</span>
                    <span class="order-2 text-[#FF7850]" v-if="productos.vender_por == 'libras'">/lb</span>
                    <span class="order-2 text-[#FF7850]" v-else>/und</span>
                </h3>
                <h3 class="text-[#858484]  text-[0.9rem] ">Cantidad:
                    <span class="text-[#FF7850] order-3">{{productos.cantidad_existente}}</span>
                </h3>
            </div>  
        </div>
        
        <div class="order-3 ml-[5px] w-[85px] border-l-2 p-2">
            <button @click="abrir_form_asignar_cantidades" class=" w-full h-full flex  justify-center items-center">
                <img class="w-[50px] h-[50px]" src="/src/assets/iconos/interfaz/anadir-al-carrito.png" alt="" srcset="">
            </button> 
        </div>
        

       
    </div>
</template>