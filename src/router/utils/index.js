// eslint-disable-next-line import/prefer-default-export
export const mapRoutes = (options, routes) => {
  // eslint-disable-next-line no-param-reassign,no-return-assign
  routes.forEach((route) => route.meta = { ...route.meta, ...options });
  return routes;
};
