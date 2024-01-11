<script>
//importar el modulo de eventos globales 
import { emitter } from '@/eventBus';

//libreria de notificacion 
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
  
 
import axios from 'axios';

export default {
        props:['proveedor_operacion'],
        methods:{
            cerrar_eliminar_proveedor(){
                emitter.emit('cerrar_eliminar_proveedores')
            },
            eliminar_proveedor(){
                //validar que no se elimine un proveedor con deudas pendiente
                if (this.proveedor_operacion.deuda_a_proveedor > 0) {
                    toast.warn('no se puede eliminar un proveedor al que se debe !')
                } else if(this.proveedor_operacion.deuda_a_proveedor == 0 || this.proveedor_operacion.deuda_a_proveedor < 0){
                    emitter.emit('abrir_loader_carga_vista_proveedor')

                axios.delete(`https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/eliminar-proveedor/${this.proveedor_operacion.id_proveedores}`)
                    .then((response) => {
                    toast.success('se elimino el proveedor!')
                        console.log(response)
                    
                    })
                    .catch((error) => {
                    toast.error('error al eliminar el proveedor!')
                    console.error('Error al eliminar el proveedor', error);
                    })

                    .finally(()=>{

                     //cerrar la carga luego de crear el cliente
                     emitter.emit('cerrar_loader_carga_vista_proveedor')

                     emitter.emit('cerrar_eliminar_proveedores')

                    //actualizar el objeto de los cliente
                    emitter.emit('actualizar_vista_proveedores')

                    });
                }

            }
        }
}
</script>



<template>
    <section  class="  w-full h-[100vh] bg-[#444d639c] fixed  z-50 ">
       <div class="w-[90%] ml-[5%] h-[300px] bg-white mt-[50%]">
           <header class="w-full p-3 inline-flex border-b-[1.5px] border-b-[#DFDFDF]">
               <img  @click="cerrar_eliminar_proveedor"  class="w-[35px] mr-[25px]  order-1 cursor-pointer" src="/src/assets/iconos/interfaz/regresar.png" >
               <h2 class="text-[1.7rem] ml-[10px] order-2">Eliminar proveedor</h2>
           </header>
           <div class="p-3">
               <h3 class="text-center text-[#9F9F9F]">Esta seguro que desea eliminar este proveedor?</h3>
               <button @click="eliminar_proveedor"  class="w-[90%] ml-[5%] mt-[50px] text-[1.2rem] h-[60px] rounded text-white bg-[#CC0B09]">Eliminar</button>
           </div>
       </div>
       
   </section>
</template>