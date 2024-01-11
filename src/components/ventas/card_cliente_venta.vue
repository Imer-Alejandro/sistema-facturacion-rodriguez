<script>

//importamos el carrito global
import { useGlobalCarritoVenta } from '/src/stores/carrito';
const carritoStore = useGlobalCarritoVenta();

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import { emitter } from '@/eventBus';

export default {
    props:['clientes'],

    data(){
        return{
            datosCliente:{
                id_cliente:this.clientes.id_cliente,
                nombre:this.clientes.nombre_cliente,
                deuda:this.clientes.deuda
            }
        }
    },
    methods:{
        indicar_cliente(){
            carritoStore.asignar_cliente(this.datosCliente.id_cliente,this.datosCliente.nombre,this.datosCliente.deuda)

                emitter.emit('cerrar_modal_asignar_cliente')
                emitter.emit('mostrar_cliente_venta')

                
        }
    }
}
</script>

<template>
    <div class="   w-[150px] mb-[20px] mr-[20px] shadow-md shadow-[#0000001f]">
                   <button @click="indicar_cliente" class="btn-clientes outline-none w-full p-2 focus:border-[#2CF95C] focus:border-2 flex-col  
                    h-full flex text-center justify-center items-center">
                        <img class="w-[70px] h-[70px]" src="/src/assets/iconos/interfaz/tienda.png" alt="">
                        <h3 class="text-[1rem]">{{clientes.nombre_cliente}}</h3>
                   </button> 
    </div>
</template>

<style scoped>
.btn-clientes:focus{
    transition: 300ms;
    background:#2CF95C ;
    color:white;
}
</style>
