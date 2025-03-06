document.addEventListener('DOMContentLoaded', function () {
    // Loading
    const loadingOverlay = document.getElementById('loadingOverlay');
    window.addEventListener('load', function () {
        loadingOverlay.style.display = 'none';
    });

    const tabButtons = document.querySelectorAll('.tab-button');

    // Mobile select menu
    const tabSelect = document.querySelector('.tab-select');
    const tabContents = document.querySelectorAll('.tab-content');

    tabSelect.addEventListener('change', function () {
        const selectedTab = this.value;

        tabContents.forEach(tabContent => {
            if (tabContent.id === selectedTab) {
                tabContent.classList.add('active');
            } else {
                tabContent.classList.remove('active');
            }
        });
    });

    // Initial tab loading
    const activeTabButton = document.querySelector('.tab-button.active');
    const defaultTab = activeTabButton ? activeTabButton.dataset.tab : tabSelect.value;

    tabContents.forEach(tabContent => {
        if (tabContent.id === defaultTab) {
            tabContent.classList.add('active');
        } else {
            tabContent.classList.remove('active');
        }
    });

    // add active class to button or select
    if (activeTabButton) {
        tabButtons.forEach(btn => {
            if (btn.dataset.tab === defaultTab) {
                btn.classList.add('active');
            }
        })
    } else {
        tabSelect.value = defaultTab;
    }

    // Desktop button menu
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to the clicked button
            button.classList.add('active');

            // Hide all tab contents
            tabContents.forEach(tab => tab.classList.remove('active'));
            // Show the content of the clicked tab
            const tabId = button.dataset.tab;
            const activeTab = document.getElementById(tabId);
            activeTab.classList.add('active');
        });
    });

    // i18n 
    loadTranslations();

    function loadTranslations() {
        const lang = 'ko'; // navigator.language.substring(0, 2); // Get the first two characters of the language code
        fetch(`${lang}.json`)
            .then(response => response.json())
            .then(translations => {
                translatePage(translations);
            })
            .catch(error => {
                console.error('Error loading translations:', error);
            });
    }

    function translatePage(translations) {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.dataset.i18n;
            if (translations[key]) {
                element.textContent = translations[key];
            }
        });
    }
    // Service sort and filtering
    const sortSelect = document.getElementById('sortSelect');
    const filterInput = document.getElementById('filterInput');
    const serviceLists = document.querySelectorAll('.service-list');

    function sortServices(order = 'default') {
        serviceLists.forEach(serviceList => {
            const services = Array.from(serviceList.querySelectorAll('.service-item'));
            services.sort((a, b) => {
                const aName = a.querySelector('a').textContent.toLowerCase();
                const bName = b.querySelector('a').textContent.toLowerCase();
                if (order === 'asc') {
                    return aName.localeCompare(bName);
                } else if (order === 'desc') {
                    return bName.localeCompare(aName);
                } else {
                    return 0;
                }
            });
            serviceList.innerHTML = '';
            services.forEach(service => serviceList.appendChild(service));
        });
    }

    function filterServices(searchTerm) {
        serviceLists.forEach(serviceList => {
            const services = Array.from(serviceList.querySelectorAll('.service-item'));
            services.forEach(service => {
                const name = service.querySelector('a').textContent.toLowerCase();
                if (name.includes(searchTerm.toLowerCase())) {
                    service.style.display = '';
                } else {
                    service.style.display = 'none';
                }
            });
        });
    }

    sortSelect.addEventListener('change', () => {
        sortServices(sortSelect.value);
    });

    filterInput.addEventListener('input', () => {
        filterServices(filterInput.value);
    });
});
