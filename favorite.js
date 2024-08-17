// Define all packages (ensure this is the same array used in your main script)
const packages = [
    {
        id: 'kuala-lumpur',
        title: 'Kuala Lumpur (3D2N)',
        description: 'Explore the vibrant capital of Malaysia with its iconic Petronas Towers, bustling markets, and rich cultural heritage.',
        price: 'RM1,099',
        imageUrl: 'https://cdn.pixabay.com/photo/2013/08/09/05/58/kuala-lumpur-170985_1280.jpg'
    },
    {
        id: 'langkawi',
        title: 'Langkawi (4D3N)',
        description: 'Relax on the beautiful beaches of Langkawi, an island paradise known for its clear waters, luxury resorts, and stunning landscapes.',
        price: 'RM1,199',
        imageUrl: 'https://cdn.pixabay.com/photo/2018/03/18/16/51/nature-3237434_1280.jpg'
    },
    {
        id: 'penang',
        title: 'Penang (4D3N)',
        description: 'Discover the historical charm of Penang, famous for its street food, colonial architecture, and cultural diversity.',
        price: 'RM999',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/08/17/07/38/georgetown-4411602_1280.jpg'
    },
    {
        id: 'sabah',
        title: 'Sabah (4D3N)',
        description: 'Embark on an adventure in Sabah, home to Mount Kinabalu, lush rainforests, and incredible wildlife.',
        price: 'RM1,299',
        imageUrl: 'https://cdn.pixabay.com/photo/2020/07/11/03/46/sabah-5392664_1280.jpg'
    },
    {
        id: 'melaka',
        title: 'Melaka (3D2N)',
        description: 'Explore the historical city of Melaka, known for its colonial architecture, vibrant street life, and rich heritage.',
        price: 'RM799',
        imageUrl: 'https://cdn.pixabay.com/photo/2015/09/25/10/04/dutch-square-957004_1280.jpg'
    }
];

// Retrieve favorite package IDs from local storage
const favoriteIds = JSON.parse(localStorage.getItem('favorites')) || [];

// Function to display favorite packages
const displayFavorites = () => {
    const favoritesContainer = document.getElementById('favoritesContainer');

    if (!favoritesContainer) {
        console.error('Favorites container element not found');
        return;
    }

    // Filter packages to include only favorites
    const favoritePackages = packages.filter(pkg => favoriteIds.includes(pkg.id));

    // Create and append HTML for each favorite package
    favoritePackages.forEach(pkg => {
        const packageElement = document.createElement('div');
        packageElement.classList.add('package');
        packageElement.setAttribute('data-package-id', pkg.id);

        packageElement.innerHTML = `
            <a href="package-details.html?package=${pkg.id}">
                <img src="${pkg.imageUrl}" alt="${pkg.title}">
                <h3>${pkg.title}</h3>
                <p>${pkg.description}</p>
                <p class="package-price">${pkg.price}</p>
            </a>
        `;

        favoritesContainer.appendChild(packageElement);
    });
};

// Initialize favorites display when DOM is loaded
document.addEventListener('DOMContentLoaded', displayFavorites);