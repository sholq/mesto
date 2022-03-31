export default class Section {
  constructor({items, renderer}, constainerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(constainerSelector);
  }

  renderItems() {
    this._items.forEach(item => {
      this.setItem(item);
      console.log(item)
    })
  }

  setItem(item) {
    const element = this._renderer(item);
    this._container.prepend(element);
  }
}
