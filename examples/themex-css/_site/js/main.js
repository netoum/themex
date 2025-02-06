import {Themex} from './vendor/themex/dist/index.esm.js';

const themexOptions = [
  {
    key: 'theme',
    default: 'gray',
    values: ['gray', 'red', 'cinnamon']
  },
  {
    key: 'mode',
    default: 'light',
    values: ['light', 'dark', 'system']
  },
  {
    key: 'density',
    default: 'regular',
    values: ['wide', 'regular']
  },
  {
    key: 'size',
    default: '2',
    values: ['1', '2', '3']
  }
];

new Themex(themexOptions);
