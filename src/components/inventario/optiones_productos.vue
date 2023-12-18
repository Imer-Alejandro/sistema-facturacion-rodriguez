<script>
import { emitter } from '@/eventBus';

export default {

    props:['producto'],
    
    methods:{
        detail_product(){
            emitter.emit('abrir_detalle_productos', this.producto);
        },
        edit_product(){
            emitter.emit('abrir_editar_productos', this.producto);
        },
        delete_product(){
            emitter.emit('abrir_eliminar-producto_inventario', this.producto.id);

        }
    } 
}
</script>

<template>
      <div class=" optiones_ventas  overflow-hidden w-[150px] z-0 h-[130px] bg-[#f7f8ff] absolute rounded shadow-md shadow-[#00000031] ml-[43%] mt-[20px]">
            <ul>
                <li @click="detail_product"  class=" p-2 cursor-pointer border-b-[#DFDFDF]  border-b-[2px] ">
                    <button >
                        <span class="text-[1rem]">detalles</span>
                         <img class="w-[20px] absolute ml-[70%] -mt-[23px]" src="/src/assets/iconos/interfaz/detalle_venta.png">
                    </button>
                    
                </li>

                <li @click="edit_product" class="border-b-[#DFDFDF]  border-b-[2px] p-2 cursor-pointer">
                    <button>
                        <span class="text-[1rem]">Editar</span>
                        <img class="w-[20px] ml-[70%] -mt-[23px] absolute" src="/src/assets/iconos/interfaz/editar_venta.png" >
                    </button>
                </li>

                <li @click="delete_product" class=" p-2 cursor-pointer">
                 <button>
                    <span class="text-[1rem]">Eliminar</span>
                    <img class="w-[20px] absolute ml-[70%] -mt-[23px]" src="/src/assets/iconos/interfaz/anular_venta.png" >
                 </button>
                </li>
            </ul>
          </div>
</template>