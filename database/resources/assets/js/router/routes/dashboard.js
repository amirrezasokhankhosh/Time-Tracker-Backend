export default [
  {
    path: '/dashboard',
    name: '',
    children: [
      {
        path: '',
        name: 'dashboard',
        meta: {
          requiresAuth: false
          // TODO this test , after test requiresAuth must be true
        },
        component: () =>
          import(
            /* webpackChunkName: "profile" */ '../../components/dashboard/home/Home.vue'
          )
      },
      {
        path: '/profile',
        name: 'profile',
        meta: {
          requiresAuth: false
          // TODO this test , after test requiresAuth must be true
        },
        component: () =>
          import(
            /* webpackChunkName: "profile" */ '../../components/dashboard/Profile.vue'
          )
      },
      {
        path: '/usersManagement',
        name: 'usersManagement',
        component: () =>
            import('../../components/dashboard/users/Users.vue')
      },
      {
          path: '/Roles',
          name: 'Roles',
          component: () =>
          import('../../components/dashboard/users/Roles.vue')
      },
      {
        path: '/productsManagement',
        name: 'Products',
        component: () =>
          import('../../components/dashboard/products/ProductsManagement.vue')
      },
      {
        path: '/productCategoriesManagement',
        name: 'Products',
        component: () =>
          import('../../components/dashboard/product-categories/ProductCategoriesManagement')
      },
      {
        path: '/groups',
        name: 'Groups',
        component: () =>
          import('../../components/dashboard/group/GroupManagement')
      },
    ],
    meta: {
      requiresAuth: false
      // TODO this test , after test requiresAuth must be true
    },
    component: () =>
      import(
        /* webpackChunkName: "profile" */ '../../components/dashboard/Dashboard.vue'
      )
  }
]
