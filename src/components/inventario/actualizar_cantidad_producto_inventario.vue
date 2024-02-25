<script>

//importar el modulo de eventos globales 
import { emitter } from '@/eventBus';

import axios from 'axios';


 
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

 

export default {
    props:['datosActualizarCantidad'],

    

    data(){
        return{
            cantidad:''
        }
    },

    methods:{
        cerrar_ventana(){
            //emitir un evento para que se cierre la ventana modal
            emitter.emit('cerrar_actualizar_cantidad_producto')
        },
        actualizar_cantidad_producto(){
            if (this.cantidad == '' || this.cantidad == 0) {
                toast.warn("ingrese un valor para actualizar!");
            }else{
                emitter.emit('abrir_ventana_carga_inventario')
                console.log(this.cantidad)
                axios.put(`${import.meta.env.VITE_API_SERVER}editar-cantidad-producto/${this.datosActualizarCantidad.id_producto}`,{
                    nueva_cantidad:this.cantidad + this.datosActualizarCantidad.cantidad
                })
                    .then((response)=>{
                        console.log(response)
                        toast.success("la cantidad del producto se actualizo!");
                    })
                    .catch((err)=>{
                        console.log(err)
                        toast.error("error al actualizar el producto!");
                    })
                    .finally(()=>{
                        emitter.emit('cerrar_actualizar_cantidad_producto')

                        emitter.emit('cerrar_ventana_carga_inventario')

                        emitter.emit('actualizar_inventario')
                    })
            }
        }
    }
} 
</script>

<template>
    <section  class="  w-full h-[100vh] bg-[#444d639c] fixed  z-40 ">
       <div class="w-full  h-[390px] bg-white mt-[100%] ">
           <header class="w-full p-3 inline-flex border-b-[1.5px] border-b-[#DFDFDF]">
               <img  @click="cerrar_ventana"  class="w-[35px] mr-[25px]  order-1 cursor-pointer" src="/src/assets/iconos/interfaz/regresar.png" >
               <h2 class="text-[1.7rem] ml-[20px] order-2">Registrar cantidad</h2>
           </header>
           <div class="p-3">
               <h3 class="text-center text-[#9F9F9F]">Indique la cantidad a incrementar en: <span class="text-black">{{ datosActualizarCantidad.tipoVenta }}</span></h3>
               <input v-model="cantidad"  class="text-center w-[90%] ml-[5%] h-[70px] pl-2 mt-[30px] focus:border-[#FFB984] outline-none border-2 rounded"  type="number" step="any" placeholder="Ingrese la cantidad nueva aqui..." name="" id="inventario">
               <button @click="actualizar_cantidad_producto" class="w-[90%] ml-[5%] mt-[30px] text-[1.2rem] h-[60px] rounded text-white bg-[#FFB984]">Guardar</button>
           </div>
       </div>
       
   </section>
</template>