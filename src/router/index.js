import { createRouter, createWebHistory } from 'vue-router'
import ListaUsuarios from '../views/ListaUsuarios.vue'
import VerUsuario from '../views/VerUsuario.vue'
import CrearUsuarios from '../views/CrearUsuarios.vue'
import EditarUsuarios from '../views/EditarUsuarios.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'ListaUsuarios',
      component: ListaUsuarios,
    },
    {
      path: '/ver-usuario/:id',
      name: 'VerUsuario',
      component: VerUsuario,
    },
    {
      path: '/crear-usuario',
      name: 'CrearUsuario',
      component: CrearUsuarios,
    },
    {
      path: '/editar-usuario/:id',
      name: 'EditarUsuario',
      component: EditarUsuarios,
    },
  ],
})

export default router
