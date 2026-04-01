// Scroll Animations using Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section, .special-card').forEach(el => {
    observer.observe(el);
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.padding = '12px 32px';
        navbar.style.background = 'rgba(18, 13, 11, 0.8)';
    } else {
        navbar.style.padding = '16px 32px';
        navbar.style.background = 'rgba(255, 255, 255, 0.05)';
    }
});

// Toast Notification System
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'glass';
    toast.style.position = 'fixed';
    toast.style.bottom = '40px';
    toast.style.right = '40px';
    toast.style.padding = '16px 32px';
    toast.style.zIndex = '2000';
    toast.style.color = '#F5A623';
    toast.style.fontWeight = 'bold';
    toast.style.border = '1px solid #F5A623';
    toast.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.transition = 'opacity 0.5s ease-out';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
    }, 2500);
}

// Add to Cart functionality
document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const card = e.target.closest('.special-card');
        const itemName = card.querySelector('h3').innerText;
        showToast(`${itemName} added to your order!`);
    });
});

// Simple Log for testing
console.log("CafeBuzz Interactivity Initialized.");
