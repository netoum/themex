"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Themex: () => themex_default
});
module.exports = __toCommonJS(index_exports);

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
  initializeThemex() {
    this.options.forEach(({ key, default: defaultValue }) => {
      const savedValue = localStorage.getItem(key);
      const value = savedValue || defaultValue;
      this.applyThemex(key, value);
      this.updateUI(key, value);
    });
  }
  setupEventListeners() {
    document.querySelectorAll("button[data-themex-key]").forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const target = e.currentTarget;
        const key = target.dataset.themexKey;
        const value = target.dataset.themexValue;
        this.applyThemex(key, value);
        this.updateUI(key, value);
      });
    });
    document.querySelectorAll('div[role="button"][data-themex-key]').forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const target = e.currentTarget;
        const key = target.dataset.themexKey;
        const value = target.dataset.themexValue;
        this.applyThemex(key, value);
        this.updateUI(key, value);
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
    document.querySelectorAll("a[data-themex-key]").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = e.currentTarget;
        const key = target.dataset.themexKey;
        const value = target.dataset.themexValue;
        this.applyThemex(key, value);
        this.updateUI(key, value);
      });
    });
    document.querySelectorAll('input[type="checkbox"][data-themex-key]').forEach((toggle) => {
      toggle.addEventListener("change", (e) => {
        const target = e.target;
        const key = target.dataset.themexKey;
        const [onValue, offValue] = (target.dataset.themexValue || "").split(",");
        const value = target.checked ? onValue : offValue;
        this.applyThemex(key, value);
        this.updateUI(key, value);
      });
    });
    document.querySelectorAll('input[type="radio"][data-themex-key]').forEach((radio) => {
      radio.addEventListener("change", (e) => {
        const target = e.target;
        const key = target.dataset.themexKey;
        const value = target.dataset.themexValue;
        if (target.checked) {
          this.applyThemex(key, value);
          this.updateUI(key, value);
        }
      });
    });
    document.querySelectorAll('input[type="range"][data-themex-key]').forEach((range) => {
      range.addEventListener("change", (e) => {
        const target = e.target;
        const key = target.dataset.themexKey;
        const value = target.value;
        this.applyThemex(key, value);
        this.updateUI(key, value);
      });
    });
  }
  applyThemex(key, value) {
    localStorage.setItem(key, value);
    document.documentElement.setAttribute(`data-${key}`, value);
  }
  updateUI(key, value) {
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
    document.querySelectorAll(`input[type="checkbox"][data-themex-key="${key}"]`).forEach((toggle) => {
      const [onValue] = (toggle.dataset.themexValue || "").split(",");
      toggle.checked = value === onValue;
    });
    document.querySelectorAll(`input[type="radio"][data-themex-key="${key}"]`).forEach((radio) => {
      const radioValue = radio.dataset.themexValue;
      radio.checked = radioValue === value;
    });
    document.querySelectorAll(`input[type="range"][data-themex-key="${key}"]`).forEach((range) => {
      range.value = value;
    });
  }
};
var themex_default = Themex;
//# sourceMappingURL=index.js.map
