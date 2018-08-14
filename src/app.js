const Character = require('./models/character.js');
const CharacterView = require('./views/character_view.js');
const CharacterMenu =require('./views/character_menu.js');

document.addEventListener('DOMContentLoaded', () => {
  const characterContainer = document.querySelector('#game_of_thrones_container');
  const characterView = new CharacterView(characterContainer);
  characterView.bindEvents();

  const menu = document.querySelector('.menu');
  const characterMenu = new CharacterMenu(menu);
  characterMenu.bindEvents();


const character = new Character();
character.getData();
character.bindEvents();
});
