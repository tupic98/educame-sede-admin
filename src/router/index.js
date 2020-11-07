/* eslint @typescript-eslint/ban-ts-ignore: "off" */
import Vue from 'vue';
import store from '@/store';
import VueRouter from 'vue-router';
import routes from './routes';

Vue.use(VueRouter);

const scrollBehavior = function (to, _from, savedPosition) {
  if (savedPosition) {
    // SavedPosition is only available for popstate navigations.
    return savedPosition;
  }
  const position = {};

  // Scroll to anchor by returning the selector
  if (to.hash) {
    position.selector = to.hash;

    // Specify offset of the element
    if (to.hash === '#anchor2') {
      position.offset = { y: 100 };
    }

    if (document.querySelector(to.hash)) {
      return position;
    }

    // If the returned position is falsy or an empty object,
    // will retain current scroll position.
    return false;
  }

  return new Promise((resolve) => {
    // Check if any matched route config has meta that requires scrolling to top
    if (to.matched.some((m) => m.meta.scrollToTop)) {
      // Coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      position.x = 0;
      position.y = 0;
    }

    // Wait for the out transition to complete (if necessary)
    this.app.$root.$once('triggerScroll', () => {
      // If the resolved position is falsy or an empty object,
      // will retain current scroll position.
      resolve(position);
    });
  });
};

const router = new VueRouter({
  mode: 'history',
  scrollBehavior,
  routes,
});

// eslint-disable-next-line consistent-return
router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some((record) => record.meta.public);
  const onlyWhenLoggedOut = to.matched.some((record) => record.meta.onlyWhenLoggedOut);
  const loggedIn = store.getters['auth/isAuthenticated'];

  console.log(isPublic);
  console.log(onlyWhenLoggedOut);
  console.log(loggedIn);

  if (!isPublic && !onlyWhenLoggedOut && !loggedIn) {
    return next({
      name: 'Login',
      query: { redirect: to.fullPath }, // Store the full path to redirect the user to after login
    });
  }

  // Do not allow user to visit login page or register page if they are logged in
  if (loggedIn && onlyWhenLoggedOut) {
    return next({ name: 'Dashboard' });
  }

  next();
});

export default router;
