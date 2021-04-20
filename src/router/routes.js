
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Home.vue') },
      {path: '/team', component: () =>import('src/pages/Team.vue')}
    ]
  },
  {
    path: '/demo',
    component:() => import('src/pages/Demo_new.vue')
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
