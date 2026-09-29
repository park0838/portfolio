(function () {
    'use strict';

    var root = document.documentElement;

    // --- 다크 모드 ---
    var toggles = document.querySelectorAll('.theme-toggle');

    function renderThemeIcon() {
        var dark = root.getAttribute('data-theme') === 'dark';
        toggles.forEach(function (btn) {
            btn.textContent = dark ? '☀️' : '🌙';
            btn.setAttribute('aria-label', dark ? '라이트 모드 전환' : '다크 모드 전환');
        });
    }

    toggles.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            if (next === 'dark') {
                root.setAttribute('data-theme', 'dark');
            } else {
                root.removeAttribute('data-theme');
            }
            try { localStorage.setItem('theme', next); } catch (e) {}
            renderThemeIcon();
        });
    });
    renderThemeIcon();

    // --- 모바일 메뉴 ---
    var navToggle = document.getElementById('navToggle');
    var navMenu = document.getElementById('navMenu');

    function setMenu(open) {
        navMenu.classList.toggle('open', open);
        document.querySelector('.site-nav').classList.toggle('menu-open', open);
        navToggle.setAttribute('aria-expanded', String(open));
        navToggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
    }

    navToggle.addEventListener('click', function () {
        setMenu(!navMenu.classList.contains('open'));
    });

    navMenu.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') setMenu(false);
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') setMenu(false);
    });

    // --- 현재 섹션 표시 ---
    var links = Array.prototype.slice.call(navMenu.querySelectorAll('a[href^="#"]'));
    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });

    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                links.forEach(function (a) { a.classList.remove('active'); });
                var link = byId[entry.target.id];
                if (link) link.classList.add('active');
            });
        }, { rootMargin: '-40% 0px -55% 0px' });
        Object.keys(byId).forEach(function (id) {
            var section = document.getElementById(id);
            if (section) observer.observe(section);
        });
    }

    // --- 이미지 자리 표시 ---
    // 이미지 파일이 있으면 자리 표시를 걷어내고, 없으면 파일 경로 안내 문구를 보여 줍니다.
    document.querySelectorAll('.media').forEach(function (box) {
        var img = box.querySelector('img');
        if (!img) return;

        function ok() { box.classList.remove('is-missing'); }

        if (img.complete && img.naturalWidth > 0) {
            ok();
        } else {
            img.addEventListener('load', ok);
        }
    });

    // --- 스크롤 시 내비게이션 경계선 ---
    var nav = document.querySelector('.site-nav');
    function onScroll() { nav.classList.toggle('scrolled', window.scrollY > 8); }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // --- 스크롤 등장 효과 ---
    var reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        var revealer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('in');
                revealer.unobserve(entry.target);
            });
        }, { rootMargin: '0px 0px -8% 0px' });
        reveals.forEach(function (el) { revealer.observe(el); });
    } else {
        reveals.forEach(function (el) { el.classList.add('in'); });
    }

    // --- 푸터 연도 ---
    var year = document.getElementById('year');
    if (year) year.textContent = String(new Date().getFullYear());
})();
