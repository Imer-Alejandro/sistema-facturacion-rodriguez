<script>

//modulo de bus de eventos globales
import { emitter } from '@/eventBus';

export default {
        methods:{
            cerrar_ventana_cierre_Venta(){
                emitter.emit('cerrar_modal_cierre_venta')
            },
            salir_ventana_venta(){
                this.$router.go(-1);
            }
        } 
}
</script>

<template>
    <section  class="  w-full h-[100vh] bg-[#444d639c] fixed  z-40 ">
       <div class="w-[90%] ml-[5%] h-[220px] bg-white mt-[50%]">
           <header class="w-full p-3 inline-flex border-b-[1.5px] border-b-[#DFDFDF]">
               <img  @click="cerrar_ventana_cierre_Venta" class="w-[35px] mr-[25px]  order-1 cursor-pointer" src="/src/assets/iconos/interfaz/regresar.png" >
               <h2 class="text-[1.5rem] ml-[25px] order-2">Salir de la venta</h2>
           </header>
           <div class="p-3">
               <h3 class="text-center text-[#9F9F9F]">Cuando cierre la venta se reiniciara el carrito, esta seguro que desea salir?</h3>
               <button @click="salir_ventana_venta" class="w-[90%] ml-[5%] mt-[20px] text-[1.2rem] h-[60px] rounded text-white bg-[#C53633]">Cerrar</button>
           </div>
       </div>
       
   </section>
</template>