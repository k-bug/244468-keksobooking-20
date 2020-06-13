'use strict';

var PIN_Y_START = 130;
var PIN_Y_END = 630;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var TITLES = ['Апартаменты с видом на гору', 'Уютная квартира в центре Токио', 'Просторная квартира для большой компании'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var REAL_ESTATE_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS = [1, 2, 3, 100];
var GUESTS_QUANTITY = [1, 2, 3];
var CHECK_TIMES = ['12:00', '13:00', '14:00'];
var DESCRIPTIONS = ['Уютные апартаменты в эклектичном стиле', 'Каждая вещь в этой квартире подобрана строго по древним канонам', 'Приезжайте, не пожалеете!'];

var fragment = document.createDocumentFragment();
var pagePins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var getRangeValue = function (from, to) {
  var range = to - from + 1;
  return Math.floor(Math.random() * range);
};

var getMapWidth = function () {
  return document.querySelector('.map').clientWidth;
};

var getXPinPosition = function () {
  return Math.floor(Math.random() * getMapWidth()) + PIN_WIDTH / 2;
};

var getYPinPosition = function () {
  var pointsRange = PIN_Y_END - PIN_Y_START + 1;
  var randomPoint = Math.floor(Math.random() * pointsRange) + PIN_HEIGHT;
  return randomPoint;
};

var getRandomValue = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getFeatures = function (features) {
  var flatFeature = [];
  for (var i = 0; i < getRangeValue(0, features.length); i++) {
    flatFeature[i] = features[i];
  }
  return flatFeature;
};

var getPhotos = function () {
  var photos = [];
  for (var i = 0; i < getRangeValue(1, 9); i++) {
    photos[i] = 'http://o0.github.io/assets/images/tokyo/hotel' + (i + 1) + '.jpg';
  }
  return photos;
};

var generateAdvertsArray = function () {
  var adverts = [];
  for (var i = 0; i < 8; i++) {
    adverts[i] = {
      'author': 'img/avatars/user0' + (i + 1) + '.png',
      'offer': {
        'title': getRandomValue(TITLES),
        'address': getXPinPosition() + ' ' + getYPinPosition(),
        'price': getRangeValue(1000, 10000),
        'type': getRandomValue(REAL_ESTATE_TYPE),
        'rooms': getRandomValue(ROOMS),
        'guests': getRandomValue(GUESTS_QUANTITY),
        'checkin': getRandomValue(CHECK_TIMES),
        'checkout': getRandomValue(CHECK_TIMES),
        'features': getFeatures(FEATURES),
        'description': getRandomValue(DESCRIPTIONS),
        'photos': getPhotos()
      },
      'location': {
        'x': getXPinPosition() + 'px',
        'y': getYPinPosition() + 'px'
      }
    };
  }
  return adverts;
};

var createPin = function (adPin) {
  var pin = pinTemplate.cloneNode(true);
  pin.children[0].src = adPin.author;
  pin.children[0].alt = adPin.offer.title;
  pin.style.left = adPin.location.x;
  pin.style.top = adPin.location.y;
  return pin;
};

for (var i = 0; i < 8; i++) {
  fragment.appendChild(createPin(generateAdvertsArray()[i]));
}

document.querySelector('.map').classList.remove('map--faded');

pagePins.appendChild(fragment);
