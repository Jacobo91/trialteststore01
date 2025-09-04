// Create a class for the element
class ShopStyle extends HTMLElement {
  static observedAttributes = ["color", "size"];

  constructor() {
    super();
  }

  connectedCallback() {
    console.log("Custom element added to page.");
  }


}

customElements.define("shop-style", ShopStyle);
