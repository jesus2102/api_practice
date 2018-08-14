const PubSub = require('../helpers/pub_sub.js');

const CharacterView = function (container) {
  this.container = container;
}

CharacterView.prototype.bindEvents = function () {
  PubSub.subscribe('Character:all-characters-ready', (evt) => {
    console.log(evt.detail);
    this.render(evt.detail);
  });
}

CharacterView.prototype.render = function (characters) {
  this.container.innerHTML = '';
  const containerDiv = document.createElement('div');
  containerDiv.className = 'character';

  characters.forEach(character => {
    const name = document.createElement('h3');
    name.textContent = `${character.titles}: ${character.name}`;

    const slug = document.createElement('h4');
    slug.textContent = character.slug;

    containerDiv.appendChild(name);
    containerDiv.appendChild(slug);
  })
  this.container.appendChild(containerDiv);

}



module.exports = CharacterView;
