export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach(item => {
      this.setItem(item);
    })
  }

  setItem(item, userId) {
    const element = this._renderer(item, userId);
    this._container.prepend(element);
  }
}
