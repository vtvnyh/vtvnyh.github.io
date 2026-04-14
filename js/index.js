document.addEventListener('DOMContentLoaded', () => {
    // 1. 触发进入动画
    // 使用 requestAnimationFrame 确保样式应用后立刻添加类，触发动画
    requestAnimationFrame(() => {
        document.body.classList.add('page-loaded');
    });

    // 2. 拦截所有内部链接的点击事件
    // 注意：这里选择所有 <a> 标签，并在点击时判断是否为内部跳转
    document.addEventListener('click', (e) => {
        // 寻找最近的 <a> 标签（防止点击到 a 里面的 span 或 h2）
        const link = e.target.closest('a');
        
        // 如果没有找到链接，或者链接不存在 href，直接返回
        if (!link || !link.href) return;

        const href = link.getAttribute('href');

        // 排除外部链接、锚点链接、新标签页、mailto/tel 等
        if (
            !href || 
            href.startsWith('#') || 
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
        // 时间需与 CSS 中的 transition 时间一致 (例如 0.4s = 400ms)
        setTimeout(() => {
            window.location.href = href;
        }, 400);
    });
});