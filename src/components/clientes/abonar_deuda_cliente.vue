<script>
//importar el modulo de eventos globales 
import { emitter } from '@/eventBus';

import axios from 'axios';

import { toast } from 'vue3-toastify'; 
import 'vue3-toastify/dist/index.css';


export default {

    mounted(){
        this.obtener_deuda_cliente();
    },
    props:['ventas_credito'],

 

    data(){
        return{

            deuda_actual_cliente:[],

            datos_registro_abono:{
                fecha_abono:'',
                id_cliente:'',
                id_venta:'',
                monto_abonado:'',
                comentario:'',
                nuevo_balance_venta:0,
                nueva_deuda_cliente:0

            }
        } 
    },

    methods:{
        cerrar_modal_abono_deuda_cliente(){
            emitter.emit('cerrar_modal_abono_deuda_cliente')
        },
      

            registrar_abono_deuda_cliente(){
                if (this.ventas_credito.balance_pendiente == 0) {
                    toast.warn("esta venta a credito no tiene deuda para abonar!")
                }
                else if(this.datos_registro_abono.monto_abonado > this.ventas_credito.balance_pendiente ){
                    alert("el monto es mayor a la deuda ingrese un monto menor o igual")
                    toast.warn("el monto es mayor a la deuda, indique un monto menor o igual!")
                }
                else{
                    emitter.emit('abrir_loader_carga_vista_cliente')

                    //solicitar datos del cliente para saber la deuda actual y actualizarla
                    

                    //asignar id_cliente y id_venta
                    this.datos_registro_abono.id_cliente=this.ventas_credito.id_clientes
                    this.datos_registro_abono.id_venta=this.ventas_credito.id_ventas
                    //asignar fecha
                    this.datos_registro_abono.fecha_abono=this.convertir_formato_hora_actual()
                    //calcular la nueva deuda
                    this.datos_registro_abono.nuevo_balance_venta=   this.ventas_credito.balance_pendiente - this.datos_registro_abono.monto_abonado
                    //asignar nueva deuda del cliente
                    this.datos_registro_abono.nueva_deuda_cliente= this.deuda_actual_cliente.deuda  - this.datos_registro_abono.monto_abonado

                    //  Realiza la solicitud POST al servidor para registrar el abono
                    axios.post(`${import.meta.env.VITE_API_SERVER}registrar-abono-cliente`, this.datos_registro_abono)
                        .then((response) => {
                            toast.success("se registro el abono de la deuda !");
                            console.log('Abono registrado con éxito', response.data);

                            emitter.emit('cerrar_loader_carga_vista_cliente')
                            // Realiza cualquier acción adicional después de registrar el abono
                        })
                        .catch((error) => {
                        console.error('Error al registrar el abono', error);
                        toast.error("error al registrar el abono de la deuda !");
                        })
                        .finally(()=>{

                            //cerrar el modal del abono de deuda
                            emitter.emit('cerrar_modal_abono_deuda_cliente')
                        
                            //actualizar la vista 
                            emitter.emit('actualizar_objetos_cliente_vista_cliente')
                         
                            //actualizar el historial del registro de deuda del cliente
                            emitter.emit('actualizar_historial_deudas_cliente');
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
            },
            obtener_deuda_cliente(){
                emitter.emit('abrir_loader_carga_vista_cliente')
                axios.get(`${import.meta.env.VITE_API_SERVER}deuda-cliente/${this.ventas_credito.id_clientes}`)
                    .then((response)=>{
                        this.deuda_actual_cliente=response.data
                        
                    })
                    .catch((err)=>{
                        console.error(err)
                    })
                    .finally(()=>{
                        emitter.emit('cerrar_loader_carga_vista_cliente')
                    })
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

                <div class=" p-2 w-full h-[110px] justify-center  items-center rounded flex shadow-md shadow-[#0000001f]">
                    <div class="order-1 bg-[#FF9A9A] rounded flex items-center justify-center w-[80px] h-[80px] mr-[20px] ">
                        <img class="w-[50px] h-[50px]" src="/src/assets/iconos/interfaz/billete-de-banco.png" alt="" srcset="">
                    </div>
                    <div class="order-2">
                        <h3 class="mb-[3px]">Total deuda: <span class="text-[#E55226]">{{ventas_credito.balance_pendiente.toLocaleString('en-US', { style: 'decimal', useGrouping: true, maximumFractionDigits: 2 })}}</span></h3>
                        <h4 class="mb-[3px]">Cliente: <span class="text-[#9F9F9F] text-[0.9rem]" >{{ventas_credito.nombre_cliente}}</span></h4>
                        <h4 >Fecha del credito: <span class="text-[#9F9F9F] text-[0.9rem]" >{{ventas_credito.fecha.split(" - ")[0]}}</span></h4>
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