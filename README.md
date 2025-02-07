<picture>
  <source media="(prefers-color-scheme: light)" srcset="public/themex_blue.png">
  <source media="(prefers-color-scheme: dark)" srcset="public/themex_white.png">
  <img src="public/themex_blue.png" alt="Logo" style="max-width: 100px; height: auto;">
</picture>

# Themex (@netoum/themex)

Flexible, accessible and unstyled theming system that supports multiple theme attributes with persistent storage and automatic UI synchronization.

## Features

- 🎨 Multiple theme attributes support (color schemes, modes, layouts, etc.)
- 💾 Automatic localStorage persistence
- 🔄 UI state synchronization across controls
- 🎯 Data attribute-based targeting
- 📱 Support for various control types (select, button, checkbox, radio and range)
- 🔌 Zero dependencies
- 📦 CommonJS & ESM support

## Installation

```bash
npm install @netoum/themex
```

## Quick Start

```typescript
import { Themex } from '@netoum/themex';

const options = [
  {
    key: 'theme',
    default: 'gray',
    values: ['gray', 'red']
  },
  {
    key: 'mode',
    default: 'light',
    values: ['light', 'dark']
  },
  {
    key: 'density',
    default: 'compact',
    values: ['compact', 'wide']
  },
    {
    key: 'size',
    default: '2',
    values: ['1', '2', '3']
  }
];

new Themex(options);
```


### Data Attributes

- `data-${key}`: Applied to HTML document (for ex: data-mode="dark")
- `data-themex-key`: Identifies the theme attribute to modify
- `data-themex-value`: Specifies the value to apply

### State Attributes

- `aria-current`: Applied to Button Set controls to indicate current selection
- `aria-pressed`: Applied to Button Toggle controls to indicate current selection
- `data-selected`: Applied to Select Options controls to indicate current selection


## HTML Controls

Themex works with various HTML controls:

### Button Set

You must add "set" to each button
The selected button will have "aria-current="true" attribute
```html
<button data-themex-key="mode" data-themex-value="light" set>
  Light
</button>
<button data-themex-key="mode" data-themex-value="dark" set>
  Dark
</button>

<div role="button" data-themex-key="mode" data-themex-value="light" set>
  Light
</div>
<div role="button" data-themex-key="mode" data-themex-value="dark" set>
  Dark
</div>
```

```css

button[aria-current="true"] {
  background-color: var(--color-primary-contrast);
  color:  var(--color-primary);
}

div[role="button"][aria-current="true"] {
  background-color: var(--color-primary-contrast);
  color:  var(--color-primary);
}
```

### Button Toggle
You must add "toggle" to each button
The selected button will have "aria-pressed="true" attribute

```html
<button data-themex-key="mode" data-themex-value="light" toggle>
  Light
</button>
<button data-themex-key="mode" data-themex-value="dark" toggle>
  Dark
</button>

<div role="button" data-themex-key="mode" data-themex-value="light" toggle>
  Light
</div>
<div role="button" data-themex-key="mode" data-themex-value="dark" toggle>
  Dark
</div>
```

```css
button[aria-pressed="true"] {
  display: hidden
}

div[role="button"][aria-pressed="true"] {
  display: hidden
}
```

### Select Dropdowns
By default Select do not have a common way to track the selected option on all browser, so we add "data-selected="true" attribute for styling
```html
<select data-themex-key="theme">
    <option value="gray">Gray</option>
    <option value="red">Red</option>
</select>
```

```css
option[data-selected="true"] {
  background-color: var(--color-primary-contrast);
  color:  var(--color-primary);
}
```


### Switches/Checkbox Toggle
You must select 2 values, the first one being the value selectd when the checkob is checked, the second beign the fallback when the checkbox is unchecked

```html
<label>
  Wide
</label>
  <input type="checkbox" 
         data-themex-key="density" 
         data-themex-value="wide,compact">
```

### Radio

```html
      <label>
        Gray Theme
      </label>
      <input type="radio" name="theme-radio" data-themex-key="theme" data-themex-value="gray">
      <label>
        Red Theme
      </label>
      <input type="radio" name="theme-radio" data-themex-key="theme" data-themex-value="red">
```

## CSS Usage

```css

:root {
    /* Theme */
    --color-primary: var(--theme-color-primary);
    --color-primary-contrast: var(--theme-color-primary-contrast);

    /* Theme/Mode */
    --color-body: var(--theme-color-body);
    --color-body-contrast: var(--theme-color-body-contrast);

    /* Density */
    --spacing: var(--density-spacing);

    /* Base */
    --color-gray-1: #f6f6f6;
    --color-gray-2: #e2e2e2;
    --color-gray-3: #8b8b8b;
    --color-gray-4: #6f6f6f;
    --color-gray-5: #3e3e3e;
    --color-gray-6: #222222;
    --color-red-1: #fff8f6;
    --color-red-2: #ffddd8;
    --color-red-3: #ff4647;
    --color-red-4: #e0002b;
    --color-red-5: #830014;
    --color-red-6: #530003;
}

/* Theme variations */

[data-theme="gray"] {
  --theme-color-primary: var(--color-gray-2);
  --theme-color-primary-contrast: var(--color-gray-6);
}


[data-theme="red"] {
  --theme-color-primary: var(--color-red-2);
  --theme-color-primary-contrast: var(--color-red-6);
}

/* Theme/Mode variations */

[data-theme="gray"][data-mode="light"] {
--theme-color-body: var(--color-gray-2);
--theme-color-body-contrast: var(--color-gray-6);
}


[data-theme="gray"][data-mode="dark"] {
--theme-color-body: var(--color-gray-6);
--theme-color-body-contrast: var(--color-gray-2);

}

[data-theme="red"][data-mode="light"] {
--theme-color-body: var(--color-red-2);
--theme-color-body-contrast: var(--color-red-6);
}


[data-theme="red"][data-mode="dark"] {
--theme-color-body: var(--color-red-6);
--theme-color-body-contrast: var(--color-red-2);

}


/* Density variations */
[data-density="compact"] {
--spacing: 0.5rem;
--font-size: 0.875rem;
}

[data-density="wide"] {
--spacing: 1rem;
--font-size: 1rem;
}

/* See it in action */
body {
  background-color: var(--theme-color-body);
  color: var(--theme-color-body-contrast);
  padding: var(--spacing); 
  font-size: var(--font-size); 
}

button[aria-current="true"] {
  text-decoration: underline;
}
```

### Examples

You will find [some Themex examples](examples) with Vite and Eleventy using more complex theming and referencing.
Some example also uses the System mode for Light/Dark mode

## License

MIT

## Open source by Netoum
The whole project, including the examples are fully open source and brought to you by [Netoum.com](https://www.netoum.com)