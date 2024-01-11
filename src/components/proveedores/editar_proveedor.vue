<script>
//importar el modulo de eventos globales 
import { emitter } from '@/eventBus';
import axios from 'axios';

//libreria de notificacion 
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
  
 export default {
        props:['idProveedor'],

        mounted(){
            //buscar los datos del cliente a editar
            this.buscar_proveedor()
        },
        data(){
            return{
                proveedorEncontrado: [],
                
            }
        },
        methods:{
            cerrar_editar_proveedor(){
                emitter.emit('cerrar_editar_proveedor')
            },
            buscar_proveedor(){
            emitter.emit('abrir_loader_carga_vista_proveedor')

            axios.get(`https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/buscar-proveedores/${this.idProveedor}`)
            .then((response)=>{
                this.proveedorEncontrado=response.data;
            })
            .catch((err)=>{
                console.log(err)
            })
            .finally(()=>{
                //cerrar la carga luego de crear el cliente
                emitter.emit('cerrar_loader_carga_vista_proveedor')
            })
        },

            editar_proveedor(){

                emitter.emit('abrir_loader_carga_vista_proveedor')

                     // Realizar la solicitud PUT a la ruta /editar-cliente/:idCliente
                        axios.put(`https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/editar-proveedor/${this.idProveedor}`, {
                            nombre: this.proveedorEncontrado.nombre_proveedor,
                            direccion: this.proveedorEncontrado.direccion,
                            contacto: this.proveedorEncontrado.contacto,
                            tipo_proveedor: this.proveedorEncontrado.tipo_proveedor,
                            description: this.proveedorEncontrado.description,
                            deuda: this.proveedorEncontrado.deuda_a_proveedor,
                            })
                            .then((response) => {
                            console.log('Cliente editado con éxito', response);

                             //cerrar la carga luego de crear el cliente
                            toast.success('se edito el proveedor !')
                            
                            // Realizar cualquier acción adicional después de la edición del cliente
                            })
                            .catch((error) => {
                                toast.error('ocurrio un error al editar el proveedor !')
                                console.error('Error al editar el proveedor', error);
                            })

                            .finally(()=>{
                                //cerrar la carga luego de crear el cliente
                                emitter.emit('cerrar_loader_carga_vista_proveedor')

                                emitter.emit('cerrar_editar_proveedor')

                                //actualizar el objeto de los cliente
                                emitter.emit('actualizar_vista_proveedores')
                            })
            }

        }
 }
 </script>
 
 <template>
    <section  class="  w-full h-[100vh] bg-white fixed  z-50 ">

        <header class="w-full p-3 inline-flex border-b-[1.5px] border-b-[#DFDFDF]">
            <img  @click="cerrar_editar_proveedor" class="w-[35px] mr-[25px]  order-1 cursor-pointer" src="/src/assets/iconos/interfaz/regresar.png" >
            <h2 class="text-[1.7rem] ml-[40px] order-2">Editar proveedor</h2>
        </header>

        <form @submit.prevent="editar_proveedor" class="w-full p-3 mt-[10px]" action="">
            <label for="">
                        <span class="text-[#9F9F9F] ml-[10px]">Nombre del proveedor</span>
            <input  v-model="proveedorEncontrado.nombre_proveedor" required class="w-[95%] focus:border-[#FFB984] focus:border-[1.5px] h-[55px] border-[1px] outline-none pl-[5px] 
            box-border rounded-md mb-[15px] border-[#9F9F9F]  ml-[2.5%]" type="text" 
            placeholder="Nombre del proveedor">
            </label>

            <label for="">
                        <span class="text-[#9F9F9F] ml-[10px]">Direccion</span>
         <input v-model="proveedorEncontrado.direccion" class="w-[95%] h-[55px] focus:border-[#FFB984] focus:border-[1.5px] border-[1px] outline-none pl-[5px] 
            box-border rounded-md mb-[15px] border-[#9F9F9F]  ml-[2.5%]" type="text" 
            placeholder="Direccion">
            </label>

            <label for="">
                        <span class="text-[#9F9F9F] ml-[10px]">Contacto</span>
            <input v-model="proveedorEncontrado.contacto" class="w-[95%] h-[55px] focus:border-[#FFB984] focus:border-[1.5px] border-[1px] outline-none pl-[5px] 
            box-border rounded-md mb-[15px] border-[#9F9F9F]  ml-[2.5%]" type="text" 
            placeholder="Contacto">
            </label>

            <label for="">
                        <span class="text-[#9F9F9F] ml-[10px]">Tipo de proveedor</span>
            <input v-model="proveedorEncontrado.tipo_proveedor" class="w-[95%] h-[55px] focus:border-[#FFB984] focus:border-[1.5px] border-[1px] outline-none pl-[5px] 
            box-border rounded-md mb-[15px] border-[#9F9F9F]  ml-[2.5%]" type="text" 
            placeholder="Tipo de proveedor">
            </label>

            <label for="">
                        <span class="text-[#9F9F9F] ml-[10px]">Description</span>
            <input v-model="proveedorEncontrado.description" required class="w-[95%] h-[80px] focus:border-[#FFB984] focus:border-[1.5px] border-[1px] outline-none pl-[5px] 
            box-border rounded-md mb-[15px] border-[#9F9F9F]  ml-[2.5%]" type="text" 
            placeholder="Description">
            </label>
            <label for="">
                        <span class="text-[#9F9F9F] ml-[10px]">Deuda a pagar</span>
            <input v-model="proveedorEncontrado.deuda_a_proveedor" class="w-[95%] h-[55px] focus:border-[#FFB984] focus:border-[1.5px] border-[1px] outline-none pl-[5px] 
            box-border rounded-md mb-[15px] border-[#9F9F9F]  ml-[2.5%]" type="text" 
            placeholder="Deuda">
            </label>

            

            <button @click="editar_cliente"  class="w-full h-[80px] mt-[5px] text-[1.5rem] bg-[#FFB984] text-white ">
                Guardar 
            </button>
</form>


</section>
 </template>