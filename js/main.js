(function () {
    'use strict';

    var root = document.documentElement;

    // --- 다크 모드 ---
    var toggle = document.querySelector('.theme-toggle');

    function render() {
        var dark = root.getAttribute('data-theme') === 'dark';
        toggle.textContent = dark ? '라이트 모드' : '다크 모드';
    }

    toggle.addEventListener('click', function () {
        var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        if (next === 'dark') {
            root.setAttribute('data-theme', 'dark');
        } else {
            root.removeAttribute('data-theme');
        }
        try { localStorage.setItem('theme', next); } catch (e) {}
        render();
    });
    render();

    // --- 푸터 연도 ---
    var year = document.getElementById('year');
    if (year) year.textContent = String(new Date().getFullYear());
})();
