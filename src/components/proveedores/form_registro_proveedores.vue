<script>
//importar el modulo de eventos globales 
import { emitter } from '@/eventBus'; 

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import axios from 'axios';

export default {

    mounted(){
        this.obtener_proveedores()
    },
    data(){
        return{
            DatosProveedores:[],
            proveedor:{
                    nombre:'',
                    direccion: '',
                    contacto: '',
                    tipo_proveedor: '',
                    description: '',
                    deuda: ''
                }
        }
    },
    methods:{
        cerrar_form_registro_proveedor(){
            emitter.emit('cerrar_form_registro_proveedor')
        },
        obtener_proveedores(){
            emitter.emit('abrir_loader_carga_vista_proveedor')
            axios.get(`${import.meta.env.VITE_API_SERVER}obtener-proveedores`)
                .then((response) => {
                    this.DatosProveedores =response.data
                })
                .catch((error) => {
                    console.error('Error al obtener la lista de proveedores', error);
                })
                .finally(() => {
                      //cerrar la carga luego de crear el cliente
                      emitter.emit('cerrar_loader_carga_vista_proveedor')
                    });
        },
        registrar_proveedor(){
            //validar que no existan proveedores con el mismo nombre 
            let listadoDuplicados = this.DatosProveedores.filter(iten => iten.nombre_proveedor == this.proveedor.nombre)
            if (listadoDuplicados.length > 0) {
                toast.warn('error de registro, existe un proveedor con este nombre!')
            }else{
                emitter.emit('abrir_loader_carga_vista_proveedor')
                 // Enviar datos al servidor utilizando Axios
                     axios.post(`${import.meta.env.VITE_API_SERVER}registrar-proveedor`, this.proveedor)
                        .then(response => {
                        // Manejar la respuesta del servidor
                        console.log(response.data);

                           
                            toast.success("Se registro el proveedor !"); 
                            

                            //limpiar datos del estado
                            this.proveedor.nombre= '',
                            this.proveedor.contacto='',
                            this.proveedor.description=''
                            this.proveedor.deuda=''
                            this.proveedor.direccion=''
                            this.proveedor.tipo_proveedor=''

                        })
                        .catch(error => {
                        // Manejar errores
                            console.error(error);

                            toast.error("error al registras Proveedor  !"); 

                        })
                        .finally(()=>{
                            //cerrar la carga luego de crear el cliente
                            emitter.emit('cerrar_loader_carga_vista_proveedor')

                            //cerrar el formulario de registro
                            emitter.emit('cerrar_form_registro_proveedor')

                            //actualizar el objeto de los cliente
                            emitter.emit('actualizar_vista_proveedores')

                            
                        })
            }
            
        }
    }
}
</script>


<template>
        <section  class="  w-full h-[100vh] bg-white fixed  z-50 ">

    <header class="w-full p-3 inline-flex border-b-[1.5px] border-b-[#DFDFDF]">
        <img @click="cerrar_form_registro_proveedor" class="w-[35px] mr-[25px]  order-1 cursor-pointer" src="/src/assets/iconos/interfaz/regresar.png" >
        <h2 class="text-[1.7rem] ml-[20px] order-2">Registrar proveedor</h2>
    </header>

    <form  @submit.prevent="registrar_proveedor" class="w-full p-3 mt-[10px]" >
        <input maxlength="43" v-model="proveedor.nombre" required class="w-[95%] focus:border-[#FFB984] focus:border-[1.5px] h-[55px] border-[1px] outline-none pl-[5px] 
        box-border rounded-md mb-[20px] border-[#9F9F9F]  ml-[2.5%]" type="text" 
        placeholder="Nombre del proveedor">



    <input v-model="proveedor.direccion"  class="w-[95%] h-[55px] focus:border-[#FFB984] focus:border-[1.5px] border-[1px] outline-none pl-[5px] 
        box-border rounded-md mb-[20px] border-[#9F9F9F]  ml-[2.5%]" type="text" 
        placeholder="Direccion">


        <input v-model="proveedor.contacto" required  class="w-[95%] h-[55px] focus:border-[#FFB984] focus:border-[1.5px] border-[1px] outline-none pl-[5px] 
        box-border rounded-md mb-[20px] border-[#9F9F9F]  ml-[2.5%]" type="tel" 
        placeholder="Contacto">


        <input v-model="proveedor.tipo_proveedor"  class="w-[95%] h-[55px] focus:border-[#FFB984] focus:border-[1.5px] border-[1px] outline-none pl-[5px] 
        box-border rounded-md mb-[20px] border-[#9F9F9F]  ml-[2.5%]" type="text" 
        placeholder="Tipo de proveedor">


        <input v-model="proveedor.description"  required class="w-[95%] h-[80px] focus:border-[#FFB984] focus:border-[1.5px] border-[1px] outline-none pl-[5px] 
        box-border rounded-md mb-[20px] border-[#9F9F9F]  ml-[2.5%]" type="text" 
        placeholder="Description">


        <input v-model="proveedor.deuda" class="w-[95%] h-[55px] focus:border-[#FFB984] focus:border-[1.5px] border-[1px] outline-none pl-[5px] 
        box-border rounded-md mb-[20px] border-[#9F9F9F]  ml-[2.5%]" type="number" 
        placeholder="Deuda a proveedor">


        <button @click="notify" type="submit"  class="w-full h-[80px] mt-[5px] text-[1.5rem] bg-[#FFB984] text-white ">
            Guardar 
        </button>
    </form>


        </section>
 </template>