

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


const colorSamples = document.querySelectorAll('.color-sample');
const colorFeedback = document.getElementById('colorFeedback');


function updateColorFeedback(event) {
    const selectedColor = event.target.style.backgroundColor;
    const capitalizedColor = selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1);
    colorFeedback.textContent = capitalizedColor;
}



colorSamples.forEach(sample => {
    sample.addEventListener('click', updateColorFeedback);
});


const sizeSelector = document.getElementById('size-selector');
const sizeFeedback = document.getElementById('sizeFeedback');

function updateSizeFeedback(event) {
    const selectedOption = sizeSelector.options[sizeSelector.selectedIndex];
    const selectedSize = selectedOption.textContent;
    sizeFeedback.textContent = selectedSize !== 'Please Select' ? selectedSize : '';

}

sizeSelector.addEventListener('change', updateSizeFeedback);

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
