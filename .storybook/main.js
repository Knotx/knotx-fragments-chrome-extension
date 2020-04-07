module.exports = {
  stories: ['../stories/**/*.stories.js', '../src/js/components/**/*.stories.jsx' ],
  addons: [
  '@storybook/addon-actions',
  '@storybook/addon-links',
  'storybook-addon-styled-component-theme/dist/register',
],
  webpackFinal: async config => {
    // do mutation to the config

    return config;
  },
};
