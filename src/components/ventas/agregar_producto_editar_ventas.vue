
<script>

import { emitter } from '@/eventBus';

import axios from 'axios';

export default {

    methods:{
        close_modal_agregar_producto() {
            emitter.emit('cerrar_agregar_producto_registro_venta')
        }
    }
}
</script>

<template>
    <div  class=" w-full h-[100vh] bg-[#444d639c]  fixed z-50  ">
        <div class="w-full h-[90%] bg-white mt-[30%]">
                <header class="w-full p-3 inline-flex border-b-[1.5px] border-b-[#DFDFDF]">
                    <img  @click="close_modal_agregar_producto"  class="w-[35px] mr-[25px]  order-1 cursor-pointer" src="/src/assets/iconos/interfaz/regresar.png" >
                    <h2 class="text-[1.7rem] ml-[20px] order-2">Agregar producto</h2>
                </header>

            <div class="p-3 w-full">
                <input  class="w-[100%] h-[60px] rounded outline-0 pl-2  shadow-md shadow-[#0000001f] placeholder:text-[0.8rem]
                placeholder:italic"
                type="text"  placeholder="Buscar producto por: nombre, precio, id, categoria..." >
                <img   class="w-[40px] -mt-[50px] cursor-pointer border-l-[2px]  border-[#DFDFDF] ml-[80%] absolute" src="/src/assets/iconos/interfaz/icono_buscador.png" >
            </div>

            <article class="p-2 w-full h-[130px] ">
                <h3 class="text-[1.5rem] mb-1">Categorias</h3>
                <div class="flex  h-full overflow-hidden overflow-x-scroll box-border p-2 ">
                    <div class="h-full inline-flex">
                        
                        <div class=" w-[160px] p-2 flex cursor-pointer h-[80px] bg-[#FFB175] mr-4 rounded-md shadow-md shadow-[#0000001f]">
                            <div class="order-1 items-center flex justify-center p-1 bg-[#FFB984] rounded w-[60px] h-[60px] mt-[5px]">
                                <img class="w-[45px] h-[45px] " src="/icons/productos/donacion-de-alimentos.png">
                            </div>

                            <div class="order-2 p-1 ">
                                <h2 class="text-[1.3rem] text-white ml-[5px] font-medium mt-[15px]">Todos</h2>
                            </div>
                        </div>



                        <div class=" w-[180px] p-2 flex cursor-pointer h-[80px] bg-white mr-4 rounded-md shadow-md shadow-[#0000001f]">
                            <div class="order-1 items-center flex justify-center p-1 bg-[#FFB984] rounded w-[60px] h-[60px] mt-[5px]">
                                <img class="w-[45px] h-[45px] " src="/src/assets/iconos/interfaz/categoria_productos/embutidos.png">
                            </div>

                            <div class="order-2 p-1 ">
                                <h2 class="text-[1.3rem]  ml-[5px] font-medium mt-[15px]">Embutidos</h2>
                            </div>
                        </div>

                        <div class=" w-[160px] p-2 flex cursor-pointer h-[80px] bg-white mr-4 rounded-md shadow-md shadow-[#0000001f]">
                            <div class="order-1 items-center flex justify-center p-1 bg-[#FFB984] rounded w-[60px] h-[60px] mt-[5px]">
                                <img class="w-[45px] h-[45px] " src="/src/assets/iconos/interfaz/categoria_productos/carne.png">
                            </div>

                            <div class="order-2 p-1 ">
                                <h2 class="text-[1.3rem]  ml-[5px] font-medium mt-[15px]">Carnes</h2>
                            </div>
                        </div>

                        <div class=" w-[170px] p-2 flex cursor-pointer h-[80px] bg-white mr-4 rounded-md shadow-md shadow-[#0000001f]">
                            <div class="order-1 items-center flex justify-center p-1 bg-[#FFB984] rounded w-[60px] h-[60px] mt-[5px]">
                                <img class="w-[45px] h-[45px] " src="/src/assets/iconos/interfaz/categoria_productos/camaron.png">
                            </div>

                            <div class="order-2 p-1 ">
                                <h2 class="text-[1.3rem] t ml-[5px] font-medium mt-[15px]">Mariscos</h2>
                            </div>
                        </div>

                        <div class=" w-[180px] p-2 flex cursor-pointer h-[80px] bg-white mr-4 rounded-md shadow-md shadow-[#0000001f]">
                            <div class="order-1 items-center flex justify-center p-1 bg-[#FFB984] rounded w-[60px] h-[60px] mt-[5px]">
                                <img class="w-[45px] h-[45px] " src="/src/assets/iconos/interfaz/categoria_productos/picar.png">
                            </div>

                            <div class="order-2 p-1 ">
                                <h2 class="text-[1.3rem]  ml-[5px] font-medium mt-[15px]">Ahumados</h2>
                            </div>
                        </div>

                        <div class=" w-[160px] p-2 flex cursor-pointer h-[80px] bg-white mr-4 rounded-md shadow-md shadow-[#0000001f]">
                            <div class="order-1 items-center flex justify-center p-1 bg-[#FFB984] rounded w-[60px] h-[60px] mt-[5px]">
                                <img class="w-[45px] h-[45px] " src="/src/assets/iconos/interfaz/categoria_productos/cortar.png">
                            </div>

                            <div class="order-2 p-1 ">
                                <h2 class="text-[1.3rem]  ml-[5px] font-medium mt-[15px]">Cortes</h2>
                            </div>
                        </div>

                        <div class=" w-[180px] p-2 flex cursor-pointer h-[80px] bg-white mr-4 rounded-md shadow-md shadow-[#0000001f]">
                            <div class="order-1 items-center flex justify-center p-1 bg-[#FFB984] rounded w-[60px] h-[60px] mt-[5px]">
                                <img class="w-[45px] h-[45px] " src="/src/assets/iconos/interfaz/categoria_productos/carniceria.png">
                            </div>

                            <div class="order-2 p-1 ">
                                <h2 class="text-[1.3rem]  ml-[5px] font-medium mt-[15px]">Variados</h2>
                            </div>
                        </div>  
                     </div>
                </div>
            </article>

            <section class="p-1 mt-[50px] w-full h-[300px] overflow-hidden">
                <h3 class="text-[1.5rem]">Productos</h3>
                <div class="w-full h-[300px] overflow-y-scroll pb-[100px] p-2">

                    <!-- estos productos se creararan de forma dinamica como resultado de la 
                    busqueda directa o el desglose de categoria. -->

                    <div class="w-[100%] relative flex p-2 pt-3 h-[120px] rounded-md mb-[15px] bg-[#f5f5f5] shadow-md  shadow-[#00000033]">
                        <div class="w-[60px] flex  justify-center items-center mt-[1%] rounded h-[90%] bg-[#FF7850]" >
                            <img class=" order-1 w-[40px] h-[40px]" src="/icons/productos/costillas.png">
                        </div>
                        <div class="order-2 pl-1 w-[165px]  mb-[5px]">
                            <h3 class=" mb-[10px] font-medium text-[#E55226]">nombre del producto como identidad</h3>

                            <h3 class="text-[#858484] mr-[10px]">Precio:<span class="text-[#FF7850]">650/lb</span></h3>  
                        </div>
                        <div class="order-3 w-[65px] h-full">
                            <input class="w-[100%] h-[90%] p-1 outline-none rounded placeholder:text-[0.8rem] " type="number" name="" placeholder="Cantidad" id="">
                        </div>

                        <!-- se debe confirmar que el producto a agregar al registro de ventas verificar 
                        que el campo de cantidad del producto no este vacio y que la cantidad ingresada
                        no supera a las del inventario -->

                        <div class="order-4 w-[60px] flex ml-[4px] h-[90%]  justify-center items-center">
                            <button>
                                <img class="w-[45px] h-[45px]" src="/src/assets/iconos/interfaz/anadir-al-carrito.png" alt="" srcset="">
                            </button>
                        </div>
                    </div>

                    

                   

                 </div>
            </section>
        </div>
    </div>

</template>