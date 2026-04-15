document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));

    const topNav = document.querySelector('.top-nav');
    
    if (topNav) {
        function updateNav() {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 50) {
                topNav.classList.add('scrolled');
            } else {
                topNav.classList.remove('scrolled');
            }
        }

        window.addEventListener('scroll', () => {
            updateNav();
        }, { passive: true });
        
        updateNav();
    }
});