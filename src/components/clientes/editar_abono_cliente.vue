<script>
//importar el modulo de eventos globales 
import { emitter } from '@/eventBus';

import axios from 'axios';

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


export default {
    props:['id_abono_Operacion','clienteEncontrado'],

    mounted(){
            this.buscar_registro_abono()
        },

        data(){
            return{
                datosCliente:this.clienteEncontrado,
                datosRegistroAbono:[],
                montoOriginal:0,
                datosEditados:{
                    nuevo_monto_abonado:'',
                    comentario:'',
                    deuda_nueva: '',
                    id_cliente: this.clienteEncontrado.id_cliente
                }
            }
        },

    methods:{
        cerrar_editar_abono_cliente(){
            emitter.emit('cerrar_editar_abono_cliente')
        },
        buscar_registro_abono(){
                emitter.emit('abrir_loader_carga_vista_cliente')

                

                 // Realiza la solicitud GET al servidor para obtener el registro de abono por id
                axios.get(`https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/abono-cliente/${this.id_abono_Operacion}`)
                    .then((response) => {
                    // El registro de abono se encuentra en response.data
                    this.datosRegistroAbono = response.data;

                    this.montoOriginal=this.datosRegistroAbono.monto_abonado
                     })
                    .catch((error) => {
                    console.error('Error al obtener el registro de abono por id', error);
                    })
                    .finally(()=>{
                        //cerrar la carga luego de crear el cliente
                        emitter.emit('cerrar_loader_carga_vista_cliente')
                    });
            },
            registrar_abono_editado_deuda_cliente(){

                if (this.datosEditados.nuevo_monto_abonado > this.datosCliente.deuda  ) {
                    toast.error("ingrese un monto igual o menor a la deuda actual !", {
                                    autoClose: 3000,
                                    backgroundColor:'#CC0B09',
                                    close: false,
                                    color: '#ffffff',
                                });  
                }else{
                    emitter.emit('abrir_loader_carga_vista_cliente')

 


                    //asignar valores

                    this.datosEditados.comentario=this.datosRegistroAbono.comentario
                    this.datosEditados.nuevo_monto_abonado=this.datosRegistroAbono.monto_abonado
                    this.datosEditados.deuda_nueva=this.evaluar_monto_deuda_cliente()
                   

                

                axios.put(`https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/editar-abono-cliente/${this.id_abono_Operacion}`, this.datosEditados)
                .then(response => {
                        // Maneja la respuesta exitosa
                        console.log(response.data.message);
                        toast.success("se edito el registro del abono de la deuda!", {
                                    autoClose: 3000,
                                    backgroundColor:'#CC0B09',
                                    close: false,
                                    color: '#ffffff',
                                });
                    })
                    .catch(error => {
                        // Maneja el error
                        console.error('Error al actualizar el abono y la deuda:', error.response.data.error);
                       
                        toast.error("error al editar el abono de la deuda !", {
                                    autoClose: 3000,
                                    backgroundColor:'#CC0B09',
                                    close: false,
                                    color: '#ffffff',
                                });
                    })
                    .finally(()=>{

                        //cerrar la carga luego de crear el cliente
                        emitter.emit('cerrar_loader_carga_vista_cliente')

                        //cerrar la ventana
                        emitter.emit('cerrar_editar_abono_cliente')

                        //actualizar el historial de abonos
                        emitter.emit('actualizar_historial_abonos_clientes')

                    });
                
             }
        },

            evaluar_monto_deuda_cliente(){
                let  ValorDeuda=0
                if ( this.datosEditados.nuevo_monto_abonado  > this.montoOriginal ) {
                    const diferenciaDeudas = this.montoOriginal -  this.datosRegistroAbono.monto_abonado 

                    ValorDeuda=this.datosCliente.deuda +  diferenciaDeudas
                }
                else if (this.datosEditados.nuevo_monto_abonado < this.montoOriginal   ) {
                    const diferenciaDeudas =   this.datosRegistroAbono.monto_abonado  - this.montoOriginal 

                    ValorDeuda=this.datosCliente.deuda  - diferenciaDeudas 

                }
                else if (this.datosEditados.nuevo_monto_abonado == this.montoOriginal) {
                    
                    ValorDeuda=this.datosCliente.deuda 
                    
                }
                return ValorDeuda;
                
            }
    }
}
</script>


<template>
    <section  class="  w-full h-[100vh] bg-white fixed  z-50 ">

    <header class="w-full p-3 inline-flex border-b-[1.5px] border-b-[#DFDFDF]">
        <img @click="cerrar_editar_abono_cliente" class="w-[35px] mr-[25px]  order-1 cursor-pointer" src="/src/assets/iconos/interfaz/regresar.png" >
        <h2 class="text-[1.7rem] ml-[40px] order-2">Editar abono</h2>
    </header>
    
    <form  @submit.prevent="registrar_abono_editado_deuda_cliente" class="p-2 mt-[100px]">
        <input id="abono" required  v-model="datosRegistroAbono.monto_abonado" class="w-[95%] h-[55px] focus:border-[#FFB984] focus:border-[1.5px] border-[1px] outline-none pl-[5px] 
        box-border rounded-md mb-[20px] border-[#9F9F9F]  ml-[2.5%]" type="number" 
        placeholder="Monto abonado">

        

        <input v-model="datosRegistroAbono.comentario"  class="w-[95%] h-[100px] focus:border-[#FFB984] focus:border-[1.5px] border-[1px] outline-none pl-[5px] 
        box-border rounded-md mb-[20px] border-[#9F9F9F]  ml-[2.5%]" type="text" 
        placeholder="Comentario">

 
        

        <button  class="w-full h-[80px] mt-[5px] text-[1.5rem] bg-[#FFB984] text-white ">
            Guardar cambios
        </button>
    </form>

    </section>
</template>