 
<script>
//modulo de bus de eventos globales
import { emitter } from '@/eventBus';

import axios from 'axios';

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    props:['ventaOperacion'], 

    data(){
        return{
            datosAnularVenta:{
            id_cliente:'',
            nombre_cliente:'',
            total_venta:'',
            detalles_productos:'',
            tipo_venta:''
            }
        }
    },
    methods:{
        close_anular_ventas() {
            emitter.emit('cerrar_anular_venta_informe')
        },
        anular_venta() {  
            emitter.emit('abrir_loader_carga_informe')

            //asignar los dator requeridos para anular la venta 
            this.datosAnularVenta.id_cliente=this.ventaOperacion.id_clientes,
            this.datosAnularVenta.nombre_cliente=this.ventaOperacion.nombre_cliente,
            this.datosAnularVenta.total_venta=this.ventaOperacion.total_venta,
            this.datosAnularVenta.detalles_productos=this.ventaOperacion.detalles_producto,
            this.datosAnularVenta.tipo_venta=this.ventaOperacion.tipo_venta

            console.log(this.datosAnularVenta)

            axios.post(`${import.meta.env.VITE_API_SERVER}anular-registro-venta/${this.ventaOperacion.id_ventas}`,this.datosAnularVenta)
            .then((response)=>{
                console.log(response)
                //notificar de que se elimino el registro 
                toast.success("se elimino el registro de la venta!");

            })
            .catch((error)=>{
                console.log(error)
                toast.error("error al eliminar el registro de la venta!");
            })
            .finally(()=>{

                //cerrar la ventana
                emitter.emit('cerrar_anular_venta_informe')

                emitter.emit('cerrar_loader_carga_informes')

                emitter.emit('actualizar_informe')

            })
        }
    }
}
</script>


<template>
      <section  class="  w-full h-[100vh] bg-[#444d639c] fixed -mt-[80px] z-40 ">
        <div class="w-[90%] ml-[5%] h-[250px] bg-white mt-[30%]">
            <header class="w-full p-3 inline-flex border-b-[1.5px] border-b-[#DFDFDF]">
                <img  @click="close_anular_ventas"  class="w-[35px] mr-[25px]  order-1 cursor-pointer" src="/src/assets/iconos/interfaz/regresar.png" >
                <h2 class="text-[1.7rem] ml-[10%] order-2">anular venta</h2>
            </header>
            <div class="p-3">
                <h3 class="text-center text-[#9F9F9F]">Esta seguro que desea anular esta venta?</h3>
                <button @click="anular_venta" class="w-[90%] ml-[5%] mt-[50px] text-[1.2rem] h-[60px] rounded text-white bg-[#CC0B09]">anular</button>
            </div>
        </div>
        
    </section>
</template>