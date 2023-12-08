<script>
import { RouterLink } from 'vue-router'

export default {
   props:['nameSession'],
   data() {
    return{
      open_and_close_menu: false
    }
   },
   methods:{
    CloseMenu(){
      this.open_and_close_menu=false
    },
    OpenMenu(){
      this.open_and_close_menu=true
    }
   }
}
</script>

<template>
    <nav class="w-full h-20 p-2  relative ">
        <h1 class="text-[2.4rem] text-[#E55226]">{{ nameSession }}</h1>

        <img  @click="OpenMenu" src="../assets/iconos/interfaz/menu.png"   class=" w-[40px] h-[40px] cursor-pointer  z-20  ml-[85%] absolute -mt-[40px]">
            
    </nav>

    <div v-show="open_and_close_menu" id="menu_lateral" class="  transition-all z-[50]  bg-[#444d6379] w-full h-screen fixed -mt-[80px]">
        <div class="w-[75%] h-screen bg-white">
            <header class="w-full  items-center inline-flex p-2 h-[80px] bg-[#FFB984]">
              <img @click="CloseMenu" class="bton cursor-pointer order-2 w-[40px] ml-[60%] h-[40px] absolute" src="/src/assets/iconos/interfaz/regresar.png" alt="">
                <h3 class="text-white  order-1 text-[1.4rem]">Gestión de inventario</h3>
            </header>

            <div class="w-full ">
                <ul >
                    <router-link to="/" class="w-full pl-2 block h-[70px] 
                    border-b-[#DFDFDF]  border-b-[2px]  pt-[10px] pb-[10px]">
                        <img  class="w-[40px] absolute " src="../assets/iconos/menu_lateral/hogar.png" >
                        <h4 class="ml-[60px] mt-[5px] text-[1.5rem] text-[#48506C]">Inicio</h4>
                    </router-link>
 
                    <router-link to="/inventario" class="w-full pl-2 block h-[70px] 
                    border-b-[#DFDFDF]  border-b-[2px]  pt-[10px] pb-[10px]">
                        <img class="w-[40px] absolute " src="../assets/iconos/menu_lateral/caja-de-entrega.png" >
                        <h4 class="ml-[60px] mt-[5px] text-[1.5rem] text-[#48506C]">Inventario</h4>
                    </router-link>

                    <router-link to="/informes" class="w-full pl-2 block h-[70px] 
                    border-b-[#DFDFDF]  border-b-[2px]  pt-[10px] pb-[10px]">
                        <img class="w-[40px] absolute " src="../assets/iconos/menu_lateral/barra-grafica.png" >
                        <h4 class="ml-[60px] mt-[5px] text-[1.5rem] text-[#48506C]">Informes</h4>
                    </router-link>

                    <router-link to="/clientes" class="w-full pl-2 block h-[70px] 
                    border-b-[#DFDFDF]  border-b-[2px]  pt-[10px] pb-[10px]">
                        <img class="w-[40px] absolute " src="../assets/iconos/menu_lateral/usuario.png" >
                        <h4 class="ml-[60px] mt-[5px] text-[1.5rem] text-[#48506C]">Clientes</h4>
                    </router-link>

                    <router-link to="/proveedores" class="w-full pl-2 block h-[70px]  
                    border-b-[#DFDFDF]  border-b-[2px]  pt-[10px] pb-[10px]">
                        <img class="w-[40px] absolute " src="../assets/iconos/menu_lateral/camion.png" >
                        <h4 class="ml-[60px] mt-[5px] text-[1.5rem] text-[#48506C]">Proveedores</h4>
                    </router-link>

                    <router-link to="/ventas" class="w-full pl-2 block h-[70px] mt-[100px] border-t-[#DFDFDF]  border-t-[1px] 
                    border-b-[#DFDFDF]  border-b-[1px]  pt-[10px] pb-[10px]">
                        <img class="w-[40px] absolute " src="../assets/iconos/menu_lateral/cambio-de-dinero.png" >
                        <h4 class="ml-[60px] mt-[5px] text-[1.5rem] text-[#48506C]">Ventas</h4>
                    </router-link>

                 
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
.burger {
  position: relative;
  width: 40px;
  height: 30px;
  background: transparent;
  cursor: pointer;
  display: block;
}

.burger input {
  display: none;
}

.burger span {
  display: block;
  position: absolute;
  height: 4px;
  width: 100%;
  background: black;
  border-radius: 9px;
  opacity: 1;
  left: 0;
  transform: rotate(0deg);
  transition: .25s ease-in-out;
}

.burger span:nth-of-type(1) {
  top: 0px;
  transform-origin: left center;
}

.burger span:nth-of-type(2) {
  top: 50%;
  transform: translateY(-50%);
  transform-origin: left center;
}

.burger span:nth-of-type(3) {
  top: 100%;
  transform-origin: left center;
  transform: translateY(-100%);
}

.burger input:checked ~ span:nth-of-type(1) {
  transform: rotate(45deg);
  top: 0px;
  left: 5px;
}

.burger input:checked ~ span:nth-of-type(2) {
  width: 0%;
  opacity: 0;
}

.burger input:checked ~ span:nth-of-type(3) {
  transform: rotate(-45deg);
  top: 28px;
  left: 5px;
}


#menu_lateral{
  backdrop-filter: blur(5px);
}


.bton{
  transform: rotate(180deg);
}
</style>