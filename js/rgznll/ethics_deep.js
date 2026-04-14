// 简单的滚动揭示动画脚本
        document.addEventListener('DOMContentLoaded', () => {
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };

            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        // 如果是辩论消息，添加额外的延迟效果
                        if(entry.target.classList.contains('debate-msg')) {
                            entry.target.classList.add('show');
                        }
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            // 观察所有需要动画的元素
            document.querySelectorAll('.fade-in-up').forEach(el => {
                observer.observe(el);
            });
            
            // 特别观察辩论消息
            document.querySelectorAll('.debate-msg').forEach((el, index) => {
                el.style.transitionDelay = `${index * 0.2}s`; // 依次显示
                observer.observe(el);
            });
        });
        // 在现有的 DOMContentLoaded 事件监听器中添加以下逻辑
        const backToTopBtn = document.getElementById('backToTopBtn');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });