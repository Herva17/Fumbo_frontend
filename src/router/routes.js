const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/IndexPage.vue') },
      {
        path: '/inscription',
        component: () => import('src/components/RegisterCount.vue'),
      },
      {
        path: '/ouvrage',
        component: () => import('pages/HistoirePage.vue'),
      },
      { path: '/histoire', component: () => import('pages/HistoirePage.vue') },
      {
        path: '/publier',
        component: () => import('src/pages/OuvragePage.vue'),
      },
      {
        path: '/connection',
        component: () => import('pages/LogginPage.vue'),
      },
      {
        path: '/Enregistrer',
        component: () => import('src/pages/InscriptionPage.vue'),
      },
     
      {
        path: '/about',
        component: () => import('src/pages/AboutPage.vue'),
      },
      {
        path: '/Po',
        component: () => import('pages/PolitiquesC.vue'),
      },
      {
        path: '/Ml',
        component: () => import('pages/MentionsL.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
