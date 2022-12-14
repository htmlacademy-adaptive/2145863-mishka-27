"use strict"

const menuToggle = document.querySelector('.main-nav__toggle');
const mainNav = document.querySelector('.main-nav');

function onMenuTogglerClick() {
    mainNav.classList.toggle('main-nav--hide');
}

menuToggle.addEventListener('click', onMenuTogglerClick);

