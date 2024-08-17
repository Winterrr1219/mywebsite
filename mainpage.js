// Show 'About Us' section
function showAboutUs(event) {
    event.preventDefault();
    document.querySelector('.hero').style.display = 'none';
    document.querySelectorAll('.container').forEach(el => {
        if (!el.closest('#about-us-section')) {
            el.style.display = 'none';
        }
    });
    document.getElementById('about-us-section').style.display = 'block';
    window.scrollTo(0, 0);
}

// Hide 'About Us' section
function hideAboutUs() {
    document.querySelector('.hero').style.display = 'block';
    document.querySelectorAll('.container').forEach(el => {
        if (!el.closest('#about-us-section')) {
            el.style.display = 'block';
        }
    });
    document.getElementById('about-us-section').style.display = 'none';
    window.scrollTo(0, 0);
}

// Carousel functionality
const carouselItems = document.querySelector('.carousel-items');
const activityCards = document.querySelectorAll('.activity-card');
let currentIndex = 0;
const totalItems = activityCards.length;

function updateVisibleItems() {
    // Determine the number of visible items based on screen width
    if (window.innerWidth < 480) {
        return 1; // Show 1 item on very small screens
    } else if (window.innerWidth < 768) {
        return 2; // Show 2 items on small screens
    } else {
        return 3; // Default to 3 items on larger screens
    }
}

function updateCarousel() {
    const visibleItems = updateVisibleItems();
    const offset = currentIndex * -100 / visibleItems;
    carouselItems.style.transform = `translateX(${offset}%)`;
}

// Event listeners for carousel controls
document.querySelector('.carousel-control.left').addEventListener('click', () => {
    const visibleItems = updateVisibleItems();
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

document.querySelector('.carousel-control.right').addEventListener('click', () => {
    const visibleItems = updateVisibleItems();
    if (currentIndex < totalItems - visibleItems) {
        currentIndex++;
        updateCarousel();
    }
});

// Update carousel on window resize
window.addEventListener('resize', updateCarousel);

// Initial carousel update
updateCarousel();