# Haunted Styles Hook for Haunted 🦇 🎃

Hooks Style API for Haunted web components to include styles as part of the component definition.

```html
<!DOCTYPE html>
<my-counter></my-counter>

<script type="module">
  import { css, unsafeCSS } from "https://unpkg.com/lit-element/lib/css-tag.js";
  import { component, useState, html } from "https://unpkg.com/haunted/haunted.js";
  import { useStyles } from "https://unpkg.com/bvkimball/haunted-styles.js";

  function Counter() {
    const [count, setCount] = useState(0);

    useStyles(
      () => css`
        :host {
          display: inline-block;
          background: ${unsafeCSS(count > 5 ? "green" : "red")};
        }
      `
    );

    return html`
      <div id="count">${count}</div>
      <button type="button" @click=${() => setCount(count + 1)}>
        Increment
      </button>
    `;
  }

  customElements.define("my-counter", component(Counter));
</script>
```

## Getting started

A starter app is available on [codesandbox](https://codesandbox.io/s/github/matthewp/haunted-starter-app/tree/master/) and also can be cloned from [this repo](https://github.com/matthewp/haunted-starter-app). This app gives you the basics of how to use Haunted and build components.

## Advanced Usage

#### useStyles

Add styles to your shadow dom like you would with lit-element.

```html
// TBD
```

## License

BSD-2-Clause
