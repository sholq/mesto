export default class UserInfo {
  constructor({profileAvatarSelector, profileNameSelector, profileDescriptionSelector}) {
    this._name = document.querySelector(profileNameSelector);
    this._description = document.querySelector(profileDescriptionSelector);
    this._avatar = document.querySelector(profileAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._description.textContent
    }
  }

  setUserInfo({name, about, avatar, _id}) {
    this._name.textContent = name;
    this._description.textContent = about;
    this._avatar.src = avatar;
    this._avatar.alt = name;
    this.id = _id;
  }
}
