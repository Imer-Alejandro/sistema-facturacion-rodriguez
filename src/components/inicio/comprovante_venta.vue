<script>
import axios from 'axios';

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
 
import jsPDF from 'jspdf';
import html2canvas from "html2canvas"
//modulo de bus de eventos globales
import { emitter } from '@/eventBus';

export default {

    props:['ventaOperacion'],

    mounted(){ 
        this.generalPdfFactura();
    },

 
    data(){
      return{

      }
    },

//este mismo componente se usa tanto para inicio como para informe por eso emite doble evento para el loader
  
methods:{
  generalPdfFactura(){
        //abirir carga loader
        emitter.emit('abrir_loader_carga_incio')
        emitter.emit('abrir_loader_carga_informe')

       
      // Obtener el contenedor de la factura
      const facturaContainer = this.$refs.facturaContainer
      const facturaHtml =`
          <html>
            <head>
               <style>
               @import url("https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900");

                .factura {
                  font-family: 'Arial', sans-serif;
                  padding: 20px;
                }

                .encabezado {
                  text-align: center;
                  margin-bottom: 20px;
                }

                .encabezado img{
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
                  margin-bottom:10px;

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
            </head>
             <body>
                 ${facturaContainer.innerHTML}
            </body>
          </html>
            `

        // Realiza la solicitud POST al servidor
        axios.post('https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/generar-pdf', { html: facturaHtml }, { responseType: 'blob' })
        .then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const a = document.createElement('a');
          a.href = url;
          a.download = `factura_id_${this.ventaOperacion.id_ventas}.pdf`;
          a.click();
          toast.success('se genero comprobante de la venta!')
        })
        .catch(error => {
          console.error('Error al solicitar la generación de PDF:', error);
          toast.error('error al general el comprobante de la venta!')
        })
        .finally(()=>{
        // Desactivar el loader de carga
        emitter.emit('cerrar_loader_carga_incio');
        emitter.emit('cerrar_loader_carga_informes');

        // Cerrar ventana
        this.close_comprobante_venta();
        })

     

    },


    close_comprobante_venta(){
          emitter.emit('cerrer_comprobante_venta_inicio')
    }
  }
}
</script>

<template>
    <div>
        <!-- Contenedor para la factura (invisible) -->
        <div ref="facturaContainer"  style="display: none;">
            <div class="factura">
              <div class="encabezado">
                <h2>Rodríguez Embutidos</h2>
                <h3 class="slogan">Donde la calidad reina</h3>
                <p class="contacto">Contacto: (829) 317-0381</p>
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
                <td class="derecha">{{productos.total_producto}}</td>
              </tr>
              <!-- Agrega más filas según sea necesario -->
            </tbody>
          </table>

              <!-- Total de la venta -->
              <div class="total">
                <span>Total: <span class="contenido"> {{this.ventaOperacion.total_venta}}</span></span>
              </div>
              <hr>
              <br>
              <!-- Pie de página -->
              <div class="pie-pagina">
                <p>Gracias por su compra</p>
              </div>
        </div>

    </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900");

/* Estilos CSS actualizados para la factura */
.factura {
  font-family: 'Arial', sans-serif;
  padding: 20px;
}

.encabezado {
  text-align: center;
  margin-bottom: 20px;
}


.encabezado img{
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