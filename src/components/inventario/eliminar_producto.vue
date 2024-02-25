<script>

//modulo de bus de eventos globales
import { emitter } from '@/eventBus';

import axios from 'axios';

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';




export default {
    props:['id_producto_indicado'],

    methods:{
        close_eliminar_producto() {
           emitter.emit('cerrar_eliminar_producto_inventario')
        },
        eliminar_producto(){
            emitter.emit('abrir_ventana_carga_inventario')
            
            axios.delete(`${import.meta.env.VITE_API_SERVER}eliminar-producto/${this.id_producto_indicado}`)
            .then(response =>{

                toast.success("se elimino el producto !");

                console.log(response)
            })
            .catch(error=>{ 
                
                toast.error("error al eliminar el producto!");

                console.log("Error", error);
            })
            .finally(()=>[
                emitter.emit('cerrar_ventana_carga_inventario'),

                emitter.emit('cerrar_eliminar_producto_inventario'),

                //actualizar inventario
                emitter.emit('actualizar_inventario')

            ]);
        }
    }
}
</script>

<template>
    <section  class="  w-full h-[100vh] bg-[#444d639c] fixed -mt-[80px] z-40 ">
        <div class="w-[90%] ml-[5%] h-[300px] bg-white mt-[30%]">
            <header class="w-full p-3 inline-flex border-b-[1.5px] border-b-[#DFDFDF]">
                <img  @click="close_eliminar_producto"  class="w-[35px] mr-[25px]  order-1 cursor-pointer" src="/src/assets/iconos/interfaz/regresar.png" >
                <h2 class="text-[1.7rem] order-2">eliminar producto</h2>
            </header>
            <div class="p-3">
                <h3 class="text-center text-[#9F9F9F]">Esta seguro que desea eliminar este producto?</h3>
                <button @click="eliminar_producto" class="w-[90%] ml-[5%] mt-[50px] text-[1.2rem] h-[60px] rounded text-white bg-[#CC0B09]">Eliminar</button>
            </div>
        </div>
        
    </section>
</template>