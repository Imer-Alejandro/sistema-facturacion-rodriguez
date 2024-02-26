<script>
export default {
    setup() {
        
    },
}
</script> 

<template>
    <div class="w-full h-[80px]  mb-[20px] relative rounted p-2 rounded  flex shadow-md shadow-[#0000001f]">
        <div class="order-1 flex mr-[10px] items-center">
            <button class=" flex justify-center items-center bg-[#A6F988] rounded w-[80px] h-[50px]">
                <img class="w-[35px] h-[35px]" src="/src/assets/iconos/interfaz/boton-agregar.png" alt="">
            </button>
        </div> 

        <div class="order-2 h-full pt-[10px] w-[300px] border-l-2 pl-[10px] flex  flex-col ">
            <h3 class="mb-[5px]">total deuda: <span class="text-[#E91513] ">12,500</span></h3>
            <h4 class="text-[#515151]">Fecha credito: <span class="text-[#9F9F9F] text-[0.9rem]">Nov 5 2023 </span></h4>
        </div>

        <button class="order-3  flex justify-center items-center   ml-[10px] h-full w-[50px] ">
            <img  class="w-[40px] h-[40px]" src="/src/assets/iconos/interfaz/navegacion.png" alt="" srcset="">
        </button>
               
        <div class=" optiones_ventas  overflow-hidden  w-[140px] z-[2] h-[120px] bg-[#f7f8ff] flex-none absolute rounded shadow-md shadow-[#00000031] ml-[45%] mt-[20px]">
            <ul>

                <li  @click="abrir_detalle_abono_cliente"  class=" p-2 cursor-pointer border-b-[#DFDFDF]  border-b-[2px] ">
                    <button >
                        <span class="text-[1rem]">Ver detalles</span>
                    </button>
                    
                </li>

                <li  @click="abrir_editar_abono_cliente"  class=" p-2 cursor-pointer border-b-[#DFDFDF]  border-b-[2px] ">
                    <button >
                        <span class="text-[1rem]">historial de abonos</span>
                    </button>
                    
                </li>

                <li @click="abrir_ventana_eliminar_abono_cliente"  class=" p-2 cursor-pointer border-b-[#DFDFDF]  border-b-[2px] ">
                    <button class="outline-none" >
                        <span class="text-[1rem]">Anular venta</span>
                    </button>
                    
                </li>

                
            </ul>
          </div>
    </div>

</template>

<style  scoped>

</style>