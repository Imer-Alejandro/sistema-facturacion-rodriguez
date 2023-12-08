<script>
import optiones_productos from "./optiones_productos.vue";

//importar el modulo de eventos globales 
import { emitter } from '@/eventBus';

export default {
    props:['producto'],

    mounted() {
        console.log(this.producto)
        // Escuchar el evento para cerrar todos los menús que no sean el que se presiono 
        emitter.on('cerrar-menus', (emisor) => {
                if (emisor !== this) {
                    this.open_and_close_optiones = false;
                }
            });
 
        // Agregar un detector de clics fuera del componente llamando a la funcion correspondiente
        document.addEventListener('click', this.closeMenuOnClickOutside);
                
        },

        // cierra el menu activo de forma automatica al presionar en otro elemento
        beforeUnmount() {
            // Limpia el detector de clics fuera del componente al desmontar
            document.removeEventListener('click', this.closeMenuOnClickOutside);
        },
            
    components:{
        'opciones-producto': optiones_productos,
    },
    data(){
        return{

            datos:this.producto,
            id_producto:'',
            
            open_and_close_optiones:false,

            DatosEditarCantidad:{
                id_producto:this.producto.id,
                tipoVenta:this.producto.vender_por,
                cantidad:this.producto.cantidad_existente
            }
        }
    },
    methods:{
        open_and_close_optiones_producto(){

            this.open_and_close_optiones=!this.open_and_close_optiones

            if (this.open_and_close_optiones) {
                // Emitir un evento para cerrar otros menús
                emitter.emit('cerrar-menus', this);
            }
                
        },
        //evalua si se hizo click fuera del menu para cerrarlo y evitar abrir mas de uno
        closeMenuOnClickOutside(event) {
            if (this.$refs.menuProducto) {
                if (this.$refs.menuProducto && !this.$refs.menuProducto.contains(event.target)) {
                    this.open_and_close_optiones = false;
                }
            }
                
         },
         abirir_actualizar_cantidad_inventario(){
            emitter.emit('abrir_editar_cantidad_producto_inventario',this.DatosEditarCantidad)
         }
        
    }
}
</script>
<template>
    <div class="w-[100%] relative flex p-2 pt-3 h-[150px] rounded-md mb-[15px] bg-white shadow-md shadow-[#0000001f]">
        <div @click="abirir_actualizar_cantidad_inventario" class="w-[100px] flex  justify-center items-center  rounded h-[95%] bg-[#FF7850]" >
            <img class=" order-1 w-[60px] h-[60px]"  :src="producto && producto.icono">
        </div>
        <div class="order-2 pl-2 w-[220px]  mb-[3px]">
            <h3 class="font-medium text-[#E55226]"> {{producto && producto.nombre_producto }} </h3>
            <p class="  text-[0.8rem] font-light mb-[8px] ">
                {{ producto && producto.description }}
            </p>
 
            <div class="inline-flex">
                <h3 class="text-[#858484] mr-[10px]">Precio:<span class="text-[#FF7850]">{{ producto && producto.precio_venta}}/{{ producto && producto.vender_por }}</span></h3>
                <h3 class="text-[#858484] ">Cantidad:<span class="text-[#FF7850]">{{ producto && producto.cantidad_existente }}</span></h3>
            </div>  
        </div>
        
        <img  @click="open_and_close_optiones_producto" 
        class=" order-3 w-[40px] cursor-pointer h-[40px] ml-[10px] mt-[10px] block " 
        src="/src/assets/iconos/interfaz/navegacion.png">

 
        <opciones-producto v-show="open_and_close_optiones" :id_producto=" producto && producto.id"  ref="menuProducto" />
    </div>
</template>