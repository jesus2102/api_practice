const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request_helper.js');

const Character = function () {
  this.characters = [];
  this.houses = [];
}

Character.prototype.getData = function () {
  const request = new Request('https://api.got.show/api/characters/');
  request.get()
  .then((data) => {
    this.characters = data;
    //PubSub.publish('Character:all-characters-ready', this.characters);
    //console.log(this.characters);
    this.getAllHouses();
  })
    .catch((err) => {
      console.error(err);
    });
};

Character.prototype.getAllHouses = function () {
  const allHouses = this.characters.map((character) =>{
    return character.house;
  })
  const uniqueArray = allHouses.filter((value, index, self) => {
    return self.indexOf(value) === index;
  })
  //console.log(uniqueArray);
  this.houses = uniqueArray;
  PubSub.publish('Character:all-houses-ready', uniqueArray);
};

Character.prototype.bindEvents = function () {
  PubSub.subscribe('Menu:house-selected', (evt) => {
    const index = evt.detail;
    const selectedHouse = this.houses[index];
    this.getCharacterByHouse(selectedHouse)
  })

}

Character.prototype.getCharacterByHouse = function (house) {
  const arrayOfCharacters = [];
  const uniqueArray = this.characters.forEach((character) => {
      if (character.house == house){
        arrayOfCharacters.push(character)
      }
  })
  PubSub.publish('Character:all-characters-ready', arrayOfCharacters);
};


module.exports = Character;
