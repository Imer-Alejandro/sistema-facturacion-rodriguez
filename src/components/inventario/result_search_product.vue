<script>
import producto from "./producto.vue";


//modulo de bus de eventos globales
import { emitter } from '@/eventBus';

import axios from 'axios';


export default {
    props:['dato_busqueda'],

    mounted(){
        this.buscar_productos()
    },

    components:{
        'producto': producto

    },
    data(){
        return{
            productos:[]
        }
    },
    methods:{
        close_resultado_producto() {
            emitter.emit('cerrar_busqueda_inventario')
        },
        //hacer la busqueda de los productos que coincidan con el termino buscado 
        buscar_productos(){
            emitter.emit('abrir_ventana_carga_inventario')

            axios.get(`https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/buscar-producto/${this.dato_busqueda}`)
            .then((response)=>{
                console.log(response.data)
                this.productos= response.data
            })
            .catch((err)=>{ 
                console.log(err)
            })
            .finally(()=>{
                emitter.emit('cerrar_ventana_carga_inventario')


            })
        }

    }
}
</script>


<template>
    <section  class="  w-full h-[100vh] bg-white fixed -mt-[80px] z-40 ">
        <header class="w-full p-3 inline-flex border-b-[1.5px] border-b-[#DFDFDF]">
            <img  @click="close_resultado_producto"  class="w-[35px] mr-[25px]  order-1 cursor-pointer" src="/src/assets/iconos/interfaz/regresar.png" >
            <h2 class="text-[1.5rem] order-2">Resultados de busqueda</h2>
        </header>
        <section class="p-2 pt-[20px] bg-slate-100">
            <h3  class="  text-[1.2rem]  mb-3 ">Termino de busqueda: <span class="text-[#9F9F9F]">{{this.dato_busqueda}}</span></h3>
        </section>

            <article class="p-2 mt-[20px]">
                <h3 class="  text-[1.2rem]  mb-[10px]">Productos encontrados: <span class="bg-[#647eff] p-1 rounded text-white">{{productos.length}}</span></h3>
                <div class="w-full h-[500px] overflow-hidden box-border overflow-y-scroll ">
                   
                   <div v-for="producto in productos" :key="producto.id">
                    <producto :producto="producto"/>
                   </div>
                    
                   

                </div>
            </article>
    </section>
</template>