"use strict"

// Объкты работы с меню
const menuToggle = document.querySelector('.main-nav__toggle');
const mainNav = document.querySelector('.main-nav');
const header = document.querySelector('.header');

// Объкты работы с видео
const video = document.querySelector('.promo-clip__video');
const link = document.querySelector('.promo-clip__video-link');
const button = document.querySelector('.promo-clip__play-button');

// Обработчик гамбургера меню
function onMenuTogglerClick() {
    mainNav.classList.toggle('main-nav--hide');
}

menuToggle.addEventListener('click', onMenuTogglerClick);
menuToggle.classList.remove('main-nav__toggle--no-js');
mainNav.classList.add('main-nav--hide')
header.classList.remove('header--no-js');

// Яндекс карта

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


if (document.getElementById('map')) {
    ymaps.ready(init);
}

if (video) {

    // id - видеоролика на youtube
    const id = '4JS70KB9GS0';

    button.addEventListener('click', ()=> {
        const iframe = createIframe(id);

        link.remove();
        button.remove();
        video.appendChild(iframe);
    });

    link.removeAttribute('href');
    button.classList.remove('promo-clip__play-button--nojs');

    //создание фрейма с видео
    function createIframe(id) {
        let iframe = document.createElement('iframe');

        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; allowfullscreen')
        iframe.setAttribute('src', 'https://www.youtube.com/embed/4JS70KB9GS0/?rel=0&showinfo=0&autoplay=1');
        iframe.classList.add('promo-clip__video-embed');

        return iframe;
    }
}
