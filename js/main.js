'use strict';
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
var ENTER_KEY = 'Enter';

var avatarOfAutors = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
var pinsBlock = document.querySelector('.map__pins');
var blockMap = document.querySelector('.map');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
// var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var offers = [];
var mainPin = document.querySelector('.map__pin--main');
var address = document.getElementById('address');
var form = document.querySelector('.ad-form');
var filterForm = document.querySelectorAll('.map__filters > *');
var formElements = form.querySelectorAll('fieldset');
var MainPin = {
  WIDTH: 65,
  HEIGHT: 65,
  PIN_TAIL: 22,
  LEFT_DEFAULT: 570,
  TOP_DEFAULT: 375
};
var RoomsNumber = {
  '1': [1],
  '2': [1, 2],
  '3': [1, 2, 3],
  '100': [0]
};
var capacitySelection = document.getElementById('capacity');
var capacityOptions = capacitySelection.querySelectorAll('option');
var roomSelection = document.getElementById('room_number');

// Переводит страницу в неактивное состояние
var setInactiveState = function () {
  blockMap.classList.add('map--faded');
  form.classList.add('ad-form--disabled');
  filterForm.forEach(function (fieldset) {
    fieldset.disabled = true;
  });
  formElements.forEach(function (element) {
    element.disabled = true;
  });
  mainPin.style.left = MainPin.LEFT_DEFAULT + 'px';
  mainPin.style.top = MainPin.TOP_DEFAULT + 'px';
  address.value = MainPin.LEFT_DEFAULT + (Math.round(MainPin.WIDTH / 2)) + ', ' + (MainPin.TOP_DEFAULT + Math.round(MainPin.HEIGHT / 2));
};
setInactiveState();

// Переводит страницу в активное состояние
var setActiveState = function () {
  blockMap.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  formElements.forEach(function (element) {
    element.disabled = false;
  });
  filterForm.forEach(function (fieldset) {
    fieldset.disabled = false;
  });
  address.value = MainPin.LEFT_DEFAULT + (Math.round(MainPin.WIDTH / 2)) + ', ' + (MainPin.TOP_DEFAULT + MainPin.HEIGHT + MainPin.PIN_TAIL);
  pinsBlock.appendChild(fragment);
};

mainPin.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    setActiveState();
  }
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    setActiveState();
  }
});


// Задаёт выбор количества гостей в соответствии с количеством комнат
var filterCapacity = function (value) {

  capacityOptions.forEach(function (option) {
    option.disabled = true;
  });

  RoomsNumber[value].forEach(function (roomOption) {
    capacityOptions.forEach(function (capacity) {
      if (Number(capacity.value) === roomOption) {
        capacity.disabled = false;
        capacity.selected = true;
      }
    });
  });
};

var fragment = document.createDocumentFragment();
offers.forEach(function (offerPin) {
  fragment.appendChild(renderPin(offerPin));
});

roomSelection.addEventListener('change', function (evt) {
  filterCapacity(evt.target.value);
});

filterCapacity(roomSelection.value);

function getRandomItem(array) {
  return Math.floor(Math.random() * array.length);
}

function getRandomArrayWithDeleting(arrayTwo) {
  var rndIndex = Math.floor(Math.random() * (arrayTwo.length - 1));
  var rndElem = arrayTwo[rndIndex];
  arrayTwo.splice(rndIndex, 1);
  return rndElem;
}

function getRandomFromTo(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pullRandomOffer() {
  return {
    author: {
      avatar: getRandomArrayWithDeleting(avatarOfAutors),
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

/**
var getEstateTypeTranslate = function (currentObject) {
  switch (currentObject.offer.type) {
    case 'flat':
      return 'Квартира';
    case 'bungalo':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
    default:
      return 'Шалаш';
  }
};
*/

function createOfferObject(numbers) {
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
/**
function renderCard(map) {
  var mapEl = cardTemplate.cloneNode(true);

  mapEl.querySelector('.popup__title').textContent = map.offer.title;
  mapEl.querySelector('.popup__text--address').textContent = map.offer.address;
  mapEl.querySelector('.popup__text--price').textContent = map.offer.price + '₽/ночь';
  mapEl.querySelector('.popup__type').textContent = getEstateTypeTranslate(map);

  var roomsText = 'ы';
  if (map.offer.rooms < 2) {
    roomsText = 'а';
  } else if (map.offer.rooms > 4) {
    roomsText = '';
  }
  var guestsText = 'ей';
  if (map.offer.guests < 2) {
    guestsText = 'я';
  }

  mapEl.querySelector('.popup__text--capacity').textContent = map.offer.rooms + ' комнат' + roomsText + ' для ' + map.offer.guests + ' гост' + guestsText + '.';
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
*/

createOfferObject(OBJECTS_AMOUNT);
// renderPins();
