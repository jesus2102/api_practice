const PubSub = require("../helpers/pub_sub.js");

const CharacterMenu = function (container) {
  this.container = container;
}

CharacterMenu.prototype.bindEvents = function () {
  PubSub.subscribe('Character:all-houses-ready', (evt) => {
    //we subscribe for array of houses called houses
    const houses = evt.detail;
    createMenu(houses, this.container);
  })
  this.container.addEventListener('click', (evt) => {
    const selectedHouse = evt.target.id;
    PubSub.publish('Menu:house-selected', selectedHouse);
  })
};

function createMenu(houses, container) {
  const menuList = document.createElement('ul');
  createItems(houses, menuList);
  container.appendChild(menuList);
}

function createItems(houses, list) {
  houses.forEach((house, index) => {
    const item = document.createElement('li');
    item.textContent = house;
    item.id = index;
    list.appendChild(item);
  })
}



module.exports = CharacterMenu;
