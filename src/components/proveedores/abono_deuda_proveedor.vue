<script>
//importar el modulo de eventos globales 
import { emitter } from '@/eventBus'; 

import axios from 'axios';


import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


export default {

    mounted(){
        this.buscar_proveedor()
    },

    props:['idProveedor'],

    data(){
        return{
            proveedorEncontrado:[],

            datos_registro_abono:{
                fecha_abono:'',
                id_proveedor:'',
                monto_abonado:'',
                comentario:'',
                nueva_deuda:0

            }
        }
    },

    methods:{
        cerrar_abono_proveedor(){
            emitter.emit('cerrar_abonar_deuda_proveedor')
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
                console.log(this.proveedorEncontrado)
                //cerrar la carga luego de crear el cliente
                emitter.emit('cerrar_loader_carga_vista_proveedor')
            })
        },
        registrar_abono_proveedor(){
            if (this.proveedorEncontrado.deuda === '') {
                    alert("este proveedor no tiene deudas actualmente")
                    toast.warn("este proveedor no tiene deudas actualmente!")
                }
                else if(this.datos_registro_abono.monto_abonado > this.proveedorEncontrado.deuda_a_proveedor ){
                    alert("el monto es mayor a la deuda ingrese un monto menor o igual")
                    toast.warn("el monto es mayor a la deuda ingrese un monto menor o igual!")
                }
                else{

                    emitter.emit('abrir_loader_carga_vista_proveedor')


                    //logica de envio de abono de deuda

                    //asignar_cliente
                    this.datos_registro_abono.id_proveedor=this.idProveedor
                    //asignar fecha
                    this.datos_registro_abono.fecha_abono=this.convertir_formato_hora_actual()
                    //calcular la nueva deuda
                    this.datos_registro_abono.nueva_deuda=   this.proveedorEncontrado.deuda_a_proveedor - this.datos_registro_abono.monto_abonado

                     // Realiza la solicitud POST al servidor para registrar el abono
                     axios.post('https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/registrar-abono-proveedor', this.datos_registro_abono)
                        .then((response) => {
                            
                            console.log('Abono registrado con éxito', response.data);

                            toast.success("abono de deuda registrado !", {
                                    autoClose: 3000,
                                    backgroundColor:'#CC0B09',
                                    close: false,
                                    color: '#ffffff',
                                }); 
                           
                            // Realiza cualquier acción adicional después de registrar el abono
                        })
                        .catch((error) => {
                            console.error('Error al registrar el abono', error);

                            toast.error("error al registrar el abono !", {
                                    autoClose: 3000,
                                    backgroundColor:'#CC0B09',
                                    close: false,
                                    color: '#ffffff',
                                }); 
                        })
                        .finally(()=>{
                            //cerrar la carga luego de crear el cliente
                            emitter.emit('cerrar_loader_carga_vista_proveedor')
                            //cerrar el modal del abono de deuda
                            emitter.emit('cerrar_abonar_deuda_proveedor')
                        
                            //actualizar el objeto de los cliente
                            emitter.emit('actualizar_vista_proveedores')

                        });

                }
        },
        convertir_formato_hora_actual(){
                const fechaHoraActual = new Date();

                const meses = [
                'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
                'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
                ];

                const mes = meses[fechaHoraActual.getMonth()];
                const día = fechaHoraActual.getDate();
                const año = fechaHoraActual.getFullYear();
                const hora = fechaHoraActual.getHours();
                const minutos = fechaHoraActual.getMinutes();
                const amPm = hora >= 12 ? 'pm' : 'am';
                const hora12 = hora % 12 || 12; // Convertir a formato de 12 horas

                const fechaFormateada = `${mes} ${día} ${año} - ${hora12}:${minutos} ${amPm}`;

                return fechaFormateada
            }

    }
}
</script>


<template> 
    <section  class="  w-full h-[100vh] bg-[#444d639c] fixed  z-50 ">
       <div class="w-full  h-[510px] bg-white mt-[70%] ">
           <header class="w-full p-3 inline-flex border-b-[1.5px] border-b-[#DFDFDF]">
               <img  @click="cerrar_abono_proveedor"  class="w-[35px] mr-[25px]  order-1 cursor-pointer" src="/src/assets/iconos/interfaz/regresar.png" >
               <h2 class="text-[1.7rem] ml-[30px] order-2">Registrar abono </h2>
           </header>
           <div class="p-2">

               <div class=" p-2 w-full h-[100px] justify-center  items-center rounded flex shadow-md shadow-[#0000001f]">
                   <img class="order-1 w-[60px] h-[60px] mr-[30px] " src="/src/assets/iconos/interfaz/furgoneta-de-reparto.png" alt="" srcset="">
                   <div class="order-2">
                       <h3>{{ proveedorEncontrado.nombre_proveedor }}</h3>
                       <h3 class="text-[#9F9F9F]">Total de la deuda: <span class="text-[#E55226]">{{ proveedorEncontrado.deuda_a_proveedor.toLocaleString('en-US', { style: 'decimal', useGrouping: true, maximumFractionDigits: 2 }) }}</span></h3>
                   </div>
               </div>
               <form @submit.prevent="registrar_abono_proveedor" >
                   <input v-model="this.datos_registro_abono.monto_abonado" required class="  w-[90%] ml-[5%] h-[70px] pl-2 mt-[30px] focus:border-[#FFB984] outline-none border-2 rounded" 
                   type="number" placeholder="Ingrese el monto abonado aqui..." name="" id="">

                   <input v-model="this.datos_registro_abono.comentario" class=" w-[90%] ml-[5%] h-[70px] pl-2 mt-[30px] focus:border-[#FFB984] outline-none border-2 rounded" 
                   type="text" placeholder="Ingrese un comentario" name="" id="">

                   <button  class="w-[90%] ml-[5%] mt-[30px] text-[1.2rem] h-[60px] rounded text-white
                    bg-[#FFB984]">Guardar abono</button>
               </form>
               

           </div>
       </div>
       
   </section>
</template>