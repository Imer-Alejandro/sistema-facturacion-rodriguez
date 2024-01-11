<script>
import CardCliente from './clientes.vue';

//importar el modulo de eventos globales 
import { emitter } from '@/eventBus';


export default {

    props: ['datosBusquedaCliente','termino_busqueda_cliente'],
    
    components:{
        'card-cliente':CardCliente,
    },
    data() {
        return{
 
        }
    },
    methods:{
        cerrar_modal_busquedad_cliente(){
            emitter.emit('cerrar_modal_busqueda_cliente')
        }
    }
}
</script>

<template>
    <section  class="  w-full h-[100vh] bg-[#444d639c] fixed  z-40 ">
        <div class="w-full h-[610px] bg-white mt-[45%]">
            <header class="w-full p-3 inline-flex border-b-[1.5px] border-b-[#DFDFDF]">
                <img  @click="cerrar_modal_busquedad_cliente"  class="w-[35px] mr-[25px]  order-1 cursor-pointer" src="/src/assets/iconos/interfaz/regresar.png" >
                <h2 class="text-[1.7rem] ml-[5px] order-2">Resultado busqueda</h2>
            </header>
            <div class=" pt-3 w-full">
                <h3 class="text-center ">Termino buscado: <span class="text-[#9F9F9F]">{{termino_busqueda_cliente}}</span> </h3>
                <div class=" p-2 mt-[40px] w-full pt-2 bg-[#eeeef1]">
                    <h3 class="text-[1.3rem]" >Clientes encontrados:</h3>
                    <div class="w-full pt-2 h-[400px] overflow-hidden overflow-y-scroll">
                        <div  class="inline-block" v-for="cliente in datosBusquedaCliente" :key="cliente.id_cliente"  >
                            <card-cliente :cliente="cliente"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </section>
</template>