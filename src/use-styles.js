import { hook, Hook } from "https://unpkg.com/haunted/haunted.js";

const useStyles = hook(
  class extends Hook {
    constructor(id, el, fn, values) {
      super(id, el);
      this.values = values || [];
      this.ignoreChanges = this.values.length === 0;
      this.updateStyles(fn);
    }

    update(fn, values) {
      if (this.hasChanged(values)) {
        console.log("Changed");
        this.values = values;
        this.updateStyles(fn);
      }
    }

    updateStyles(fn) {
      let styles = fn();
      if (this.el.frag) {
        this.el.frag.adoptedStyleSheets = [styles.styleSheet];
      } else {
        console.warn("Could not append Stylesheet to Shadow DOM. Your browser might not support this, try using ShadyCSS polyfill.");
      }
    }

    hasChanged(values) {
      if (this.ignoreChanges) return false;
      return values.some((value, i) => this.values[i] !== value);
    }
  }
);

export { useStyles };
