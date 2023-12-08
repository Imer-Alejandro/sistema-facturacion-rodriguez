<script>
export default {
    
}
</script>


<template>
    <section class="w-full h-[95px] bg-[#f8f8f8] p-3 border-[#e7e7e7] border-2   box-border mt-[88vh]  z-20   fixed   overflow-hidden  ">
        <div class="w-full h-full flex items-center ">

            <div class="btn">
                <router-link to="/inventario" class="inline-flex text-center">
                    <img class="w-[40px] absolute ml-[23px]" src="../assets/iconos/menu_inferior/caja.png">
                    <h3 class="text-[#222327] text-[1.1rem]  mt-[45px]">Inventario</h3>
                </router-link>
            </div>
            
                <div class="btn inline-flex text-center justify-center mx-auto">
            <router-link to="/ventas">
                <img class="w-[40px] absolute ml-[10px]" src="../assets/iconos/menu_inferior/mas_venta.png">
                <h3 class="text-[#222327]  text-[1.1rem] mt-[45px] ">Ventas</h3>
            </router-link>

            </div>
            

            <div class=" btn text-center flex items-center">
                <router-link to="/informes" class="inline-flex text-center mx-auto">
                    <img class="w-[40px] absolute ml-[23px]" src="../assets/iconos/menu_inferior/informe-de-negocio.png">
                    <h3 class="text-[#222327]  text-[1.1rem] mt-[45px]">Informes</h3>
                 </router-link>
            </div>

        </div>
    </section>
</template>


<style scoped>
@import url("https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900");

h3{
    font-family: "Poppins", sans-serif;
}

section{
    border-top-right-radius:15px ;
    border-top-left-radius: 15px;

    -webkit-box-shadow: -3px -6px 58px -16px rgba(0,0,0,0.75);
    -moz-box-shadow: -3px -6px 58px -16px rgba(0,0,0,0.75);
    box-shadow: -3px -6px 58px -16px rgba(0,0,0,0.75);
}

.btn:active{
    transition: ease 500ms;
    padding-bottom: 5px;
    border-bottom: 3px solid #FF7850;
}

</style>