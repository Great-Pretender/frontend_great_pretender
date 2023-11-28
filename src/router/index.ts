import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import ClientView from '../views/ClientView.vue'
import ServicoView from '../views/ServicoView.vue'
import ItemView from '../views/ItemView.vue'
import ContratoViewVue from '@/views/ContratoView.vue'
import DetalhesContratoVue from '@/views/DetalhesContrato.vue'
import DetalhesServicoVue from '@/views/DetalhesServico.vue'
import DetalhesClientecoVue from '@/views/DetalhesCliente.vue'
import DetalhesSetorVue from '@/views/DetalhesSetor.vue'
import SetorViewVue from '@/views/SetorView.vue'
import UsuarioViewVue from '@/views/UsuarioView.vue'
import DetalhesUsuarioVue from '@/views/DetalhesUsuario.vue'
import DetalhesItemVue from '@/views/DetalhesItem.vue'
import ordemServico from '@/views/OrdemDeServicoView.vue'
import AtribuicaoOrdemDeServico from '@/views/AtribuicaoOrdemDeServico.vue'
import LoginViewVue from '@/views/LoginView.vue'
import testeOS from '@/views/testeOS.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/ordemServico',
      name: 'ordemDeServico',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: ordemServico
    },
    {
      path: '/Client',
      name: 'Client',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: ClientView
    },    {
      path: '/Client/:id',
      name: 'DetalhesCliente',
      component: DetalhesClientecoVue
    },
    {
      path: '/',
      name: 'Home',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: HomeView
    },
    {
    path: '/Servico',
    name: 'Servico',
    component: ServicoView
    },
    {
      path: '/Servico/:id',
      name: 'DetalhesServico',
      component: DetalhesServicoVue
    },
    {
      path: '/Item',
      name: 'Item',
      component: ItemView
    },
    {
      path: '/Item/:id',
      name: 'DetalhesItem',
      component: DetalhesItemVue
    },
    {
      path: '/contrato',
      name: 'contrato',
      component: ContratoViewVue
    },
    {
      path: '/contrato/:id',
      name: 'DetalhesContrato',
      component: DetalhesContratoVue 
    },
    {
      path: '/setor',
      name: 'setor',
      component: SetorViewVue
    },
    {
      path: '/setor/:id',
      name: 'DetalhesSetor',
      component: DetalhesSetorVue 
    },
    {
      path: '/usuario',
      name: 'usuario',
      component: UsuarioViewVue
    },
    {
      path: '/usuario/:id',
      name: 'DetalhesUsuario',
      component: DetalhesUsuarioVue 
    },
    {
      path: '/atribuicao/:id',
      name: 'AtribuicaoOrdemDeServico',
      component: AtribuicaoOrdemDeServico
    }
    ,
    {
      path: '/login',
      name: 'Login',
      component: LoginViewVue
    },
    {
      path: '/testeOS',
      name: 'testeOS',
      component: testeOS
    }
  ]
})

export default router
