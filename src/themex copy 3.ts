type ThemexKey = string;
type ThemexValue = string;
interface ThemexOptions {
  key: ThemexKey;
  default?: ThemexValue;
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
  private getDefaultValue(key: ThemexKey): ThemexValue | undefined {
    const option = this.options.find(opt => opt.key === key);
    return option?.default;
  }
  private initializeThemex(): void {
    this.options.forEach(({ key, default: defaultValue }) => {
      const savedValue = localStorage.getItem(key);
      const value = savedValue || defaultValue;
      if (value) {
        this.applyThemex(key, value);
        this.updateUI(key, value);
      }
    });
  }
  private setupEventListeners(): void {
    document.querySelectorAll<HTMLInputElement>('input[type="checkbox"][data-themex-key][data-themex-value]').forEach(input => {
      input.addEventListener('change', (e) => {
        const target = e.target as HTMLInputElement;
        const key = target.dataset.themexKey;
        const value = target.dataset.themexValue;
        if (key && value) {
          if (target.checked) {
            this.applyThemex(key, value);
            this.updateUI(key, value);
          } else {
            const defaultValue = this.getDefaultValue(key);
            if (defaultValue) {
              this.applyThemex(key, defaultValue);
              this.updateUI(key, defaultValue);
            } else {
              this.removeThemex(key);
              this.updateUI(key, '');
            }
          }
        }
      });
    });
    document.querySelectorAll<HTMLLabelElement>('label[data-themex-key]').forEach(label => {
      label.addEventListener('change', (e) => {
        const key = label.dataset.themexKey;
        const value = label.dataset.themexValue;
        label.querySelectorAll<HTMLInputElement>('input[type="checkbox"]').forEach(input => {
        if (key && value) {
          if (input.checked) {
            this.applyThemex(key, value);
            this.updateUI(key, value);
          } else {
            const defaultValue = this.getDefaultValue(key);
            if (defaultValue) {
              this.applyThemex(key, defaultValue);
              this.updateUI(key, defaultValue);
            } else {
              this.removeThemex(key);
              this.updateUI(key, '');
            }
          }
        }
      });
    });
    });
    // Handle buttons
    document.querySelectorAll<HTMLButtonElement>('button[data-themex-key]').forEach(button => {
      button.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLButtonElement;
        const key = target.dataset.themexKey as ThemexKey;
        const value = target.dataset.themexValue;
        if (value) {
          this.applyThemex(key, value);
          this.updateUI(key, value);
        }
      });
    });
    // Handle div buttons
    document.querySelectorAll<HTMLButtonElement>('div[role="button"][data-themex-key]').forEach(button => {
      button.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLButtonElement;
        const key = target.dataset.themexKey as ThemexKey;
        const value = target.dataset.themexValue;
        if (value) {
          this.applyThemex(key, value);
          this.updateUI(key, value);
        }
      });
    });
    // Handle links
    document.querySelectorAll<HTMLLinkElement>('a[data-themex-key]').forEach(link => {
      link.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLLinkElement;
        const key = target.dataset.themexKey;
        const value = target.dataset.themexValue;
        if (key && value) {
          this.applyThemex(key, value);
          this.updateUI(key, value);
        }
      });
    });
    // Handle radio buttons
    document.querySelectorAll<HTMLInputElement>('input[type="radio"][data-themex-key]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        const target = e.target as HTMLInputElement;
        const key = target.dataset.themexKey;
        const value = target.dataset.themexValue;
        if (target.checked && key && value) {
          this.applyThemex(key, value);
          this.updateUI(key, value);
        }
      });
    });
    // Handle range inputs
    document.querySelectorAll<HTMLInputElement>('input[type="range"][data-themex-key]').forEach(range => {
      range.addEventListener('change', (e) => {
        const target = e.target as HTMLInputElement;
        const key = target.dataset.themexKey;
        if (key) {
          const value = target.value;
          this.applyThemex(key, value);
          this.updateUI(key, value);
        }
      });
    });
  }
  private applyThemex(key: ThemexKey, value: ThemexValue): void {
    localStorage.setItem(key, value);
    document.documentElement.setAttribute(`data-${key}`, value);
  }
  private removeThemex(key: ThemexKey): void {
    localStorage.removeItem(key);
    document.documentElement.removeAttribute(`data-${key}`);
  }
  private updateUI(key: ThemexKey, value: ThemexValue): void {
    document.querySelectorAll<HTMLInputElement>(`input[type="checkbox"][data-themex-key="${key}"]`)
      .forEach(input => {
        const inputValue = input.dataset.themexValue;
        if (inputValue) {
          input.checked = value === inputValue;
        }
      });
      document.querySelectorAll<HTMLLabelElement>(`label[data-themex-key="${key}"]`)
      .forEach(label => {
        const labelValue = label.dataset.themexValue;
        label.querySelectorAll<HTMLInputElement>('input[type="checkbox"]').forEach(input => {
        if (labelValue) {
          input.checked = value === labelValue;
        }
      });
    });
        document.querySelectorAll<HTMLButtonElement>(`button[data-themex-key="${key}"][set]`)
      .forEach(button => {
        const buttonValue = button.dataset.themexValue;
        const isSelected = buttonValue === value;
        button.setAttribute('aria-current', isSelected.toString());
      });
    document.querySelectorAll<HTMLButtonElement>(`div[role="button"][data-themex-key="${key}"][set]`)
      .forEach(button => {
        const buttonValue = button.dataset.themexValue;
        const isSelected = buttonValue === value;
        button.setAttribute('aria-current', isSelected.toString());
      });
    document.querySelectorAll<HTMLButtonElement>(`button[data-themex-key="${key}"][toggle]`)
      .forEach(button => {
        const buttonValue = button.dataset.themexValue;
        const isSelected = buttonValue === value;
        button.setAttribute('aria-pressed', isSelected.toString());
      });
    document.querySelectorAll<HTMLButtonElement>(`div[role="button"][data-themex-key="${key}"][toggle]`)
      .forEach(button => {
        const buttonValue = button.dataset.themexValue;
        const isSelected = buttonValue === value;
        button.setAttribute('aria-pressed', isSelected.toString());
      });
    // Update select elements
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
    document.querySelectorAll<HTMLInputElement>(`input[type="radio"][data-themex-key="${key}"]`)
      .forEach(radio => {
        const radioValue = radio.dataset.themexValue;
        if (radioValue) {
          radio.checked = radioValue === value;
        }
      });
    document.querySelectorAll<HTMLInputElement>(`input[type="range"][data-themex-key="${key}"]`)
      .forEach(range => {
        range.value = value;
      });
  }
}
export default Themex;