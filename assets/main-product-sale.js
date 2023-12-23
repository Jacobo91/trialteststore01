

document.addEventListener("DOMContentLoaded", function () {
    const swiper = new Swiper('.swiper', {
        // Your existing Swiper configuration
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        scrollbar: {
            el: '.swiper-scrollbar',
        },
    });

    const galleryImages = document.querySelectorAll(".gallery img");

    galleryImages.forEach((image, index) => {
        image.addEventListener("click", () => {
            swiper.slideTo(index);
        });
    });
});


function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    window.open(facebookUrl, '_blank');
}

function shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Check out this cool link!');
    const twitterUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
    window.open(twitterUrl, '_blank');
}

function shareOnPinterest() {
    const url = encodeURIComponent(window.location.href);
    const imageUrl = encodeURIComponent('IMAGE_URL_TO_SHARE'); // Replace with your image URL
    const description = encodeURIComponent('Description of your pinned image');
    const pinterestUrl = `https://pinterest.com/pin/create/button/?url=${url}&media=${imageUrl}&description=${description}`;
    window.open(pinterestUrl, '_blank');
}
