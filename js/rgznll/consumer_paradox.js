window.addEventListener('load', function() {
    const canvas = document.getElementById('paradoxChart');
    if (!canvas) {
        console.error('Canvas element not found!');
        return;
    }

    const ctx = canvas.getContext('2d');
    
    // 设置画布尺寸
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    console.log('Canvas size:', rect.width, 'x', rect.height);
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // 消费者悖论数据（基于MIT Moral Machine和Bonnefon研究）
    const scenarios = [
        { 
            name: '牺牲1乘客救5行人', 
            moral: 76, 
            purchase: 19 
        },
        { 
            name: '牺牲1乘客救10行人', 
            moral: 85, 
            purchase: 23 
        },
        { 
            name: '牺牲老年乘客救儿童', 
            moral: 68, 
            purchase: 31 
        },
        { 
            name: '保护乘客优先', 
            moral: 42, 
            purchase: 67 
        },
        { 
            name: '随机选择（公平原则）', 
            moral: 54, 
            purchase: 48 
        }
    ];

    // 图表配置
    const config = {
        padding: { top: 50, right: 40, bottom: 100, left: 70 },
        barWidth: 30,
        barGap: 8,
        colors: {
            moral: '#10b981',
            purchase: '#ef4444'
        }
    };

    const chartWidth = rect.width - config.padding.left - config.padding.right;
    const chartHeight = rect.height - config.padding.top - config.padding.bottom;

    // 绘制背景网格
    function drawGrid() {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 1;
        
        for (let i = 0; i <= 5; i++) {
            const y = config.padding.top + (chartHeight / 5) * i;
            ctx.beginPath();
            ctx.moveTo(config.padding.left, y);
            ctx.lineTo(rect.width - config.padding.right, y);
            ctx.stroke();
            
            // Y轴标签
            ctx.fillStyle = '#94a3b8';
            ctx.font = '13px Inter, sans-serif';
            ctx.textAlign = 'right';
            ctx.textBaseline = 'middle';
            ctx.fillText(`${100 - i * 20}%`, config.padding.left - 15, y);
        }
    }

    // 绘制柱状图
    function drawBars(animationProgress = 1) {
        const groupWidth = config.barWidth * 2 + config.barGap;
        const gapBetweenGroups = 40;
        const totalWidth = scenarios.length * groupWidth + (scenarios.length - 1) * gapBetweenGroups;
        const startX = config.padding.left + (chartWidth - totalWidth) / 2;

        scenarios.forEach((scenario, index) => {
            const groupX = startX + index * (groupWidth + gapBetweenGroups);
            
            // 道德认同柱子（绿色）
            const moralValue = scenario.moral * animationProgress;
            const moralHeight = (moralValue / 100) * chartHeight;
            const moralY = config.padding.top + chartHeight - moralHeight;
            
            const gradient1 = ctx.createLinearGradient(0, moralY, 0, config.padding.top + chartHeight);
            gradient1.addColorStop(0, '#34d399');
            gradient1.addColorStop(1, '#059669');
            
            ctx.fillStyle = gradient1;
            ctx.beginPath();
            ctx.roundRect(groupX, moralY, config.barWidth, moralHeight, [4, 4, 0, 0]);
            ctx.fill();
            
            // 数值标签 - 道德认同
            if (animationProgress > 0.8) {
                ctx.fillStyle = '#fff';
                ctx.font = 'bold 12px Inter, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';
                ctx.fillText(`${scenario.moral}%`, groupX + config.barWidth / 2, moralY - 5);
            }

            // 购买意愿柱子（红色）
            const purchaseValue = scenario.purchase * animationProgress;
            const purchaseHeight = (purchaseValue / 100) * chartHeight;
            const purchaseY = config.padding.top + chartHeight - purchaseHeight;
            
            const gradient2 = ctx.createLinearGradient(0, purchaseY, 0, config.padding.top + chartHeight);
            gradient2.addColorStop(0, '#f87171');
            gradient2.addColorStop(1, '#dc2626');
            
            ctx.fillStyle = gradient2;
            ctx.beginPath();
            ctx.roundRect(groupX + config.barWidth + config.barGap, purchaseY, config.barWidth, purchaseHeight, [4, 4, 0, 0]);
            ctx.fill();
            
            // 数值标签 - 购买意愿
            if (animationProgress > 0.8) {
                ctx.fillStyle = '#fff';
                ctx.font = 'bold 12px Inter, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';
                ctx.fillText(`${scenario.purchase}%`, groupX + config.barWidth + config.barGap + config.barWidth / 2, purchaseY - 5);
            }

            // X轴标签
            ctx.fillStyle = '#cbd5e1';
            ctx.font = '11px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            
            const labelX = groupX + config.barWidth + config.barGap / 2;
            const labelY = config.padding.top + chartHeight + 15;
            
            // 处理长文本，自动换行
            const maxWidth = groupWidth + gapBetweenGroups - 10;
            const words = scenario.name.split('');
            let line = '';
            let lines = [];
            
            for (let n = 0; n < words.length; n++) {
                const testLine = line + words[n];
                const metrics = ctx.measureText(testLine);
                if (metrics.width > maxWidth && n > 0) {
                    lines.push(line);
                    line = words[n];
                } else {
                    line = testLine;
                }
            }
            lines.push(line);
            
            lines.forEach((line, i) => {
                ctx.fillText(line, labelX, labelY + i * 15);
            });
        });
    }

    // 绘制标题
    function drawTitle() {
        ctx.fillStyle = '#f1f5f9';
        ctx.font = 'bold 18px Inter, sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText('道德认同 vs 购买意愿对比 (%)', config.padding.left, 15);
        
        // 副标题
        ctx.fillStyle = '#94a3b8';
        ctx.font = '13px Inter, sans-serif';
        ctx.fillText('MIT Moral Machine 实验数据显示的知行不一现象', config.padding.left, 38);
    }

    // 动画效果
    let startTime = null;
    const duration = 1500; // 1.5秒动画

    function animate(currentTime) {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // 使用缓动函数使动画更流畅
        const easeProgress = 1 - Math.pow(1 - progress, 3);

        ctx.clearRect(0, 0, rect.width, rect.height);
        
        drawGrid();
        drawBars(easeProgress);
        drawTitle();

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    // 启动动画
    requestAnimationFrame(animate);

    // 响应式重绘
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const newRect = canvas.getBoundingClientRect();
            canvas.width = newRect.width * dpr;
            canvas.height = newRect.height * dpr;
            ctx.scale(dpr, dpr);
            
            ctx.clearRect(0, 0, newRect.width, newRect.height);
            drawGrid();
            drawBars(1);
            drawTitle();
        }, 250);
    });
});