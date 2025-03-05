document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    const loadingOverlay = document.getElementById('loadingOverlay');
    const sortSelect = document.getElementById('sortSelect');
    const filterInput = document.getElementById('filterInput');
    let currentTab = null;

    // Function to sort service items
    function sortServiceItems(sortType) {
        if (!currentTab) return;
        const serviceList = currentTab.querySelector('.service-list');
        const serviceItems = Array.from(serviceList.querySelectorAll('.service-item'));

        serviceItems.sort((a, b) => {
            const aName = a.querySelector('a').textContent.toLowerCase();
            const bName = b.querySelector('a').textContent.toLowerCase();

            if (sortType === 'asc') {
                return aName.localeCompare(bName);
            } else if (sortType === 'desc') {
                return bName.localeCompare(aName);
            } else {
                return 0; // Default order
            }
        });

        // Re-append sorted items to the service list
        serviceItems.forEach(item => serviceList.appendChild(item));
    }

    // Function to filter service items
    function filterServiceItems(filterText) {
        if (!currentTab) return;
        const serviceItems = currentTab.querySelectorAll('.service-item');
        const lowerCaseFilterText = filterText.toLowerCase();

        serviceItems.forEach(item => {
            const itemName = item.querySelector('a').textContent.toLowerCase();
            if (itemName.includes(lowerCaseFilterText)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    // Function to hide the loading overlay
    function hideLoadingOverlay() {
      loadingOverlay.style.display = 'none';
    }

    // Function to show the loading overlay
    function showLoadingOverlay() {
      loadingOverlay.style.display = 'flex';
    }
    
    // Initialize the loading overlay
    showLoadingOverlay();
    
    // Tab button event listeners
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button
            button.classList.add('active');

            // Show corresponding tab content
            const tabId = button.dataset.tab;
            const tabContent = document.getElementById(tabId);
            if (tabContent) {
                tabContent.classList.add('active');
                currentTab = tabContent;
            }
            sortServiceItems(sortSelect.value);
            filterServiceItems(filterInput.value);
        });
    });
    
    // Event listeners for sorting and filtering
    sortSelect.addEventListener('change', () => {
      sortServiceItems(sortSelect.value);
    });

    filterInput.addEventListener('input', () => {
      filterServiceItems(filterInput.value);
    });
    
    // Hide the loading overlay after a delay (simulating content load)
    setTimeout(hideLoadingOverlay, 500);

    // localization support
    function loadTranslations(lang) {
        fetch(`translations/${lang}.json`)
            .then(response => response.json())
            .then(translations => {
                document.querySelectorAll('[data-i18n]').forEach(element => {
                    const key = element.dataset.i18n;
                    if (translations[key]) {
                        if (element.tagName === 'INPUT') {
                          element.placeholder = translations[key];
                        } else {
                          element.textContent = translations[key];
                        }
                    }
                });
            })
            .catch(error => console.error('Error loading translations:', error));
    }

    // Load the default language
    loadTranslations('ko');
});
