<script>
import CardProveedor from './card_proveedor_result.vue';
 
//importar el modulo de eventos globales 
import { emitter } from '@/eventBus';


export default {

    props: ['datosBusquedaProveedor','termino_busqueda_proveedor'],
    
    components:{
        'card-proveedor':CardProveedor,
    },
    data() {
        return{

        }
    },
    methods:{
        cerrar_busquedad_proveedores(){
            emitter.emit('cerrar_busqueda_proveedores')
        }
    }
}
</script>

<template>
    <section  class="  w-full h-[100vh] bg-[#444d639c] fixed  z-50 ">
        <div class="w-full h-[610px] bg-white mt-[45%]">
            <header class="w-full p-3 inline-flex border-b-[1.5px] border-b-[#DFDFDF]">
                <img  @click="cerrar_busquedad_proveedores"  class="w-[35px] mr-[25px]  order-1 cursor-pointer" src="/src/assets/iconos/interfaz/regresar.png" >
                <h2 class="text-[1.7rem] ml-[5px] order-2">Resultado busqueda</h2>
            </header>
            <div class=" pt-3 w-full">
                <h3 class="text-center ">Termino buscado: <span class="text-[#9F9F9F]">{{termino_busqueda_proveedor}}</span> </h3>
                <div class=" p-2 mt-[40px] w-full pt-2 bg-[#eeeef1]">
                    <h3 class="text-[1.3rem]" >Proveedor encontrados:</h3>
                    <div class="w-full pt-3 h-[400px] overflow-hidden overflow-y-scroll">

                        <div v-if="datosBusquedaProveedor.length > 0">
                            <div class="inline-block relative" v-for="proveedor in datosBusquedaProveedor" :key="proveedor.id_proveedores">
                                 <card-proveedor :proveedor="proveedor"/>
                            </div>
                        </div>
                        <div v-else>
                            <h3 class="text-[1.4rem] text-center"> no se encontraron proveedores...</h3>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        
    </section>
</template>