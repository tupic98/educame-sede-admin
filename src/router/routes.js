import Home from '@/views/Home.vue';
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
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
    },
    {
      path: '/test/:id',
      name: 'test-id',
      component: () => import(/* webpackChunkName: "test" */ '@/views/test.vue'),
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
