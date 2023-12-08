<script>
import { emitter } from '@/eventBus';

export default { 
    methods:{
        finalizar(){
            //se debe de limpiar el objeto de carrito 

            //cerrar la venta de confirmacion de ventas
            emitter.emit('cerrar_confirmacion_venta')
            emitter.emit('actualizar_listado_producto_venta')
            emitter.emit('actualizar_ventas')

            this.$router.go(-1);
        }
    }
}
</script>

<template>
    <section  class="  w-full h-[100vh] bg-[#7fd460] fixed  z-50 ">
        <div class="w-full   p-3 pt-[200px]">
            <div class="text-center flex justify-center items-center flex-col">
                <img class="w-[80px] h-[80px] mb-[20px]" src="/src/assets/iconos/interfaz/confirmacion.png" >
                <h3 class="text-white text-[1.7rem] mb-[20px]">Venta registrada con exito!</h3>
            </div>
            
        </div>

        <div class="w-full h-[300px] mt-[260px] text-center justify-center flex">
            <button @click="finalizar" class="flex h-[100px] p-2  flex-col justify-center items-center text-center w-[100px]"> 
            <div class="w-[50px] h-[50px] rounded-[100%] flex justify-center items-center text-center bg-white">
                <img class="w-[30px] h-[30px]" src="/src/assets/iconos/interfaz/x.png" alt="" srcset="">
            </div>
            <span class="text-white text-[1.2rem]">finalizar</span>
        </button>
        </div>
        

    </section>
</template>