document.addEventListener('DOMContentLoaded', () => {
    const quickViewButtons = document.querySelectorAll('.quick-view-button');
    const sectionId = document.getElementById('quick-view-modal').getAttribute('data-section');
    const quickViewModal = document.querySelector('#quick-view-modal');

    const fetchData = async (url) => {
        try {
            setLoadingState();

            const response = await fetch(url);
            const responseText = await response.text();
            renderSection(responseText);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const renderSection = (html) => {
        const newHTML = new DOMParser()
            .parseFromString(html, 'text/html')
            .getElementById('quick-view-modal').innerHTML;

        document.getElementById('quick-view-modal').innerHTML = newHTML;

        // Reinitialize Swiper after content update
        initializeSwiper();
    };

    const setLoadingState = () => {
        // Clear current content and add a loading indicator
        document.getElementById('quick-view-modal').innerHTML = `
            <div class="loading-indicator">
                <p>Loading...</p>
            </div>`;
    };

    quickViewButtons.forEach(quickViewButton => {
        quickViewButton.addEventListener('click', (event) => {
            const productHandle = event.target.getAttribute('data-product-handle');
            const productEndpoint = `${window.Shopify.routes.root}products/${productHandle}?section_id=${sectionId}`;
            fetchData(productEndpoint);
            if (quickViewModal.classList.contains('hide-modal')) {
                quickViewModal.classList.remove('hide-modal');
                quickViewModal.classList.add('show-modal');
            }
        });
    });

    quickViewModal.addEventListener('click', (event) => {
        if (event.target.classList.contains('show-modal')) {
            event.target.classList.remove('show-modal');
            event.target.classList.add('hide-modal');
        }
    });

    const initializeSwiper = () => {
        // Check if Swiper exists and clean up any previous instance if necessary
        if (document.querySelector('.swiper')) {
            new Swiper('.swiper', {
                direction: 'horizontal',
                loop: false,
                pagination: {
                    el: '.swiper-pagination',
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                scrollbar: {
                    el: '.swiper-scrollbar',
                },
            });
        }
    };

    // Initialize Swiper on page load for any pre-rendered content
    initializeSwiper();
});

