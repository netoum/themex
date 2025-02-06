type ThemexKey = string;
type ThemexValue = string;
interface ThemexOptions {
  key: ThemexKey;
  default: ThemexValue;
  values: ThemexValue[];
}
class Themex {
  private options: ThemexOptions[];
  constructor(options: ThemexOptions[]) {
    this.options = options;
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.initializeThemex();
        this.setupEventListeners();
      });
    } else {
      this.initializeThemex();
      this.setupEventListeners();
    }
  }
  private initializeThemex(): void {
    this.options.forEach(({ key, default: defaultValue }) => {
      const savedValue = localStorage.getItem(key);
      const value = savedValue || defaultValue;
      this.applyThemex(key, value);
      this.updateUI(key, value);
    });
  }
  private setupEventListeners(): void {
    document.querySelectorAll<HTMLButtonElement>('button[data-themex-key]').forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.currentTarget as HTMLButtonElement;
        const key = target.dataset.themexKey as ThemexKey;
        const value = target.dataset.themexValue as ThemexValue;
        this.applyThemex(key, value);
        this.updateUI(key, value);
      });
    });
    document.querySelectorAll<HTMLButtonElement>('div[role="button"][data-themex-key]').forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.currentTarget as HTMLButtonElement;
        const key = target.dataset.themexKey as ThemexKey;
        const value = target.dataset.themexValue as ThemexValue;
        this.applyThemex(key, value);
        this.updateUI(key, value);
      });
    });
    document.querySelectorAll<HTMLSelectElement>('select[data-themex-key]').forEach(select => {
      select.addEventListener('change', (e) => {
        const target = e.target as HTMLSelectElement;
        const key = target.dataset.themexKey as string;
        const value = target.value as ThemexValue;
        this.applyThemex(key, value);
        this.updateUI(key, value);
      });
    });
    document.querySelectorAll<HTMLLinkElement>('a[data-themex-key]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.currentTarget as HTMLLinkElement;
        const key = target.dataset.themexKey as ThemexKey;
        const value = target.dataset.themexValue as string;
        this.applyThemex(key, value);
        this.updateUI(key, value);
      });
    });
    document.querySelectorAll<HTMLInputElement>('input[type="checkbox"][data-themex-key]').forEach(toggle => {
      toggle.addEventListener('change', (e) => {
        const target = e.target as HTMLInputElement;
        const key = target.dataset.themexKey as ThemexKey;
        const [onValue, offValue] = (target.dataset.themexValue || '').split(',');
        const value = target.checked ? onValue : offValue;
        this.applyThemex(key, value);
        this.updateUI(key, value);
      });
    });
    document.querySelectorAll<HTMLInputElement>('input[type="radio"][data-themex-key]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        const target = e.target as HTMLInputElement;
        const key = target.dataset.themexKey as ThemexKey;
        const value = target.dataset.themexValue as string;
        if (target.checked) {
          this.applyThemex(key, value);
          this.updateUI(key, value);
        }
      });
    });
    document.querySelectorAll<HTMLInputElement>('input[type="range"][data-themex-key]').forEach(range => {
      range.addEventListener('change', (e) => {
        const target = e.target as HTMLInputElement;
        const key = target.dataset.themexKey as ThemexKey;
        const value = target.value;
        this.applyThemex(key, value);
        this.updateUI(key, value);
      });
    });
  }
  private applyThemex(key: ThemexKey, value: ThemexValue): void {
    localStorage.setItem(key, value);
    document.documentElement.setAttribute(`data-${key}`, value);
  }
  private updateUI(key: ThemexKey, value: ThemexValue): void {
    document.querySelectorAll<HTMLButtonElement>(`button[data-themex-key="${key}"][set]`)
      .forEach(button => {
        const buttonValue = button.dataset.themexValue as ThemexValue;
        const isSelected = buttonValue === value;
        button.setAttribute('aria-current', isSelected.toString());
      });
    document.querySelectorAll<HTMLButtonElement>(`div[role="button"][data-themex-key="${key}"][set]`)
      .forEach(button => {
        const buttonValue = button.dataset.themexValue as ThemexValue;
        const isSelected = buttonValue === value;
        button.setAttribute('aria-current', isSelected.toString());
      });
    document.querySelectorAll<HTMLButtonElement>(`button[data-themex-key="${key}"][toggle]`)
      .forEach(button => {
        const buttonValue = button.dataset.themexValue as ThemexValue;
        const isSelected = buttonValue === value;
        button.setAttribute('aria-pressed', isSelected.toString());
      });
    document.querySelectorAll<HTMLButtonElement>(`div[role="button"][data-themex-key="${key}"][toggle]`)
      .forEach(button => {
        const buttonValue = button.dataset.themexValue as ThemexValue;
        const isSelected = buttonValue === value;
        button.setAttribute('aria-pressed', isSelected.toString());
      });
      document.querySelectorAll<HTMLSelectElement>(`select[data-themex-key="${key}"]`)
      .forEach(select => {
        select.value = value;
    
        select.querySelectorAll("option").forEach(option => {
          option.removeAttribute("data-selected");
        });
    
        const selectedOption = select.querySelector(`option[value="${value}"]`);
        if (selectedOption) {
          selectedOption.setAttribute("data-selected", "true");
        }
      });
    
    document.querySelectorAll<HTMLInputElement>(`input[type="checkbox"][data-themex-key="${key}"]`)
      .forEach(toggle => {
        const [onValue] = (toggle.dataset.themexValue || '').split(',');
        toggle.checked = value === onValue;
      });

    document.querySelectorAll<HTMLInputElement>(`input[type="radio"][data-themex-key="${key}"]`)
      .forEach(radio => {
        const radioValue = radio.dataset.themexValue as ThemexValue;
        radio.checked = radioValue === value;
      });
    document.querySelectorAll<HTMLInputElement>(`input[type="range"][data-themex-key="${key}"]`)
      .forEach(range => {
        range.value = value;
      });
  }
}
export default Themex;