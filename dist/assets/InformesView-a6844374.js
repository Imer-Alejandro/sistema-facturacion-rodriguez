import{_ as S,a as E,b as A,H as R,M as z}from"./navegacion-8f4cbcb9.js";import{e as i,a as p,_ as O,L as M}from"./carga_loader-af069024.js";import{_ as T,C as L}from"./comprovante_venta-3e0c3c20.js";import{_ as g,o as c,c as _,a as e,r as m,t as l,b as f,w as b,v as k,d as x,l as h,F as y,e as $,p as H,f as N,h as F,i as D,j as U,k as V,q as K}from"./index-149373d7.js";import{_ as j}from"./donacion-de-alimentos-2be68562.js";const J={props:["ventas"],methods:{open_detalles_ventas(){i.emit("open_detalle_ventas_informe",this.ventas)},open_editar_ventas(){i.emit("open_editar_ventas_informe")},open_anular_ventas(){i.emit("open_anular_venta_informe",this.ventas)},open_comprobante_ventas(){i.emit("open_comprobante_informe",this.ventas)}}},G={class:"optiones_ventas overflow-hidden w-[150px] z-[1] h-[120px] bg-[#f7f8ff] absolute rounded shadow-md shadow-[#00000031] ml-[35%] mt-[40px]"},Q=e("button",null,[e("span",{class:"text-[1rem]"},"detalles"),e("img",{class:"w-[20px] absolute ml-[70%] -mt-[23px]",src:S})],-1),W=[Q],X=e("button",null,[e("span",{class:"text-[1rem]"},"Anular"),e("img",{class:"w-[20px] absolute ml-[70%] -mt-[23px]",src:E})],-1),Y=[X],Z=e("button",null,[e("span",{class:"text-[1rem]"},"Factura"),e("img",{class:"w-[20px] absolute ml-[70%] -mt-[23px]",src:T})],-1),ee=[Z];function te(t,s,o,d,a,n){return c(),_("div",G,[e("ul",null,[e("li",{onClick:s[0]||(s[0]=(...r)=>n.open_detalles_ventas&&n.open_detalles_ventas(...r)),class:"p-2 cursor-pointer border-b-[#DFDFDF] border-b-[2px]"},W),e("li",{onClick:s[1]||(s[1]=(...r)=>n.open_anular_ventas&&n.open_anular_ventas(...r)),class:"border-b-[#DFDFDF] border-b-[2px] p-2 cursor-pointer"},Y),e("li",{onClick:s[2]||(s[2]=(...r)=>n.open_comprobante_ventas&&n.open_comprobante_ventas(...r)),class:"border-b-[#DFDFDF] border-b-[2px] p-2 cursor-pointer"},ee)])])}const se=g(J,[["render",te]]),ae={props:["ventas"],mounted(){i.on("cerrar-menu-ventas",t=>{t!==this&&(this.mostrar_optiones=!1)}),document.addEventListener("click",this.closeMenuOnClickOutside)},beforeUnmount(){document.removeEventListener("click",this.closeMenuOnClickOutside)},components:{"menu-options":se},data(){return{mostrar_detalle:!1,mostrar_optiones:!1,horaVenta:this.ventas.fecha.substring(13)}},methods:{activar_Optiones_Ventas(){this.mostrar_optiones=!this.mostrar_optiones,this.mostrar_optiones&&i.emit("cerrar-menu-ventas",this)},closeMenuOnClickOutside(t){this.$refs.menu&&!this.$refs.menu.contains(t.target)&&(this.mostrar_optiones=!1)}}},oe={class:"z-[1] bg-white w-[95%] ml-[2.5%] pr-0 p-3 inline-flex rounded mb-[20px] shadow-md shadow-[#00000031]"},ne=e("figure",{class:"h-[95%] p-2 rounded bg-[#E55226] mr-[5px]"},[e("img",{class:"w-[40px]",src:j})],-1),re={key:0},ie={class:"h-[95%] flex items-center mt-[2px] p-2 rounded bg-[#A6F988] pt-[5px] mr-1"},le={class:"text-[1rem]"},de={key:1},ce={class:"h-[95%] flex items-center mt-[2px] p-2 rounded bg-[#FF6161] mr-1"},_e={class:"text-[1rem]"},he={class:"font-bold mt-[18px] mr-[8px]"},pe={class:"font-medium"},ue={class:"border-l-[1.5px] pt-[17px] pl-[4px] border-l-[#DFDFDF]"},me={class:"mt-[15px]"};function ve(t,s,o,d,a,n){const r=m("menu-options");return c(),_("div",oe,[ne,o.ventas.tipo_venta!="credito"?(c(),_("div",re,[e("div",ie,[e("h3",le,l(o.ventas.tipo_venta),1)])])):(c(),_("div",de,[e("div",ce,[e("h3",_e,l(o.ventas.tipo_venta),1)])])),e("h3",he,[f("Total: "),e("span",pe,l(o.ventas.total_venta),1)]),e("div",ue,[e("span",me,l(a.horaVenta),1)]),e("img",{onClick:s[0]||(s[0]=(...w)=>n.activar_Optiones_Ventas&&n.activar_Optiones_Ventas(...w)),class:"w-[40px] cursor-pointer h-[40px] ml-[10px] mt-[10px] block",src:A}),b(x(r,{ventas:this.ventas,ref:"menu"},null,8,["ventas"]),[[k,a.mostrar_optiones]])])}const fe=g(ae,[["render",ve]]),be={props:["ventaOperacion"],data(){return{datosAnularVenta:{id_cliente:"",nombre_cliente:"",total_venta:"",detalles_productos:"",tipo_venta:""}}},methods:{close_anular_ventas(){i.emit("cerrar_anular_venta_informe")},anular_venta(){i.emit("abrir_loader_carga_informe"),this.datosAnularVenta.id_cliente=this.ventaOperacion.id_clientes,this.datosAnularVenta.nombre_cliente=this.ventaOperacion.nombre_cliente,this.datosAnularVenta.total_venta=this.ventaOperacion.total_venta,this.datosAnularVenta.detalles_productos=this.ventaOperacion.detalles_producto,this.datosAnularVenta.tipo_venta=this.ventaOperacion.tipo_venta,console.log(this.datosAnularVenta),p.post(`https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/anular-registro-venta/${this.ventaOperacion.id_ventas}`,this.datosAnularVenta).then(t=>{console.log(t),h.success("se elimino el registro de la venta!")}).catch(t=>{console.log(t),h.error("error al eliminar el registro de la venta!")}).finally(()=>{i.emit("cerrar_anular_venta_informe"),i.emit("cerrar_loader_carga_informes"),i.emit("actualizar_informe")})}}},xe={class:"w-full h-[100vh] bg-[#444d639c] fixed -mt-[80px] z-40"},ge={class:"w-[90%] ml-[5%] h-[250px] bg-white mt-[30%]"},we={class:"w-full p-3 inline-flex border-b-[1.5px] border-b-[#DFDFDF]"},Fe=e("h2",{class:"text-[1.7rem] ml-[10%] order-2"},"anular venta",-1),De={class:"p-3"},Ve=e("h3",{class:"text-center text-[#9F9F9F]"},"Esta seguro que desea anular esta venta?",-1);function Oe(t,s,o,d,a,n){return c(),_("section",xe,[e("div",ge,[e("header",we,[e("img",{onClick:s[0]||(s[0]=(...r)=>n.close_anular_ventas&&n.close_anular_ventas(...r)),class:"w-[35px] mr-[25px] order-1 cursor-pointer",src:O}),Fe]),e("div",De,[Ve,e("button",{onClick:s[1]||(s[1]=(...r)=>n.anular_venta&&n.anular_venta(...r)),class:"w-[90%] ml-[5%] mt-[50px] text-[1.2rem] h-[60px] rounded text-white bg-[#CC0B09]"},"anular")])])])}const ke=g(be,[["render",Oe]]);const ye={props:["ventaOperacion"],methods:{close_detalle_ventas(){i.emit("cerrar_detalles_venta_informes")}}},v=t=>(H("data-v-c2988187"),t=t(),N(),t),$e={class:"w-full h-[100vh] bg-white fixed -mt-[80px] z-40"},Ce={class:"w-full p-3 mb-[20px] inline-flex border-b-[1.5px] border-b-[#DFDFDF]"},Pe=v(()=>e("h2",{class:"text-[1.7rem] ml-[5%] order-2"},"Detalles de venta",-1)),qe={class:"w-full pl-2 pb-2 border-b-[1.5px] pt-2 inline-flex border-b-[#DFDFDF]"},Ie=v(()=>e("h3",{class:"text-[1.2rem] order-1 font-medium mb-[10px]"},"fecha: ",-1)),Be={class:"font-normal order-2 text-[1.2rem] ml-[10%] text-[#363636]"},Se={class:"w-full pl-2 pb-2 border-b-[1.5px] pt-2 inline-flex border-b-[#DFDFDF]"},Ee=v(()=>e("h3",{class:"text-[1.2rem] order-1 font-medium mb-[10px]"},"Tipo de venta: ",-1)),Ae={class:"font-normal order-2 text-[#363636] text-[1.2rem] ml-[10%]"},Re={class:"w-full pl-2 pb-2 border-b-[1.5px] pt-2 inline-flex border-b-[#DFDFDF]"},ze=v(()=>e("h3",{class:"text-[1.2rem] order-1 font-medium mb-[10px]"},"Cliente: ",-1)),Me={class:"font-normal order-2 text-[#363636] text-[1.2rem] ml-[10%]"},Te={class:"w-full pl-2 pb-2 pr-2 border-b-[1.5px] pt-2 inline-flex border-b-[#DFDFDF]"},Le=v(()=>e("h3",{class:"text-[1.2rem] order-1 font-medium mb-[10px]"},"Comentario: ",-1)),He={class:"font-normal text-[#363636] order-2 text-[1.1rem] ml-[8%]"},Ne={class:"p-2 w-full h-[300px] overflow-hidden"},Ue=v(()=>e("h3",{class:"text-[1.1rem] font-medium"},"Detalles de productos",-1)),Ke={class:"w-full h-full overflow-scroll"},je={class:"w-[130%]"},Je={class:"styled-table"},Ge=v(()=>e("thead",null,[e("tr",null,[e("th",null,"Icono"),e("th",null,"Nombre"),e("th",null,"Precio"),e("th",null,"Cantidad"),e("th",null,"Total")])],-1)),Qe=["src"],We={class:"w-full border-b-[1.5px] bg-white mt-[30px] p-3 inline-flex border-b-[#DFDFDF]"},Xe=v(()=>e("h3",{class:"text-[1.4rem] order-1 font-medium mb-[10px]"},"Total de la venta: ",-1)),Ye={class:"font-normal order-2 text-[1.4rem] ml-[10%] text-[#E55226]"};function Ze(t,s,o,d,a,n){return c(),_("section",$e,[e("header",Ce,[e("img",{onClick:s[0]||(s[0]=(...r)=>n.close_detalle_ventas&&n.close_detalle_ventas(...r)),class:"w-[35px] mr-[25px] order-1 cursor-pointer",src:O}),Pe]),e("div",qe,[Ie,f(),e("span",Be,l(o.ventaOperacion.fecha),1)]),e("div",Se,[Ee,f(),e("span",Ae,l(o.ventaOperacion.tipo_venta),1)]),e("div",Re,[ze,f(),e("span",Me,l(o.ventaOperacion.nombre_cliente),1)]),e("div",Te,[Le,f(),e("span",He,l(o.ventaOperacion.comentario),1)]),e("div",Ne,[Ue,e("div",Ke,[e("div",je,[e("table",Je,[Ge,e("tbody",null,[(c(!0),_(y,null,$(JSON.parse(o.ventaOperacion.detalles_producto),r=>(c(),_("tr",{key:r.id_producto},[e("td",null,[e("img",{class:"w-[45px] h-[45px]",src:r.icono},null,8,Qe)]),e("td",null,l(r.nombre_producto),1),e("td",null,l(r.precio_venta),1),e("td",null,l(r.cantidad_venta),1),e("td",null,l(r.total_producto),1)]))),128))])])])])]),e("div",We,[Xe,f(),e("span",Ye,l(o.ventaOperacion.total_venta),1)])])}const et=g(ye,[["render",Ze],["__scopeId","data-v-c2988187"]]),tt={mounted(){this.$socket.on("actualizar_registro_venta",t=>{h.success("actualizando registro de venta!"),this.buscar_ventas()}),i.on("open_comprobante_informe",t=>{this.ventaOperacion=t,this.estados.visibilidad_comprobante_venta=!0}),i.on("cerrer_comprobante_venta_inicio",()=>{this.estados.visibilidad_comprobante_venta=!1}),this.buscar_ventas(),i.on("actualizar_informe",()=>{this.buscar_ventas()}),i.on("abrir_loader_carga_informe",()=>{this.estados.visibilidad_carga_loader=!0}),i.on("cerrar_loader_carga_informes",()=>{this.estados.visibilidad_carga_loader=!1}),i.on("open_anular_venta_informe",t=>{this.ventaOperacion=t,this.estados.visibilidad_anular_venta=!0}),i.on("cerrar_anular_venta_informe",()=>{this.estados.visibilidad_anular_venta=!1}),i.on("open_detalle_ventas_informe",t=>{this.ventaOperacion=t,this.estados.visibilidad_detalles_venta=!0}),i.on("cerrar_detalles_venta_informes",()=>{this.estados.visibilidad_detalles_venta=!1})},components:{"menu-header":R,"menu-inferior":z,"carga-loader":M,ventas:fe,"detalles-venta":et,"anular-venta":ke,"comprobante-venta":L},data(){return{title:"Informes",datosVentas:[],ventaOperacion:"",valorInventario:0,deudasPorCobrar:0,deudasPorPagar:0,indicadorDeregistro:"todas",ingresosVentas:0,indicadoIngreso:"general",busquedaPorFecha:"",busquedaPorRango:"indicar rango",terminoBusqudaCliente:"",estados:{visibilidad_carga_loader:!1,visibilidad_detalles_venta:!1,visibilidad_anular_venta:!1,visibilidad_comprobante_venta:!1}}},watch:{busquedaPorFecha(){const t=this.convertirFormatoFechaHora(this.busquedaPorFecha);this.estados.visibilidad_carga_loader=!0,p.get(`https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/busqueda-registro-venta-por-fecha/${t}`).then(s=>{this.datosVentas=s.data}).catch(s=>{console.log(s),h.error("error al obtener la venta por fecha!")}).finally(()=>{this.indicadorDeregistro=t,this.estados.visibilidad_carga_loader=!1})},busquedaPorRango(){this.busquedaPorRango=="todas"?(this.estados.visibilidad_carga_loader=!0,p.get("https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/obtener-ventas").then(t=>{this.datosVentas=t.data,this.datosVentas.length>0&&h.success("se obtuvieron todas las ventas !"),this.ingresosDeVentas(this.datosVentas)}).catch(t=>{console.log(t)}).finally(()=>{this.indicadorDeregistro="todas",this.indicadoIngreso=" todas",this.estados.visibilidad_carga_loader=!1})):this.busquedaPorRango=="hoy"?(this.estados.visibilidad_carga_loader=!0,p.get("https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/ventas-dia-actual").then(t=>{this.datosVentas=t.data,this.datosVentas.length>0&&h.success("se obtuvieron las ventas de hoy!"),this.ingresosDeVentas(this.datosVentas)}).catch(t=>{console.log(t)}).finally(()=>{this.indicadorDeregistro="hoy",this.indicadoIngreso="hoy",this.estados.visibilidad_carga_loader=!1})):this.busquedaPorRango=="este mes"?(this.estados.visibilidad_carga_loader=!0,p.get("https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/buscar-venta-mensual").then(t=>{this.datosVentas=t.data,this.datosVentas.length>0&&h.success("se obtuvieron las ventas mensuales!"),this.ingresosDeVentas(this.datosVentas)}).catch(t=>{console.log(t)}).finally(()=>{this.indicadorDeregistro="este mes",this.indicadoIngreso="este mes",this.estados.visibilidad_carga_loader=!1})):this.busquedaPorRango=="del año"&&(this.estados.visibilidad_carga_loader=!0,p.get("https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/ventas-anuales").then(t=>{this.datosVentas=t.data,this.datosVentas.length>0&&h.success("se obtuvieron las ventas anuales!"),this.ingresosDeVentas(this.datosVentas)}).catch(t=>{console.log(t)}).finally(()=>{this.indicadorDeregistro="este año",this.indicadoIngreso="este año",this.estados.visibilidad_carga_loader=!1}))}},methods:{buscar_ventas(){this.estados.visibilidad_carga_loader=!0,p.get("https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/obtener-ventas").then(t=>{this.datosVentas=t.data}).catch(t=>{console.log(t)}).finally(()=>{this.buscar_valor_inventario(),this.total_deuda_clientes(),this.total_deuda_proveedores(),this.ingresosDeVentas(this.datosVentas),this.estados.visibilidad_carga_loader=!1})},ingresosDeVentas(t){let s=0;for(let o in t)if(t.hasOwnProperty(o)){let d=t[o];d.hasOwnProperty("total_venta")&&(s+=d.total_venta)}this.ingresosVentas=s},total_deuda_clientes(){p.get("https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/obtener-clientes").then(t=>{let s=t.data,o=0;for(let d in s)if(s.hasOwnProperty(d)){let a=s[d];a.hasOwnProperty("deuda")&&(o+=a.deuda)}this.deudasPorCobrar=o}).catch(t=>{console.error("Error al obtener la lista de clientes",t)})},total_deuda_proveedores(){p.get("https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/obtener-proveedores").then(t=>{let s=t.data,o=0;s.forEach(d=>{o+=d.deuda_a_proveedor}),this.deudasPorPagar=o}).catch(t=>{console.error("Error al obtener la lista de proveedores",t)})},buscar_valor_inventario(){p.get("https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/productos").then(t=>{const s=t.data;this.valorInventario=s.reduce((o,d)=>o+d.costo*d.cantidad_existente,0)}).catch(t=>{console.log(t),h.error("error al calcular el total del invetario!")})},buscar_venta_cliente(){this.terminoBusqudaCliente!=""?(this.estados.visibilidad_carga_loader=!0,p.get(`https://api-sistema-facturacion-c521f94ffcfb.herokuapp.com/busqueda-registro-venta-cliente/${this.terminoBusqudaCliente}`).then(t=>{this.datosVentas=t.data,h.success("se obtuvieron las ventas del cliente!"),this.indicadorDeregistro=this.terminoBusqudaCliente}).catch(t=>{console.log(t),h.warn("error al buscar las ventas del cliente!")}).finally(()=>{this.terminoBusqudaCliente="",this.estados.visibilidad_carga_loader=!1})):h.warn("ingrese un dato para buscar las ventas del cliente!")},convertirFormatoFechaHora(t){const s=new Date(t),o={month:"short",day:"numeric",year:"numeric"},d={hour:"numeric",minute:"numeric",hour12:!0},a=s.toLocaleString("en-US",o).replace(",",""),n=s.toLocaleString("en-US",d);return`${a} - ${n}`}}},st={class:"bg-[#FEFEE5] pb-[220px] w-full h-[100%]"},at={class:"w-full mt-[20px] h-400px p-2 overflow-hidden"},ot=e("h3",{class:"text-[1.4rem] mb-[20px]"},"Reportes general",-1),nt={class:"w-full h-[100%] overflow-x-scroll"},rt={class:"w-[280%] inline-flex"},it={class:"p-3 w-[320px] mr-[10px] h-[120px] rounded shadow-md shadow-[#00000031] mb-[20px] bg-[#FF7850]"},lt={class:"text-[#F9F9F9]"},dt={class:"text-[1.6rem] mb-[10px] text-white font-bold"},ct={class:"p-3 w-[320px] mr-[10px] h-[120px] rounded shadow-md shadow-[#00000031] mb-[20px] bg-[#FFB984]"},_t=e("span",{class:"text-[#F9F9F9]"},"Valor total del inventario",-1),ht={class:"text-[1.6rem] mb-[10px] text-white font-bold"},pt={class:"p-3 w-[320px] mr-[10px] h-[120px] rounded shadow-md shadow-[#00000031] mb-[20px] bg-[#f07e5c]"},ut=e("span",{class:"text-[#F9F9F9]"},"Total de la deuda por cobrar",-1),mt={class:"text-[1.6rem] mb-[10px] text-white font-bold"},vt={class:"p-3 w-[320px] mr-[10px] h-[120px] rounded shadow-md shadow-[#00000031] mb-[20px] bg-[#FFB984]"},ft=e("span",{class:"text-[#F9F9F9]"},"Total de la deuda a proveedores",-1),bt={class:"text-[1.6rem] mb-[10px] text-white font-bold"},xt={class:"mt-[20px] p-2"},gt=e("h3",{class:"text-[1.4rem] mb-[10px]"},"Registro de ventas",-1),wt=e("option",null,"indicar rango",-1),Ft=e("option",{value:"todas"},"todas",-1),Dt=e("option",{value:"hoy"},"hoy",-1),Vt=e("option",{value:"este mes"},"este mes",-1),Ot=e("option",{value:"del año"},"del año",-1),kt=[wt,Ft,Dt,Vt,Ot],yt={class:"w-full pb-[60px] mt-[20px]"},$t={class:"text-[1.2rem] mb-[10px]"},Ct={class:"text-[#444444] text-[1.1rem]"},Pt={key:0},qt={key:1},It=e("h3",{class:"text-[1.4rem] text-center"}," no se encontraron ventas...",-1),Bt=[It];function St(t,s,o,d,a,n){const r=m("menu-inferior"),w=m("carga-loader"),C=m("menu-header"),P=m("comprobante-venta"),q=m("anular-venta"),I=m("detalles-venta"),B=m("ventas");return c(),_("section",st,[x(r),b(x(w,null,null,512),[[k,a.estados.visibilidad_carga_loader]]),x(C,{nameSession:a.title},null,8,["nameSession"]),a.estados.visibilidad_comprobante_venta?(c(),F(P,{key:0,ventaOperacion:a.ventaOperacion},null,8,["ventaOperacion"])):D("",!0),a.estados.visibilidad_anular_venta?(c(),F(q,{key:1,ventaOperacion:a.ventaOperacion},null,8,["ventaOperacion"])):D("",!0),a.estados.visibilidad_detalles_venta?(c(),F(I,{key:2,ventaOperacion:a.ventaOperacion},null,8,["ventaOperacion"])):D("",!0),e("div",at,[ot,e("div",nt,[e("div",rt,[e("div",it,[e("span",lt,"Ingresos por ventas / "+l(a.indicadoIngreso),1),e("h3",dt,l(a.ingresosVentas),1)]),e("div",ct,[_t,e("h3",ht,l(a.valorInventario),1)]),e("div",pt,[ut,e("h3",mt,l(a.deudasPorCobrar),1)]),e("div",vt,[ft,e("h3",bt,l(a.deudasPorPagar),1)])])])]),e("div",xt,[gt,e("div",null,[b(e("select",{"onUpdate:modelValue":s[0]||(s[0]=u=>a.busquedaPorRango=u),class:"w-[100px] outline-none text-[0.8rem] mr-[5px] rounded bg-white shadow-md shadow-[#0000002a] h-[45px]",name:"",id:""},kt,512),[[U,a.busquedaPorRango]]),b(e("input",{"onUpdate:modelValue":s[1]||(s[1]=u=>a.busquedaPorFecha=u),placeholder:"indicar fecha",class:"w-[105px] mr-[5px] outline-none text-[0.9rem] rounded bg-white shadow-md shadow-[#0000002a] h-[45px]",type:"datetime-local",name:"",id:""},null,512),[[V,a.busquedaPorFecha]]),b(e("input",{onKeyup:s[2]||(s[2]=K((...u)=>n.buscar_venta_cliente&&n.buscar_venta_cliente(...u),["enter"])),"onUpdate:modelValue":s[3]||(s[3]=u=>a.terminoBusqudaCliente=u),placeholder:"buscar por cliente...",class:"w-[140px] pl-2 placeholder:text-[0.8rem] mr-[5px] outline-none rounded bg-white shadow-md shadow-[#0000002a] h-[45px]",type:"text",name:"",id:""},null,544),[[V,a.terminoBusqudaCliente]])]),e("div",yt,[e("h3",$t,[f("Ventas/ "),e("span",Ct,l(a.indicadorDeregistro),1)]),a.datosVentas.length>0?(c(),_("div",Pt,[(c(!0),_(y,null,$(a.datosVentas,u=>(c(),_("div",{key:u.id_ventas},[x(B,{ventas:u},null,8,["ventas"])]))),128))])):(c(),_("div",qt,Bt))])])])}const Tt=g(tt,[["render",St]]);export{Tt as default};