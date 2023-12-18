<script>
import SelecionarIcono from "./modal_select_icono_product.vue";

//modulo de bus de eventos globales
import { emitter } from '@/eventBus';

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


import axios from 'axios'; 

export default {
    props:['producto_indicado'],

    mounted(){
        

        this.buscar_proveedores()

         //ecuchar el evento al selecionar  un icono nuevo
         emitter.on('icono_producto_asignado',(url_icono)=>{
            this.icono=url_icono
            
        })

        emitter.on('cerrar_modal_icono_producto',()=>{
            this.estado_ventana_icono_producto=false
        })

        this.icono = this.producto_indicado.icono;
    },

    data(){
        return{
            icono:'',
            listadoProveedores:[],
        
            estado_ventana_icono_producto:false,
            
        }
    },

    components:{
        'selecionar-icono':SelecionarIcono,
    },
    methods:{
        close_editar_producto() {
           emitter.emit('cerrar_editar_producto_inventario')
        },

        abrir_icono_producto(){
            this.estado_ventana_icono_producto=true
        },

        buscar_proveedores(){
            emitter.emit('abrir_ventana_carga_inventario')

            axios.get('https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/obtener-proveedores')
                .then((response)=>{
                    this.listadoProveedores=response.data
                    console.log('se obtubo el registro de los proveedores',this.listadoProveedores)
                })
                .catch((error)=>{
                    console.log(error)
                })
                .finally(()=>{
                    emitter.emit('cerrar_ventana_carga_inventario')
                })
        },


        
        guardar_producto_editado(){

                if (this.icono) {
                    emitter.emit('abrir_ventana_carga_inventario')

                     axios.put(`https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/editar-producto/${this.id_producto_indicado}`,{
                           
                           nombre: this.producto_indicado.nombre_producto,
                           precio_venta: this.producto_indicado.precio_venta,
                           costo: this.producto_indicado.costo,
                           codigo:  this.producto_indicado.codigo,
                           categoria: this.producto_indicado.categoria,
                           proveedor:  this.producto_indicado.proveedor,
                           description: this.producto_indicado.description,
                           vender_por: this.producto_indicado.vender_por, 
                           cantidad:  this.producto_indicado.cantidad_existente, 
                           icono: this.icono

                           })
                            .then((response) => {
                            console.log('Cliente editado con éxito',response);

                             //cerrar la carga luego de crear el cliente
                             emitter.emit('cerrar_loader_carga_vista_cliente')

                             toast.success("se edito el producto!", {
                                    autoClose: 3000,
                                    backgroundColor:'#CC0B09',
                                    close: false,
                                    color: '#ffffff',
                                });

                            // Realizar cualquier acción adicional después de la edición del cliente
                            })
                            .catch((error) => {
                            console.error('Error al editar el cliente', error);

                            toast.error("error al edito el producto !", {
                                    autoClose: 3000,
                                    backgroundColor:'#CC0B09',
                                    close: false,
                                    color: '#ffffff',
                                });
                            })
                            .finally(()=>[

                                emitter.emit('cerrar_editar_producto_inventario'),

                                //actualizar inventario
                                emitter.emit('actualizar_inventario')
                            ]);
                }else{
                    alert('Seleccione un icono para guardar');
                }
        
    
                

        }
    }
}
</script>

<template>
    <section  class="  w-full h-[100vh] bg-white fixed -mt-[80px] z-40 ">

        <selecionar-icono  :url_icono_producto="producto_indicado.icono" v-show="estado_ventana_icono_producto"/>


        <header class="w-full p-3 inline-flex border-b-[1.5px] border-b-[#DFDFDF]">
            <img @click="close_editar_producto"   class="w-[35px] mr-[25px]  order-1 cursor-pointer" src="/src/assets/iconos/interfaz/regresar.png" >
            <h2 class="text-[1.7rem] ml-[30px] order-2">Editar producto</h2>
        </header>

        <form @submit.prevent="guardar_producto_editado" class="w-full p-3 mt-[10px]" action="">

            <label for="">
                        <span class="text-[#9F9F9F] ml-[10px]">Nombre</span>
                    <input v-model="producto_indicado.nombre_producto" maxlength="42" class="w-[95%] focus:border-[#FFB984] focus:border-[1.5px] h-[40px] border-[1px] outline-none pl-[5px] 
                    box-border rounded-md mb-[15px] border-[#9F9F9F]  ml-[2.5%]" type="text" 
                    placeholder="Nombre del producto">
                </label>

            <div class="inline-flex">
                <label for="">
                        <span class="text-[#9F9F9F] -mt-[10px] flex-none absolute ml-[10px]">Precio venta</span>
                    <input v-model="producto_indicado.precio_venta" class="w-[80%] order-1 focus:border-[#FFB984] focus:border-[1.5px] h-[40px] border-[1px] outline-none pl-[5px] 
                box-border rounded-md mb-[10px] mt-[15px] border-[#9F9F9F]  ml-[2.6%] mr-2" type="number" 
                placeholder="Precio de venta">
                </label>

                <label for="">
                        <span class="text-[#9F9F9F] -mt-[10px] absolute ml-[10px]">Costo</span>
                <input v-model="producto_indicado.costo" class="w-[90%] order-2 focus:border-[#FFB984] focus:border-[1.5px] h-[40px] border-[1px] outline-none pl-[5px] 
                box-border rounded-md mt-[15px] mb-[10px] border-[#9F9F9F]  ml-[2.5%]" type="number" 
                placeholder="Costo">
                </label>
            </div>

                 <label for="">
                        <span class="text-[#9F9F9F] ml-[10px]">Codigo</span>
                 <input v-model="producto_indicado.codigo" class="w-[95%] h-[40px] focus:border-[#FFB984] focus:border-[1.5px] border-[1px] outline-none pl-[5px] 
                    box-border rounded-md mb-[10px] border-[#9F9F9F]  ml-[2.5%]" type="text" 
                    placeholder="Codigo">
                </label>
                    <!-- indicar las categorias existente en el select de forma dinamica  -->
           
                    <label for="">
                            <span class="text-[#9F9F9F] ml-[10px]">Categoria </span>
                            <select v-model="producto_indicado.categoria" class="w-[95%] focus:border-[#FFB984] focus:border-[1.5px] h-[40px] border-[1px] bg-transparent outline-none pl-[5px] 
                        box-border rounded-md mb-[15px] border-[#9F9F9F]  ml-[2.5%]" name="" id="">
                        <option value=""></option>
                            <option value="embutidos">Embutidos</option>
                            <option value="carnes">Carnes</option>
                            <option value="ahumados">Ahumados</option>
                            <option value="cortes">Cortes</option>
                            <option value="varidos">Variados</option>
                        </select>
                    </label>

                    <!-- indicar los proveedores de forma dinamica -->
                    <label for="">
                            <span class="text-[#9F9F9F] ml-[10px]">Proveedor</span>
                            <select v-model="producto_indicado.proveedor" class="w-[95%] focus:border-[#FFB984] focus:border-[1.5px] h-[45px] border-[1px] bg-transparent outline-none pl-[5px] 
                        box-border rounded-md mb-[10px] border-[#9F9F9F]  ml-[2.5%]" name="" id="">
                        <option value=""></option>
                        <option v-for="proveedor in listadoProveedores" :key="proveedor.id_proveedores" 
                            :value="proveedor.nombre_proveedor">
                            {{proveedor.nombre_proveedor}}
                            </option>
                        </select>
                    </label>

                    <label for="">
                        <span class="text-[#9F9F9F] ml-[10px]">Description</span>
                    <input v-model="producto_indicado.description" maxlength="80"  class="w-[95%] h-[50px] focus:border-[#FFB984] focus:border-[1.5px] border-[1px] outline-none pl-[5px] 
                    box-border rounded-md mb-[10px] border-[#9F9F9F]  ml-[2.5%]" type="text" 
                    placeholder="Description">
                        </label>

                    <div class="inline-flex">
                            <label for="" class=" -mt-[26px]" >
                                <span class="order-1 text-[#9F9F9F]  -mt-[20px]  ml-[10px]">Vender por:</span>
                                <select v-model="producto_indicado.vender_por" class="w-[80%] focus:border-[#FFB984] bg-transparent focus:border-[1.5px] h-[45px] border-[1px] outline-none pl-[5px] 
                            box-border rounded-md mb-[15px] border-[#9F9F9F]  ml-[2.5%]" name="" id="">
                                <option value="unidad">por unidades</option>
                                <option value="libras">por libras</option>
                            </select>
                        </label>
                        
                        <label for="">
                        <span class="text-[#9F9F9F] absolute -mt-[25px] ml-[10px]">Cantidad</span>
                        <input v-model="producto_indicado.cantidad_existente" class="w-[90%] focus:border-[#FFB984] focus:border-[1.5px] order h-[45px] border-[1px] outline-none pl-[5px] 
                        box-border rounded-md mb-[15px] border-[#9F9F9F]  mr-[2.5%]" type="text" 
                        placeholder="Cantidad en unidades">
                        </label>
                    </div>


                    <button @click="abrir_icono_producto" class="w-[95%] h-[50px] bg-[#E55226] text-white border-[1px] outline-none pl-[5px] 
                    box-border rounded mb-[15px] border-[#9F9F9F]  ml-[2.5%]" type="button">

                      <span>Selecionar icono del producto </span>
                    </button>

                    <button class="w-full h-[60px] mt-[5px] text-[1.5rem] bg-[#FFB984] text-white ">
                        Guardar cambios
                    </button>
        </form>

        <!--listado dinamico de categorias-->
        <datalist id="listCategoria">
            <option value="cerdo"></option>
            <option value="res"></option>
            <option value="embutidos"></option>
            <option value="mariscos"></option>
            <option value="procesados"></option>
        </datalist>
    </section>
</template>