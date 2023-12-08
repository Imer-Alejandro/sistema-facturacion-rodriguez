<script>


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
            emitter.emit('cliente_asignado_venta',this.datosCliente)
        }
    }
}
</script>

<template>
    <div class="   w-[150px] mb-[20px] mr-[20px] shadow-md shadow-[#0000001f]">
                   <button @click="indicar_cliente" class="outline-none w-full  focus:border-[#2CF95C] focus:border-2 flex-col  
                    h-full flex text-center justify-center items-center">
                        <img class="w-[70px] h-[70px]" src="/src/assets/iconos/interfaz/tienda.png" alt="">
                        <h3 class="text-[1rem]">{{clientes.nombre_cliente}}</h3>
                   </button> 
    </div>
</template>