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
      path: '/sede',
      name: 'sede',
      component: () => import(/* webpackChunkName: "sede" */ '@/views/sede/index.vue'),
    },
    {
      path: '/sede/new',
      name: 'sede-new',
      component: () => import(/* webpackChunkName: "sede-new" */ '@/views/sede/new.vue'),
    },
    {
      path: '/sede/:id',
      name: 'sede-id',
      component: () => import(/* webpackChunkName: "sede-id" */ '@/views/sede/_id/index.vue'),
    },
    {
      path: '/sede/:id/edit',
      name: 'sede-id-edit',
      component: () => import(/* webpackChunkName: "sede-id-edit" */ '@/views/sede/_id/edit.vue'),
    },
    {
      path: '/modality',
      name: 'modality',
      component: () => import(/* webpackChunkName: "modality" */ '@/views/modality/index.vue'),
    },
    {
      path: '/modality/new',
      name: 'modality-new',
      component: () => import(/* webpackChunkName: "modality-new" */ '@/views/modality/new.vue'),
    },
    {
      path: '/modality/:id',
      name: 'modality-id',
      component: () => import(/* webpackChunkName: "modality-id" */ '@/views/modality/_id/index.vue'),
    },
    {
      path: '/modality/:id/edit',
      name: 'modality-id-edit',
      component: () => import(/* webpackChunkName: "modality-id-edit" */ '@/views/modality/_id/edit.vue'),
    },
    {
      path: '/section',
      name: 'section',
      component: () => import(/* webpackChunkName: "section" */ '@/views/section/index.vue'),
    },
    {
      path: '/section/new',
      name: 'section-new',
      component: () => import(/* webpackChunkName: "section-new" */ '@/views/section/new.vue'),
    },
    {
      path: '/section/:id',
      name: 'section-id',
      component: () => import(/* webpackChunkName: "section-id" */ '@/views/section/_id/index.vue'),
    },
    {
      path: '/section/:id/edit',
      name: 'section-id-edit',
      component: () => import(/* webpackChunkName: "section-id-edit" */ '@/views/section/_id/edit.vue'),
    },
    {
      path: '/grade',
      name: 'grade',
      component: () => import(/* webpackChunkName: "grade" */ '@/views/grade/index.vue'),
    },
    {
      path: '/grade/new',
      name: 'grade-new',
      component: () => import(/* webpackChunkName: "grade-new" */ '@/views/grade/new.vue'),
    },
    {
      path: '/grade/:id',
      name: 'grade-id',
      component: () => import(/* webpackChunkName: "grade-id" */ '@/views/grade/_id/index.vue'),
    },
    {
      path: '/grade/:id/edit',
      name: 'grade-id-edit',
      component: () => import(/* webpackChunkName: "grade-id-edit" */ '@/views/grade/_id/edit.vue'),
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
