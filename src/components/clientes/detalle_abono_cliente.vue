<script>
//importar el modulo de eventos globales 
import { emitter } from '@/eventBus';
import axios from 'axios';


export default {
        props:['id_abono_Operacion'],

        mounted(){
            this.buscar_registro_abono()
        },

        data(){
            return{
                datosRegistroAbono:[]
            }
        },

        methods:{
            cerrar_detalle_abono_cliente(){
                emitter.emit('cerrar_detalle_abono_cliente')
            },
            buscar_registro_abono(){
                emitter.emit('abrir_loader_carga_vista_cliente')

                 // Realiza la solicitud GET al servidor para obtener el registro de abono por id
                axios.get(`https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/abono-cliente/${this.id_abono_Operacion}`)
                    .then((response) => {
                    // El registro de abono se encuentra en response.data
                    this.datosRegistroAbono = response.data;
                     })
                    .catch((error) => {
                    console.error('Error al obtener el registro de abono por id', error);
                    })
                    .finally(()=>{
                        //cerrar la carga luego de crear el cliente
                        emitter.emit('cerrar_loader_carga_vista_cliente')
                    });
            }
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
                <span class="text-[#9F9F9F]">{{datosRegistroAbono.monto_abonado}}</span>
                <br><br>
                <h3 class="text-[1.3rem] mb-[10px]">Fecha del abono</h3>
                <span class="text-[#9F9F9F]">{{ datosRegistroAbono.fecha_abono }}</span>
                <br><br>
                <h3 class="text-[1.3rem] mb-[10px]">Comentario</h3>
                <p class="text-[#9F9F9F]">
                    {{datosRegistroAbono.Comentario}}
                </p>
               
            </div>
        </div>
        
    </section>
</template>