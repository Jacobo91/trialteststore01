window.addEventListener('DOMContentLoaded', () => {
    const quickViewButtons = document.querySelectorAll('#quick-view-button');
    const sectionId = 'template--18992521511170__product-grid';
    const url = `${window.location.pathname}?section=${sectionId}&page=2`;
    const quickViewModal = document.querySelector('#quick-view-modal');

    const fetchData = async (url) => {
        console.log('fetching data with url:', url);
        try {
            const response = await fetch(url);
            const responseTxt = await response.text();
            renderSection(responseTxt);
        } catch (error) {
            
        }
    };

    const renderSection = (html) => {
        const newHTML = new DOMParser()
            .parseFromString(html, 'text/html')
            .getElementById('ProductGridContainer').innerHTML;

        console.log('new html is:', newHTML);

        document.getElementById('ProductGridContainer').innerHTML = newHTML;
    };

    quickViewButtons.forEach(quickViewButton => {
        quickViewButton.addEventListener('click', () => {
            console.log('clicking');
            console.log('url is:', url);
            // fetchData(url)
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