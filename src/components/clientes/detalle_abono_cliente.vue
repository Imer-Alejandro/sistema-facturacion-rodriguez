<script>
//importar el modulo de eventos globales 
import { emitter } from '@/eventBus';
import axios from 'axios';


export default {
        props:['abono_Operacion'],


        methods:{
            cerrar_detalle_abono_cliente(){
                emitter.emit('cerrar_detalle_abono_cliente')
            },
            
        }
}
</script>

<template>
         <section  class="  w-full h-[100vh] bg-[#444d639c] fixed  z-50 ">
        <div class="w-full  h-[550px] bg-white mt-[60%] ">
            <header class="w-full p-3 inline-flex border-b-[1.5px] border-b-[#DFDFDF]">
                <img @click="cerrar_detalle_abono_cliente"  class="w-[35px] mr-[25px]  order-1 cursor-pointer" src="/src/assets/iconos/interfaz/regresar.png" >
                <h2 class="text-[1.7rem] ml-[20px] order-2">Detalles del abono </h2>
            </header>
            <div class="p-2 mt-[30px] ">
                <h3 class="text-[1.3rem] mb-[10px]">Monto abonado</h3>
                <span class="text-[#9F9F9F]">{{abono_Operacion.monto_abonado}}</span>
                <br><br>
                <h3 class="text-[1.3rem] mb-[10px]">Fecha del abono</h3>
                <span class="text-[#9F9F9F]">{{ abono_Operacion.fecha_abono }}</span>
                <br><br>
                <h3 class="text-[1.3rem] mb-[10px]">Comentario</h3>
                <p class="text-[#9F9F9F]">
                    {{abono_Operacion.comentario}}
                </p>
               
            </div>
        </div>
        
    </section>
</template>