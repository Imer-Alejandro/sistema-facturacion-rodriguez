import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    
    {
      path: '/',
      name: 'inicio',
      component: () => import('../views/InicioView.vue')
    },
    {
      path: '/inventario',
      name: 'inventario',
      component: () => import('../views/InventarioView.vue')
    }
    ,
    {
      path: '/informes',
      name: 'informes',
      component: () => import('../views/InformesView.vue')
    },
    {
      path: '/clientes',
      name: 'clientes',
      component: () => import('../views/ClientesView.vue')
    }
    ,
    {
      path: '/proveedores',
      name: 'proveedores',
      component: () => import('../views/ProveedoresView.vue')
    }
    ,
   
    {
      path: '/ventas',
      name: 'ventas',
      component: () => import('../views/VentasView.vue')
    },
    {
      path: '/error-red',
      name: 'error',
      component: () => import('../views/ErrorView.vue')
    }
  ]
})

export default router
