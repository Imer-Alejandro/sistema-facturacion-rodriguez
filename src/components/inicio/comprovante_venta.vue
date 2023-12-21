<script>
import axios from 'axios';

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import html2pdf from 'html2pdf.js';

//modulo de bus de eventos globales
import { emitter } from '@/eventBus';


export default {

    props:['ventaOperacion'],

    mounted(){
      //escuchamos el evento para generar pdf y mostrarlo en pantalla
      this.$nextTick(async () => {
        // Genera el PDF aquí
        await this.generalPdfFactura();
      });
    },
 
    data(){
      return{

      }
    },

//este mismo componente se usa tanto para inicio como para informe por eso emite doble evento para el loader
  
methods:{
  async generalPdfFactura(){
      // Abrir carga loader
  emitter.emit('abrir_loader_carga_incio'); 
  emitter.emit('abrir_loader_carga_informe');

  try {
    const element = document.getElementById('facturaContainer');
    const nombrePDF = `factura_id_${this.ventaOperacion.id_ventas}.pdf`;
      html2pdf().from(element).save(nombrePDF);
      toast.success('se genero el comprobante de venta! ')
  } 
  catch (error) {
    toast.error('error al generar el comprobante de venta! ')
    console.error('Error al generar el PDF:', error);
  } 
  finally {
    // Desactivar el loader de carga
    emitter.emit('cerrar_loader_carga_incio');
    emitter.emit('cerrar_loader_carga_informes');

  }
},
 
    close_comprobante_venta(){
          emitter.emit('cerrer_comprobante_venta_inf_inicio')
    }
  },

}
</script>
 
<template>
    <div>
      <section  class="  w-full h-[100vh] bg-white fixed -mt-[80px] z-40 ">
        <header class="w-full p-3 inline-flex border-b-[1.5px] border-b-[#DFDFDF]">
            <img @click="close_comprobante_venta"   class="w-[35px] mr-[25px]  order-1 cursor-pointer" src="/src/assets/iconos/interfaz/regresar.png" >
            <h2 class="text-[1.7rem] ml-[30px] order-2">Vista de factura</h2>
        </header>

        <div class="w-full h-[80%] overflow-y-scroll box-border">
          <div id="facturaContainer">
        <div class="factura">
              <div class="encabezado">
                <div class="content-img">
                  <img src="/icons/icon-250x250.png" alt="">
                </div>
                <h2>Rodríguez Embutidos</h2>
                <h3 class="slogan">Donde la calidad reina</h3>
                <p class="contacto">Contacto: (829) 317-0381</p>
                <br><br><br>
                <div class="info">
                  <div class="izquierda">Fecha: <span class="contenido">{{this.ventaOperacion.fecha}}</span></div>
                  <div v-if="this.ventaOperacion.nombre_cliente != ''">
                  <div class="izquierda">Cliente: <span class="contenido">{{this.ventaOperacion.nombre_cliente}}</span></div>
                  </div>
                  <div class="derecha">Código: <span class="contenido">{{this.ventaOperacion.id_ventas}}</span></div>
                </div>
                <div class="info">
                  <div class="derecha">Tipo de venta: <span class="contenido">{{this.ventaOperacion.tipo_venta}}</span></div>
                </div>
              </div>
            </div>
 <!-- Detalles de los productos vendidos -->
        <table>
            <thead>
              <tr>
                <th class="izquierda">Producto</th>
                <th class="derecha">Precio</th>
                <th class="derecha">Cantidad</th>
                <th class="derecha">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="productos in JSON.parse(this.ventaOperacion.detalles_producto)" :key="productos.id_producto">
                <td class="izquierda">{{ productos.nombre_producto }}</td>
                <td class="derecha">
                    {{ productos.precio_venta }}
                    <span v-if="productos.vender_por != 'unidad'">/lb</span>
                    <span v-else>/und</span>
                </td>
                <td class="derecha">{{ productos.cantidad_venta }}</td>
                <td class="derecha">{{productos.total_producto.toLocaleString('en-US', { style: 'decimal', useGrouping: true, maximumFractionDigits: 2 })}}</td>
              </tr>
              <!-- Agrega más filas según sea necesario -->
            </tbody>
          </table>

 
             <!-- Total de la venta -->
             <div class="total">
                <span>Total: <span class="contenido"> {{this.ventaOperacion.total_venta.toLocaleString('en-US', { style: 'decimal', useGrouping: true, maximumFractionDigits: 2 })}}</span></span>
              </div>

              <hr>
              <br>
              <!-- Pie de página -->
              <div class="pie-pagina">
                
                <p style="text-align: left; font-size: 0.7rem;">
                  <span style="font-weight: bold;">NOTA:</span> Cláusula de responsabilidad: Rodríguez Embutidos, 
                  no se hace responsable de uso, o el destino final de los productos detallados en esta factura. 
                  Favor verificar su mercancía y factura, no aceptamos devoluciones luego de dos días de entrega, 
                  descuentos por mermas ( tener en cuenta que la chuleta marcada está supuesta a rebajar de peso), 
                  ni modificaciones después de haber recibido la mercancía.
                </p>
                <br>
                <hr>
                <br>
                <p>Gracias por su compra</p>
              </div>
      </div>
        </div>
    </section>
      

    </div>
</template>

<style scoped>

#facturaContainer{
  padding: 20px;
}
/* Estilos CSS actualizados para la factura */
.factura {
  font-family: 'Arial', sans-serif;
  padding: 5px;
}



.encabezado {
  justify-content: center;
  align-content: center;
  text-align: center;
  margin-bottom: 20px;
}

.encabezado > h2{
  font-size: 2rem;
  margin-bottom: 10px;
}

.content-img{
  width: 100%;
  display: flex;
  justify-content: center;

}
.content-img img{
  
  width: 150px;
  height: 150px;
}
.slogan{
  font-size: 0.9em;
  color: #5a5a5a;
  text-align: center;
  margin-bottom: 10px;
}
.contacto {
  font-size: 0.7em;
  color: #5a5a5a;
  text-align: center;
  margin-bottom: 10px;
}
.info {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.izquierda {
  text-align: left;

}
.contenido{
  color: #5a5a5a;
}
.derecha {
  text-align: right;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th, td {
  padding: 8px;
  text-align: left;
}

th {
  background-color: #E55226; /* Color azul claro pastel para el encabezado de la tabla */
  color: #fff; /* Texto blanco para contrastar */
}

tr:nth-child(even) {
  background-color: rgba(173, 216, 230, 0.2); /* Fondo alternativo más opaco para filas pares */
}

.total {
  text-align: right;
  margin-bottom: 20px;
}

.pie-pagina {
  text-align: center;
}
</style>