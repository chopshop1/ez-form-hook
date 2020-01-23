import { configure, addParameters } from '@storybook/react';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import 'bootstrap/dist/css/bootstrap.css';
import 'styles.css'

addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
});

configure(require.context('../src/stories', true, /\.stories\.tsx|.mdx$/), module);
