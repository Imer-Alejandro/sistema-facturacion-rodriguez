<script>
//modulo de bus de eventos globales
import { emitter } from '@/eventBus';

import axios from 'axios';

export default {

    

    data(){
        return{
            
        }
    },

   
   methods:{

  

    //cargar los productos por categoria 
        todos_producto(){
            emitter.emit('abrir_ventana_carga_ventas')

            axios.get(`${import.meta.env.VITE_API_SERVER}productos`)
                .then(response =>{
                    emitter.emit('categoria_ventas',response.data)


                })
                .catch((error)=>{
                    console.log(error)
                
                })
                .finally(()=>{
                     emitter.emit('cerrar_ventana_carga_ventas')
                })

        },
 
        buscar_categoria(categoria){
            emitter.emit('abrir_ventana_carga_ventas')

            axios.get(`${import.meta.env.VITE_API_SERVER}productos-por-categoria/${categoria}`)
            .then((response)=>{
                console.log(response)
                //enviar el nuevo listado de productos correspondiente a la categoria 
                emitter.emit('categoria_ventas',response.data)
            })
            .catch((err)=>{
                console.log('error al obtener categoria', err)
            })
            .finally(()=>{
                //cerrar ventana carga
                emitter.emit('cerrar_ventana_carga_ventas')
            })
        }
        

        
       
   }
}
</script>


<template>
    <article class="p-2 w-full h-[130px] ">
            <h3 class="text-[1.5rem] mb-1">Categorias</h3>
            <div class="flex  h-full overflow-hidden overflow-x-scroll box-border p-2 ">
                <div class="h-full inline-flex">
                        
                    <button @click="todos_producto" class="w-[160px] h-[80px] mr-4 rounded-md shadow-md shadow-[#0000001f] 
                    p-2 outline-none focus:bg-[#FFB175] bg-white text-black focus:text-white">
                        <div class="  flex cursor-pointer  w-full h-full   ">
                            <div class="order-1 items-center flex justify-center p-1 bg-[#FFB984] rounded w-[60px] h-[60px] mt-[5px]">
                                <img class="w-[45px] h-[45px] " src="/icons/productos/donacion-de-alimentos.png">
                            </div>

                            <div class="order-2 p-1 ">
                                <h2 class="text-[1.3rem] ml-[5px] font-medium mt-[15px]">Todos</h2>
                            </div>
                        </div>
                    </button>
                   


                    <button @click="buscar_categoria('embutidos')" class="w-[160px] h-[80px] mr-4 rounded-md shadow-md shadow-[#0000001f] 
                    p-2 outline-none focus:bg-[#FFB175] bg-white text-black focus:text-white">

                        <div class=" w-full h-full flex cursor-pointer   ">
                            <div class="order-1 items-center flex justify-center p-1 bg-[#FFB984] rounded w-[60px] h-[60px] mt-[5px]">
                                <img class="w-[45px] h-[45px] " src="/src/assets/iconos/interfaz/categoria_productos/embutidos.png">
                            </div>

                            <div class="order-2 p-1 ">
                                <h2 class="text-[1.1rem]  ml-[5px] font-medium mt-[20px]">Embutidos</h2>
                            </div>
                        </div>
                    </button>


                    <button @click="buscar_categoria('carnes')" class="w-[160px] h-[80px] mr-4 rounded-md shadow-md shadow-[#0000001f] 
                    p-2 outline-none focus:bg-[#FFB175] bg-white text-black focus:text-white">

                            <div class=" w-full h-full flex cursor-pointer ">
                                <div class="order-1 items-center flex justify-center p-1 bg-[#FFB984] rounded w-[60px] h-[60px] mt-[5px]">
                                    <img class="w-[45px] h-[45px] " src="/src/assets/iconos/interfaz/categoria_productos/carne.png">
                                </div>

                                <div class="order-2 p-1 ">
                                    <h2 class="text-[1.3rem]  ml-[5px] font-medium mt-[15px]">Carnes</h2>
                                </div>
                            </div>
                        </button>



                        <button @click="buscar_categoria('ahumados')" class="w-[160px] h-[80px] mr-4 rounded-md shadow-md shadow-[#0000001f] 
                    p-2 outline-none focus:bg-[#FFB175] bg-white text-black focus:text-white">

                            <div class=" w-full h-full flex cursor-pointer">
                                <div class="order-1 items-center flex justify-center p-1 bg-[#FFB984] rounded w-[60px] h-[60px] mt-[5px]">
                                    <img class="w-[45px] h-[45px] " src="/src/assets/iconos/interfaz/categoria_productos/picar.png">
                                </div>

                                <div class="order-2 p-1 ">
                                    <h2 class="text-[1.1rem]  ml-[5px] font-medium mt-[15px]">Ahumados</h2>
                                </div>
                            </div>
                        </button>

                        <button @click="buscar_categoria('cortes')" class="w-[160px] h-[80px] mr-4 rounded-md shadow-md shadow-[#0000001f] 
                    p-2 outline-none focus:bg-[#FFB175] bg-white text-black focus:text-white">

                            <div class=" w-full h-full flex cursor-pointer">
                                <div class="order-1 items-center flex justify-center p-1 bg-[#FFB984] rounded w-[60px] h-[60px] mt-[5px]">
                                    <img class="w-[45px] h-[45px] " src="/src/assets/iconos/interfaz/categoria_productos/cortar.png">
                                </div>

                                <div class="order-2 p-1 ">
                                    <h2 class="text-[1.3rem]  ml-[5px] font-medium mt-[15px]">Cortes</h2>
                                </div>
                            </div>
                        </button>

                        <button @click="buscar_categoria('variados')" class="w-[160px] h-[80px] mr-4 rounded-md shadow-md shadow-[#0000001f] 
                    p-2 outline-none focus:bg-[#FFB175] bg-white text-black focus:text-white">

                        <div class="  w-full h-full flex cursor-pointer">
                            <div class="order-1 items-center flex justify-center p-1 bg-[#FFB984] rounded w-[60px] h-[60px] mt-[5px]">
                                <img class="w-[45px] h-[45px] " src="/src/assets/iconos/interfaz/categoria_productos/carniceria.png">
                            </div>

                            <div class="order-2 p-1 ">
                                <h2 class="text-[1.3rem]  ml-[5px] font-medium mt-[15px]">Variados</h2>
                            </div>
                        </div>
                    </button>
                          
                </div>
            </div>
        </article>
</template>