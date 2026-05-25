/**
 * 个人博客 — 全局脚本
 */
document.addEventListener('DOMContentLoaded',function(){
    /* 页面过渡 */
    requestAnimationFrame(function(){document.body.classList.add('loaded')});
    document.addEventListener('click',function(e){
        var a=e.target.closest('a');
        if(!a||!a.href)return;
        var h=a.getAttribute('href');
        if(!h||h.startsWith('#')||a.target==='_blank'||(h.startsWith('http')&&!h.includes(window.location.hostname)))return;
        e.preventDefault();
        document.body.classList.remove('loaded');
        document.body.classList.add('exiting');
        setTimeout(function(){window.location.href=h},350);
    });

    /* 移动端导航 */
    var toggle=document.getElementById('navToggle');
    var links=document.getElementById('navLinks');
    if(toggle&&links){
        toggle.addEventListener('click',function(){links.classList.toggle('open')});
        links.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){links.classList.remove('open')})});
    }

    /* 轮播图 */
    var track=document.querySelector('.carousel-track');
    var slides=document.querySelectorAll('.carousel-slide');
    var dots=document.querySelectorAll('.carousel-dot');
    var prev=document.querySelector('.carousel-btn.prev');
    var next=document.querySelector('.carousel-btn.next');
    if(track&&slides.length){
        var ci=0,timer=null,locked=false;
        function go(i,inst){
            if(i<0)i=slides.length-1;if(i>=slides.length)i=0;ci=i;
            if(inst){track.style.transition='none'}track.style.transform='translateX(-'+(ci*100)+'%)';
            if(inst){void track.getBoundingClientRect();track.style.transition=''}
            dots.forEach(function(d,idx){d.classList.toggle('active',idx===ci)});
        }
        function nxt(){
            if(locked)return;locked=true;go(ci+1);
            setTimeout(function(){locked=false},500);
        }
        function prv(){
            if(locked)return;locked=true;go(ci-1);
            setTimeout(function(){locked=false},500);
        }
        function start(){stop();timer=setInterval(nxt,4000)}
        function stop(){if(timer){clearInterval(timer);timer=null}}
        dots.forEach(function(d,i){d.addEventListener('click',function(){stop();go(i);start()})});
        if(prev)prev.addEventListener('click',function(){stop();prv();start()});
        if(next)next.addEventListener('click',function(){stop();nxt();start()});
        var wrap=document.querySelector('.carousel-wrap');
        if(wrap){wrap.addEventListener('mouseenter',stop);wrap.addEventListener('mouseleave',start)}
        go(0,true);start();
    }

    /* 高亮当前导航 */
    var cur=window.location.pathname.split('/').pop()||'index.html';
    document.querySelectorAll('.nav-links a').forEach(function(a){
        if(a.getAttribute('href')===cur)a.classList.add('active');
    });
});
