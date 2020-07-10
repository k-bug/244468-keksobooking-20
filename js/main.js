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
var DESCRIPTIONS = ['Уютные апартаменты в эклектичном стиле',
  'Каждая вещь в этой квартире подобрана строго по древним канонам', 'Приезжайте, не пожалеете!'];

var fragment = document.createDocumentFragment();
var pagePins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var adCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var featuresDictionary = {
  'flat': 'Квартира',
  'palace': 'Дворец',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};

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
  for (var i = 0; i < getRangeValue(1, 4); i++) {
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

var checkExistence = function (value) {
  return !!value;
};

var addFeatures = function (features, adCard) {
  for (var i = 0; i < features.length; i++) {
    var feature = document.createElement('li');
    feature.classList.add('popup__feature', 'popup__feature--' + features[i]);
    adCard.querySelector('.popup__features').appendChild(feature);
  }
};

var addPhotos = function (photos, adCard) {
  for (var i = 0; i < photos.length; i++) {
    var adPhoto = adCard.querySelector('.popup__photos').querySelector('img').cloneNode(true);
    adPhoto.src = photos[i];
    adCard.querySelector('.popup__photos').appendChild(adPhoto);
  }
};

var placeHousingTitle = function (title, adCard) {
  checkExistence(title) ? adCard.querySelector('.popup__title').textContent = title :
    adCard.querySelector('.popup__title').classList.add('hidden');
};

var placeHousingAddres = function (address, adCard) {
  checkExistence(address) ? adCard.querySelector('.popup__text--address').textContent = address :
    adCard.querySelector('.popup__text--address').classList.add('hidden');
};

var placeHousingPrice = function (price, adCard) {
  checkExistence(price) ? adCard.querySelector('.popup__text--price').textContent = price + '₽/ночь' :
    adCard.querySelector('.popup__text--price').classList.add('hidden');
};

var placeHousingСapacity = function (rooms, guests, adCard) {
  switch (true && true) {
    case checkExistence(rooms) !== false && checkExistence(guests) !== false:
      adCard.querySelector('.popup__text--capacity').textContent = rooms + ' комнаты для ' +
        guests + ' гостей';
      break;
    case checkExistence(rooms) !== true && checkExistence(guests) !== false:
      adCard.querySelector('.popup__text--capacity').textContent = 'Для ' +
        guests + ' гостей';
      break;
    case checkExistence(rooms) !== false && checkExistence(guests) !== true:
      adCard.querySelector('.popup__text--capacity').textContent = rooms + ' комнаты';
      break;
    default:
      adCard.querySelector('.popup__text--capacity').classList.add('hidden');
  }
};

var placeHousingTimes = function (checkin, checkout, adCard) {
  switch (true && true) {
    case checkExistence(checkin) !== false && checkExistence(checkout) !== false:
      adCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + checkin +
        ', выезд до ' + checkout;
      break;
    case checkExistence(checkin) !== true && checkExistence(checkout) !== false:
      adCard.querySelector('.popup__text--time').textContent = 'Выезд до ' + checkout;
      break;
    case checkExistence(checkin) !== false && checkExistence(checkout) !== true:
      adCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + checkin;
      break;
    default:
      adCard.querySelector('.popup__text--time').classList.add('hidden');
  }
};

var placeHousingType = function (type, adCard) {
  checkExistence(type) ? adCard.querySelector('.popup__type').textContent = type :
    adCard.querySelector('.popup__type').classList.add('hidden');
};

var placeHousingFeatures = function (features, adCard) {
  var adCardFeatures = adCard.querySelectorAll('.popup__feature');
  for (var i = 0; i < adCardFeatures.length; i++) {
    adCardFeatures[i].remove();
  }
  checkExistence(features) ? addFeatures(features, adCard) :
    adCard.querySelector('.popup__type').classList.add('hidden');
};

var placeHousingDescription = function (description, adCard) {
  checkExistence(description) ? adCard.querySelector('.popup__description').textContent = description :
    adCard.querySelector('.popup__description').classList.add('hidden');
};

var placeHousingPhotos = function (photos, adCard) {
  checkExistence(photos) ? addPhotos(photos, adCard) :
    adCard.querySelector('.popup__type').classList.add('hidden');
  adCard.querySelector('.popup__photos').querySelector('img').remove();
};

var placeAuthorAvatar = function (avatar, adCard) {
  checkExistence(avatar) ? adCard.querySelector('.popup__avatar').src = avatar :
    adCard.querySelector('.popup__type').classList.add('hidden');
};

var createAdCard = function (ad) {
  var adCard = adCardTemplate.cloneNode(true);
  placeHousingTitle(ad.offer.title, adCard);
  placeHousingAddres(ad.offer.address, adCard);
  placeHousingPrice(ad.offer.price, adCard);
  placeHousingType(featuresDictionary[ad.offer.type], adCard);
  placeHousingСapacity(ad.offer.rooms, ad.offer.guests, adCard);
  placeHousingTimes(ad.offer.checkin, ad.offer.checkout, adCard);
  placeHousingFeatures(ad.offer.features, adCard);
  placeHousingDescription(ad.offer.description, adCard);
  placeHousingPhotos(ad.offer.photos, adCard);
  placeAuthorAvatar(ad.author, adCard);

  return adCard;
};

for (var i = 0; i < 8; i++) {
  fragment.appendChild(createPin(generateAdvertsArray()[i]));
}

document.querySelector('.map').classList.remove('map--faded');

pagePins.appendChild(fragment);
pagePins.appendChild(createAdCard(generateAdvertsArray()[0]));
