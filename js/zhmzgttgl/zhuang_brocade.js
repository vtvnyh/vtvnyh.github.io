document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right').forEach(el => {
        observer.observe(el);
    });

    const topBar = document.querySelector('.top-bar');
    
    if (topBar) {
        let lastScrollY = window.scrollY;
        
        function updateNav() {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 50) {
                topBar.classList.add('scrolled');
            } else {
                topBar.classList.remove('scrolled');
            }
        }

        window.addEventListener('scroll', () => {
            updateNav();
        }, { passive: true });
        
        updateNav();
    }
});