document.addEventListener('DOMContentLoaded', () => {
    // 1. 触发进入动画
    requestAnimationFrame(() => {
        document.body.classList.add('page-loaded');
    });

    // 2. 拦截所有内部链接的点击事件
    document.addEventListener('click', (e) => {
        // 寻找最近的 <a> 标签
        const link = e.target.closest('a');
        
        // 如果没有找到链接，或者链接不存在 href，直接返回
        if (!link || !link.href) return;

        const href = link.getAttribute('href');

        // 【关键修改】排除锚点链接 (#case, #debate 等)，让它们原生执行平滑滚动
        if (href.startsWith('#')) {
            return; 
        }

        // 排除外部链接、新标签页、mailto/tel 等
        if (
            link.target === '_blank' || 
            href.startsWith('http') && !href.includes(window.location.hostname) ||
            href.startsWith('mailto:') ||
            href.startsWith('tel:')
        ) {
            return;
        }

        // 3. 阻止默认跳转，执行动画
        e.preventDefault();
        
        // 添加退出动画类
        document.body.classList.remove('page-loaded');
        document.body.classList.add('page-exiting');

        // 4. 等待动画结束后跳转
        setTimeout(() => {
            window.location.href = href;
        }, 400); // 确保这个时间与 CSS 中的 transition 时间一致
    });
});