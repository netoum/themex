import Themex from '../src/themex.ts';
describe('Themex', () => {
  const mockOptions = [
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
  beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = `
    <button data-themex-key="theme" data-themex-value="gray" set>Gray Theme</button>
    <button data-themex-key="theme" data-themex-value="red" set>Red Theme</button>
    <button data-themex-key="theme" data-themex-value="gray" toggle>Gray Theme</button>
    <button data-themex-key="theme" data-themex-value="red" toggle>Red Theme</button>
    <div role="button" data-themex-key="theme" data-themex-value="gray" set>Gray Theme</div>
    <div role="button" data-themex-key="theme" data-themex-value="red" set>Red Theme</div>
    <div role="button" data-themex-key="theme" data-themex-value="gray" toggle>Gray Theme</div>
    <div role="button" data-themex-key="theme" data-themex-value="red" toggle>Red Theme</div>
      <select data-themex-key="theme">
      <option value="gray" selected>Gray</option>
      <option value="red">Red</option>
      </select>
      <select data-themex-key="mode">
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
      <input type="checkbox" data-themex-key="mode" data-themex-value="dark,light"/>
      <select data-themex-key="density">
        <option value="compact">Compact</option>
        <option value="wide">Wide</option>
      </select>
      <input data-themex-key="mode" data-themex-value="dark" type="radio" name="radio" />
      <input data-themex-key="mode" data-themex-value="light" type="radio" name="radio" />
      <input type="range" min="1" max="3" data-themex-key="size" class="w-full">
    `;
  });
  describe('initialization', () => {
    it('should initialize with all default values', () => {
      new Themex(mockOptions);
      expect(localStorage.getItem('theme')).toBe('gray');
      expect(localStorage.getItem('mode')).toBe('light');
      expect(localStorage.getItem('density')).toBe('compact');
      expect(localStorage.getItem('size')).toBe('2');
      expect(document.documentElement.getAttribute('data-theme')).toBe('gray');
      expect(document.documentElement.getAttribute('data-mode')).toBe('light');
      expect(document.documentElement.getAttribute('data-density')).toBe('compact');
      expect(document.documentElement.getAttribute('data-size')).toBe('2');
    });
    it('should respect existing localStorage values', () => {
      localStorage.setItem('theme', 'red');
      localStorage.setItem('mode', 'dark');
      localStorage.setItem('density', 'wide');
      localStorage.setItem('size', '2');
      new Themex(mockOptions);
      expect(document.documentElement.getAttribute('data-theme')).toBe('red');
      expect(document.documentElement.getAttribute('data-mode')).toBe('dark');
      expect(document.documentElement.getAttribute('data-density')).toBe('wide');
      expect(document.documentElement.getAttribute('data-size')).toBe('2');
    });
  });
  describe('theme selection', () => {
    it('should update theme via select', () => {
      new Themex(mockOptions);
      const themeSelect = document.querySelector('select[data-themex-key="theme"]') as HTMLSelectElement;
      expect(localStorage.getItem('theme')).toBe('gray');
      expect(document.documentElement.getAttribute('data-theme')).toBe('gray');
      themeSelect.value = 'red';
      themeSelect.dispatchEvent(new Event('change'));
      expect(localStorage.getItem('theme')).toBe('red');
      expect(document.documentElement.getAttribute('data-theme')).toBe('red');
    });
    it('should update theme via button set click', () => {
      new Themex(mockOptions);
      const grayButton = document.querySelector('button[data-themex-key="theme"][data-themex-value="gray"][set]') as HTMLButtonElement;
      const redButton = document.querySelector('button[data-themex-key="theme"][data-themex-value="red"][set]') as HTMLButtonElement;
      expect(localStorage.getItem('theme')).toBe('gray');
      expect(document.documentElement.getAttribute('data-theme')).toBe('gray');
      expect(grayButton.getAttribute('aria-current')).toBe('true');
      redButton.click();
      expect(localStorage.getItem('theme')).toBe('red');
      expect(document.documentElement.getAttribute('data-theme')).toBe('red');
      expect(redButton.getAttribute('aria-current')).toBe('true');
      grayButton.click();
      expect(localStorage.getItem('theme')).toBe('gray');
      expect(document.documentElement.getAttribute('data-theme')).toBe('gray');
      expect(grayButton.getAttribute('aria-current')).toBe('true');
    });
    it('should update theme via role button set click', () => {
      new Themex(mockOptions);
      const grayButton = document.querySelector('div[role="button"][data-themex-key="theme"][data-themex-value="gray"][set]') as HTMLButtonElement;
      const redButton = document.querySelector('[role="button"][data-themex-key="theme"][data-themex-value="red"][set]') as HTMLButtonElement;
      expect(localStorage.getItem('theme')).toBe('gray');
      expect(document.documentElement.getAttribute('data-theme')).toBe('gray');
      expect(grayButton.getAttribute('aria-current')).toBe('true');
      redButton.click();
      expect(localStorage.getItem('theme')).toBe('red');
      expect(document.documentElement.getAttribute('data-theme')).toBe('red');
      expect(redButton.getAttribute('aria-current')).toBe('true');
      grayButton.click();
      expect(localStorage.getItem('theme')).toBe('gray');
      expect(document.documentElement.getAttribute('data-theme')).toBe('gray');
      expect(grayButton.getAttribute('aria-current')).toBe('true');
    });
    it('should update theme via button toggle click', () => {
      new Themex(mockOptions);
      const grayButton = document.querySelector('button[data-themex-key="theme"][data-themex-value="gray"][toggle]') as HTMLButtonElement;
      const redButton = document.querySelector('button[data-themex-key="theme"][data-themex-value="red"][toggle]') as HTMLButtonElement;
      expect(localStorage.getItem('theme')).toBe('gray');
      expect(document.documentElement.getAttribute('data-theme')).toBe('gray');
      expect(grayButton.getAttribute('aria-pressed')).toBe('true');
      expect(redButton.getAttribute('aria-pressed')).toBe('false');
      redButton.click();
      expect(localStorage.getItem('theme')).toBe('red');
      expect(document.documentElement.getAttribute('data-theme')).toBe('red');
      expect(redButton.getAttribute('aria-pressed')).toBe('true');
      expect(grayButton.getAttribute('aria-pressed')).toBe('false');
      grayButton.click();
      expect(localStorage.getItem('theme')).toBe('gray');
      expect(document.documentElement.getAttribute('data-theme')).toBe('gray');
      expect(grayButton.getAttribute('aria-pressed')).toBe('true');
      expect(redButton.getAttribute('aria-pressed')).toBe('false');
    });
    it('should update theme via button role toggle click', () => {
      new Themex(mockOptions);
      const grayButton = document.querySelector('div[role="button"][data-themex-key="theme"][data-themex-value="gray"][toggle]') as HTMLButtonElement;
      const redButton = document.querySelector('div[role="button"][data-themex-key="theme"][data-themex-value="red"][toggle]') as HTMLButtonElement;
      expect(localStorage.getItem('theme')).toBe('gray');
      expect(document.documentElement.getAttribute('data-theme')).toBe('gray');
      expect(grayButton.getAttribute('aria-pressed')).toBe('true');
      expect(redButton.getAttribute('aria-pressed')).toBe('false');
      redButton.click();
      expect(localStorage.getItem('theme')).toBe('red');
      expect(document.documentElement.getAttribute('data-theme')).toBe('red');
      expect(redButton.getAttribute('aria-pressed')).toBe('true');
      expect(grayButton.getAttribute('aria-pressed')).toBe('false');
      grayButton.click();
      expect(localStorage.getItem('theme')).toBe('gray');
      expect(document.documentElement.getAttribute('data-theme')).toBe('gray');
      expect(grayButton.getAttribute('aria-pressed')).toBe('true');
      expect(redButton.getAttribute('aria-pressed')).toBe('false');
    });
  });
  describe('mode selection', () => {
    it('should update mode via radio button', () => {
      new Themex(mockOptions);
      expect(localStorage.getItem('mode')).toBe('light');
      expect(document.documentElement.getAttribute('data-mode')).toBe('light');
      const radio = document.querySelector('input[type="radio"][data-themex-key="mode"][data-themex-value]') as HTMLInputElement;
      radio.checked = true;
      radio.dispatchEvent(new Event('change'));
      expect(localStorage.getItem('mode')).toBe('dark');
      expect(document.documentElement.getAttribute('data-mode')).toBe('dark');
    });
    it('should toggle mode via checkbox', () => {
      new Themex(mockOptions);
      expect(localStorage.getItem('mode')).toBe('light');
      expect(document.documentElement.getAttribute('data-mode')).toBe('light');
      const modeToggle = document.querySelector('input[type="checkbox"][data-themex-key="mode"][data-themex-value]') as HTMLInputElement;
      modeToggle.checked = true;
      modeToggle.dispatchEvent(new Event('change'));
      expect(localStorage.getItem('mode')).toBe('dark');
      expect(document.documentElement.getAttribute('data-mode')).toBe('dark');
      modeToggle.checked = false;
      modeToggle.dispatchEvent(new Event('change'));
      expect(localStorage.getItem('mode')).toBe('light');
      expect(document.documentElement.getAttribute('data-mode')).toBe('light');
    });
    it('should update mode via select', () => {
      new Themex(mockOptions);
      expect(localStorage.getItem('mode')).toBe('light');
      expect(document.documentElement.getAttribute('data-mode')).toBe('light');
      const modeSelect = document.querySelector('select[data-themex-key="mode"]') as HTMLSelectElement;
      modeSelect.value = 'dark';
      modeSelect.dispatchEvent(new Event('change'));
      expect(localStorage.getItem('mode')).toBe('dark');
      expect(document.documentElement.getAttribute('data-mode')).toBe('dark');
    });
  });
  describe('density selection', () => {
    it('should update density via select', () => {
      new Themex(mockOptions);
      expect(localStorage.getItem('density')).toBe('compact');
      expect(document.documentElement.getAttribute('data-density')).toBe('compact');
      const densitySelect = document.querySelector('select[data-themex-key="density"]') as HTMLSelectElement;
      densitySelect.value = 'wide';
      densitySelect.dispatchEvent(new Event('change'));
      expect(localStorage.getItem('density')).toBe('wide');
      expect(document.documentElement.getAttribute('data-density')).toBe('wide');
    });
  });
  describe('size selection', () => {
    it('should update size via range', () => {
      new Themex(mockOptions);
      expect(localStorage.getItem('size')).toBe('2');
      expect(document.documentElement.getAttribute('data-size')).toBe('2');
      const sizeSelect = document.querySelector('input[type="range"][data-themex-key="size"]') as HTMLSelectElement;
      sizeSelect.value = '1';
      sizeSelect.dispatchEvent(new Event('change'));
      expect(localStorage.getItem('size')).toBe('1');
      expect(document.documentElement.getAttribute('data-size')).toBe('1');
    });
  });
  describe('multiple theme options interaction', () => {
    it('should maintain independent states for all theme options', () => {
      new Themex(mockOptions);
      const themeSelect = document.querySelector('select[data-themex-key="theme"]') as HTMLSelectElement;
      const modeToggle = document.querySelector('input[data-themex-key="mode"]') as HTMLInputElement;
      const densitySelect = document.querySelector('select[data-themex-key="density"]') as HTMLSelectElement;
      const sizeRange = document.querySelector('input[type="range"][data-themex-key="size"]') as HTMLInputElement;
      themeSelect.value = 'gray';
      themeSelect.dispatchEvent(new Event('change'));
      modeToggle.checked = true;
      modeToggle.dispatchEvent(new Event('change'));
      densitySelect.value = 'wide';
      densitySelect.dispatchEvent(new Event('change'));
      sizeRange.value = '1';
      sizeRange.dispatchEvent(new Event('change'));
      expect(localStorage.getItem('theme')).toBe('gray');
      expect(localStorage.getItem('mode')).toBe('dark');
      expect(localStorage.getItem('density')).toBe('wide');
      expect(localStorage.getItem('size')).toBe('1');
      expect(document.documentElement.getAttribute('data-theme')).toBe('gray');
      expect(document.documentElement.getAttribute('data-mode')).toBe('dark');
      expect(document.documentElement.getAttribute('data-density')).toBe('wide');
      expect(document.documentElement.getAttribute('data-size')).toBe('1');
    });
  });
});