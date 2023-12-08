 <script>

import { emitter } from '@/eventBus';

import axios from 'axios';

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


 export default {

    mounted(){
        this.buscar_registro_abono()
    },
     
   props:['id_registro_operacion','proveedorEncontrado'],

   data(){
        return{
            datosRegistroAbono:[],
            montoOriginal:0,
            datosEditados:{
                    nuevo_monto_abonado:'',
                    comentario:'',
                    deuda_nueva: '',
                    id_proveedor: this.proveedorEncontrado.id_proveedores
                }
        }
   },

   methods:{

    cerrar_editar_abono(){
        emitter.emit('cerrar_editar_abono_proveedor')
    },
    buscar_registro_abono(){
                emitter.emit('abrir_loader_carga_vista_proveedor')

                 // Realiza la solicitud GET al servidor para obtener el registro de abono por id
                axios.get(`https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/abono-proveedor/${this.id_registro_operacion}`)
                    .then((response) => {
                    // El registro de abono se encuentra en response.data
                    this.datosRegistroAbono = response.data; 
                    //determinar el monto original para el calculo de la nueva deuda del proveedor
                    this.montoOriginal=this.datosRegistroAbono.monto_abonado
                        console.log('registro obtenido')
                    })

                    .catch((error) => {
                    console.error('Error al obtener el registro de abono por id', error);
                    })
                    .finally(()=>{
                        //cerrar la carga luego de crear el cliente
                        emitter.emit('cerrar_loader_carga_vista_proveedor')


                    });
            },

            editar_registro_abono(){

                if (this.datosRegistroAbono.monto_abonado > this.proveedorEncontrado.deuda_a_proveedor ) {
                    toast.error("ingrese un monto igual o menor a la deuda actual !", {
                                    autoClose: 3000,
                                    backgroundColor:'#CC0B09',
                                    close: false,
                                    color: '#ffffff',
                                });  
                }
                else{
                emitter.emit('abrir_loader_carga_vista_proveedor')

                //asignar valores al objeto del abono editado
                this.datosEditados.nuevo_monto_abonado=this.datosRegistroAbono.monto_abonado
                this.datosEditados.comentario=this.datosRegistroAbono.comentario
                this.datosEditados.deuda_nueva= this.calcular_deuda()


                // realizar el envio de los nuevos dato al servidor 
                axios.put(`https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/editar-abono-proveedor/${this.id_registro_operacion}`,this.datosEditados)
                    .then((response)=>{
                        console.log(response)

                        //notificacion de registro exitoso
                        toast.success("se edito el registro del abono de la deuda!", {
                                    autoClose: 3000,
                                    backgroundColor:'#CC0B09',
                                    close: false,
                                    color: '#ffffff',
                                }); 
                    })
                    .catch((err)=>{
                        console.log(err)

                        toast.error("error al editar el abono de la deuda !", {
                                    autoClose: 3000,
                                    backgroundColor:'#CC0B09',
                                    close: false,
                                    color: '#ffffff',
                                }); 
                    })
                    .finally(()=>{
                        //redireccionar a vista principal
                        emitter.emit('cerrar_editar_abono_proveedor')
                       
                        //cerrar la carga luego de crear el cliente
                        emitter.emit('cerrar_loader_carga_vista_proveedor')

                        //actualizar el objeto de los cliente
                        emitter.emit('actualizar_historial_abonos_proveedores')

                    })
                }

               
            },
            calcular_deuda(){

                /*
                    si se modifica el abono de la deuda se debera actualizar la deuda al proveedor,
                    si el nuevo valor del abono es mayor al original se debe restar la diferencia entre estos 
                    abonos( el nuevo y el original) y el resultado de esa resta o sea la diferencia se debe
                    restar a la deuda con el proveedor indicando que el monto que se abono es mayor al original y 
                    por esa razon se debe menos y esa diferencia se reta de la deuda, si el nuevo monto abonado
                    es menor se debe sumar a la deuda indicando que el monto que se abono fue menos y por ende 
                    se debe mas y se incrementa la diferencia a la deuda
                */
                let  ValorDeuda=0
                if ( this.datosEditados.nuevo_monto_abonado  > this.montoOriginal ) {
                    const diferenciaDeudas = this.montoOriginal -  this.datosRegistroAbono.monto_abonado 

                    ValorDeuda=this.proveedorEncontrado.deuda_a_proveedor +  diferenciaDeudas
                }
                else if (this.datosEditados.nuevo_monto_abonado < this.montoOriginal   ) {
                    const diferenciaDeudas =   this.datosRegistroAbono.monto_abonado  - this.montoOriginal 

                    ValorDeuda=this.proveedorEncontrado.deuda_a_proveedor - diferenciaDeudas 

                }
                else if (this.datosEditados.nuevo_monto_abonado == this.montoOriginal) {
                    
                    ValorDeuda=this.proveedorEncontrado.deuda_a_proveedor
                    
                }
                return ValorDeuda;
            }
   }
 }
 </script>
<template>
    <section  class="  w-full h-[100vh] bg-white fixed  z-50 ">

    <header class="w-full p-3 inline-flex border-b-[1.5px] border-b-[#DFDFDF]">
        <img  class="w-[35px] mr-[25px]  order-1 cursor-pointer" src="/src/assets/iconos/interfaz/regresar.png" >
        <h2 class="text-[1.7rem] ml-[40px] order-2">Editar abono</h2>
    </header>
    
    <form  @submit.prevent="editar_registro_abono"  class="p-2 mt-[100px]">
        <input id="abono" required  v-model="datosRegistroAbono.monto_abonado" class="w-[95%] h-[55px] focus:border-[#FFB984] focus:border-[1.5px] border-[1px] outline-none pl-[5px] 
        box-border rounded-md mb-[20px] border-[#9F9F9F]  ml-[2.5%]" type="number" 
        placeholder="Monto abonado">

        

        <input  v-model="datosRegistroAbono.comentario"  class="w-[95%] h-[100px] focus:border-[#FFB984] focus:border-[1.5px] border-[1px] outline-none pl-[5px] 
        box-border rounded-md mb-[20px] border-[#9F9F9F]  ml-[2.5%]" type="text" 
        placeholder="Comentario">


        

        <button  class="w-full h-[80px] mt-[5px] text-[1.5rem] bg-[#FFB984] text-white ">
            Guardar cambios
        </button>
    </form>

    </section>
</template>