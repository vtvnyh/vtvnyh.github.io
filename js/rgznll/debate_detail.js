document.addEventListener('DOMContentLoaded', function() {
    // 为共识项添加点击展开/收起效果
    const consensusItems = document.querySelectorAll('.consensus-item');
    
    consensusItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            this.classList.toggle('expanded');
        });
    });

    // 滚动到总结时的动画触发
    const summary = document.querySelector('.discussion-summary');
    if (summary) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, { threshold: 0.2 });

        observer.observe(summary);
    }
});