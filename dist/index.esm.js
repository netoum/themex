// src/themex.ts
var Themex = class {
  options;
  constructor(options) {
    this.options = options;
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        this.initializeThemex();
        this.setupEventListeners();
      });
    } else {
      this.initializeThemex();
      this.setupEventListeners();
    }
  }
  getDefaultValue(key) {
    const option = this.options.find((opt) => opt.key === key);
    return option?.default;
  }
  initializeThemex() {
    this.options.forEach(({ key, default: defaultValue }) => {
      const savedValue = localStorage.getItem(key);
      console.log(savedValue);
      const value = savedValue || defaultValue;
      if (value) {
        this.applyThemex(key, value);
        this.updateUI(key, value);
      }
    });
  }
  setupEventListeners() {
    document.querySelectorAll('input[type="checkbox"][data-themex-key][data-themex-value]').forEach((input) => {
      input.addEventListener("change", (e) => {
        const target = e.target;
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
              this.updateUI(key, "");
            }
          }
        }
      });
    });
    document.querySelectorAll("label[data-themex-key]").forEach((label) => {
      label.addEventListener("change", (e) => {
        const key = label.dataset.themexKey;
        const value = label.dataset.themexValue;
        label.querySelectorAll('input[type="checkbox"]').forEach((input) => {
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
                this.updateUI(key, "");
              }
            }
          }
        });
      });
    });
    document.querySelectorAll("select[data-themex-key]").forEach((select) => {
      select.addEventListener("change", (e) => {
        const target = e.target;
        const key = target.dataset.themexKey;
        const value = target.value;
        this.applyThemex(key, value);
        this.updateUI(key, value);
      });
    });
    document.querySelectorAll("button[data-themex-key]").forEach((button) => {
      button.addEventListener("click", (e) => {
        const target = e.currentTarget;
        const key = target.dataset.themexKey;
        const value = target.dataset.themexValue;
        if (value) {
          this.applyThemex(key, value);
          this.updateUI(key, value);
        }
      });
    });
    document.querySelectorAll('div[role="button"][data-themex-key]').forEach((button) => {
      button.addEventListener("click", (e) => {
        const target = e.currentTarget;
        const key = target.dataset.themexKey;
        const value = target.dataset.themexValue;
        if (value) {
          this.applyThemex(key, value);
          this.updateUI(key, value);
        }
      });
    });
    document.querySelectorAll("a[data-themex-key]").forEach((link) => {
      link.addEventListener("click", (e) => {
        const target = e.currentTarget;
        const key = target.dataset.themexKey;
        const value = target.dataset.themexValue;
        if (key && value) {
          this.applyThemex(key, value);
          this.updateUI(key, value);
        }
      });
    });
    document.querySelectorAll('input[type="radio"][data-themex-key]').forEach((radio) => {
      radio.addEventListener("change", (e) => {
        const target = e.target;
        const key = target.dataset.themexKey;
        const value = target.dataset.themexValue;
        if (target.checked && key && value) {
          this.applyThemex(key, value);
          this.updateUI(key, value);
        }
      });
    });
    document.querySelectorAll('input[type="range"][data-themex-key]').forEach((range) => {
      range.addEventListener("change", (e) => {
        const target = e.target;
        const key = target.dataset.themexKey;
        if (key) {
          const value = target.value;
          this.applyThemex(key, value);
          this.updateUI(key, value);
        }
      });
    });
  }
  applyThemex(key, value) {
    localStorage.setItem(key, value);
    document.documentElement.setAttribute(`data-${key}`, value);
  }
  removeThemex(key) {
    localStorage.removeItem(key);
    document.documentElement.removeAttribute(`data-${key}`);
  }
  updateUI(key, value) {
    document.querySelectorAll(`input[type="checkbox"][data-themex-key="${key}"]`).forEach((input) => {
      const inputValue = input.dataset.themexValue;
      if (inputValue) {
        input.checked = value === inputValue;
      }
    });
    document.querySelectorAll(`label[data-themex-key="${key}"]`).forEach((label) => {
      const labelValue = label.dataset.themexValue;
      label.querySelectorAll('input[type="checkbox"]').forEach((input) => {
        if (labelValue) {
          input.checked = value === labelValue;
        }
      });
    });
    document.querySelectorAll(`button[data-themex-key="${key}"][set]`).forEach((button) => {
      const buttonValue = button.dataset.themexValue;
      const isSelected = buttonValue === value;
      button.setAttribute("aria-current", isSelected.toString());
    });
    document.querySelectorAll(`div[role="button"][data-themex-key="${key}"][set]`).forEach((button) => {
      const buttonValue = button.dataset.themexValue;
      const isSelected = buttonValue === value;
      button.setAttribute("aria-current", isSelected.toString());
    });
    document.querySelectorAll(`button[data-themex-key="${key}"][toggle]`).forEach((button) => {
      const buttonValue = button.dataset.themexValue;
      const isSelected = buttonValue === value;
      button.setAttribute("aria-pressed", isSelected.toString());
    });
    document.querySelectorAll(`div[role="button"][data-themex-key="${key}"][toggle]`).forEach((button) => {
      const buttonValue = button.dataset.themexValue;
      const isSelected = buttonValue === value;
      button.setAttribute("aria-pressed", isSelected.toString());
    });
    document.querySelectorAll(`select[data-themex-key="${key}"]`).forEach((select) => {
      select.value = value;
      select.querySelectorAll("option").forEach((option) => {
        option.removeAttribute("data-selected");
      });
      const selectedOption = select.querySelector(`option[value="${value}"]`);
      if (selectedOption) {
        selectedOption.setAttribute("data-selected", "true");
      }
    });
    document.querySelectorAll(`input[type="radio"][data-themex-key="${key}"]`).forEach((radio) => {
      const radioValue = radio.dataset.themexValue;
      if (radioValue) {
        radio.checked = radioValue === value;
      }
    });
    document.querySelectorAll(`input[type="range"][data-themex-key="${key}"]`).forEach((range) => {
      range.value = value;
    });
  }
};
var themex_default = Themex;
export {
  themex_default as Themex
};
//# sourceMappingURL=index.esm.js.map
