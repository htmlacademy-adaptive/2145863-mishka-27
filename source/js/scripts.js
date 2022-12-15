"use strict"

const menuToggle = document.querySelector('.main-nav__toggle');
const mainNav = document.querySelector('.main-nav');

function onMenuTogglerClick() {
    mainNav.classList.toggle('main-nav--hide');
}

menuToggle.addEventListener('click', onMenuTogglerClick);


  // Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.

function init(){
    // Создание карты.
    var myMap = new ymaps.Map("map", {
        // Координаты центра карты.
        center: [59.938735, 30.322958],
        // от 0 (весь мир) до 19.
        zoom: 17
    });

    var myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
        // hintContent: 'Собственный значок метки',
        // balloonContent: 'Это красивая метка'
    }, {
        // Опции.
        // Необходимо указать данный тип макета.
        iconLayout: 'default#image',
        // Своё изображение иконки метки.
        iconImageHref: 'img/icons/map-pin.svg',
        // Размеры метки.
        iconImageSize: [66, 99],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-22, -82]
    });

    myMap.geoObjects.add(myPlacemark);
}

ymaps.ready(init);
