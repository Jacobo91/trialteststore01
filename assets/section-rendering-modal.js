window.addEventListener('DOMContentLoaded', () => {
    const quickViewButtons = document.querySelectorAll('#quick-view-button');
    const sectionId = 'template--18992521511170__product-grid';
    const url = `${window.location.pathname}?section=${sectionId}?page=2`;

    const fetchData = async (url) => {
        console.log('fetching data with url:', url);
        try {
            const response = await fetch(url);
            const responseTxt = await response.text();
            const newHTML = new DOMParser()
                .parseFromString(responseTxt, 'text/html')
                .getElementById('ProductGridContainer').innerHTML;
            console.log('new html is:', newHTML);

            document.getElementById('ProductGridContainer').innerHTML = newHTML;
        } catch (error) {
            
        }
    };

    quickViewButtons.forEach(quickViewButton => {
        quickViewButton.addEventListener('click', () => {
            console.log('clicking');
            console.log('url is:', url);
            fetchData(url)
        });
    });
});