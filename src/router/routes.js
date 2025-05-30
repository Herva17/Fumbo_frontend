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
        path: '/login',
        component: () => import('src/components/RegisterCount.vue'),
      },
      {
        path: '/ouvrage',
        component: () => import('pages/HistoirePage.vue'),
      },
      {
        path: '/book/:id',
        name: 'book-details',
        component: () => import('src/Details/BookDetails.vue'),
        props: true,
      },
      {
        path: '/category/:category',
        name: 'category',
        component: () => import('src/Details/CategoryPage.vue'),
        props: true,
      },
      {
        path: '/fandom/:fandom',
        name: 'fandom',
        component: () => import('src/Details/CategoryPage.vue'),
        props: (route) => ({
          filterType: 'fandom',
          filterValue: route.params.fandom,
        }),
      },
      {
        path: '/ecouter/:bookId/:chapterId?',
        name: 'reader',
        component: () => import('src/Details/ApercuBook.vue'),
        props: true,
      },

      {
        path: '/groupes',
        component: () => import('src/communaute/CommuNaute.vue'),
      },
      {
        path: '/group/:slug',
        name: 'group-detail',
        component: () => import('src/communaute/GroupDetail.vue'),
        props: true,
      },

      {
        path: '/raconter',
        component: () => import('src/components/SaveStory.vue'),
      },
      {
        path: '/ecouter',
        component: () => import('src/pages/LecteurPage.vue'),
      },
      { path: '/create-book', component: () => import('src/dashboard/CreateBook.vue') },
      { path: '/apercu', component: () => import('src/Details/ApercuBook.vue') },
      { path: '/share-books', component: () => import('src/dashboard/ShareBook.vue') },
      {
        path: '/publier',
        component: () => import('src/pages/OuvragePage.vue'),
      },
      {
        path: '/ecrire',

        component: () => import('src/dashboard/DashBoard.vue'),
        meta: { requiresAut: true },
      },
      {
        path: '/connection',
        component: () => import('pages/LogginPage.vue'),
      },
      {
        path: '/communaute',
        component: () => import('src/communaute/CommuNaute.vue'),
      },
      {
        path: '/footerUser',
        component: () => import('src/components/FooterPage.vue'),
      },
      {
        path: '/write',
        component: () => import('pages/EcrirePage.vue'),
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
      {
        path: '/Perso',
        component: () => import('pages/TeamGroup.vue'),
      },
      {
        path: '/Cont',
        component: () => import('pages/ContactSection.vue'),
      },
      {
        path: '/Rec',
        component: () => import('pages/ConseilsView.vue'),
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
