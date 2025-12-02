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
    loadServices();
    loadNews();

    function loadServices() {
        fetch('services.json')
            .then(response => response.json())
            .then(services => {
                const serviceLists = {
                    'conversational_ai': document.querySelector('#conversational_ai .service-list'),
                    'ai_services': document.querySelector('#ai_services .service-list'),
                    'ai_agents': document.querySelector('#ai_agents .service-list'),
                    'automation_platforms': document.querySelector('#automation_platforms .service-list')
                };

                for (const category in services) {
                    const serviceListContainer = serviceLists[category];
                    if (serviceListContainer) {
                        for (const subCategory in services[category]) {
                            const subCategoryTitle = document.createElement('h3');
                            subCategoryTitle.classList.add('service-list-title');
                            subCategoryTitle.dataset.i18n = subCategory;
                            serviceListContainer.appendChild(subCategoryTitle);

                            services[category][subCategory].forEach(service => {
                                const serviceItem = document.createElement('div');
                                serviceItem.classList.add('service-item');

                                const link = document.createElement('a');
                                link.href = service.url;
                                link.target = '_blank';
                                link.textContent = service.name;

                                const description = document.createElement('p');
                                description.dataset.i18n = service.description_key;

                                serviceItem.appendChild(link);
                                serviceItem.appendChild(description);
                                serviceListContainer.appendChild(serviceItem);
                            });
                        }
                    }
                }

                loadTranslations();
            })
            .catch(error => {
                console.error('Error loading services:', error);
            });
    }

    function loadNews() {
        fetch('news.json')
            .then(response => response.json())
            .then(newsItems => {
                const newsListContainer = document.querySelector('#ai_news .news-list');
                if (!newsListContainer) return;

                if (newsItems.length === 0) {
                    const noNews = document.createElement('p');
                    noNews.dataset.i18n = "no_news";
                    newsListContainer.appendChild(noNews);
                    return;
                }

                // Sort news by date descending (already sorted by RSS but just in case)
                newsItems.sort((a, b) => new Date(b.date) - new Date(a.date));

                newsItems.forEach(item => {
                    const newsItem = document.createElement('div');
                    newsItem.classList.add('news-item', 'service-item'); // Reusing service-item style

                    const link = document.createElement('a');
                    link.href = item.url;
                    link.target = '_blank';
                    link.textContent = item.title;
                    link.classList.add('news-title');

                    const metaDiv = document.createElement('div');
                    metaDiv.classList.add('news-meta');

                    const dateSpan = document.createElement('span');
                    dateSpan.classList.add('news-date');
                    dateSpan.textContent = item.date;

                    // Check if news is new (today)
                    const today = new Date().toISOString().split('T')[0];
                    if (item.date === today) {
                        const newBadge = document.createElement('span');
                        newBadge.classList.add('new-badge');
                        newBadge.textContent = "NEW";
                        metaDiv.appendChild(newBadge);
                    }

                    metaDiv.appendChild(dateSpan);

                    const description = document.createElement('p');
                    description.classList.add('news-description');
                    description.textContent = item.description;

                    newsItem.appendChild(link);
                    newsItem.appendChild(metaDiv);
                    newsItem.appendChild(description);
                    newsListContainer.appendChild(newsItem);
                });

                loadTranslations(); // Translate static texts if any
            })
            .catch(error => {
                console.error('Error loading news:', error);
                const newsListContainer = document.querySelector('#ai_news .news-list');
                if(newsListContainer) {
                    newsListContainer.innerHTML = '<p data-i18n="no_news">최신 뉴스가 없습니다.</p>';
                    loadTranslations();
                }
            });
    }

    function loadTranslations() {
        const lang = 'ko'; // navigator.language.substring(0, 2); // Get the first two characters of the language code
        fetch(`translations/${lang}.json`)
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
    const serviceLists = document.querySelectorAll('.service-list, .news-list');

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

            // Re-append sorted services, preserving sub-category titles
            const titles = Array.from(serviceList.querySelectorAll('.service-list-title'));
            const servicesByTitle = {};

            titles.forEach(title => {
                servicesByTitle[title.dataset.i18n] = [];
            });

            services.forEach(service => {
                let currentTitle = '';
                let previousElement = service.previousElementSibling;
                while(previousElement) {
                    if(previousElement.classList.contains('service-list-title')) {
                        currentTitle = previousElement.dataset.i18n;
                        break;
                    }
                    previousElement = previousElement.previousElementSibling;
                }
                if (currentTitle) {
                    servicesByTitle[currentTitle].push(service);
                }
            });


            serviceList.innerHTML = '';
            titles.forEach(title => {
                serviceList.appendChild(title);
                servicesByTitle[title.dataset.i18n].forEach(service => {
                    serviceList.appendChild(service);
                });
            });
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
