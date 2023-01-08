"use strict";

// Объкты работы с меню
const menuToggle = document.querySelector('.main-nav__toggle');
const mainNav = document.querySelector('.main-nav');
const header = document.querySelector('.header');

// Объкты работы с видео
const video = document.querySelector('.promo-clip__video');
const link = document.querySelector('.promo-clip__video-link');
const button = document.querySelector('.promo-clip__play-button');

// Кнопки открытия модальных форм
const buttonPromoOrder = document.querySelector('.promo__order');
const productsBuy = document.querySelectorAll('.products__buy');
const modal = document.querySelector('.modal-container');

// Слайдер
let currrentSlide = 1;
const sliderItems = document.querySelectorAll('.slider__item');
const buttonSliderNext = document.querySelector('.slider__button--next');
const buttonSliderPrev = document.querySelector('.slider__button--prev');

// обертка фолбека карты
const mapWprapper = document.querySelector('.contacts__map-wpapper');


// Обработчик гамбургера меню
function onMenuTogglerClick() {
    mainNav.classList.toggle('main-nav--hide');
}

// *** Модальное окно

// Обработчик открытия модального окна заказа
function onOrderButtonClick(evt) {
    evt.preventDefault();
    modal?.classList.remove('modal-container--hide');
}

// Навешиваем обработчики вызова модальных окон
buttonPromoOrder?.addEventListener('click', onOrderButtonClick);

productsBuy?.forEach(element => {
    element.addEventListener('click', onOrderButtonClick);
});

// Закрытие модального окна
modal?.addEventListener('click', (evt) => {
    if (evt.target === modal)
        modal.classList.toggle('modal-container--hide');
});


// Навигационное меню
menuToggle.addEventListener('click', onMenuTogglerClick);
menuToggle.classList.remove('main-nav__toggle--no-js');
mainNav.classList.add('main-nav--hide')
header.classList.remove('header--no-js');

// Слайдер
buttonSliderNext?.addEventListener('click', function() {
    currrentSlide++;
    currrentSlide = (currrentSlide > sliderItems.length) ? 1 : currrentSlide;
    setSlide(currrentSlide-1);
});

buttonSliderPrev?.addEventListener('click', function() {
    currrentSlide--;
    currrentSlide = (currrentSlide < 1) ? sliderItems.length : currrentSlide;
    setSlide(currrentSlide-1);
});

function setSlide(slideNumber) {
    // debugger;
    for (let i = 0; i < sliderItems.length; i++) {
        if (i !== slideNumber) {
            if (!sliderItems[i].classList.contains('slider__item--hide'))
                sliderItems[i].classList.add('slider__item--hide')
        } else {
            sliderItems[i].classList.remove('slider__item--hide')
        }
    }
};

mapWprapper?.classList.remove('contacts__map-wpapper--no-js');

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

// Промо видео
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
