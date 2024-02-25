<script>
//importar el modulo de eventos globales 
import { emitter } from '@/eventBus'; 
import axios from 'axios';

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


export default { 
    mounted(){
        this.optener_clientes()
    },
        data(){
            return{
                
                listadoCliente:[],

                cliente:{
                    nombre:'',
                    direccion: '',
                    contacto: '',
                    tipo_cliente: '',
                    description: '',
                    deuda: ''
                },
            } 
        },  
        methods:{
            cerrar_modal_registrar_cliente(){
                emitter.emit('cerrar_modal_registrar_cliente')
            },
            optener_clientes() {
                emitter.emit('abrir_loader_carga_vista_cliente')

                axios.get(`${import.meta.env.VITE_API_SERVER}obtener-clientes`)
                .then((response) => {
                    this.listadoCliente = response.data;
                    console.log('se obtubieron los clientes')
                })
                .catch((error) => {
                    console.error('Error al obtener la lista de clientes', error);
                })
                .finally(() => {
                    // Desactiva el spinner una vez que la solicitud se completa (éxito o error)
                    emitter.emit('cerrar_modal_registrar_cliente')
                    });
            },
            registrar_cliente(){
                //validar que no existan clientes con el mismo nombre
                let listadoDuplicados = this.listadoCliente.filter(item=> item.nombre_cliente == this.cliente.nombre)
                if (listadoDuplicados.length >0) {
                    toast.warn('error de registro, existe un cliente con este nombre!')
                }else{
                    emitter.emit('abrir_loader_carga_vista_cliente')
                 // Enviar datos al servidor utilizando Axios
                     axios.post(`${import.meta.env.VITE_API_SERVER}registrar-cliente`, this.cliente)
                        .then(response => {
                        // Manejar la respuesta del servidor
                        console.log(response.data);

                        toast.success("se registro el cliente!");
                            //cerrar el formulario de registro
                            emitter.emit('cerrar_modal_registrar_cliente')

                            //cerrar la carga luego de crear el cliente
                            emitter.emit('cerrar_loader_carga_vista_cliente')

                            //actualizar el objeto de los cliente

                            emitter.emit('actualizar_objetos_cliente_vista_cliente')

                            //limpiar datos del estado
                            this.cliente.nombre= '',
                            this.cliente.contacto='',
                            this.cliente.description=''
                            this.cliente.deuda=''
                            this.cliente.direccion=''
                            this.cliente.tipo_cliente=''

                        })
                        .catch(error => {
                        // Manejar errores
                            console.error(error);
                            toast.error("ocurrio un error al registrar el cliente !");  
                        })
                        .finally(()=>{
                            emitter.emit('cerrar_modal_registrar_cliente')
                            emitter.emit('cerrar_loader_carga_vista_cliente')

                        })
                }
                
                       
            }
        }
}
</script>

<template>
        <section  class="  w-full h-[100vh] bg-white fixed  z-50 ">

    <header class="w-full p-3 inline-flex border-b-[1.5px] border-b-[#DFDFDF]">
        <img @click="cerrar_modal_registrar_cliente"  class="w-[35px] mr-[25px]  order-1 cursor-pointer" src="/src/assets/iconos/interfaz/regresar.png" >
        <h2 class="text-[1.7rem] ml-[30px] order-2">Registrar cliente</h2>
    </header>

    <form @submit.prevent="registrar_cliente" class="w-full p-3 mt-[10px]" >
        <input maxlength="40" v-model="cliente.nombre" required class="w-[95%] focus:border-[#FFB984] focus:border-[1.5px] h-[55px] border-[1px] outline-none pl-[5px] 
        box-border rounded-md mb-[20px] border-[#9F9F9F]  ml-[2.5%]" type="text" 
        placeholder="Nombre del cliente">



    <input v-model="cliente.direccion" class="w-[95%] h-[55px] focus:border-[#FFB984] focus:border-[1.5px] border-[1px] outline-none pl-[5px] 
        box-border rounded-md mb-[20px] border-[#9F9F9F]  ml-[2.5%]" type="text" 
        placeholder="Direccion">


        <input v-model="cliente.contacto" required class="w-[95%] h-[55px] focus:border-[#FFB984] focus:border-[1.5px] border-[1px] outline-none pl-[5px] 
        box-border rounded-md mb-[20px] border-[#9F9F9F]  ml-[2.5%]" type="tel" 
        placeholder="Contacto">


        <input v-model="cliente.tipo_cliente" class="w-[95%] h-[55px] focus:border-[#FFB984] focus:border-[1.5px] border-[1px] outline-none pl-[5px] 
        box-border rounded-md mb-[20px] border-[#9F9F9F]  ml-[2.5%]" type="text" 
        placeholder="Tipo de cliente">


        <input v-model="cliente.description" required class="w-[95%] h-[80px] focus:border-[#FFB984] focus:border-[1.5px] border-[1px] outline-none pl-[5px] 
        box-border rounded-md mb-[20px] border-[#9F9F9F]  ml-[2.5%]" type="text" 
        placeholder="Description">


        <input v-model="cliente.deuda" class="w-[95%] h-[55px] focus:border-[#FFB984] focus:border-[1.5px] border-[1px] outline-none pl-[5px] 
        box-border rounded-md mb-[20px] border-[#9F9F9F]  ml-[2.5%]" type="number" step="any"
        placeholder="Deuda">


        

        <button type="submit"  class="w-full h-[80px] mt-[5px] text-[1.5rem] bg-[#FFB984] text-white ">
            Guardar 
        </button>
    </form>


        </section>
 </template>