// Main script - Initializes everything
document.addEventListener('DOMContentLoaded', function() {
    // Initialize inventory manager
    inventoryManager.initialize();

    // Initialize contact form
    new ContactForm('quote-request-form');

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add loading animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .part-card {
            animation: fadeInUp 0.6s ease-out;
        }
        
        .trust-signal {
            animation: fadeInUp 0.8s ease-out;
        }
    `;
    document.head.appendChild(style);
});