document.addEventListener('DOMContentLoaded', () => {
    const quickViewButtons = document.querySelectorAll('.quick-view-button');
    const sectionId = document.getElementById('quick-view-modal').getAttribute('data-section');
    const quickViewModal = document.querySelector('#quick-view-modal');

    const fetchData = async (url) => {
        console.log('fetching data with url:', url);
        try {
            const response = await fetch(url);
            const responseText = await response.text();
            renderSection(responseText);
        } catch (error) {
            
        }
    };

    const renderSection = (html) => {
        const newHTML = new DOMParser()
            .parseFromString(html, 'text/html')
            .getElementById('quick-view-modal').innerHTML;

        console.log('new html is:', newHTML);

        document.getElementById('quick-view-modal').innerHTML = newHTML;
    };

    quickViewButtons.forEach(quickViewButton => {
        quickViewButton.addEventListener('click', (event) => {
            const productHandle = event.target.getAttribute('data-product-handle');
            const productEndpoint = `${window.Shopify.routes.root}products/${productHandle}?section_id=${sectionId}`;
            console.log('clicking');
            console.log('product url is:', productEndpoint);
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
});