document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { 
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    });
    
    document.querySelectorAll('.fade-slide-up, .fade-slide-left, .fade-slide-right, .fade-zoom-in').forEach(el => {
        observer.observe(el);
    });

    const dots = document.querySelectorAll('.nav-dots .dot');
    const sections = document.querySelectorAll('section[id]');
    
    let ticking = false;
    
    function updateActiveDot() {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop - 200 && scrollPosition < sectionTop + sectionHeight - 200) {
                current = section.getAttribute('id');
            }
        });
        
        if (!current && scrollPosition < 300) {
            current = 'hero';
        }
        
        dots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.dataset.section === current) {
                dot.classList.add('active');
            }
        });
        
        ticking = false;
    }
    
    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateActiveDot();
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', onScroll, { passive: true });
    
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = dot.dataset.section;
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    updateActiveDot();
});