import { mapRoutes } from '@/router/utils';

export default [
  /*
  |--------------------------------------------------------------------------
  | Public Routes
  |--------------------------------------------------------------------------
  |
  | Here are registered routes for public access. These routes does not require
  | authentication.
  |
  */
  ...mapRoutes({ onlyWhenLoggedOut: false, layout: 'default' }, [
    {
      path: '/',
      name: 'HomePage',
      component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
    },
    {
      path: '/users',
      name: 'users',
      component: () => import(/* webpackChunkName: "users" */ '@/views/users/index.vue'),
    },
    {
      path: '/users/new',
      name: 'users-new',
      component: () => import(/* webpackChunkName: "users-new" */ '@/views/users/new.vue'),
    },
    {
      path: '/users/:id',
      name: 'users-id',
      component: () => import(/* webpackChunkName: "users-id" */'@/views/users/_id/index.vue'),
    },
    {
      path: '/users/:id/edit',
      name: 'users-id-edit',
      component: () => import(/* webpackChunkName: "users-id-edit" */'@/views/users/_id/edit.vue'),
    },
    {
      path: '/students',
      name: 'students',
      component: () => import(/* webpackChunkName: "students" */ '@/views/students/index.vue'),
    },
    {
      path: '/students/new',
      name: 'students-new',
      component: () => import(/* webpackChunkName: "students-new" */ '@/views/students/new.vue'),
    },
    {
      path: '/students/:id',
      name: 'students-id',
      component: () => import(/* webpackChunkName: "students-id" */ '@/views/students/_id/index.vue'),
    },
    {
      path: '/students/:id/edit',
      name: 'students-id-edit',
      component: () => import(/* webpackChunkName: "students-id-edit" */ '@/views/students/_id/edit.vue'),
    },
    {
      path: '/students/:id/notes',
      name: 'students-id-notes',
      component: () => import(/* webpackChunkName: "students-id-edit" */ '@/views/students/_id/notes.vue'),
    },
    {
      path: '/roles',
      name: 'roles',
      component: () => import(/* webpackChunkName: "roles" */ '@/views/roles/index.vue'),
    },
    {
      path: '/roles/new',
      name: 'roles-new',
      component: () => import(/* webpackChunkName: "roles-new" */ '@/views/roles/new.vue'),
    },
    {
      path: '/roles/:id',
      name: 'roles-id',
      component: () => import(/* webpackChunkName: "roles-id" */ '@/views/roles/_id/index.vue'),
    },
    {
      path: '/roles/:id/edit',
      name: 'roles-id-edit',
      component: () => import(/* webpackChunkName: "roles-id-edit" */ '@/views/roles/_id/edit.vue'),
    },
    {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
    },
  ]),
  ...mapRoutes({ onlyWhenLoggedOut: true, layout: 'auth' }, [
    {
      path: '/login',
      name: 'Login',
      component: () => import(/* webpackChunkName: "Login" */ '@/views/Login.vue'),
    },
  ]),
];
