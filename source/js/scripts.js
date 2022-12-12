const menuToggle = document.querySelector('.main-nav__toggle');
const mainNav = document.querySelector('.main-nav');

const onMenuTogglerClick = function() {
    mainNav.classList.toggle('main-nav--hide');
}

menuToggle.addEventListener('click', onMenuTogglerClick);

