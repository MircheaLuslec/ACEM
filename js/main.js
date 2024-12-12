const burgerButton = document.querySelector('.burgerButton');
const popup = document.querySelector('.popup');
const swipeBar = document.querySelector('.swipe-bar');
const overlay = document.querySelector('.popup-overlay');
const body = document.querySelector('body');

function openMenu() {
    popup.classList.add('opened');  // Меню будет показываться
    overlay.classList.add('opened');  // Показываем затемнение фона
    body.classList.add('no-scroll');  // Блокируем прокрутку страницы
    swipeBar.classList.add('moving-up');  // Поднимаем полоску
    swipeBar.classList.remove('moving-down');  // Убираем опускание полоски, если оно было
}
function closeMenu() {
    popup.classList.remove('opened');  // Меню будет скрываться
    overlay.classList.remove('opened');  // Скрываем затемнение
    body.classList.remove('no-scroll');  // Разблокируем прокрутку страницы
    swipeBar.classList.remove('moving-up');  // Убираем поднимание
    swipeBar.classList.add('moving-down');  // Опускаем полоску вниз

    // Чтобы полоска вернулась на место после анимации
    setTimeout(() => {
        swipeBar.classList.remove('moving-down');
    }, 300);  // Время анимации совпадает с длительностью перехода
}


burgerButton.addEventListener('click', function () {
    if (popup.classList.contains('opened')) {
        closeMenu();
    } else {
        openMenu();
    }
});


let touchStartY = 0;
let touchEndY = 0;


popup.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
});

popup.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].clientY;


    if (touchEndY - touchStartY > 50) {
        closeMenu();
    }
});


swipeBar.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
});


swipeBar.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].clientY;


    if (touchEndY - touchStartY > 50) {
        closeMenu();
    }
});  


const animItems = document.querySelectorAll('._anim-items');

if(animItems.length > 0){
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll(){
        for (let index = 0; index < animItems.length; index++){
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 4;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                animItem.classList.add('_active');
            } else {
                if(!animItem.classList.contains('_anim-no-hide')){
                    animItem.classList.remove('_active');
                }
            }
        }
    }
    function offset(el) {
        const rect = el.getBoundingClientRect(),
           scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
           scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return {top: rect.top + scrollTop, left: rect.left + scrollLeft}   
    }
    setTimeout(() =>{
        animOnScroll();
    }, 300);
}

var swiper = new Swiper('.swiper-container', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    }
});
