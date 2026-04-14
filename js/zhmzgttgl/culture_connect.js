document.addEventListener('DOMContentLoaded', () => {
    // 1. 滚动显现动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));


    // 【新增】2. 图片懒加载优化
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    // 如果使用了 data-src 属性，则在此处加载
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '200px 0px', // 提前200px开始加载
            threshold: 0.01
        });

        // 观察所有使用懒加载的图片
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // 3. 首屏视差与淡出效果 + 导航栏颜色自适应
    const heroSection = document.querySelector('.hero-scroll');
    const sealStamp = document.querySelector('.seal-stamp');
    const verticalNav = document.querySelector('.vertical-nav'); // 获取导航栏对象
    const navLinks = document.querySelectorAll('.vertical-nav a'); // 获取所有链接
    const navSeal = document.querySelector('.nav-seal'); // 获取顶部小印章
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const windowHeight = window.innerHeight;

        // --- A. 首屏视差逻辑 (保持不变) ---
        if (scrolled < windowHeight) {
            const opacity = 1 - (scrolled / (windowHeight * 0.8));
            const moveY = scrolled * 0.2;

            if (sealStamp) {
                sealStamp.style.transform = `translateY(-${moveY}px)`;
                sealStamp.style.opacity = Math.max(0, opacity);
            }
            
            const title = document.querySelector('.vertical-title');
            if(title) {
                title.style.opacity = Math.max(0, opacity);
                title.style.transform = `translateY(-${moveY * 0.5}px)`;
            }
        }

        // --- B. 【新增】导航栏颜色自适应逻辑 ---
        // 获取“土木营造” section 的位置信息
        const archSection = document.querySelector('#architecture');
        
        if (archSection) {
            const sectionTop = archSection.offsetTop;
            const sectionHeight = archSection.offsetHeight;
            const sectionBottom = sectionTop + sectionHeight;

            // 判断当前滚动位置是否在深色区域内（稍微留一点余量，比如进入 100px 后变色）
            if (scrolled > sectionTop - 100 && scrolled < sectionBottom - 100) {
                // 进入深色区域：变为白色
                verticalNav.style.color = '#ffffff';
                navSeal.style.background = '#ffffff';
                navSeal.style.color = '#b22c2c'; // 印章文字变红
                
                navLinks.forEach(link => {
                    link.style.color = '#ffffff';
                });
            } else {
                // 离开深色区域：恢复黑色
                verticalNav.style.color = ''; // 清空内联样式，回归 CSS 定义
                navSeal.style.background = ''; 
                navSeal.style.color = '';
                
                navLinks.forEach(link => {
                    link.style.color = '';
                });
            }
        }
    });
});