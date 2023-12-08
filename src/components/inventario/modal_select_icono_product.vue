
<script>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

//modulo de bus de eventos globales
import { emitter } from '@/eventBus';

export default {
    props:['url_icono_producto'],

    mounted(){

       
    
        //validar que la url del icono por paramatro en el area de editar existe
        if(this.url_icono_producto != '') {
            this.url_icono=this.url_icono_producto
        }else{
            this.url_icono='/icons/productos/deforul_icono.png'
        }
    },

    data(){
        return{
            //datos del icono selecionados
            nombre_icono:'Ninguno...',
            url_icono:'/icons/productos/deforul_icono.png',

        }
    },

    
    methods:{

        cerrar_modal_icono_producto(){
            emitter.emit('cerrar_modal_icono_producto')
            this.guardar_url_icono()
        },
        /* 
        esta funcion se encarga se tomar la ruta del icono y el nombre, para agregarlo al objeto
        que se enviara al servidor junto con los demas datos del nuevo producto creado,
        */
       guardar_url_icono(){

        //validar que se seleciono un icono diferente al por defecto
            if (this.url_icono != '/icons/productos/deforul_icono.png ') {
            //asignar url al dato icono del objeto de crear productos en el formularo
                emitter.emit('icono_producto_asignado',this.url_icono)
                //cerrar ventana
                emitter.emit('cerrar_modal_icono_producto')
            }else{
                toast.warn("Debe selecionar un icono !");
            }
       },

       //actualizar la data del icono selecionado
       optener_url_icono(url_registro,nombre){

            //asignar la url del icono a registrar del
            this.url_icono=url_registro;
            //actualizar el nombre del icono
            this.nombre_icono=nombre;
       },

       eleminar_icono_selecionado(){
            //eliminar url del icono del dato icono dle  objeto de crear producto 

            //actualizar datos del icono 
            this.nombre_icono='Ninguno...';

            this.url_icono='/icons/productos/deforul_icono.png'
       }
       
    }
}
</script>


<template>
    <section  class="  w-full h-[100vh] bg-[#444d639c] fixed  z-40 ">
        <div class="w-full  h-[100vh] bg-white  ">
            <header class="w-full p-3 inline-flex border-b-[1.5px] border-b-[#DFDFDF]">
                <img  @click="cerrar_modal_icono_producto" class="w-[35px] mr-[25px]  order-1 cursor-pointer" src="/src/assets/iconos/interfaz/regresar.png" >
                <h2 class="text-[1.7rem] ml-[30px] order-2">Selecionar icono</h2>
            </header>
            <div class="text-center  pt-2 flex-col justify-center items-center flex">
                <h3  class="mb-1 text-[1.3rem] text-[#9F9F9F]">Icono seleccionado</h3>
                <span class="mb-2">{{ nombre_icono }}</span>
                <div class="w-[150px] justify-center items-center flex rounded shadow-md shadow-[#0000001f] h-[100px]">
                    <button @click="eleminar_icono_selecionado"  class="bg-[#CC0B09] justify-center items-center flex w-[30px] rounded absolute ml-[35%] -mt-[20%] h-[30px]">
                        <img class="w-[20px] h-[20px]" src="/src/assets/iconos/interfaz/basura.png" alt="" srcset="">
                    </button>
                    <img :src="url_icono" alt="" srcset="">
                </div>
            </div>

            <article class="w-full shadow-md pl-[20px]  overflow-y-scroll mt-[20px] p-2 shadow-[#0000001f] h-[400px] border-[#9F9F9F] border-[1px]">
                
                <div class="w-[105px] inline-block h-[120px] mb-[20px]  mr-[15px] shadow-[#0000001f] shadow-lg">

                    <button @click="optener_url_icono('/icons/productos/chuleta.png','chuleta')" class="w-full flex justify-center items-center h-full focus:border-[#2CF95C] focus:border-2">
                        <img src="/icons/productos/chuleta.png"  alt="chuleta" srcset="">
                    </button>
                </div>

                <div class="w-[105px] inline-block h-[120px] mb-[20px]  mr-[15px] shadow-[#0000001f] shadow-lg">

                <button @click="optener_url_icono('/icons/productos/costillas_chulta_2.png','chuleta')" class="w-full flex justify-center items-center h-full focus:border-[#2CF95C] focus:border-2">
                    <img src="/icons/productos/costillas_chulta_2.png"  alt="chuleta" srcset="">
                </button>
                </div>

                <div class="w-[105px] inline-block h-[120px] mb-[20px]  mr-[15px] shadow-[#0000001f] shadow-lg">

                <button @click="optener_url_icono('/icons/productos/chuleta_3.png','chuleta')" class="w-full flex justify-center items-center h-full focus:border-[#2CF95C] focus:border-2">
                    <img src="/icons/productos/chuleta_3.png"  alt="chuleta" srcset="">
                </button>
                </div>

                <div class="w-[105px] inline-block h-[120px] mb-[20px]  mr-[15px] shadow-[#0000001f] shadow-lg">

                <button @click="optener_url_icono('/icons/productos/chuleta_4.png','chuleta')" class="w-full flex justify-center items-center h-full focus:border-[#2CF95C] focus:border-2">
                    <img src="/icons/productos/chuleta_4.png"  alt="chuleta" srcset="">
                </button>
                </div>
                

                <div class="w-[105px] inline-block h-[120px] mb-[20px]  mr-[15px] shadow-[#0000001f] shadow-lg">

                    <button @click="optener_url_icono('/icons/productos/carne.png','carne')" class="w-full flex justify-center items-center h-full focus:border-[#2CF95C] focus:border-2">
                        <img src="/icons/productos/carne.png"  alt="carne" srcset="">
                    </button>
                </div>

                <div class="w-[105px] inline-block h-[120px] mb-[20px]  mr-[15px] shadow-[#0000001f] shadow-lg">

                <button @click="optener_url_icono('/icons/productos/carne_2.png','carne')" class="w-full flex justify-center items-center h-full focus:border-[#2CF95C] focus:border-2">
                    <img src="/icons/productos/carne_2.png"  alt="carne" srcset="">
                </button>
                </div>

                <div class="w-[105px] inline-block h-[120px] mb-[20px]  mr-[15px] shadow-[#0000001f] shadow-lg">

                    <button @click="optener_url_icono('/icons/productos/costillas.png','costillas')" class="w-full flex justify-center items-center h-full focus:border-[#2CF95C] focus:border-2">
                        <img src="/icons/productos/costillas.png"  alt="costillas" srcset="">
                    </button>
                </div>

                
                <div class="w-[105px] inline-block h-[120px] mb-[20px]  mr-[15px] shadow-[#0000001f] shadow-lg">

                    <button @click="optener_url_icono('/icons/productos/costillas_3.png','costillas')" class="w-full flex justify-center items-center h-full focus:border-[#2CF95C] focus:border-2">
                        <img src="/icons/productos/costillas_3.png"  alt="costillas" srcset="">
                    </button>
                </div>

                                
                <div class="w-[105px] inline-block h-[120px] mb-[20px]  mr-[15px] shadow-[#0000001f] shadow-lg">

                    <button @click="optener_url_icono('/icons/productos/costillas_4.png','costillas')" class="w-full flex justify-center items-center h-full focus:border-[#2CF95C] focus:border-2">
                        <img src="/icons/productos/costillas_4.png"  alt="costillas" srcset="">
                    </button>
                </div>


                <div class="w-[105px] inline-block h-[120px] mb-[20px]  mr-[15px] shadow-[#0000001f] shadow-lg">

                    <button @click="optener_url_icono('/icons/productos/huevos-blancos.png','huevos blancos')" class="w-full flex justify-center items-center h-full focus:border-[#2CF95C] focus:border-2">
                        <img src="/icons/productos/huevos-blancos.png"  alt="huevos blancos" srcset="">
                    </button>
                </div>

                <div class="w-[105px] inline-block h-[120px] mb-[20px]  mr-[15px] shadow-[#0000001f] shadow-lg">

                    <button @click="optener_url_icono('/icons/productos/huevos-criollo.png','huevos criollos')" class="w-full flex justify-center items-center h-full focus:border-[#2CF95C] focus:border-2">
                        <img src="/icons/productos/huevos-criollo.png"  alt="huevos criollos" srcset="">
                    </button>
                </div>

                <div class="w-[105px] inline-block h-[120px] mb-[20px]  mr-[15px] shadow-[#0000001f] shadow-lg">

                    <button @click="optener_url_icono('/icons/productos/jamon_1.png','jamon')" class="w-full flex justify-center items-center h-full focus:border-[#2CF95C] focus:border-2">
                        <img src="/icons/productos/jamon_1.png"  alt="jamon" srcset="">
                    </button>
                </div>

                <div class="w-[105px] inline-block h-[120px] mb-[20px]  mr-[15px] shadow-[#0000001f] shadow-lg">

                    <button @click="optener_url_icono('/icons/productos/jamoneta.png','jamoneta')" class="w-full flex justify-center items-center h-full focus:border-[#2CF95C] focus:border-2">
                        <img src="/icons/productos/jamoneta.png"  alt="jamon" srcset="">
                    </button>
                </div>


                <div class="w-[105px] inline-block h-[120px] mb-[20px]  mr-[15px] shadow-[#0000001f] shadow-lg">

                    <button @click="optener_url_icono('/icons/productos/jamon_4.png','jamon')" class="w-full flex justify-center items-center h-full focus:border-[#2CF95C] focus:border-2">
                        <img src="/icons/productos/jamon_4.png"  alt="jamon" srcset="">
                    </button>
                </div>

                <div class="w-[105px] inline-block h-[120px] mb-[20px]  mr-[15px] shadow-[#0000001f] shadow-lg">

                    <button @click="optener_url_icono('/icons/productos/jamon_2.png','pierna de jamon')" class="w-full flex justify-center items-center h-full focus:border-[#2CF95C] focus:border-2">
                        <img src="/icons/productos/jamon_2.png"  alt="jamon" srcset="">
                    </button>
                </div>

                <div class="w-[105px] inline-block h-[120px] mb-[20px]  mr-[15px] shadow-[#0000001f] shadow-lg">
                    <button @click="optener_url_icono('/icons/productos/longaniza.png','longaniza')" class="w-full flex justify-center items-center h-full focus:border-[#2CF95C] focus:border-2">
                        <img src="/icons/productos/longaniza.png"  alt="longaniza" srcset="">
                    </button>
                </div>

                
                <div class="w-[105px] inline-block h-[120px] mb-[20px]  mr-[15px] shadow-[#0000001f] shadow-lg">
                    <button @click="optener_url_icono('/icons/productos/loganiza_2.png','longaniza')" class="w-full flex justify-center items-center h-full focus:border-[#2CF95C] focus:border-2">
                        <img src="/icons/productos/loganiza_2.png"  alt="longaniza" srcset="">
                    </button>
                </div>

                <div class="w-[105px] inline-block h-[120px] mb-[20px]  mr-[15px] shadow-[#0000001f] shadow-lg">
                    <button @click="optener_url_icono('/icons/productos/longaniza_4.png','longaniza')" class="w-full flex justify-center items-center h-full focus:border-[#2CF95C] focus:border-2">
                        <img src="/icons/productos/longaniza_4.png"  alt="longaniza" srcset="">
                    </button>
                </div>

                <div class="w-[105px] inline-block h-[120px] mb-[20px]  mr-[15px] shadow-[#0000001f] shadow-lg">
                    <button @click="optener_url_icono('/icons/productos/longaniza_5.png','longaniza blanca')" class="w-full flex justify-center items-center h-full focus:border-[#2CF95C] focus:border-2">
                        <img src="/icons/productos/longaniza_5.png"  alt="longaniza" srcset="">
                    </button>
                </div>

                
                <div class="w-[105px] inline-block h-[120px] mb-[20px]  mr-[15px] shadow-[#0000001f] shadow-lg">
                    <button @click="optener_url_icono('/icons/productos/longaniza_6.png','longaniza roja')" class="w-full flex justify-center items-center h-full focus:border-[#2CF95C] focus:border-2">
                        <img src="/icons/productos/longaniza_6.png"  alt="longaniza" srcset="">
                    </button>
                </div>

                <div class="w-[105px] inline-block h-[120px] mb-[20px]  mr-[15px] shadow-[#0000001f] shadow-lg">
                    <button @click="optener_url_icono('/icons/productos/papas-fritas_1.png','paquete de papas fritas')" class="w-full flex justify-center items-center h-full focus:border-[#2CF95C] focus:border-2">
                        <img src="/icons/productos/papas-fritas_1.png"  alt="paquete de papas fritas" srcset="">
                    </button>
                </div>

                <div class="w-[105px] inline-block h-[120px] mb-[20px]  mr-[15px] shadow-[#0000001f] shadow-lg">
                    <button @click="optener_url_icono('/icons/productos/papas-fritas_2.png','paquete de papas fritas')" class="w-full flex justify-center items-center h-full focus:border-[#2CF95C] focus:border-2">
                        <img src="/icons/productos/papas-fritas_2.png"  alt="paquete de papas fritas" srcset="">
                    </button>
                </div>

                <div class="w-[105px] inline-block h-[120px] mb-[20px]  mr-[15px] shadow-[#0000001f] shadow-lg">
                    <button @click="optener_url_icono('/icons/productos/papas-fritas.png','paquete de papas fritas')" class="w-full flex justify-center items-center h-full focus:border-[#2CF95C] focus:border-2">
                        <img src="/icons/productos/papas-fritas.png"  alt="paquete de papas fritas" srcset="">
                    </button>
                </div>

                <div class="w-[105px] inline-block h-[120px] mb-[20px]  mr-[15px] shadow-[#0000001f] shadow-lg">
                    <button @click="optener_url_icono('/icons/productos/pierna-de-jamon_1.png','pierna de cerdo')" class="w-full flex justify-center items-center h-full focus:border-[#2CF95C] focus:border-2">
                        <img src="/icons/productos/pierna-de-jamon_1.png"  alt="pierna" srcset="">
                    </button>
                </div>

                <div class="w-[105px] inline-block h-[120px] mb-[20px]  mr-[15px] shadow-[#0000001f] shadow-lg">
                    <button @click="optener_url_icono('/icons/productos/pierna-de-jamon_2.png','pierna de cerdo')" class="w-full flex justify-center items-center h-full focus:border-[#2CF95C] focus:border-2">
                        <img src="/icons/productos/pierna-de-jamon_2.png"  alt="pierna" srcset="">
                    </button>
                </div>

                <div class="w-[105px] inline-block h-[120px] mb-[20px]  mr-[15px] shadow-[#0000001f] shadow-lg">
                    <button @click="optener_url_icono('/icons/productos/pollo_1.png','pollo')" class="w-full flex justify-center items-center h-full focus:border-[#2CF95C] focus:border-2">
                        <img src="/icons/productos/pollo_1.png"  alt="pollo" srcset="">
                    </button>
                </div>

                <div class="w-[105px] inline-block h-[120px] mb-[20px]  mr-[15px] shadow-[#0000001f] shadow-lg">
                    <button @click="optener_url_icono('/icons/productos/muslo_pollo.png','muslo de pollo')" class="w-full flex justify-center items-center h-full focus:border-[#2CF95C] focus:border-2">
                        <img src="/icons/productos/muslo_pollo.png"  alt="pollo" srcset="">
                    </button>
                </div>

                <div class="w-[105px] inline-block h-[120px] mb-[20px]  mr-[15px] shadow-[#0000001f] shadow-lg">
                    <button @click="optener_url_icono('/icons/productos/muslo_pollo_2.png','muslo de pollo')" class="w-full flex justify-center items-center h-full focus:border-[#2CF95C] focus:border-2">
                        <img src="/icons/productos/muslo_pollo_2.png"  alt="pollo" srcset="">
                    </button>
                </div>

                <div class="w-[105px] inline-block h-[120px] mb-[20px]  mr-[15px] shadow-[#0000001f] shadow-lg">
                    <button @click="optener_url_icono('/icons/productos/pollo-asado_1.png','pollo')" class="w-full flex justify-center items-center h-full focus:border-[#2CF95C] focus:border-2">
                        <img src="/icons/productos/pollo-asado_1.png"  alt="pollo" srcset="">
                    </button>
                </div>

                <div class="w-[105px] inline-block h-[120px] mb-[20px]  mr-[15px] shadow-[#0000001f] shadow-lg">
                    <button @click="optener_url_icono('/icons/productos/queso_1.png','queso')" class="w-full flex justify-center items-center h-full focus:border-[#2CF95C] focus:border-2">
                        <img src="/icons/productos/queso_1.png"  alt="queso" srcset="">
                    </button>
                </div> 

                <div class="w-[105px] inline-block h-[120px] mb-[20px]  mr-[15px] shadow-[#0000001f] shadow-lg">
                    <button @click="optener_url_icono('/icons/productos/queso_2.png','queso')" class="w-full flex justify-center items-center h-full focus:border-[#2CF95C] focus:border-2">
                        <img src="/icons/productos/queso_2.png"  alt="queso" srcset="">
                    </button>
                </div>

                <div class="w-[105px] inline-block h-[120px] mb-[20px]  mr-[15px] shadow-[#0000001f] shadow-lg">
                    <button @click="optener_url_icono('/icons/productos/queso_5.png','queso')" class="w-full flex justify-center items-center h-full focus:border-[#2CF95C] focus:border-2">
                        <img src="/icons/productos/queso_5.png"  alt="queso" srcset="">
                    </button>
                </div>

                <div class="w-[105px] inline-block h-[120px] mb-[20px]  mr-[15px] shadow-[#0000001f] shadow-lg">
                    <button @click="optener_url_icono('/icons/productos/queso_4.png','queso')" class="w-full flex justify-center items-center h-full focus:border-[#2CF95C] focus:border-2">
                        <img src="/icons/productos/queso_4.png"  alt="queso" srcset="">
                    </button>
                </div>

                <div class="w-[105px] inline-block h-[120px] mb-[20px]  mr-[15px] shadow-[#0000001f] shadow-lg">
                    <button @click="optener_url_icono('/icons/productos/queso_7.png','queso')" class="w-full flex justify-center items-center h-full focus:border-[#2CF95C] focus:border-2">
                        <img src="/icons/productos/queso_7.png"  alt="queso" srcset="">
                    </button>
                </div>

                <div class="w-[105px] inline-block h-[120px] mb-[20px]  mr-[15px] shadow-[#0000001f] shadow-lg">
                    <button @click="optener_url_icono('/icons/productos/queso.png','queso')" class="w-full flex justify-center items-center h-full focus:border-[#2CF95C] focus:border-2">
                        <img src="/icons/productos/queso.png"  alt="queso" srcset="">
                    </button>
                </div>

                
                <div class="w-[105px] inline-block h-[120px] mb-[20px]  mr-[15px] shadow-[#0000001f] shadow-lg">
                    <button @click="optener_url_icono('/icons/productos/queso_6.png','queso')" class="w-full flex justify-center items-center h-full focus:border-[#2CF95C] focus:border-2">
                        <img src="/icons/productos/queso_6.png"  alt="queso" srcset="">
                    </button>
                </div>

                <div class="w-[105px] inline-block h-[120px] mb-[20px]  mr-[15px] shadow-[#0000001f] shadow-lg">
                    <button @click="optener_url_icono('/icons/productos/salami.png','salami')" class="w-full flex justify-center items-center h-full focus:border-[#2CF95C] focus:border-2">
                        <img src="/icons/productos/salami.png"  alt="salami" srcset="">
                    </button>
                </div>

                <div class="w-[105px] inline-block h-[120px] mb-[20px]  mr-[15px] shadow-[#0000001f] shadow-lg">
                    <button @click="optener_url_icono('/icons/productos/salami_2.png','salami')" class="w-full flex justify-center items-center h-full focus:border-[#2CF95C] focus:border-2">
                        <img src="/icons/productos/salami_2.png"  alt="salami" srcset="">
                    </button>
                </div>

                <div class="w-[105px] inline-block h-[120px] mb-[20px]  mr-[15px] shadow-[#0000001f] shadow-lg">
                    <button @click="optener_url_icono('/icons/productos/salami_3.png','salami')" class="w-full flex justify-center items-center h-full focus:border-[#2CF95C] focus:border-2">
                        <img src="/icons/productos/salami_3.png"  alt="salami" srcset="">
                    </button>
                </div>


                <div class="w-[105px] inline-block h-[120px] mb-[20px]  mr-[15px] shadow-[#0000001f] shadow-lg">
                    <button @click="optener_url_icono('/icons/productos/salami_4.png','salami')" class="w-full flex justify-center items-center h-full focus:border-[#2CF95C] focus:border-2">
                        <img src="/icons/productos/salami_4.png"  alt="salami" srcset="">
                    </button>
                </div>

                
                <div class="w-[105px] inline-block h-[120px] mb-[20px]  mr-[15px] shadow-[#0000001f] shadow-lg">
                    <button @click="optener_url_icono('/icons/productos/salami_5.png','salami de pollo')" class="w-full flex justify-center items-center h-full focus:border-[#2CF95C] focus:border-2">
                        <img src="/icons/productos/salami_5.png"  alt="salami" srcset="">
                    </button>
                </div> 



                <div class="w-[105px] inline-block h-[120px] mb-[20px]  mr-[15px] shadow-[#0000001f] shadow-lg">
                    <button @click="optener_url_icono('/icons/productos/salchichas.png','paquete de salchichas')" class="w-full flex justify-center items-center h-full focus:border-[#2CF95C] focus:border-2">
                        <img src="/icons/productos/salchichas.png"  alt="paquete de salchichas" srcset="">
                    </button>
                </div>

                
                <div class="w-[105px] inline-block h-[120px] mb-[20px]  mr-[15px] shadow-[#0000001f] shadow-lg">
                    <button @click="optener_url_icono('/icons/productos/paquete_salchichas.png','paquete de salchichas')" class="w-full flex justify-center items-center h-full focus:border-[#2CF95C] focus:border-2">
                        <img src="/icons/productos/paquete_salchichas.png"  alt="paquete de salchichas" srcset="">
                    </button>
                </div>
                
 

   
              

          
                

             
            </article>

            <div class="p-2">
                <button @click="guardar_url_icono"  class="w-full h-[60px] mt-[10px] text-[1.5rem] bg-[#FFB984] text-white ">
                        Guardar icono
                </button>
            </div>
            
        </div>
    </section>
</template>