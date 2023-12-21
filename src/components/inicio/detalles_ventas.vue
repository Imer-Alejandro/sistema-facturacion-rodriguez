<script>
//modulo de bus de eventos globales
import { emitter } from '@/eventBus';

export default {
    props:['ventaOperacion'],


    methods:{
        close_detalle_ventas() {
            emitter.emit('cerrar_detalles_venta_inicio')
        }
    },

   
} 
</script>

<template>



    <section  class="  w-full h-[100vh] bg-white fixed -mt-[80px] z-40 ">
        <header class="w-full p-3 mb-[20px] inline-flex border-b-[1.5px] border-b-[#DFDFDF]">
            <img @click="close_detalle_ventas" class="w-[35px] mr-[25px]  order-1 cursor-pointer" src="/src/assets/iconos/interfaz/regresar.png" >
            <h2 class="text-[1.7rem] ml-[5%] order-2">Detalles de venta</h2>
        </header>
        

        <div class="w-full pl-2 pb-2 border-b-[1.5px] pt-2 inline-flex border-b-[#DFDFDF]">
            <h3 class="text-[1.2rem] order-1 font-medium mb-[10px]">fecha: </h3> <span class="font-normal order-2  text-[1.2rem] ml-[10%] text-[#363636]">{{ventaOperacion.fecha}}</span>
        </div>
        <div class="w-full pl-2 pb-2 border-b-[1.5px] pt-2 inline-flex border-b-[#DFDFDF]">
            <h3 class="text-[1.2rem] order-1 font-medium mb-[10px]">Tipo de venta: </h3> <span class="font-normal order-2  text-[#363636] text-[1.2rem] ml-[10%] ">{{ventaOperacion.tipo_venta}}</span>
        </div>
        <div class="w-full pl-2 pb-2 border-b-[1.5px] pt-2 inline-flex border-b-[#DFDFDF]">
            <h3 class="text-[1.2rem] order-1 font-medium mb-[10px]">Cliente: </h3> <span class="font-normal order-2  text-[#363636] text-[1.2rem] ml-[10%] ">{{ventaOperacion.nombre_cliente}}</span>
        </div>
        <div class="w-full pl-2 pb-2 pr-2 border-b-[1.5px] pt-2 inline-flex border-b-[#DFDFDF]">
            <h3 class="text-[1.2rem] order-1 font-medium mb-[10px]">Comentario: </h3> <span class="font-normal text-[#363636] order-2  text-[1.1rem] ml-[8%] ">{{ ventaOperacion.comentario }}</span>
        </div>

        <div class="p-2 w-full h-[300px] overflow-hidden ">
            <h3 class="text-[1.1rem] font-medium">Detalles de productos</h3>
            
            <div class="w-full h-full overflow-scroll">
                <div class="w-[130%] ">
                    <table class=" styled-table  "> 
                <thead> 
                    <tr> 
                        <th>Icono</th> 
                        <th>Nombre</th> 
                        <th>Precio</th> 
                        <th>Cantidad</th> 
                        <th>Total</th> 
                    </tr> 
                </thead> 
                <tbody> 
                    <tr v-for=" venta in JSON.parse(ventaOperacion.detalles_producto )" :key="venta.id_producto"> 
                        <td>
                            <img class="w-[45px] h-[45px]" :src="venta.icono">
                        </td> 
                        <td>{{venta.nombre_producto}}</td> 
                        <td>{{venta.precio_venta}}</td> 
                        <td>{{venta.cantidad_venta}}</td> 
                        <td>{{venta.total_producto.toLocaleString('en-US', { style: 'decimal', useGrouping: true, maximumFractionDigits: 2 })}}</td> 
                    </tr>  
                    
                </tbody> 
            </table>
                </div>
              
            </div>
            
        </div>
        <div class="w-full border-b-[1.5px] bg-white mt-[30px] p-3 inline-flex border-b-[#DFDFDF]">
            <h3 class="text-[1.4rem] order-1 font-medium mb-[10px]">Total de la venta: </h3> <span class="font-normal order-2  text-[1.4rem] ml-[10%] text-[#E55226]">{{ventaOperacion.total_venta.toLocaleString('en-US', { style: 'decimal', useGrouping: true, maximumFractionDigits: 2 })}}</span>
        </div>
    </section>
   
</template>


<style scoped>

.styled-table{
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 1.1em;
    font-family: sans-serif;
    min-width: 450px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);    
}
.styled-table thead tr{
    background-color: #6a92ff; 
    color: #ffffff; 
    text-align: middle;
}

.styled-table th, .styled-table td {
    padding: 12px 15px;
}

.styled-table tbody tr{
    border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr:nth-of-type(even){
    background-color: #f3f3f3;
}

.styled-table tbody tr:last-of-type {
    border-bottom: 2px solid #009879; 
}

</style>