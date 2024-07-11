const brend = document.querySelector('.brend');
const showHide = document.querySelector('.show-hide');
const brendWrap = document.querySelector('.brend__wrap');

const widthWindow = brend.clientWidth;

if (widthWindow >= 320 && widthWindow < 768) {
    showHide.classList.add('hidden')
}

showHide.addEventListener('click', function () {

    const arrow = showHide.querySelector('.showHide__arrow');
    const showHideLabel = showHide.querySelector('.showHide__label');

    if (brendWrap.classList.contains('brend__hidden')) {
        brendWrap.classList.remove('brend__hidden');
        arrow.setAttribute('src', 'assets/img/double_arrow_up.png');
        arrow.setAttribute('alt', 'Скрыть');
        showHideLabel.innerHTML = 'Скрыть';
    } else {
        brendWrap.classList.add('brend__hidden');
        arrow.setAttribute('src', 'assets/img/double_arrow_down.png');
        arrow.setAttribute('alt', 'Показать все');
        showHideLabel.innerHTML = 'Показать все';
    }
});


