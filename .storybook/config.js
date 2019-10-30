import { addParameters, configure, setAddon } from '@storybook/react';
import JSXAddon from 'storybook-addon-jsx';


addParameters({
  darkMode: {
    // Override the default dark theme
    dark: {appBg: 'grey' }
  }
});
setAddon(JSXAddon);


addParameters({
  jsx: { indent_size: 2 }
});

// automatically import all files ending in *.stories.js
configure(require.context('../src/stories', true, /\.stories\.js$/), module);

