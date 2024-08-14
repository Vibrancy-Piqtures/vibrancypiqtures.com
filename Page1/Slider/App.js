var swiper = new Swiper(".swiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    initialSlide: 2,
    speed: 600,
    preventClicks: true,
    slidesPerView: "auto",
    coverflowEffect: {
        rotate: 0,
        stretch: 50,
        depth: 250,
        modifier: 1,
        slideShadows: true,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true, 
    },
    scrollbar: {
        el: ".swiper-scrollbar",
        draggable: true, 
        hide: false,     
    },
    mousewheel: {
        forceToAxis: true, 
        sensitivity: 1,
        releaseOnEdges: true,
    },
});

document.querySelectorAll('.swiper-slide').forEach((slide, index) => {
    slide.addEventListener('click', () => {
        swiper.slideTo(index, 600);  
    });
});
