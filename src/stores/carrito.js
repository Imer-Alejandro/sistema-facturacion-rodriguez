import { defineStore } from 'pinia';
//modulo de bus de eventos globales
import { emitter } from '@/eventBus';

export const useGlobalCarritoVenta = defineStore('carrito', {
  state: () => ({
    // tu estado global aquí
      listadoLocarDeProductos:[],

    carrito_compras:{
        fecha_compra:'',
        tipo_venta:'',
        comentario:'',
        nombre_cliente:'',
        id_cliente:'',
        antigua_deuda_cliente:'',
        total_venta:0,
        detalles_productos:[],
        balance_pendiente:0,
    },
    
  }),
  actions: {
     // Acción para agregar un producto al carrito
     agregarProducto(producto) {
        let existe = false;

        for (let i = 0; i < this.carrito_compras.detalles_productos.length; i++) {
          //evaluar si existe
            if (this.carrito_compras.detalles_productos[i].id_producto === producto.id_producto) {
                //validar que la cantidad de venta no supere la cantidad existente 
                if (!(this.carrito_compras.detalles_productos[i].cantidad_venta >= this.carrito_compras.detalles_productos[i].cantidad_existente) ) {
                    //incremental cantidad de venta
                    this.carrito_compras.detalles_productos[i].cantidad_venta += producto.cantidad_venta;
                    //sumar al total 
                    this.carrito_compras.detalles_productos[i].total_producto += producto.cantidad_venta * producto.precio_venta 
                    //notificar accion
                    emitter.emit('evento_registro_nuevo_producto',(producto.id_producto,producto.cantidad_venta))                             
                }else{
                  emitter.emit('alerta_de_cantidad_supera_existencia')
                }
                existe = true;
                break;
            }
        }
    
        if (!existe) {
            this.carrito_compras.detalles_productos.push(producto);
            emitter.emit('evento_registro_nuevo_producto')                             

        }
        //dejar el contador limpio para actualizar 
        this.carrito_compras.total_venta=0;
        // calcular el total de la venta
        this.calcularTotalVenta(this.carrito_compras.detalles_productos);
      },

   
      agregar_comentario(comentario){
        this.carrito_compras.comentario=comentario
      },


     // Acción para eliminar un producto del carrito 
     eliminarProducto(id) {
          let productos = this.carrito_compras.detalles_productos.filter(producto => producto.id_producto !== id);
          this.carrito_compras.detalles_productos =productos;
          //dejar el contador limpio para actualizar 
          this.carrito_compras.total_venta=0;
          // calcular el total de la venta
          this.calcularTotalVenta(productos);
      },

      calcularTotalVenta(carrito) {
         let total=0;
          carrito.forEach(producto => {
            total += producto.total_producto;
          });
          //convertirlo a decimal y redondearlo a 2 decimas para evitar desvolde de decimas
          this.carrito_compras.total_venta=parseFloat((total).toFixed(2))
      },

      //editar la cantidad a vender del producto
      editar_cantidad_producto(id,nueva_cantidad){
        let nuevoCarrito=[]
        this.carrito_compras.detalles_productos.forEach((item)=>{
            if (item.id_producto === id) { 
                //actualizar cantidad y el total 
                item.cantidad_venta=nueva_cantidad
                //convertirlo a decimal y redondearlo a 2 decimas para evitar desvolde de decimas
                item.total_producto= item.cantidad_venta * item.precio_venta
             
            }
            nuevoCarrito.push(item)
        })
        //asignar el nuevo listado
        this.carrito_compras.detalles_productos=nuevoCarrito
        
          //calcular nuevo total de venta
          this.calcularTotalVenta(this.carrito_compras.detalles_productos);

      },

      asignar_cliente(id,nombre,deuda){
        //si el valor indicado como cliente de venta es niguno es decir que no se asigna nada
          if (nombre == 'ninguno...') {
            this.carrito_compras.nombre_cliente=''
            this.carrito_compras.antigua_deuda_cliente=''
            this.carrito_compras.id_cliente=''
          }else{
            this.carrito_compras.id_cliente=id
            this.carrito_compras.nombre_cliente=nombre
            this.carrito_compras.antigua_deuda_cliente=deuda

          }
      }
  },
});