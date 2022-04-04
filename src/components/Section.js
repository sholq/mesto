export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items, userId) {
    items.forEach(item => {
      this.setItem(item, userId);
    })
  }

  setItem(item, userId) {
    const element = this._renderer(item, userId);
    this._container.prepend(element);
  }
}
