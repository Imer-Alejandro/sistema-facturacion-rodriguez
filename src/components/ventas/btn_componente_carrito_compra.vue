<script>
//modulo de bus de eventos globales
import { emitter } from '@/eventBus';

//importamos el carrito global
import { useGlobalCarritoVenta } from '/src/stores/carrito';
const carritoStore = useGlobalCarritoVenta();


export default {
    mounted(){
        emitter.on('incrementar_contador_carrito',()=>{
            this.contador_Carrito=carritoStore.carrito_compras.detalles_productos.length
        })


    },
    data(){
        return{
            contador_Carrito:0,
        }
    },
     methods:{
        abrir_carrito_ventas(){
            emitter.emit('abrir_carrito_ventas')
        }
     }
}
</script>


<template>
    <div class="w-full fixed mt-[85vh] flex z-20 ">
        <button @click="abrir_carrito_ventas" class="w-[65%] mr-[20px]  rounded-md  order-1  shadow-md shadow-[#2929294b]  ml-[3%]     h-[70px] bg-[#90E671]">
                <span class="text-white  text-[1.5rem] mr-[10px]">Confirmar venta</span>
                <img  class="w-[30px] absolute ml-[54%] -mt-[33px]" src="/src/assets/iconos/interfaz/comprobar.png" >
        </button>

        <button @click="abrir_carrito_ventas" class=" rounded-md shadow-md shadow-[#2929294b]  w-[22%] order-2 h-[70px] bg-[#90E671]">
            <figure class="flex justify-center align-middle">
                <div class="text-white text-[1.2rem] ml-[40px] -mt-[5px] absolute bg-[#E55226] text-center w-[30px] h-[30px] justify-center flex align-middle  rounded-[70%]">
                    <span >{{contador_Carrito}}</span>
                </div>
                <img class="w-[45px]" src="/src/assets/iconos/interfaz/carrito-de-compras.png" alt="" srcset="">
            </figure>
        </button>
    </div>
</template>