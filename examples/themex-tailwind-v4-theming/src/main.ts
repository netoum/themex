import './css/main.css'
import { Themex } from '@netoum/themex';

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
    values: ['regular', 'wide']
  },
  {
    key: 'size',
    default: '3',
    values: ['1', '2', '3']
  }
];

new Themex(themexOptions);
