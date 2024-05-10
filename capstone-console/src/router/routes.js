const routes = [
  {
    path: '/',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/LoginPage.vue') },
      { path: 'oauth', component: () => import('pages/AuthPage.vue') },
      { path: 'myclubs', component: () => import('pages/IndexPage.vue') },
      { path: 'newclub', component: () => import('pages/AddClubPage.vue') },
    ]
  },
  {
    path: '/console',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/MembersPage.vue') },
      { path: 'settings', component: () => import('pages/ClubPage.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
