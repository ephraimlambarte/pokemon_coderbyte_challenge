import MainLayout from 'layouts/MainLayout.vue'
const routes = [
  {
    path: '/',
    component: () => MainLayout,
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/detail/:name', component: () => import('pages/PokemonDetail.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    name: 'notfound',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
