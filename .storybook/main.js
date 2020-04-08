module.exports = {
  stories: ['../src/js/components/**/*.stories.jsx' ],
  addons: [
  '@storybook/addon-knobs/register',
  'storybook-addon-styled-component-theme/dist/register',
],
  webpackFinal: async config => {
    // do mutation to the config

    return config;
  },
};
