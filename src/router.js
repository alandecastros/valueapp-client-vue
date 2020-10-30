import { createWebHashHistory, createRouter } from 'vue-router';
import ListaAcoesPage from './pages/ListaAcoesPage';

const routes = [
  {
    path: '/',
    name: 'ListaAcoesPage',
    component: ListaAcoesPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
