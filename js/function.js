// * show previous image in header
function previousSlide() {
    let currentSlide = AhSliders.querySelector(".Ah-carousel-slider.active"),
        currentSlideIndex = currentSlide.dataset.slideIndex - 1,
        nextSlideIndex = (((currentSlideIndex) < 0) ? 2 : currentSlideIndex),
        indicatorSlide = AhSliders.querySelector(`li.Ah-carousel-indicator[data-slide-index='${nextSlideIndex}']`);
    currentSlide.classList.remove("active");
    slides[nextSlideIndex].classList.add("active");
    updateActive(indicatorSlide, ".Ah-carousel-indicator", "indicator");
    clearTimeout(timeSlide);
    timeSlide = setTimeout(() => {
        nextSlide();
    }, 20000);
}

// * show Next image in header
function nextSlide() {
    let currentSlide = AhSliders.querySelector(".Ah-carousel-slider.active"),
        currentSlideIndex = (currentSlide.dataset.slideIndex + 1) % 3,
        nextSlideIndex = currentSlideIndex,
        indicatorSlide = AhSliders.querySelector(`li.Ah-carousel-indicator[data-slide-index='${nextSlideIndex}']`);
    currentSlide.classList.remove("active");
    slides[nextSlideIndex].classList.add("active");
    updateActive(indicatorSlide, ".Ah-carousel-indicator", "indicator");
    clearTimeout(timeSlide);
    timeSlide = setTimeout(() => {
        nextSlide();
    }, 20000);
}

// * show image in header from indicator 
function showSlide(indexSlide, that) {
    let currentSlide = AhSliders.querySelector(".Ah-carousel-slider.active"),
        nextSlide = AhSliders.querySelector(`.Ah-carousel-slider[data-slide-index='${indexSlide}']`);
    currentSlide.classList.remove("active");
    nextSlide.classList.add("active");
    updateActive(that, ".Ah-carousel-indicator", "indicator");
}

// * update active
function updateActive(Ele, child, parent) {
    document.querySelector(`.${parent} ${child}.active`).classList.remove("active");
    Ele.classList.add("active");
}

// * open popup
function openPopup(popupName) {
    let popupEle = document.querySelector(`.popup[data-name='${popupName}']`);
    popupEle.classList.add("active");
    body.classList.add("overflow-hidden");
    setTimeout(() => {
        popupEle.classList.add("show");
    }, 200);
}

// *close popup
function closePopup() {
    let popupEle = document.querySelector(`.popup.active`);
    popupEle.classList.remove("show");
    body.classList.remove("overflow-hidden");
    setTimeout(() => {
        popupEle.classList.remove("active");
    }, 200);
}

// * update active in section menu
function updateActiveNavMenu(Ele) {
    updateActive(Ele, '.Ah_item', 'content_nav');
    document.querySelector(".content_nav .Ah_item.show").classList.remove("show");
}

// * open popup information image
function openMenu(popupName, iconMenu) {
    let popupEle = document.querySelector(`.popup[data-name='${popupName}']`),
        index = iconMenu.dataset.index;
    popupEle.dataset.nameContent = iconMenu.dataset.name;
    nextContentMenu(index, popupEle);
    openPopup(popupName);
}

// * next information in popup menu
function nextContentMenu(nextIndex, popupEle) {
    let popupNameMenu = popupEle.dataset.nameContent,
        rowContent = document.querySelector(`.Ah_item.${popupNameMenu} .row.child[data-index='${nextIndex}']`),
        nameMenu = rowContent.querySelector(".titleInfo h4").textContent,
        imageMenu = rowContent.querySelector(".image img").src.split("/"),
        imageMenuSrc = imageMenu[imageMenu.length - 1],
        priceMenu = rowContent.querySelector(".titleInfo p").textContent,
        popupImage = popupEle.querySelector(".head .imagePopup img").src.split("/"),
        head = popupEle.querySelector("h2.info"),
        price = popupEle.querySelector("span.price");

    popupImage[popupImage.length - 1] = imageMenuSrc;
    popupEle.querySelector(".head .imagePopup img").src = popupImage.join("/");
    head.textContent = nameMenu;
    price.textContent = priceMenu;
    popupEle.dataset.index = nextIndex;
}

// * for next information
function nextPopupMenu() {
    let popupEle = document.querySelector(`.popup.active`),
        currentIndex = parseInt(popupEle.dataset.index),
        nextIndex = (currentIndex + 1) % 6;
    popupEle.dataset.index = nextIndex;
    nextContentMenu(nextIndex, popupEle);
}

// * for previous information
function prevPopupMenu() {
    let popupEle = document.querySelector(`.popup.active`),
        currentIndex = parseInt(popupEle.dataset.index),
        prevIndex = ((currentIndex - 1) < 0 ? 5 : (currentIndex - 1));
    popupEle.dataset.index = prevIndex;
    nextContentMenu(prevIndex, popupEle);
}