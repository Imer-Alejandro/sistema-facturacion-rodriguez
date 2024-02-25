<script>
//importar el modulo de eventos globales 
import { emitter } from '@/eventBus';

import axios from 'axios';

import { toast } from 'vue3-toastify'; 
import 'vue3-toastify/dist/index.css';


export default {
    props:['id_cliente_operacione'],

    mounted(){
        this.buscar_cliente_id()
    },

    data(){
        return{
            clienteEncontrado:[],

            datos_registro_abono:{
                fecha_abono:'',
                id_cliente:'',
                monto_abonado:'',
                comentario:'',
                nueva_deuda:0

            }
        }
    },

    methods:{
        cerrar_modal_abono_deuda_cliente(){
            emitter.emit('cerrar_modal_abono_deuda_cliente')
        },
        buscar_cliente_id(){
            emitter.emit('abrir_loader_carga_vista_cliente')

               // Realizar la solicitud GET a la ruta /buscar-cliente/:idCliente
                axios.get(`${import.meta.env.VITE_API_SERVER}buscar-cliente/${this.id_cliente_operacione}`)
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
                    })
            },

            registrar_abono_deuda_cliente(){
                if (this.clienteEncontrado.deuda == '') {
                    toast.warn("este cliente no tiene deuda para abonar!")
                }
                else if(this.datos_registro_abono.monto_abonado > this.clienteEncontrado.deuda ){
                    alert("el monto es mayor a la deuda ingrese un monto menor o igual")
                    toast.warn("el monto es mayor a la deuda, indique un monto menor o igual!")
                }
                else{
                    emitter.emit('abrir_loader_carga_vista_cliente')
                    //logica de envio de abono de deuda

                    //asignar_cliente
                    this.datos_registro_abono.id_cliente=this.clienteEncontrado.id_cliente
                    //asignar fecha
                    this.datos_registro_abono.fecha_abono=this.convertir_formato_hora_actual()
                    //calcular la nueva deuda
                    this.datos_registro_abono.nueva_deuda=   this.clienteEncontrado.deuda - this.datos_registro_abono.monto_abonado

                    console.log(this.datos_registro_abono)
                     // Realiza la solicitud POST al servidor para registrar el abono
                    axios.post(`${import.meta.env.VITE_API_SERVER}registrar-abono-cliente`, this.datos_registro_abono)
                        .then((response) => {
                            toast.success("se registro el abono de la deuda !", {
                                    autoClose: 3000,
                                    backgroundColor:'#CC0B09',
                                    close: false,
                                    color: '#ffffff',
                                });
                            console.log('Abono registrado con éxito', response.data);

                            emitter.emit('cerrar_loader_carga_vista_cliente')
                            // Realiza cualquier acción adicional después de registrar el abono
                        })
                        .catch((error) => {
                        console.error('Error al registrar el abono', error);
                        toast.error("error al registrar el abono de la deuda !", {
                                    autoClose: 3000,
                                    backgroundColor:'#CC0B09',
                                    close: false,
                                    color: '#ffffff',
                                });
                        })
                        .finally(()=>{

                            //cerrar el modal del abono de deuda
                            emitter.emit('cerrar_modal_abono_deuda_cliente')
                        
                            //actualizar la vista 
                            emitter.emit('actualizar_objetos_cliente_vista_cliente')
                         

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
                <img  @click="cerrar_modal_abono_deuda_cliente"  class="w-[35px] mr-[25px]  order-1 cursor-pointer" src="/src/assets/iconos/interfaz/regresar.png" >
                <h2 class="text-[1.7rem] ml-[30px] order-2">Registrar abono </h2>
            </header>
            <div class="p-2">

                <div class=" p-2 w-full h-[100px] justify-center  items-center rounded flex shadow-md shadow-[#0000001f]">
                    <img class="order-1 w-[60px] h-[60px] mr-[30px] " src="/src/assets/iconos/interfaz/tienda.png" alt="" srcset="">
                    <div class="order-2">
                        <h3>{{clienteEncontrado.nombre_cliente}}</h3>
                        <h3 class="text-[#9F9F9F]">Total de la deuda: <span class="text-[#E55226]">{{ clienteEncontrado.deuda }}</span></h3>
                    </div>
                </div>
                <form @submit.prevent="registrar_abono_deuda_cliente" >
                    <input v-model="this.datos_registro_abono.monto_abonado" required class="  w-[90%] ml-[5%] h-[70px] pl-2 mt-[30px] focus:border-[#FFB984] outline-none border-2 rounded" 
                    type="number" step="any" placeholder="Ingrese el monto abonado aqui..." name="" id="">

                    <input v-model="this.datos_registro_abono.comentario" class=" w-[90%] ml-[5%] h-[70px] pl-2 mt-[30px] focus:border-[#FFB984] outline-none border-2 rounded" 
                    type="text" placeholder="Ingrese un comentario - (opcional)" name="" id="">

                    <button  class="w-[90%] ml-[5%] mt-[30px] text-[1.2rem] h-[60px] rounded text-white
                     bg-[#FFB984]">Guardar abono</button>
                </form>
                

            </div>
        </div>
        
    </section>
</template>