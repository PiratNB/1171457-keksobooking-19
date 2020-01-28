'use strict';
var AVATAR_OF_AUTHORS = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
var TITLES = ['Супер предложение', 'Такого вы ещё не видели', 'Лучше, чем сейчас не будет', 'Только попробуй не снять', 'И боги хотели бы тут жить'];
// var ADDRESS = ['600, 350'];
var PRICES = [10000, 50000];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var AMOUNT_OF_ROOMS = [1, 2, 3];
var AMOUNT_OF_GUESTS = [1, 2];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCS = ['Лучшее место и место, где свершается обладание и проявляет себя силой помысла, — все это дан пример, т. е. в своей непосредственности проявление видимого органа маги. Особенно показателен тут пример звукового созерцания. Звук — это наиболее сильное из проявлений духовного ощущения...', 'Лучшее место? По уставу это никого не касается. В компьютерную игру дело не идет. Только для психотерапевта обязательно. На второй уровень не пускали. Выпускный класс прошли? Ага. Десять встреч в неделю. И получили испытательный сертификат. Запишите. Про три месяца. Отношение ко мне серьезное.', 'Тот самый отель и сейчас стоял в том же самом номере, из окна которого он тогда смотрел на сидящего за круглым столом худого человечка с трубкой во рту. Вдруг он вспомнил: в последний раз во дворе отеля тот говорил что-то о мудром Петре Великом.'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var OBJECTS_AMOUNT = 8;

var pinsBlock = document.querySelector('.map__pins');
var blockMap = document.querySelector('.map');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var offers = [];

function getRandomItem(array) {
  return Math.floor(Math.random() * array.length);
}

function getRandomItemAndDel(array1) {
  var h = Math.floor(Math.random() * (array1.length - 1));
  var k = array1[h];
  array1.splice(h, 1);
  return k;
}

function getRandomFromTo(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pullRandomOffer() {
  return {
    author: {
      avatar: AVATAR_OF_AUTHORS[getRandomItemAndDel(AVATAR_OF_AUTHORS)],
    },

    offer: {
      title: TITLES[getRandomItem(TITLES)],
      address: '600, 350',
      price: PRICES[getRandomItem(PRICES)],
      type: TYPES[getRandomItem(TYPES)],
      rooms: AMOUNT_OF_ROOMS[getRandomItem(AMOUNT_OF_ROOMS)],
      guests: AMOUNT_OF_GUESTS[getRandomItem(AMOUNT_OF_GUESTS)],
      checkin: CHECKINS[getRandomItem(CHECKINS)],
      checkout: CHECKOUTS[getRandomItem(CHECKOUTS)],
      features: FEATURES[getRandomItem(FEATURES)],
      discription: DESCS[getRandomItem(DESCS)],
      photos: PHOTOS[getRandomItem(PHOTOS)],
    },

    location: {
      x: getRandomFromTo(40, pinsBlock.clientWidth - 40),
      y: getRandomFromTo(130, 630),
    },
  };
}

function createObj(numbers) {
  for (var i = 0; i < numbers; i++) {
    offers.push(pullRandomOffer());
  }
}

function renderPin(offer) {
  var pinEl = pinTemplate.cloneNode(true);

  pinEl.style = 'left: ' + offer.location.x + 'px; top: ' + offer.location.y + 'px';
  pinEl.querySelector('img').src = offer.author.avatar;
  pinEl.querySelector('img').alt = offer.offer.title;
  return pinEl;
}

function renderCard(map) {
  var mapEl = cardTemplate.cloneNode(true);

  mapEl.querySelector('.popup__title').textContent = map.offer.title;
  mapEl.querySelector('.popup__text--address').textContent = map.offer.address;
  mapEl.querySelector('.popup__text--price').textContent = map.offer.price + '₽/ночь';
  mapEl.querySelector('.popup__type').textContent = map.offer.type;
  mapEl.querySelector('.popup__text--capacity').textContent = map.offer.rooms + ' комнаты для ' + map.offer.guests + ' гостей';
  mapEl.querySelector('.popup__text--time').textContent = 'Заезд после ' + map.offer.checkin + ', выезд до ' + map.offer.checkout;
  mapEl.querySelector('.popup__features').querySelectorAll('.popup__feature').textContent = map.offer.features;
  mapEl.querySelector('.popup__description').textContent = map.offer.discription;
  mapEl.querySelector('.popup__photos').querySelector('.popup__photo').src = map.offer.photos;

  return mapEl;
}

function renderPins() {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < offers.length; i++) {
    fragment.appendChild(renderPin(offers[i]));
    fragment.appendChild(renderCard(offers[0]));
  }
  pinsBlock.appendChild(fragment);
}

blockMap.classList.remove('map--faded');
createObj(OBJECTS_AMOUNT);
renderPins();
