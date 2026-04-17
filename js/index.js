let AhSliders = document.querySelector(".Ah-carousel"),
    prevBtn = AhSliders.querySelector(".prev"),
    nextBtn = AhSliders.querySelector(".next"),
    slides = AhSliders.querySelectorAll(".Ah-carousel-slider"),
    popups = document.querySelectorAll(".popup"),
    popupBoxs = document.querySelectorAll(".popup .box"),
    body = document.querySelector("body"),
    nav_menu = document.querySelectorAll(".nav_menu .box"),
    navbar = document.querySelector("nav.navbar"),
    navLinks = navbar.querySelectorAll(".nav-link"),
    navLinksPopup = document.querySelectorAll(`.popup[data-name="links"] .links li a`),
    sections = document.querySelectorAll("section,header");

prevBtn.addEventListener("click", previousSlide);
nextBtn.addEventListener("click", nextSlide);

let timeSlide = setTimeout(() => {
    nextSlide();
}, 20000);

document.addEventListener("keydown", function (e) {
    AhSliders.focus();
    if (e.key == "ArrowLeft") {
        previousSlide();
    } else if (e.key == "ArrowRight") {
        nextSlide();
    }
})

popups.forEach(popup => {
    popup.addEventListener("click", function () {
        closePopup();
    });
});

popupBoxs.forEach(popupBox => {
    popupBox.addEventListener("click", function (e) {
        e.stopPropagation();
    });
});

nav_menu.forEach(menu => {
    menu.addEventListener("click", function () {
        updateActive(this, '.box', 'nav_menu');
        let navContentName = this.dataset.name,
            navContentEle = document.querySelector(`.content_nav .Ah_item.${navContentName}`);
        updateActiveNavMenu(navContentEle);
        setTimeout(() => {
            navContentEle.classList.add("show");
        }, 100);
    })
})

let lastScroll = 0;
window.addEventListener("scroll", function () {
    let scrollWindow = window.scrollY;
    if (scrollWindow >= 10) {
        navbar.classList.add("scroll");
    } else {
        navbar.classList.remove("scroll");
    }

    if (scrollWindow > lastScroll) {
        navbar.classList.add("hide");
    } else {
        navbar.classList.remove("hide");
    }

    lastScroll = scrollWindow;

    sections.forEach(section => {
        let sectionTop = section.offsetTop,
            sectionBottom = sectionTop + section.offsetHeight,
            sectionId = section.getAttribute("id");
        if (scrollWindow + 80 > sectionTop && scrollWindow + 80 < sectionBottom) {
            let anchor = document.querySelector(`.nav-link[href="#${sectionId}"]`),
                anchorPopup = document.querySelector(`.popup[data-name="links"] .links li a[href="#${sectionId}"]`);
            updateActive(anchor, ".nav-link", "nav-item");
            updateActive(anchorPopup.closest("li"), "li", `links`);
        }
    });
});

navLinks.forEach(navLink => {
    navLink.addEventListener("click", function (e) {
        e.preventDefault();
        let sectionId = navLink.getAttribute("href"),
            sectionEle = document.querySelector(`${sectionId}`),
            sectionHeight = sectionEle.offsetTop;
        window.scrollTo({
            top: sectionHeight,
            behavior: "smooth"
        });
    })
});


navLinksPopup.forEach(navLinkPopup => {
    navLinkPopup.addEventListener("click", function (e) {
        e.preventDefault();
        closePopup();
        setTimeout(() => {
            let sectionId = navLinkPopup.getAttribute("href"),
                sectionEle = document.querySelector(`${sectionId}`),
                sectionHeight = sectionEle.offsetTop;
            window.scrollTo({
                top: sectionHeight,
                behavior: "smooth"
            });
        }, 100);
    })
});


window.addEventListener("DOMContentLoaded", function () {
    let popupLoading = document.querySelector(".loadingPadge"),
        body = document.querySelector("body");
    setInterval(() => {
        popupLoading.classList.add("hide");
    }, 5000);

    setInterval(() => {
        popupLoading.classList.remove("active");
        body.classList.remove("overflow-hidden");
    }, 5500);
})
