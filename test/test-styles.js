import { css, unsafeCSS } from "https://unpkg.com/lit-element/lib/css-tag.js";
import { component, useState, html } from "https://unpkg.com/haunted/haunted.js";
import { useStyles } from "../web.js";
import { attach, cycle } from "./helpers.js";

describe("useStyles", () => {
  it("set the styles at runtime", async () => {
    const tag = "use-style-test";

    function app() {
      useStyles(
        () => css`
          :host {
            background-color: red;
          }
        `
      );

      return html`
        Test
      `;
    }
    customElements.define(tag, component(app));

    const teardown = attach(tag);
    await cycle();

    const element = document.querySelector("use-style-test");
    const style = getComputedStyle(element);

    assert.equal(style.backgroundColor, "rgb(255, 0, 0)", "styles were applied");
    teardown();
  });

  it("only updates when values change", async () => {
    const tag = "change-style-test";
    let change;
    let dummy;
    let count = 0;
    function app() {
      let [color, setColor] = useState("red");
      let [, setDummy] = useState(0);
      change = setColor;
      dummy = setDummy;

      useStyles(
        () =>
          ++count &&
          css`
            :host {
              background-color: ${unsafeCSS(color)};
            }
          `,
        [color]
      );

      return html`
        Test
      `;
    }
    customElements.define(tag, component(app));

    const teardown = attach(tag);

    // Intial Cycle
    await cycle();

    const element = document.querySelector("change-style-test");
    let style = getComputedStyle(element);
    assert.equal(style.backgroundColor, "rgb(255, 0, 0)", "background were applied");
    assert.equal(count, 1, "styles calculated once");

    // Dummy Cycle
    dummy(10);
    await cycle();

    style = getComputedStyle(element);
    assert.equal(style.backgroundColor, "rgb(255, 0, 0)", "background still red");
    assert.equal(count, 1, "styles still calculated once");

    // Color Cycle
    change("green");
    await cycle();

    style = getComputedStyle(element);
    assert.equal(style.backgroundColor, "rgb(0, 128, 0)", "background are green");
    assert.equal(count, 2, "styles were re-calculated");

    teardown();
  });
});
