import './style.css'
import { Themex } from '@netoum/themex';

const themexOptions = [
  {
    key: 'mode',
    default: 'light',
    values: ['light', 'dark', 'system']
  },
];

new Themex(themexOptions);