export const routes = [

        {
          path: '/login',
          name: 'login',
          component: () => import('@/views/auth/LoginView.vue'),
          meta: {
            guest: true,
          },
        },
        {
          path: '/',
          name: 'dashboard',
          component: () => import('@/views/dashboard/DashboardView.vue'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: '/users',
          name: 'users',
          component: () => import('@/views/users/UsersIndex.vue'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('@/views/AboutView.vue'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: '/unauthorized',
          name: 'unauthorized',
          component: () => import('@/views/auth/Unauthorized.vue'),
        },
        {
          path: '/:pathMatch(.*)*',
          name: 'notfound',
          component: () => import('@/views/auth/Notfound.vue'),
        },
    ]