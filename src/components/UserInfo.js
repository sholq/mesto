export default class UserInfo {
  constructor({profileAvatarSelector, profileNameSelector, profileDescriptionSelector}) {
    this._name = document.querySelector(profileNameSelector);
    this._description = document.querySelector(profileDescriptionSelector);
    this._avatar = document.querySelector(profileAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      description: this._description.textContent
    }
  }

  setUserInfo({name, about, avatar}) {
    this._name.textContent = name;
    this._description.textContent = about;
    if (avatar) {
      this._avatar.src = avatar;
      this._avatar.alt = name;
    }
  }
}
