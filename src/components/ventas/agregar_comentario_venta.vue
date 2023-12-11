<script>
//modulo de bus de eventos globales
import { emitter } from '@/eventBus';

//importamos el carrito global
import { useGlobalCarritoVenta } from '/src/stores/carrito';
const carritoStore = useGlobalCarritoVenta();


import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';



export default {

    data(){
        return{
            comentario:carritoStore.carrito_compras.comentario
        }
    },
   methods:{
        cerrar_comentario_venta(){
            emitter.emit('cerrar_comentario_venta')
        },
        guardar_comentario(){

            if(this.comentario != '') {
                carritoStore.agregar_comentario(this.comentario)

                emitter.emit('cerrar_comentario_venta')

                toast.success("se registro el comentario de la venta!");

                console.log(carritoStore.carrito_compras)
                    

            }else{
                toast.warn("debe ingresar un comentario!");
            }
            
        }
   }
}
</script>

<template> 
    <section  class="  w-full h-[100vh] bg-[#444d639c] fixed  z-40 ">
        <div class="w-full  h-[390px] bg-white mt-[100%] ">
            <header class="w-full p-3 inline-flex border-b-[1.5px] border-b-[#DFDFDF]">
                <img  @click="cerrar_comentario_venta" class="w-[35px] mr-[25px]  order-1 cursor-pointer" src="/src/assets/iconos/interfaz/regresar.png" >
                <h2 class="text-[1.7rem] ml-[20px] order-2">Agregar comentario</h2>
            </header>
            <div class="p-3">
                <input maxlength="100" v-model="comentario" class=" w-[90%] ml-[5%] h-[100px] pl-2 mt-[30px] focus:border-[#FFB984] outline-none border-2 rounded"  type="text" placeholder="Ingrese el comentario aqui..." name="" id="">
                <button @click="guardar_comentario" class="w-[90%] ml-[5%] mt-[30px] text-[1.2rem] h-[60px] rounded text-white bg-[#FFB984]">Guardar</button>
            </div>
        </div>      
    </section>
</template>