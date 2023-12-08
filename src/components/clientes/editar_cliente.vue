 <script>
//importar el modulo de eventos globales 
import { emitter } from '@/eventBus';
import axios from 'axios';

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


 export default {
        props:['id_cliente_operacione'],

        mounted(){
            //buscar los datos del cliente a editar
            this.buscar_cliente_id()
        },
        data(){
            return{
                clienteEncontrado: [],
                
            }
        },
        methods:{
            cerrar_editar_cliente(){
                emitter.emit('cerrar_modal_editar_cliente')
            },
            buscar_cliente_id(){
                emitter.emit('abrir_loader_carga_vista_cliente')
               // Realizar la solicitud GET a la ruta /buscar-cliente/:idCliente
                axios.get(`https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/buscar-cliente/${this.id_cliente_operacione}`)
                    .then((response) => {
                    this.clienteEncontrado = response.data;
                    })
                    .catch((error) => {
                    console.error('Error al buscar el cliente', error);
                    this.clienteEncontrado = [];
                    })
                    .finally(()=>{
                         //cerrar la carga luego de crear el cliente
                         emitter.emit('cerrar_loader_carga_vista_cliente')
                    });
            },

            editar_cliente(){

                    emitter.emit('abrir_loader_carga_vista_cliente')

                     // Realizar la solicitud PUT a la ruta /editar-cliente/:idCliente
                        axios.put(`https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/editar-cliente/${this.id_cliente_operacione}`, {
                            nombre: this.clienteEncontrado.nombre_cliente,
                            direccion: this.clienteEncontrado.direccion,
                            contacto: this.clienteEncontrado.contacto,
                            tipo_cliente: this.clienteEncontrado.tipo_cliente,
                            description: this.clienteEncontrado.description,
                            deuda: this.clienteEncontrado.deuda,
                            })
                            .then((response) => {
                            console.log('Cliente editado con éxito');

                            toast.success("se edito con exito el cliente!", {
                                    autoClose: 3000,
                                    backgroundColor:'#CC0B09',
                                    close: false,
                                    color: '#ffffff',
                                });

                             //cerrar la carga luego de crear el cliente
                             emitter.emit('cerrar_loader_carga_vista_cliente')

                   

                             //actualizar el listado de clientes
                            emitter.emit('actualizar_objetos_cliente_vista_cliente')
                            
                            emitter.emit('cerrar_modal_editar_cliente')
                            // Realizar cualquier acción adicional después de la edición del cliente
                            })
                            .catch((error) => {

                                toast.error("error al editar el cliente!", {
                                    autoClose: 3000,
                                    backgroundColor:'#CC0B09',
                                    close: false,
                                    color: '#ffffff',
                                });

                            console.error('Error al editar el cliente', error);
                            });
            }

        }
 }
 </script>
 
 <template>
    <section  class="  w-full h-[100vh] bg-white fixed  z-50 ">

        <header class="w-full p-3 inline-flex border-b-[1.5px] border-b-[#DFDFDF]">
            <img  @click="cerrar_editar_cliente" class="w-[35px] mr-[25px]  order-1 cursor-pointer" src="/src/assets/iconos/interfaz/regresar.png" >
            <h2 class="text-[1.7rem] ml-[40px] order-2">Editar cliente</h2>
        </header>

        <form @submit.prevent="editar_cliente" class="w-full p-3 mt-[10px]" action="">
            <input  v-model="clienteEncontrado.nombre_cliente" required class="w-[95%] focus:border-[#FFB984] focus:border-[1.5px] h-[55px] border-[1px] outline-none pl-[5px] 
            box-border rounded-md mb-[20px] border-[#9F9F9F]  ml-[2.5%]" type="text" 
            placeholder="Nombre del cliente">



         <input v-model="clienteEncontrado.direccion" class="w-[95%] h-[55px] focus:border-[#FFB984] focus:border-[1.5px] border-[1px] outline-none pl-[5px] 
            box-border rounded-md mb-[20px] border-[#9F9F9F]  ml-[2.5%]" type="text" 
            placeholder="Direccion">


            <input v-model="clienteEncontrado.contacto" class="w-[95%] h-[55px] focus:border-[#FFB984] focus:border-[1.5px] border-[1px] outline-none pl-[5px] 
            box-border rounded-md mb-[20px] border-[#9F9F9F]  ml-[2.5%]" type="text" 
            placeholder="Contacto">


            <input v-model="clienteEncontrado.tipo_cliente" class="w-[95%] h-[55px] focus:border-[#FFB984] focus:border-[1.5px] border-[1px] outline-none pl-[5px] 
            box-border rounded-md mb-[20px] border-[#9F9F9F]  ml-[2.5%]" type="text" 
            placeholder="Tipo de cliente">


            <input v-model="clienteEncontrado.description" required class="w-[95%] h-[80px] focus:border-[#FFB984] focus:border-[1.5px] border-[1px] outline-none pl-[5px] 
            box-border rounded-md mb-[20px] border-[#9F9F9F]  ml-[2.5%]" type="text" 
            placeholder="Description">


            <input v-model="clienteEncontrado.deuda" class="w-[95%] h-[55px] focus:border-[#FFB984] focus:border-[1.5px] border-[1px] outline-none pl-[5px] 
            box-border rounded-md mb-[20px] border-[#9F9F9F]  ml-[2.5%]" type="text" 
            placeholder="Deuda">


            

            <button @click="editar_cliente"  class="w-full h-[80px] mt-[5px] text-[1.5rem] bg-[#FFB984] text-white ">
                Guardar 
            </button>
</form>


</section>
 </template>