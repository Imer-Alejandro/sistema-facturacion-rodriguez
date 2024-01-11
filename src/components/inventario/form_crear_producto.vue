<script>
import SelecionarIcono from "./modal_select_icono_product.vue";

//modulo de bus de eventos globales
import { emitter } from '@/eventBus';

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


import axios from 'axios';

export default {
    props: {
    parentData: Object 
    },

    mounted(){
        //buscar los proveedores de la categoria
        this.buscar_proveedores()

        //buscar los productos
        this.buscar_producto()

        //ecuchar el evento al selecionar un icono
        emitter.on('icono_producto_asignado',(url_icono)=>{
            this.datosNewProduct.icono=url_icono
            
        })

        emitter.on('cerrar_modal_icono_producto',()=>{
            this.estado_ventana_icono_producto=false

            toast.success("icono selecionado !");
        })
    },

    data(){
        return{
            estado_ventana_icono_producto:false,
            listadoProveedores:[],
            listadoProductos:[],
            datosNewProduct:{
                nombre:'',
                precio_venta:'',
                precio_compra:'',
                codigo:'',
                categoria:'',
                proveedor:'',
                description:'',
                vender_por:'',
                stock:'',
                icono:'',
            
            }
        }
    },
    components:{
        'selecionar-icono':SelecionarIcono,
    },
    methods:{
        close_form() {
            const newData = { ...this.parentData };
            newData.open_and_close_form_new_product = false;
            this.$emit('updateParentData', newData);
        },

        abrir_icono_producto(){
            this.estado_ventana_icono_producto=true
        },

        buscar_proveedores(){
            emitter.emit('abrir_ventana_carga_inventario')

            axios.get('https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/obtener-proveedores')
                .then((response)=>{
                    this.listadoProveedores=response.data
                    console.log('se obtubo el registro de los proveedores')
                })
                .catch((error)=>{
                    console.log(error)
                })
                .finally(()=>{
                    emitter.emit('cerrar_ventana_carga_inventario')
                })
        },

        buscar_producto(){
            emitter.emit('abrir_ventana_carga_inventario')

            axios.get('https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/productos')
                .then((response)=>{
                    this.listadoProductos=response.data
                    console.log('se obtubo el registro de los productos')
                })
                .catch((error)=>{
                    console.log(error)
                })
                .finally(()=>{
                    emitter.emit('cerrar_ventana_carga_inventario')
                })
        },

        //registrar producto
        registerProduct(){

            //verificar si los campos obligatorios estan lleno
 
            if (this.datosNewProduct.icono != '') {


                //validar que no existan productos con el mismo nombre o icono
                let listadoDuplicados = this.listadoProductos.filter(item => item.nombre_producto == this.datosNewProduct.nombre )

                    if (listadoDuplicados.length > 0) {
                        toast.warn('error de registro, existe un producto con este nombre!')
                    }else{

                        //validar que el costo y el precio venta no sean igual ni el costo mayor al de venta
                        if ( this.datosNewProduct.precio_venta > this.datosNewProduct.precio_compra &&  this.datosNewProduct.precio_venta != this.datosNewProduct.precio_compra) {
                            emitter.emit('abrir_ventana_carga_inventario')

                            axios.post('https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/registro-producto', this.datosNewProduct)
                                .then(response => {
                                console.log(response.data.message); // Mensaje exitoso del servidor
                                // Puedes manejar la respuesta del servidor según tus necesidades
                                toast.success("se registro el producto!");
                                    //dejar el formulario limpio para otro registro
                                    this.datosNewProduct.nombre='',
                                    this.datosNewProduct.precio_venta='',
                                    this.datosNewProduct.precio_compra='',
                                    this.datosNewProduct.codigo='',
                                    this.datosNewProduct.categoria='',
                                    this.datosNewProduct.proveedor='',
                                    this.datosNewProduct.description='',
                                    this.datosNewProduct.vender_por='',
                                    this.datosNewProduct.stock='',
                                    this.datosNewProduct.icono=''

                                })
                                .catch(error => {
                                        console.error('Error al registrar el producto:', error.response.data.error);
                                        // Puedes manejar el error según tus necesidades
                                        toast.error("error al registrar producto!");
                                

                                })
                                .finally(()=>{
                                    //cerrar ventana 
                                    this.close_form() 
                                    //cerrar ventana carga
                                    emitter.emit('cerrar_ventana_carga_inventario')
                                    
                                    //actualizar la vista inventario
                                    emitter.emit('actualizar_inventario')
                                })
                        }else{
                            toast.warn("el precio de venta debe ser mayor al costo !");

                        }
                       
                    }
                       
                       
                    }
            else{

                alert('debe selecionar un icono para el producto!')

                toast.warn("Debe selecionar un icono para el producto!");
            }

          
                        
        }
    }, 
    

}
</script>

<template>
    <section  class="  w-full h-[100vh] bg-white fixed -mt-[80px] z-40 ">

        <selecionar-icono  v-show="estado_ventana_icono_producto"/>

        <header class="w-full p-3 inline-flex border-b-[1.5px] border-b-[#DFDFDF]">
            <img @click="close_form"  class="w-[35px] mr-[25px]  order-1 cursor-pointer" src="/src/assets/iconos/interfaz/regresar.png" >
            <h2 class="text-[1.7rem] order-2">Crear nuevo producto</h2>
        </header>
        <form @submit.prevent="registerProduct"  class="w-full p-3 mt-[10px]" action="">
                    <input v-model="datosNewProduct.nombre" maxlength="42" required class="w-[95%] focus:border-[#FFB984] focus:border-[1.5px] h-[45px] border-[1px] outline-none pl-[5px] 
                    box-border rounded-md mb-[15px] border-[#9F9F9F]  ml-[2.5%]" type="text" 
                    placeholder="Nombre del producto">


            <div class="inline-flex">
                    <input maxlength="5" v-model="datosNewProduct.precio_venta" required class="w-[45%] order-1 focus:border-[#FFB984] focus:border-[1.5px] h-[45px] border-[1px] outline-none pl-[5px] 
                box-border rounded-md mb-[20px]  border-[#9F9F9F]  ml-[2.5%] mr-2" type="number" 
                placeholder="Precio de venta">

                <input v-model="datosNewProduct.precio_compra" required class="w-[45%] order-2 focus:border-[#FFB984] focus:border-[1.5px] h-[45px] border-[1px] outline-none pl-[5px] 
                box-border rounded-md mb-[20px] border-[#9F9F9F]  ml-[2.5%]" type="number" 
                placeholder="Costo">
            </div>

                 <input v-model="datosNewProduct.codigo" class="w-[95%] h-[45px] focus:border-[#FFB984] focus:border-[1.5px] border-[1px] outline-none pl-[5px] 
                    box-border rounded-md mb-[15px] border-[#9F9F9F]  ml-[2.5%]" type="text" 
                    placeholder="Codigo">

                    <!-- indicar las categorias existente en el select de forma dinamica  -->
           
                    <label for=""> 
                            <span class="text-[#9F9F9F] ml-[10px]">Categoria:</span>
                            <select v-model="datosNewProduct.categoria" required class="w-[95%] focus:border-[#FFB984] focus:border-[1.5px] h-[40px] border-[1px] bg-transparent outline-none pl-[5px] 
                        box-border rounded-md mb-[15px] border-[#9F9F9F]  ml-[2.5%]" name="" id="">
                        <option value=""></option>
                            <option value="embutidos">Embutidos</option>
                            <option value="carnes">Carnes</option>
                            <option value="ahumados">Ahumados</option>
                            <option value="cortes">Cortes</option>
                            <option value="variados">Variados</option>
                        </select>
                    </label>

                    <!-- indicar los proveedores de forma dinamica --> 
                    <label for="">
                            <span class="text-[#9F9F9F] ml-[10px]">Proveedor:</span>
                            <select v-model="datosNewProduct.proveedor"  class="w-[95%] focus:border-[#FFB984] focus:border-[1.5px] h-[45px] border-[1px] bg-transparent outline-none pl-[5px] 
                        box-border rounded-md mb-[20px] border-[#9F9F9F]  ml-[2.5%]" name="" id="">
                            <option value=""></option>

                            <option v-for="proveedor in listadoProveedores" :key="proveedor.id_proveedores" 
                            :value="proveedor.nombre_proveedor">
                            {{proveedor.nombre_proveedor}}
                            </option>
                          
                        </select>
                    </label>

                    <input v-model="datosNewProduct.description" maxlength="80" required class="w-[95%] h-[60px] focus:border-[#FFB984] focus:border-[1.5px] border-[1px] outline-none pl-[5px] 
                    box-border rounded-md mb-[15px] border-[#9F9F9F]  ml-[2.5%]" type="text" 
                    placeholder="Description">


                    <div class="inline-flex">
                            <label for="" class=" -mt-[26px]" >
                                <span class="order-1 text-[#9F9F9F]  -mt-[20px]  ml-[10px]">Vender por:</span>
                                <select v-model="datosNewProduct.vender_por" required class="w-[80%] focus:border-[#FFB984] bg-transparent focus:border-[1.5px] h-[50px] border-[1px] outline-none pl-[5px] 
                            box-border rounded-md mb-[20px] border-[#9F9F9F]  ml-[2.5%]" name="" id="">
                                <option value="unidad">por unidades</option>
                                <option value="libras">por libras</option>
                            </select>
                        </label>
                        

                        <input maxlength="4" id="cantidad_stok" v-model="datosNewProduct.stock" required class="w-[65%] focus:border-[#FFB984] focus:border-[1.5px] order h-[45px] border-[1px] outline-none pl-[5px] 
                        box-border rounded-md mb-[20px] border-[#9F9F9F]  mr-[2.5%]" type="number" 
                        placeholder="cantidad existente">
                    </div>

                    <button @click="abrir_icono_producto" class="w-[95%] h-[50px] bg-[#E55226] text-white border-[1px] outline-none pl-[5px] 
                    box-border rounded mb-[15px] border-[#9F9F9F]  ml-[2.5%]" type="button">
                      <span>Selecionar icono del producto </span>
                    </button>
                     

                    <button   class="w-full h-[60px] mt-[5px] text-[1.5rem] bg-[#FFB984] text-white ">
                        Guardar 
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