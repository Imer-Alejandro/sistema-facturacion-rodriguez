<script>
//modulo de bus de eventos globales
import { emitter } from '@/eventBus';

export default {
    props:['productos'],
    data(){
        return{
            producto:{
                id:this.productos.id_producto,
                cantidad:this.productos.cantidad_venta,
                stok:this.productos.cantidad_existente
            }
        }
    },
        methods:{
            abrir_modal_eliminar_producto_carrito(){
                emitter.emit('abrir_modal_eliminar_prod_carrito',this.productos.id_producto)
            },
            actualizar_cantidad_producto(){
                emitter.emit('abrir_actualizar_cantidad_producto',this.producto)
            }
        }
}
</script>

<template>

    <div class="flex w-full mb-[20px]">
        <button @click="abrir_modal_eliminar_producto_carrito"  class="w-[35px] h-[35px] z-30  bg-[#CC0B09] flex justify-center items-center mr-[10px] order-2 -ml-[20px]  -mt-[15px]  rounded shadow-md shadow-[#0000001f] ">
            <img class="w-[20px]  h-[20px]" src="/src/assets/iconos/interfaz/basura.png" alt="" srcset="">
        </button>

        <div class="w-[100%] z-10 relative order-1 flex p-2 pt-3 h-[160px] rounded-md mb-[15px] bg-white shadow-md shadow-[#0000001f]">
            <div class="w-[65px] flex  justify-center items-center  rounded h-[100%] bg-[#FF7850]" >
            <img class=" order-1 w-[40px] h-[40px]" :src="productos.icono">
            </div>
            <div class="order-2 pl-2 w-[170px] pt-2    mb-[3px]">
                <h3 class="font-medium mb-[5px] text-[0.9rem] text-[#E55226]">{{productos.nombre_producto}}</h3>
                
                <p class="text-[0.8rem] font-light mb-[4px]">
                    {{ productos.description }}
            </p>
 
                <div class="inline-flex">
                    <h3 class="text-[#858484] inline-flex text-[0.8rem] mr-[10px] mb-[5px]">Precio:<span class="text-[#FF7850] order-1">{{productos.precio_venta}}

                        </span>
                    </h3>
                    <h3 class="text-[#858484] text-[0.8rem] ">Cantidad:<span class="text-[#FF7850]">{{ productos.cantidad_existente }}</span></h3>
                </div>  
            </div>
            
        
            <div class="order-3 ml-[3px] w-[100px] border-l-2  pl-2 pt-3 ">
                <h3 class="text-[#9F9F9F] text-[0.8rem] text-center">Cantidad en <span class="text-black">
                    <h4 class="text-center text-[0.8rem]" v-if="productos.vender_por == 'libras'">libras</h4>
                        <h4 v-else class="text-[0.8rem] text-center" >unidades</h4>
                </span></h3>       
                <button @click="actualizar_cantidad_producto" title="editar cantidad a vender" class="h-[50px] focus:border-[#2CF95C] focus:border-2 border-2 outline-none mt-[10px] rounded box-border  text-center  w-[90px] mb-[8px]">
                    {{productos.cantidad_venta}}
                </button>         
                <h3 class="text-[0.9rem] text-center">Total: <span>{{ productos.total_producto }}</span></h3>
            </div>
        </div>
    </div>
   
</template>