export default class Section {
  constructor({items, renderer}, constainerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(constainerSelector);
  }

  renderItems() {
    this._items.forEach(item => {
      this._renderer(item);
    })
  }

  setItem(item) {
    this._container.prepend(item);
  }
}
