import Vue from 'vue';

const requireLayouts = require.context(
  // Relative path of the layouts folder
  '.',
  // Whether to look in subfolders or not
  false,
  // RegExp used to match layouts filenames
  /[a-z]\w+\.(vue)$/,
  // Generates a lazy chunk for each import
  'lazy',
);

requireLayouts.keys().forEach((fileName) => {
  // Getting name of layout
  const layoutName = `${fileName.replace(/^\.\/(.*)\.\w+$/, '$1')}-layout`;

  // Lazy loading layout components
  Vue.component(
    layoutName,
    () => requireLayouts(fileName),
  );
});
